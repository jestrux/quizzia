const importSteps = [
	{
		id: "add-data",
		title: "Add your data",
		file: "add-data.html",
		validator: {
			watching: false,
			validate(scope, cb = () => {}) {
				if (!this.watching) {
					const clearWatcher = scope.$watch("fileDetails", () => {
						this.validate(scope, cb);
					});

					this.clearErrorWatcher = () => {
						clearWatcher();
						this.watching = false;
					};

					this.watching = true;
				}

				cb(!scope.fileDetails ? ["Add in your data to continue"] : []);
			},
		},
	},
	{
		id: "import-type",
		title: "What type of data are you importing?",
		file: "import-type.html",
		validator: {
			watching: false,
			validate(scope, cb = () => {}) {
				if (!this.watching) {
					const clearWatcher = scope.$watch("vm.importType", () => {
						this.validate(scope, cb);
					});

					this.clearErrorWatcher = () => {
						clearWatcher();
						this.watching = false;
					};

					this.watching = true;
				}

				cb(!scope.vm.importType ? ["Select import type"] : []);
			},
		},
	},
	{
		id: "map-columns",
		title: "Map your data to work with SetHero",
		file: "map-columns.html",
		validator: {
			watching: false,
			validate(scope, cb = () => {}) {
				if (!this.watching) {
					const watcher = () => this.validate(scope, cb);

					const clearMappedColumnsWatcher = scope.$watch(
						"mappedColumns",
						watcher
					);
					const clearHeaderRowWatcher = scope.$watch(
						"vm.headerRow",
						watcher
					);

					this.clearErrorWatcher = () => {
						clearMappedColumnsWatcher();
						clearHeaderRowWatcher();
						this.watching = false;
					};

					this.watching = true;
				}

				cb(
					!scope.vm.headerRow
						? ["Select yes or no"]
						: scope.mappedColumns.filter((col) => col)?.length < 2
						? ["Map at least two columns"]
						: []
				);
			},
		},
	},
	{
		id: "fix-data",
		title: "Fix inconsistencies in data",
		file: "fix-inconsistencies.html",
		validator: {
			watching: false,
			validate(scope, cb = () => {}) {
				if (!this.watching) {
					const clearWatcher = scope.$watch(
						"invalidValues",
						() => {
							this.validate(scope, cb);
						},
						true
					);

					this.clearErrorWatcher = () => {
						clearWatcher();
						this.watching = false;
					};

					this.watching = true;
				}

				const invalidValues = Object.entries(scope.invalidValues)
					.filter(([_, v]) => v.entriesWithErrors.length)
					.map(([column]) => column);

				cb(
					invalidValues.length
						? [
								`${invalidValues.join(
									", "
								)} still have invalid rows`,
						  ]
						: []
				);
			},
		},
	},
	{
		id: "import-action",
		title: "What action do you want to perform?",
		file: "import-action.html",
		validator: {
			watching: false,
			validate(scope, cb = () => {}) {
				// if (!this.watching) {
				// 	const clearWatcher = scope.$watch("vm.importType", () => {
				// 		this.validate(scope, cb);
				// 	});

				// 	this.clearErrorWatcher = () => {
				// 		clearWatcher();
				// 		this.watching = false;
				// 	};

				// 	this.watching = true;
				// }

				cb([]);
			},
		},
	},
];

export default importSteps;
