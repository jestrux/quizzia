export default function Tabs() {
	return {
		restrict: "E",
		transclude: true,
		scope: {},
		controller: function ($scope, $element) {
			var panes = ($scope.panes = []);

			$scope.select = function (pane) {
				angular.forEach(panes, function (pane) {
					pane.selected = false;
				});
				pane.selected = true;
			};

			this.addPane = function (pane) {
				if (panes.length == 0) $scope.select(pane);
				panes.push(pane);
			};
		},
		template: /*html*/ `
			<div class="">
				<ul class="flex items-center border-b">
					<li ng-repeat="pane in panes" 
						ng-class="{'active':pane.selected}"
					>
						<button class="py-3 px-5 rounded border-b-2 font-semibold" ng-click="select(pane)">{{pane.title}}</button>
					</li>
				</ul>
				<div class="tab-content" ng-transclude></div>
			</div>
		`,
		replace: true,
	};
}
