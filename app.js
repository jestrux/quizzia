import "./components/index.js";
import "./pages/game/index.js";
import "./pages/test/index.js";
import "./pages/import/index.js";

angular
	.module("quizzia", ["ngRoute", "Components", "Game", "Test", "Import"])
	.config([
		"$routeProvider",
		function ($routeProvider) {
			$routeProvider
				.when("/play", {
					template: `
					<a href="#!/test" class="fixed top-3 right-3"> Test components</a>
					<game />
				`,
				})
				.when("/test", {
					template: `
					<a href="#!/play" class="fixed top-3 left-3"> Play Game</a>
					<test />
				`,
				})
				.when("/test/:questionType", {
					template: `
					<a href="#!/play" class="fixed top-3 left-3"> Play Game</a>
					<test />
				`,
				})
				.when("/import", {
					template: "<import />",
				})
				.when("/positions", {
					templateUrl: "pages/positions.html",
				})
				.otherwise({
					redirectTo: "/play",
				});
		},
	]);
