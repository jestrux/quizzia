import sampleQuestions from "./sample-questions.js";

export default function TestService() {
	return {
		questions: [...sampleQuestions],
		questionsByType(typeFilter) {
			if (!typeFilter?.length) return this.questions;

			return this.questions.filter(({ Type }) => typeFilter == Type);
		},
	};
}
