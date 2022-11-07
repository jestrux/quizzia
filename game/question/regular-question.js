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
				<div>
					<img class="rounded-lg aspect-[2/1] w-full object-cover mb-4" src="https://images.unsplash.com/photo-1550109161-7262e652bf82?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=MnwxNjE2NXwwfDF8c2VhcmNofDMwfHxsYXMlMjB2ZWdhc3xlbnwwfHx8fDE2MTc1NDAwMTk&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=300">
					<h3 class="text-xl font-black leading-normal">
						{{question['Content'] || question['Question']}}
					</h3>
				</div>
				
				<div class="mt-5 space-y-3">	
					<button ng-repeat="(index, choice) in choices" class="bg-transparent border border-black font-extrabold px-3 py-3 rounded-full text-whit text-xs tracking-wider uppercase w-full text-center"
						ng-click="answerQuestion(choice)"
					>
						{{choice}}
					</button>
				</div>
			</div>
		`,
	};
}
