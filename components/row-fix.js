const reusedPartial = /*html*/ `
    <div class="flex-1 flex-shrink-0">
        <div
            class="h-7 flex items-center px-2 rounded border border-neutral-200/50 text-sm leading-none font-medium bg-neutral-100 text-neutral-600/80"
        >
            {{ value }}
        </div>
    </div>

    <svg
        class="w-4 h-4 mx-2"
        ng-class="{'text-neutral-400/70' : errors.length, 'text-green-500' : !errors.length}"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
    >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
        />
    </svg>
`;

const regularhtml = /*html*/ `
    <div class="flex items-center py-2 px-2.5">
        ${reusedPartial}
        <div class="flex-1 flex-shrink-0">
            <input
                type="text"
                class="text-sm leading-none h-8 py-0 px-2 shadow-none border-neutral-200 bg-white rounded focus:ring-0 focus:border-neutral-300"
                ng-model="newValue"
            />
        </div>
    </div>
`;

const positionHtml = /*html*/ `
    <position-input value="newValue" on-change="setValue">
        ${reusedPartial}
    </position-input>
`;

export default function RowFix() {
	return {
		restrict: "E",
		replace: true,
		scope: { row: "=", rowIndex: "=", onChange: "=" },
		controller: ($scope) => {
			const validate = $scope.row.validate;
			const { column, errors, value, type } = JSON.parse(
				JSON.stringify($scope.row)
			);
			$scope.type = type;
			$scope.value = value;
			// $scope.newValue = "";
			$scope.errors = [...(errors || [])];
			$scope.showAllErrors = false;

			$scope.$watch("newValue", function (value) {
				if (value == undefined) return;

				$scope.errors = validate(value);
			});

			$scope.$watch("row.newValue", function (val) {
				if (val == undefined) return;

				if (val != $scope.newValue) $scope.newValue = val;
			});

			$scope.$watch("errors", function () {
				$scope.onChange({
					column,
					rowIndex: Number($scope.rowIndex),
					newValue: $scope.newValue,
					errors: $scope.errors,
				});
			});

			$scope.toggleAllErrors = function () {
				$scope.showAllErrors = !$scope.showAllErrors;
			};

			$scope.setValue = function (value) {
				if (type == "position") $scope.newValue = value.title;
			};
		},
		template: /*html*/ `
            <div>
                <div ng-show="type == 'position'">
                    ${positionHtml}
                </div>
                <div ng-show="type != 'position'">
                    ${regularhtml}
                </div>

                <ul
                    ng-show="errors.length"
                    class="py-2 bg-red-50/70"
                    ng-class="{'pl-6 pr-3 list-disc space-y-1': errors.length > 1, 'px-3' : errors.length == 1}"
                >
                    <li
                        class="text-xs text-red-900"
                        ng-repeat="error in errors"
                        ng-show="$index == 0 || showAllErrors"
                    >
                        <div class="flex items-center">
                            {{ error }}

                            <button
                                ng-if="errors.length > 1 && $index == 0"
                                class="ml-auto text-neutral-400 underline"
                                ng-click="toggleAllErrors()"
                            >
                                <span ng-show="!showAllErrors">
                                    +{{errors.length - 1}}
                                    {{errors.length - 1 == 1 ? 'error' :
                                    'errors'}}
                                </span>
                                <span ng-show="showAllErrors">
                                    show less
                                </span>
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
		`,
	};
}
