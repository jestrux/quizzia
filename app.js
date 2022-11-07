import "./components/index.js";
import "./game/index.js";

angular
	.module("quizzia", ["Components", "Game"])
	.controller("AppController", function ($scope) {});
