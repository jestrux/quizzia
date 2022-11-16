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
	$scope.importActions = [
		"Only add new data",
		"Only update existing data",
		"Add new data and update existing",
	];
	$scope.decoArray = Array(300).fill(Math.random());
	$scope.importFromChoices = {
		"Upload file": "file",
		"Google Sheets": "google",
		"Copy / Paste from Excel": "excel",
	};
	$scope.importFromKeys = Object.keys($scope.importFromChoices);

	$scope.vm = {
		data: null,
		importFrom: "file",
		currentStep: 1,
		importAction: "",
		importType: "",
		columnMap: {},
	};
}
