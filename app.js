import "./components/index.js";
import "./game/index.js";
import "./test/index.js";

angular.module("quizzia", ["ngRoute", "Components", "Game", "Test"]).config([
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
			.otherwise({
				redirectTo: "/play",
			});
	},
]);
