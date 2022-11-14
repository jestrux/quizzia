export default function RegularQuestion() {
	return {
		require: "^game",
		restrict: "E",
		transclude: true,
		replace: true,
		scope: { question: "=" },
		link: function (scope, element, attrs, gameController) {
			scope.answerQuestion = function (a) {
				gameController.answerQuestion(a);
			};

			scope.choices = [
				scope.question["Choice 1"],
				scope.question["Choice 2"],
				scope.question["Choice 3"],
				scope.question["Choice 4"],
			];
		},
		template: /*html*/ `
			<div class="max-w-lg mx-auto rounded-lg overflow-hidden flex-shrink-0 text-md">
				<h3 class="text-xl font-black leading-normal">
					{{question['Content'] || question['Question']}}
				</h3>
				
				<div class="mt-5 grid grid-cols-2 gap-4">
					<button ng-repeat="(index, choice) in choices" class="hover:opacity-50 transition-all duration-150 aspect-video bg-transparent border border-black rounded-full overflow-hidden"
						ng-click="answerQuestion(choice)"
					>
						<img class="object-cover w-full h-full" ng-src="{{choice}}" />
					</button>
				</div>
			</div>
		`,
		replace: true,
	};
}
