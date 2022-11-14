export default function AppLayout() {
	return {
		restrict: "E",
		transclude: true,
		scope: { grayBg: "@" },
		controller: ($scope) => {
			$scope.collapsedSidebar = true;
		},
		template: /*html*/ `
			<div class="flex h-screen overflow-hidden">
                <div class="flex flex-shrink-0 bg-primary transition-all duration-200"
                    ng-class="{'w-16': collapsedSidebar, 'w-[220px]': !collapsedSidebar}"
                >

                </div>
                <main class="flex-1 flex flex-col" ng-class="{'bg-neutral-200/50': grayBg != undefined}">
                    <header class="bg-white z-10 border-b border-neutral-200">
                        <div class="h-14 flex items-center justify-between px-6">
                            <button class="w-9 h-9 rounded-full bg-cyan-400 shadow text-white flex items-center justify-center"
                                ng-click="collapsedSidebar = !collapsedSidebar"
                            >
                                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>                          
                            </button>
                            
                            <img class="h-6" src="assets/img/logo.png" />
                            
                            <button class="border-l border-neutral-300 h-full pl-5 flex items-center relative z-10">
                                <div class="h-10 w-10 relative flex items-center justify-center bg-neutral-200 text-neutral-500 rounded-full overflow-hidden mr-3">
                                    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                    </svg>                                  
                                </div>
                                <span class="text-lg font-medium">Walter</span>
                            </button>
                        </div>
                        <div class="h-6 text-xs bg-primary-light text-neutral-500 flex items-center gap-x-3 px-6">
                            <span>All Companies</span> / <span>Walter's Films</span> / <span>Quick Thang</span> / <span>Import</span>
                        </div>
                    </header>
                    <ng-transclude class="flex-1 flex-shrink-0 overflow-y-auto"></ng-transclude>
                </main>
            </div>
		`,
		replace: true,
	};
}
