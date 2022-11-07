import GameController from "./controller.js";

export default function Game() {
	return {
		restrict: "E",
		transclude: true,
		scope: {},
		controller: GameController,
		template: /*html*/ `
			<div class="">
                <h1 class="font-bold text-xl">
                    The game
                </h1>
			</div>
		`,
		replace: true,
	};
}
