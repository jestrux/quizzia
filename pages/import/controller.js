import importSteps from "./steps.js";

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
	withHeader(header) {
		return XLSX.utils.sheet_to_json(this.worksheet, { header });
	}
}

export default function ImportController($scope, $routeParams, ImportService) {
	$scope.currentStep = 1;
	$scope.allSteps = [...importSteps];
	$scope.activeSteps = [...$scope.allSteps]; //.filter((_, i) => i != 1);
	$scope.currentStepId = () => $scope.activeSteps[$scope.currentStep - 1].id;
	$scope.completedSteps = [];
	$scope.$watch("currentStep", function (newValue) {
		if (!$scope.completedSteps.includes(newValue)) {
			$scope.completedSteps.push(newValue - 1);
		}
	});

	$scope.setStep = (step) => {
		$scope.currentStep = step;
	};

	$scope.goNext = async () => {
		if (!(await $scope.validateCurrentStep())) return;

		$scope.setStep($scope.currentStep + 1);
		$scope.$apply();
	};

	$scope.validateCurrentStep = () => {
		return new Promise((resolve) => {
			const step = $scope.activeSteps[$scope.currentStep - 1];
			step.validator.validate($scope, (errors) => {
				$scope.activeSteps[$scope.currentStep - 1].errors = errors;
				resolve(!errors.length);
			});
		});
	};

	$scope.fileDetails = null;
	// $scope.fileDetails = {
	// 	headerRow: ["Position", "Person", "Email", "Phone", "Department"],
	// };

	$scope.processSheet = (d, file) => {
		let { asArray, asJSON } = new SheetProcessor(d);
		$scope.fileDetails = {
			fileName: file.name,
			headerRow: asArray[0],
		};
		$scope.data = asJSON;
		$scope.$apply();
		console.log("Workbook: ", asArray[0]);
	};

	$scope.clearSelectedFile = () => {
		$scope.fileDetails = null;
		$scope.vm.headerRow = null;
		$scope.completedSteps = [];
	};

	$scope.vm = {
		data: null,
		importFrom: "file",
		firstRowAsHeader: null,
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

	$scope.mappedColumns = [];
	const updateMetaColumns = function () {
		$scope.metaColumns = $scope.columns.map((col) => {
			return {
				label: col,
				mapped: Object.values($scope.vm.columnMap || {}).includes(col),
			};
		});
		$scope.mappedColumns = $scope.metaColumns
			.filter(({ mapped }) => mapped)
			.map(({ label }) => label);
		$scope.dataFixColumn = $scope.mappedColumns[0];
	};

	$scope.$watch("columns", updateMetaColumns, true);
	$scope.$watch("vm.importType", function (newValue) {
		if (!newValue?.length) return;
		$scope.columns = $scope.columnsByType[newValue];
	});

	$scope.setFirstRowAsHeader = (value) => {
		$scope.vm.firstRowAsHeader = value;
	};

	$scope.$watch("vm.firstRowAsHeader", function (newValue) {
		if (!newValue) {
			$scope.vm.columnMap = {};
			return;
		}

		$scope.vm.columnMap = $scope.fileDetails.headerRow.reduce(
			(agg, entry) => {
				if ($scope.columns.includes(entry)) {
					agg[entry] = entry;
				}

				return agg;
			},
			{}
		);
	});

	$scope.$watch(
		"vm.columnMap",
		function () {
			updateMetaColumns();
			$scope.reverseColumnMap = Object.entries(
				$scope.vm.columnMap
			).reduce((agg, [key, value]) => {
				agg[value] = key;
				return agg;
			}, {});
		},
		true
	);

	$scope.positionChanged = function (newValue) {
		console.log("New position: ", newValue);
	};

	$scope.fileChanged = function (e) {
		console.log("New file: ", e);
	};
}
