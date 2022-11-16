export default function CollapsibleStep() {
	return {
		restrict: "E",
		transclude: true,
		scope: { step: "@", heading: "@", expanded: "=", isLast: "@" },
		link: (scope) => {
			// scope.expanded = scope.expanded && scope.expanded != "false";
			console.log("Collapsed: ", scope.expanded, typeof scope.expanded);
		},
		replace: true,
		template: /*html*/ `
        <div class="relative">
            <div ng-show="!isLast"
                class="absolute left-3 -translate-x-1/2 -bottom-5 top-5 w-[2px] bg-neutral-200"
            ></div>
            <div class="flex py-5">
                <div
                    class="rounded-full w-6 h-6 text-sm flex items-center justify-center text-white mr-5 relative z-10"
                    ng-class="{'bg-neutral-400': !expanded, 'bg-accent': expanded}"
                >
                    {{step}}
                </div>
                <div class="flex-1">
                    <h3 class="text-lg leading-none font-medium mt-1 opacity-60">
                        {{heading}}
                    </h3>

                    <div ng-show="expanded">
                        <div ng-transclude class="mt-4">
                        </div>
                    </div>
                </div>
            </div>
        </div>
		`,
	};
}
