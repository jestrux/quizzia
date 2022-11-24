export default function CollapsibleStep() {
	return {
		restrict: "E",
		transclude: true,
		scope: {
			step: "@",
			heading: "@",
			expanded: "=",
			completed: "=",
			onClick: "=",
			isLast: "=",
		},
		replace: true,
		template: /*html*/ `
        <div class="relative">
            <div ng-show="!isLast"
                class="absolute left-3 -translate-x-1/2 -bottom-5 top-5 w-[2px] bg-neutral-200"
            ></div>
            <div class="flex py-5">
                <button
                    class="flex-shrink-0 rounded-full w-6 h-6 text-sm flex items-center justify-center text-white mr-3.5 relative z-10"
                    ng-class="{'bg-neutral-400': !expanded && !completed, 'bg-accent': expanded || completed, 'pointer-events-none': !completed}"
                    ng-click="onClick(step)"
                >
                    <span ng-show="!completed || expanded">{{step}}</span>
                    <svg ng-show="completed && !expanded" class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                        <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                    </svg>
                </button>
                <div class="flex-1 min-w-0">
                    <h3 class="text-lg leading-none font-medium mt-1 opacity-60">
                        {{heading}}
                    </h3>

                    <div ng-if="expanded">
                        <div ng-transclude class="mt-4">
                        </div>
                    </div>
                </div>
            </div>
        </div>
		`,
	};
}
