export default function OnePlusOneQuestion() {
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
			// gameController.answerQuestion(scope);
		},
		template: /*html*/ `
			<div class="max-w-lg mx-auto rounded-lg overflow-hidden flex-shrink-0 text-md">
				<div>
					<div class="flex w-full aspect-[2/1] mb-4 relative rounded-lg overflow-hidden bg-white bg-opacity-50" style="min-height: 200px">
						<img style="clip-path: polygon(0 0, 50% 0, 45% 100%, 0 100%);" class="absolute inset-0 h-full w-full object-cover" src="https://images.unsplash.com/photo-1547974996-050bf23b6196?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=400&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjE2MTY1fQ">
						<img style="clip-path: polygon(50% 0, 100% 0, 100% 100%, 45% 100%);" class="absolute inset-0 h-full w-full object-cover" src="https://images.unsplash.com/photo-1566313891923-24df87b1b29f?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=400&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjE2MTY1fQ">
						<div class="absolute inset-0 m-auto border-2 border-white bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center" style="right: 10px">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
						</div>
					</div>
					<h3 class="text-xl font-black leading-normal">
						{{question['Content'] || question['Question']}}
					</h3>
				</div>
				
				<div class="mt-5 space-y-3">	
					<button 
						ng-repeat="(index, choice) in choices" class="hover:bg-gray-100 bg-transparent border border-black font-extrabold px-3 py-3 rounded-full text-whit text-xs tracking-wider uppercase w-full text-center"
						ng-click="answerQuestion(choice)"
					>
						{{choice}}
					</button>
				</div>
			</div>
		`,
	};
}
