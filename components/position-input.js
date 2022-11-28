export default function PositionInput() {
	return {
		restrict: "E",
		replace: true,
		transclude: true,
		scope: { value: "=", onChange: "=" },
		controller: ($scope, ImportService) => {
			$scope._value = null;
			$scope.open = false;
			$scope.positions = [];
			$scope.departments = [];
			Promise.all([
				ImportService.fetchPositions(),
				ImportService.fetchDepartments(),
			]).then(function ([positions, departments]) {
				$scope.departments = departments;
				$scope.positions = positions;
				$scope.selectedDepartment = departments[0].id;

				// console.log("Position data: ", positions, departments);
				$scope.$apply();
			});

			$scope.selectPosition = function (v) {
				$scope.open = false;
				$scope._value = v;
				if ($scope.onChange) $scope.onChange(v);
			};

			const _presetValue = function () {
				const val = $scope.value;

				if (val == undefined || !$scope.positions?.length) return;

				if (!val || val != $scope._value?.title) {
					const value = $scope.positions.find(
						({ title }) => title == val
					);

					$scope._value = value;
				}
			};

			$scope.$watch("value", _presetValue);
			$scope.$watch("positions", _presetValue);

			$scope.selectDepartment = function (departmentId) {
				$scope.selectedDepartment = departmentId;
			};
		},
		template: /*html*/ `
		<div>
			<div
				class="overflow-hidden cursor-pointer relative flex items-center py-2 px-2.5"
			>
				<ng-transclude class="flex-1 flex items-center"></ng-transclude>

				<div class="flex-1">
					<button
						class="flex items-center justify-between focus:ring-0 w-full pt-1.5 pb-2 px-2.5 text-xs rounded bg-neutral-100 border border-neutral-200/80 shadow-none"
						ng-class="{'text-neutral-400': !_value || _value.title, 'text-neutral-600': _value && _value.title}"
						ng-click="open = !open"
					>
						<span
							class="font-medium"
						>
							{{ _value && _value.title ? _value.title : 'Choose position' }}
						</span>

						<svg
							class="w-3 h-3 mt-0.5 opacity-70"
							ng-class="{'rotate-180': open}"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="3"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M19.5 8.25l-7.5 7.5-7.5-7.5"
							/>
						</svg>
					</button>
				</div>
			</div>

			<div
				class="fade-element-in -mt-[10px] relative mx-2.5 rounded-b mb-2.5 overflow-hidden"
				ng-if="open"
			>
				<div class="border bg-neutral-50">
					<div class="flex flex-row-reverse px-1 py-1">
						<button
							class="h-8 flex items-center justify-center gap-1.5 pl-1.5 pr-2 border border-transparent hover:border-neutral-100 hover:bg-neutral-100 text-accent text-sm leading-none rounded focus:outline-none"
							ng-click="currentStep = 3"
						>
							<svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke-width="2.4" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
							</svg>
					  
							New position
						</button>
						<input class="flex-1 text-sm leading-none h-8 py-0 px-2 shadow-none border-neutral-200 bg-white rounded focus:ring-0 focus:border-neutral-300" type="text" placeholder="Search positions..." />
					</div>
	
					<div class="border-t grid grid-cols-12 h-[195px]">
						<div class="col-span-5 h-full overflow-y-auto bg-neutral-200/30">
							<div class="px-3 py-2 sticky top-0 bg-white z-10 border-b">
								<h6 class="uppercase text-xs leading-none tracking-widr text-neutral-500/80 font-medium">
									Departments
								</h6>
							</div>
							<div class="divide-y divide-neutral-100/40">
								<button
									ng-repeat="department in departments"
									class="w-full h-9 flex items-center px-3 text-xs leading-none font-medium"
									ng-class="{'bg-neutral-300/60 text-primary': department.id == selectedDepartment, 'text-neutral-500/70': department.id != selectedDepartment}"
									ng-click="selectDepartment(department.id)"
								>
									{{ department.name }}
								</button>
							</div>
						</div>
						<div class="col-span-7 border-l h-full overflow-y-auto">
							<div class="px-3 py-2 sticky top-0 bg-white z-10 border-b">
								<h6 class="uppercase text-xs leading-none text-neutral-500/80 font-medium">
									Positions
								</h6>
							</div>
							<div class="divide-y divide-neutral-300/40">
								<button
									ng-repeat="position in positions | filter:{ department_id: selectedDepartment }"
									class="w-full h-9 flex items-center px-3 text-xs leading-none text-neutral-500"
									ng-click="selectPosition(position)"
								>
									{{ position.title }}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		`,
	};
}
