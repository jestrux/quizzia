export default function GameController($scope, GameService) {
	$scope.currentIndex = -1;
	$scope.questions = [];

	this.answerQuestion = function (answer) {
		console.log("Answer: ", answer);
	};

	(async function () {
		const questions = (await GameService.fetchQuestions()).all("regular");
		console.log("Game questions: ", questions);
	})();
}
