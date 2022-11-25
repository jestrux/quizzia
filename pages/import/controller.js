import importSteps from "./steps.js";

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
	$scope.currentStep = 1;
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
		$scope.data = asJSON;
		$scope.$apply();
		// console.log("Workbook: ", asArray[0]);
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
	$scope.columnsByType = {
		Crew: ["Position", "First Name", "Last Name", "Email", "Phone"],
		Cast: [
			"Character Number",
			"Character Name",
			"First Name",
			"Last Name",
			"Email",
			"Phone",
		],
		Locations: [
			"Name",
			"Street Address",
			"City",
			"State",
			"Zipcode",
			"Phone Number",
		],
		Scenes: [
			"Scene Name",
			"Slugline",
			"Scene Description",
			"Story Day",
			"Pages",
			"Location",
			"Extras Count",
			"Cast",
		],
	};
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

		$scope.vm.columnMap = $scope.vm.headerRow.reduce((agg, entry) => {
			if ($scope.columns.includes(entry)) {
				agg[entry] = entry;
			}

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
		$scope.dataFixColumn = $scope.mappedColumns[0];
	};

	$scope.$watch("columns", updateMetaColumns, true);
	$scope.$watch("vm.importType", function (newValue) {
		if (!newValue?.length) return;

		$scope.completedSteps = [1];
		$scope.columns = $scope.columnsByType[newValue];
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

	const _validateData = () => {
		if (!$scope.data?.length) return;

		console.log("New data: ", $scope.data);
	};

	$scope.$watch("data", function () {
		_validateData();
	});

	$scope.positionChanged = function (newValue) {
		console.log("New position: ", newValue);
	};

	$scope.fileChanged = function (e) {
		console.log("New file: ", e);
	};
}
