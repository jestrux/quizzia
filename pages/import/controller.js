export default function ImportController($scope, $routeParams, ImportService) {
	$scope.importTypes = ["Scenes", "Locations", "Cast", "Crew"];
	$scope.columns = ["Position", "Person", "Email", "Phone", "Department"];
	$scope.importActions = [
		"Only add new data",
		"Only update existing data",
		"Add new data and update existing",
	];
	$scope.decoArray = Array(300).fill(Math.random());

	$scope.vm = {
		currentStep: 1,
		importAction: "",
		importType: "",
	};
}
