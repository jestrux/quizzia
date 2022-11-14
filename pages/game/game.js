import GameController from "./controller.js";

export default function Game() {
	return {
		restrict: "E",
		transclude: true,
		scope: {},
		controller: GameController,
		template: /*html*/ `
			<ng-transclude>
				<div class="my-8 mx-auto max-w-4xl">
					<div ng-repeat="(index, question) in questions" class="mb-12">
						<div class="py-12" ng-show="index == currentIndex">
							<question question="question">
							</question>
						</div>
					</div>
				</div>
			</ng-transclude>
		`,
		replace: true,
	};
}
