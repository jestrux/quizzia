import "./components/index.js";

const API_KEY = "key7rYj7BDKm9wwS2";

angular
	.module("quizzia", ["components"])

	.controller("BeerCounter", function ($scope, $locale) {
		$scope.beers = [0, 1, 2, 3, 4, 5, 6];
		if ($locale.id == "en-us") {
			$scope.beerForms = {
				0: "no beers",
				one: "{} beer",
				other: "{} beers",
			};
		} else {
			$scope.beerForms = {
				0: "žiadne pivo",
				one: "{} pivo",
				few: "{} pivá",
				other: "{} pív",
			};
		}
	});

// async function getRecords() {
// 	const res = await fetch(
// 		"https://api.airtable.com/v0/appnobMFeViOdmZsV/pipelines?api_key=key7rYj7BDKm9wwS2"
// 	);
// 	const data = await res.json();

// 	return data;
// }

// async function addRecords() {
// 	const payload = {
// 		records: [
// 			{
// 				fields: {
// 					Name: "Freight",
// 				},
// 			},
// 			{
// 				fields: {
// 					Name: "Elevetor",
// 				},
// 			},
// 		],
// 	};

// 	const res = await fetch({
// 		url: "https://api.airtable.com/v0/appnobMFeViOdmZsV/pipelines?api_key=key7rYj7BDKm9wwS2",
// 		method: "POST",
// 		body: JSON.stringify(payload),
// 	});
// 	const data = await res.json();

// 	return data;
// }

// console.log("Data:", await getRecords());
// console.log("Update data:", await addRecords());

const flattenRecord = (record) => ({
	_id: record.id,
	_created: record.createdTime,
	...record.fields,
});
const base = new Airtable({ apiKey: API_KEY }).base("appnobMFeViOdmZsV");
base("questions")
	.select()
	.firstPage(function (err, res) {
		if (err) {
			console.error(err);
			return;
		}

		// const data = res.map(({ fields }) => fields);
		// console.log(data);

		console.log(res);
	});
