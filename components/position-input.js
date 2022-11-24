export default function PositionInput() {
	return {
		restrict: "E",
		replace: true,
		transclude: true,
		scope: { onChange: "=" },
		controller: ($scope, ImportService) => {
			$scope.value = null;
			$scope.open = false;
			$scope.positions = [];
			$scope.departments = [];
			Promise.all([
				ImportService.fetchPositions(),
				ImportService.fetchDepartments(),
			]).then(function ([positions, departments]) {
				$scope.departments = departments;
				$scope.positions = positions;

				// console.log("Position data: ", positions, departments);
				$scope.$apply();
			});

			$scope.selectPosition = function (v) {
				$scope.open = false;
				$scope.value = v;
				if ($scope.onChange) $scope.onChange(v);
			};
		},
		template: /*html*/ `
		<div>
			<div
				class="overflow-hidden cursor-pointer relative flex items-center py-2 px-2.5"
			>
				<ng-transclude class="flex-1 flex items-center"></ng-transclude>

				<div class="w-[180px]">
					<button
						class="flex items-center justify-between focus:ring-0 w-full pt-1.5 pb-2 px-2.5 text-xs rounded bg-neutral-100 border border-neutral-200/80 shadow-none"
						ng-class="{'text-neutral-400': !value || value.title, 'text-neutral-600': value && value.title}"
						ng-click="open = !open"
					>
						<span
							class="font-medium"
						>
							{{ value && value.title ? value.title : 'Choose position' }}
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
				class="fade-element-in -mt-[10px] relative mx-2.5 rounded-l rounded-bs mb-2.5 overflow-hidden"
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
	
					<div class="border-t grid grid-cols-12 max-h-[195px] overflow-y-auto">
						<div class="col-span-5">
							<div class="px-3 py-2 sticky top-0 bg-white z-10 border-b">
								<h6 class="uppercase text-xs leading-none tracking-widr text-neutral-500/80 font-medium">
									Departments
								</h6>
							</div>
							<div class="divide-y divide-neutral-100/40">
								<button
									ng-repeat="department in departments"
									class="w-full h-9 flex items-center px-3 text-sm leading-none"
									ng-class="{'bg-neutral-200/60 text-primary': $index == 0, 'text-neutral-500/70': $index != 0}"
								>
									{{ department.name }}
								</button>
							</div>
						</div>
						<div class="col-span-7 border-l">
							<div class="px-3 py-2 sticky top-0 bg-white z-10 border-b">
								<h6 class="uppercase text-xs leading-none tracking-widr text-neutral-500/80 font-medium">
									Positions
								</h6>
							</div>
							<div class="divide-y divide-neutral-300/40">
								<button
									ng-repeat="position in positions"
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
