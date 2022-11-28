import columnsByType from "./columns-by-type.js";
import importSteps from "./steps.js";
import FormValidator from "./form-validator.js";

// https://docs.sheetjs.com/docs/api/utilities#array-of-objects-input
class SheetProcessor {
	workbook = null;
	worksheet = null;
	constructor(rawData) {
		this.workbook = XLSX.read(rawData);
		const { Sheets, SheetNames } = this.workbook;
		this.worksheet = Sheets[SheetNames[0]];
	}
	get asArray() {
		return XLSX.utils.sheet_to_json(this.worksheet, { header: 1 });
	}
	get asJSON() {
		return XLSX.utils.sheet_to_json(this.worksheet);
	}
	withHeader = (header) => {
		if (!this.worksheet) return;
		return XLSX.utils.sheet_to_json(this.worksheet, { header });
	};
}

export default function ImportController($scope, $routeParams, ImportService) {
	$scope.currentStep = 4;
	$scope.allSteps = [...importSteps];
	$scope.activeSteps = [...$scope.allSteps]; //.filter((_, i) => i != 1);
	$scope.currentStepId = () => $scope.activeSteps[$scope.currentStep - 1].id;
	$scope.completedSteps = [];
	$scope.$watch("currentStep", function (newValue) {
		_clearStepErrors();
		if (!$scope.completedSteps.includes(newValue)) {
			$scope.completedSteps.push(newValue - 1);
		}
	});

	$scope.setStep = (step) => {
		$scope.currentStep = Number(step);
	};

	$scope.goNext = async (step) => {
		if (!(await _validateStep(step - 1))) return;

		$scope.setStep(step + 1);
		$scope.$apply();
	};

	const _validateStep = (stepIndex) => {
		return new Promise((resolve) => {
			const step = $scope.activeSteps[stepIndex];
			step.validator.validate($scope, (errors) => {
				$scope.activeSteps[stepIndex].errors = errors;
				resolve(!errors.length);
			});
		});
	};

	const _clearStepErrors = () => {
		$scope.activeSteps.forEach((step) => {
			step.errors = [];

			if (step.validator.clearErrorWatcher)
				step.validator.clearErrorWatcher();
		});
	};

	$scope.fileDetails = null;
	// $scope.fileDetails = {
	// 	headerRow: ["Position", "Person", "Email", "Phone", "Department"],
	// };

	$scope.processSheet = (d, file) => {
		let { asArray, asJSON, withHeader } = new SheetProcessor(d);
		$scope.fileDetails = {
			fileName: file.name,
			headerRow: asArray[0],
			data: asJSON,
			sheetWithHeader: (header) => withHeader(header),
		};
		$scope.$apply();
	};

	$scope.clearSelectedFile = () => {
		$scope.fileDetails = null;
		$scope.vm.headerRow = null;
		$scope.completedSteps = [];
	};

	$scope.vm = {
		data: null,
		headerRow: null,
		importFrom: "file",
		importAction: "add",
		importType: "",
		dataFixColumn: "Position",
		columnMap: {},
	};
	$scope.decoArray = Array(300).fill(Math.random());
	$scope.importTypes = ["Scenes", "Locations", "Cast", "Crew"];
	$scope.columns = [];
	// $scope.columns = ["Position", "Person", "Email", "Phone", "Department"];
	$scope.incomingColumns = [
		"Job",
		"Member",
		"Email Address",
		"Phone Number",
		"Dept",
	];
	$scope.importActions = {
		"Only add new data": "add",
		"Only update existing data": "update",
		"Add new data and update existing": "both",
	};
	$scope.importActionsChoices = Object.keys($scope.importActions);
	$scope.importFromChoices = {
		"Upload file": "file",
		"Google Sheets": "google",
		"Copy / Paste from Excel": "excel",
	};
	$scope.importFromKeys = Object.keys($scope.importFromChoices);
	$scope.invalidPositions = [
		"Power Saintly",
		"Carpenter's Assistant",
		"Janitorial Crew",
	];

	const _autoMapColumns = function () {
		if (!$scope.vm.headerRow) {
			$scope.vm.columnMap = {};
			return;
		}

		const columns = columnsByType[$scope.vm.importType] || {};
		$scope.vm.columnMap = Object.keys(columns).reduce((agg, col) => {
			$scope.vm.headerRow.forEach((headerCol) => {
				if (
					headerCol == col ||
					columns[col].similes.includes(headerCol)
				) {
					agg[headerCol] = col;
				}
			});

			return agg;
		}, {});
	};

	$scope.mappedColumns = [];
	const updateMetaColumns = function () {
		$scope.metaColumns = $scope.columns.map((col) => {
			return {
				label: col,
				mapped: Object.values($scope.vm.columnMap || {}).includes(col),
			};
		});
		const mappedColumns = $scope.metaColumns
			.filter(({ mapped }) => mapped)
			.map(({ label }) => label);

		$scope.mappedColumns = [
			...mappedColumns,
			...(mappedColumns.length == 1 ? [""] : []), // minimum of two columns
		];
	};

	$scope.$watch("columns", updateMetaColumns, true);
	$scope.$watch("vm.importType", function (newValue) {
		if (!newValue?.length) return;

		$scope.completedSteps = [1];
		$scope.columns = Object.keys(columnsByType[newValue] || {});
		$scope.vm.headerRow = null;
	});

	$scope.setFirstRowAsHeader = (value) => {
		if (value == null) {
			$scope.vm.headerRow = null;
			return;
		}

		const headerRow = $scope.fileDetails.headerRow.map((row, index) => {
			return value == "Yes" ? row : `Column ${index + 1}`;
		});

		$scope.data =
			value == "Yes"
				? $scope.fileDetails.data
				: $scope.fileDetails.sheetWithHeader(headerRow);

		$scope.vm.headerRow = headerRow;
	};

	$scope.$watch("vm.headerRow", function () {
		_autoMapColumns();
	});

	$scope.$watch(
		"vm.columnMap",
		function () {
			updateMetaColumns();
			$scope.reverseColumnMap = Object.entries(
				$scope.vm.columnMap
			).reduce((agg, [key, value]) => {
				if (value) agg[value] = key;
				return agg;
			}, {});
		},
		true
	);

	const _validateData = ({ data, reverseColumnMap, columns }) => {
		if (!data?.length) return;

		const columnValidations = Object.entries(columns).reduce(
			(agg, [key, { validation }]) => {
				return {
					...agg,
					[key]: validation,
				};
			},
			{}
		);
		const { validateField } = new FormValidator($scope, columnValidations);
		$scope.invalidValues = {};

		data.forEach((entry) => {
			Object.entries(entry).forEach(([key, value]) => {
				const col = reverseColumnMap[key];

				if (col) {
					const errors = validateField(col, value);
					if (errors.length) {
						if (!$scope.invalidValues[col]) {
							$scope.invalidValues[col] = {
								entries: [],
							};
						}

						$scope.invalidValues[col].entries = [
							...($scope.invalidValues[col].entries || []),
							{
								type: columns[col].type,
								value,
								errors,
								column: col,
								validate: (val) => validateField(col, val),
							},
						];

						$scope.invalidValues[col].entriesWithErrors = [
							...$scope.invalidValues[col].entries,
						];
					}
				}
			});
		});

		$scope.invalidValueKeys = Object.keys($scope.invalidValues);
		if ($scope.invalidValueKeys.length) {
			$scope.dataFixColumn = $scope.invalidValueKeys[0];
		}
	};

	$scope.setDataFixColumn = function (column) {
		$scope.dataFixColumn = column;
	};

	$scope.updateInvalidValue = function ({
		column,
		rowIndex,
		newValue,
		errors,
	} = {}) {
		$scope.invalidValues[column].entries[rowIndex].newValue = newValue;
		$scope.invalidValues[column].entries[rowIndex].errors = errors;

		const allEntries = $scope.invalidValues[column].entries;
		$scope.invalidValues[column].entriesWithErrors = allEntries.filter(
			({ errors }) => {
				return errors.length > 0;
			}
		);
	};

	$scope.$watch("data", function () {
		const tester = {
			data: [
				{
					"Character Number": 1,
					Role: "Aaron Border",
					"First Name": "James",
					"Last Name": "Medina",
					Email: "unicef.org",
					Phone: "916-831-0627",
					$$hashKey: "object:1307",
				},
				{
					"Character Number": 1,
					Role: "Aaron Border",
					"First Name": "James",
					"Last Name": "Medina",
					Email: "jmedina",
					Phone: "916-831-0627",
				},
			],
			reverseColumnMap: {
				"Character Number": "Character Number",
				"First Name": "First Name",
				"Last Name": "Last Name",
				Email: "Email",
				Phone: "Phone",
			},
			columns: columnsByType["Cast"],
		};

		_validateData(tester);
		// _validateData({
		// 	data: $scope.data,
		// 	columns: columnsByType[$scope.vm.importType],
		// 	reverseColumnMap: $scope.reverseColumnMap,
		// });
	});

	$scope.positionChanged = function (newValue) {
		console.log("New position: ", newValue);
	};

	$scope.fileChanged = function (e) {
		console.log("New file: ", e);
	};
}
