import GameService from "./service.js";
import GameUI from "./game.js";

angular
	.module("Game", [])
	.factory("GameService", GameService)
	.directive("game", GameUI);
