export default function GameController($scope, GameService) {
	$scope.currentIndex = 0;
	$scope.questions = [];

	this.answerQuestion = function (answer, correct) {
		$scope.currentIndex += 1;
		console.log("Answer: ", answer);
	};

	GameService.fetchQuestions().then(function (res) {
		$scope.questions = res.all();
		console.log("Game questions: ", $scope);
		$scope.$apply();
	});
	// (async function () {
	// 	const questions = (await GameService.fetchQuestions()).all("regular");
	// 	_self.questions = questions;
	// 	console.log("Game questions: ", _self);
	// })();
}
