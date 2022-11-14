export default function CollapsibleStep() {
	return {
		restrict: "E",
		transclude: true,
		scope: { step: "@", title: "@", expanded: "@", isLast: "@" },
		link: (scope) => {
			console.log("Collapsed: ", scope.expanded);
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
                    ng-class="{'bg-neutral-500': !expanded, 'bg-accent': expanded}"
                >
                    {{step}}
                </div>
                <div class="flex-1">
                    <h3 class="text-xl leading-none font-medium mt-0.5">
                        {{title}}
                    </h3>

                    <div ng-transclude ng-show="expanded" class="mt-4">
                    </div>
                </div>
            </div>
        </div>
		`,
	};
}
