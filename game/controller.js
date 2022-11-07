export default async function GameController($scope, GameService) {
	$scope.currentIndex = -1;
	$scope.questions = [];
	$scope.nextQuestion = function () {};

	const questions = (await GameService.fetchQuestions()).filterByType(
		"regular"
	);
	console.log("Game questions: ", questions);
}
