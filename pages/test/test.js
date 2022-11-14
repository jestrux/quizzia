import TestController from "./controller.js";

export default function TestUI() {
	return {
		restrict: "E",
		scope: {},
		controller: TestController,
		template: /*html*/ `
			<div>
				<game>
					<div class="my-8 mx-auto max-w-4xl">
						<div class="flex items-center justify-between">
							<h1 class="font-bold text-xl mr-4">
								Test questions:
							</h1>

							<nav class="flex items-center gap-4">
								<span class="text-sm">Filter by type:</span>
								<ul class="flex items-center gap-4">
									<li ng-repeat="type in questionTypes">
										<a ng-href="#!/test/{{type}}" class="capitalize font-medium"
											ng-class="{
												'text-blue-500': type == selectedType,
												'text-gray-400': type !== selectedType,
											}"
										>
											{{type}}
										</a>
									</li>
								</ul>
							</nav>
						</div>

						<div class="mt-8">
							<div ng-repeat="question in questions" class="mb-12">
								<div class="py-12">
									<question question="question">
									</question>
								</div>
							</div>
						</div>
					</div>
				</game>
			</div>
		`,
		replace: true,
	};
}
