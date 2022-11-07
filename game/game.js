import GameController from "./controller.js";

export default function Game() {
	return {
		restrict: "E",
		transclude: true,
		scope: {},
		controller: GameController,
		template: /*html*/ `
			<ng-transclude>
				<div class="">
					<h1 class="font-bold text-xl">
						The game
					</h1>
					
					<a-question ng-repeat="question in questions" />
				</div>
			</ng-transclude>
		`,
		replace: true,
	};
}
