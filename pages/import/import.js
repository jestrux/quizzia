import ImportController from "./controller.js";

export default function ImportUI() {
	return {
		restrict: "E",
		scope: {},
		controller: ImportController,
		templateUrl: "pages/import/view.html",
		replace: true,
	};
}
