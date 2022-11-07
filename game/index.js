import GameService from "./service.js";
import GameUI from "./game.js";
import Question, {
	RegularQuestion,
	OnePlusOneQuestion,
	ImageAnswersQuestion,
} from "./question/index.js";

angular
	.module("Game", [])
	.factory("GameService", GameService)
	.directive("game", GameUI)
	.directive("regularQuestion", RegularQuestion)
	.directive("onePlusOneQuestion", OnePlusOneQuestion)
	.directive("imageAnswersQuestion", ImageAnswersQuestion)
	.directive("question", Question);
