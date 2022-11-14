export default function TestController($scope, $routeParams, TestService) {
	$scope.questionTypes = ["regular", "one plus one", "image answers"];
	const type = ($scope.selectedType = $routeParams?.questionType);
	$scope.questions = type?.length
		? [TestService.questionsByType(type)[0]]
		: TestService.questions;
}
