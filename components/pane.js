export default function Pane() {
	return {
		require: "^tabs",
		restrict: "E",
		transclude: true,
		scope: { title: "@" },
		link: function (scope, element, attrs, tabsController) {
			tabsController.addPane(scope);
		},
		template: /*html*/ `
			<div class="p-3" ng-class="{'hidden': !selected}" ng-transclude></div>
		`,
		replace: true,
	};
}
