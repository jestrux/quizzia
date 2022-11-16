export default function ImportController($scope, $routeParams, ImportService) {
	$scope.importTypes = ["Scenes", "Locations", "Cast", "Crew"];
	$scope.columns = ["Position", "Person", "Email", "Phone", "Department"];
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
	$scope.decoArray = Array(300).fill(Math.random());
	$scope.importFromChoices = {
		"Upload file": "file",
		"Google Sheets": "google",
		"Copy / Paste from Excel": "excel",
	};
	$scope.importFromKeys = Object.keys($scope.importFromChoices);
	$scope.completedSteps = [];
	$scope.invalidRows = ["Lead method actor", "Head of extras"];

	$scope.vm = {
		data: null,
		importFrom: "file",
		currentStep: 1,
		importAction: "add",
		importType: "Crew",
		dataFixColumn: "Position",
		columnMap: {},
	};
	$scope.$watch("vm.currentStep", function (newValue) {
		if (!$scope.completedSteps.includes(newValue)) {
			$scope.completedSteps.push(newValue - 1);
		}
	});
}
