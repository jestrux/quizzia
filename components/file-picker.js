export default function FilePicker() {
	return {
		restrict: "E",
		replace: true,
		scope: { onChange: "=" },
		controller: ($scope, $element) => {
			$scope.hovering = false;

			const _fileChanged = (e) => {
				e.stopPropagation();
				e.preventDefault();

				$scope.hovering = false;
				$scope.$apply();

				const file = (e.dataTransfer || e.target).files?.[0];
				if (!file) return;

				var reader = new FileReader();
				reader.onload = (e) => {
					if ($scope.onChange) $scope.onChange(e.target.result, file);
				};
				reader.readAsArrayBuffer(file);

				if (!e.dataTransfer) {
					e.target.value = "";
				}
			};

			const _handleDrag = (e, action) => {
				e.stopPropagation();
				e.preventDefault();
				$scope.hovering = action != "leave";
				$scope.$apply();
			};

			const dropArea = $element[0];
			const fileInput = dropArea.querySelector("#fileInput");

			fileInput.addEventListener("change", _fileChanged);
			dropArea.addEventListener("drop", _fileChanged);

			window.addEventListener("dragenter", (e) =>
				_handleDrag(e, "enter")
			);
			window.addEventListener("dragover", (e) => _handleDrag(e, "over"));
			window.addEventListener("dragleave", (e) =>
				_handleDrag(e, "leave")
			);
		},
		template: /*html*/ `
            <div
                id="dropArea"
                class="relative min-h-[160px] bg-neutral-100/80 border-2 border-dashed rounded flex flex-col items-center justify-center gap-4"
                ng-class="{'border-neutral-400/60': !hovering, 'border-primary': hovering}"
            >
                <span
                    class="text-neutral-500/70 text-sm text-center uppercase tracking-wide font-semibold leading-6"
                >
                    Drag and drop <br />
                    a CSV or XLSX file here
                </span>

                <input
                    class="hidden"
                    type="file"
                    id="fileInput"
                />

                <label
                    for="fileInput"
                    class="cursor-pointer px-4 py-2 bg-white text-neutral-500/90 border border-neutral-300 uppercase text-xs tracking-wide font-medium rounded-md focus:outline-none relative overflow-hidden"
                >
                    or choose file
                </label>

                <div class="absolute inset-0 bg-primary/80 text-white flex items-center justify-center text-center pointer-events-none"
                    ng-class="{'opacity-0': !hovering}"
                >
                    <span class="uppercase tracking-widest font-semibold">
                        Drop file here
                    </span>
                </div>
            </div>
		`,
	};
}
