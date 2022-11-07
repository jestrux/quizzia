export { default as RegularQuestion } from "./regular-question.js";
export { default as OnePlusOneQuestion } from "./one-plus-one-question.js";
export { default as ImageAnswersQuestion } from "./image-answers-question.js";

export default function Question() {
	return {
		restrict: "E",
		scope: { question: "=" },
		link: function (scope, element, attrs, gameController) {
			// gameController.answerQuestion(scope);
		},
		template: /*html*/ `
		<div>
			<regular-question ng-if="question.Type == 'regular'" question="question" />
			<one-plus-one-question ng-if="question.Type == 'one plus one'" question="question" />
			<image-answers-question ng-if="question.Type == 'image answers'" question="question" />
		</div>
		`,
	};
}
