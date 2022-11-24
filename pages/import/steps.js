const importSteps = [
	{
		id: "add-data",
		title: "Add your data",
		file: "add-data.html",
		validator: {
			watching: false,
			validate(scope, cb = () => {}) {
				if (!this.watching) {
					scope.$watch("fileDetails", () => {
						this.validate(scope, cb);
					});

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
					scope.$watch("vm.importType", (newValue) => {
						this.validate(scope, cb);
					});

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
					scope.$watch("mappedColumns", () => {
						this.validate(scope, cb);
					});

					this.watching = true;
				}

				cb(
					scope.mappedColumns?.length < 2
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
	},
	{
		id: "import-action",
		title: "What action do you want to perform?",
		file: "import-action.html",
	},
];

export default importSteps;
