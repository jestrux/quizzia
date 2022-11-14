import Airtable from "../../assets/lib/airtable.js";

export default function GameService() {
	const API_KEY = "key7rYj7BDKm9wwS2";
	const DB_ID = "appnobMFeViOdmZsV";
	const table = new Airtable({ apiKey: API_KEY }).base(DB_ID);

	return {
		questions: [],
		set __cachedQuestions(value) {
			if (!window.DEV_MODE) return;
			localStorage.GAME_QUESTIONS_CACHE = JSON.stringify([
				value,
				Date.now(),
			]);
		},
		get __cachedQuestions() {
			if (!window.DEV_MODE) return null;
			// Localstorage fails in incognito mode
			try {
				const [questions, lastCacheTime] = JSON.parse(
					localStorage.GAME_QUESTIONS_CACHE || "[]"
				);
				if (questions?.length && lastCacheTime?.toString().length) {
					const cacheAge =
						(Date.now() - new Date(lastCacheTime)) / 1000 / 60;
					if (cacheAge > 10)
						localStorage.removeItem("GAME_QUESTIONS_CACHE");

					return questions;
				}
			} catch (error) {}

			return null;
		},
		all() {
			return this.questions;
		},
		filterByType(typeFilter) {
			if (!typeFilter?.length) return this.questions;

			return this.questions.filter(({ Type }) => typeFilter == Type);
		},
		fetchQuestions() {
			const self = this;
			console.log("Fetching questions...");

			return new Promise((resolve, rej) => {
				// Basic caching to prevent rate limiting from Airtable
				// during development
				const cachedQuestions = this.__cachedQuestions;
				if (cachedQuestions?.length) {
					self.questions = cachedQuestions;
					resolve(self);

					return;
				}

				table("questions")
					.select()
					.firstPage(function (err, questions) {
						if (err) {
							console.error("Error fetching questions", err);
							rej(err);
							return;
						}

						questions = questions.map(({ fields }) => fields);
						self.questions = questions;
						self.__cachedQuestions = questions;
						resolve(self);
					});
			});
		},
		async addQuestion() {
			const payload = {
				records: [
					{
						fields: {
							Name: "Freight",
						},
					},
					{
						fields: {
							Name: "Elevetor",
						},
					},
				],
			};

			const res = await fetch({
				url: `https://api.airtable.com/v0/appnobMFeViOdmZsV/pipelines?api_key=${API_KEY}`,
				method: "POST",
				body: JSON.stringify(payload),
			});
			const data = await res.json();
			return data;
		},
	};
}
