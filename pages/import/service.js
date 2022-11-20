export default function ImportService() {
	return {
		positions: null,
		projects: null,
		async fetchPositions() {
			if (this.positions) return this.positions;

			const res = await fetch(
				"http://localhost:8081/projects/1/positions",
				{
					headers: {
						Authorization:
							"Bearer 32c030aa-29a4-4b9e-a77c-c4ce04d3c562",
					},
				}
			);

			let positions = await res.json();
			positions = positions.sort((a, b) => a.department_id - b.department_id);
			this.positions = positions;

			return positions;
		},
		async fetchDepartments() {
			if (this.departments) return this.departments;

			const res = await fetch(
				"http://localhost:8081/projects/1/departments",
				{
					headers: {
						Authorization:
							"Bearer 32c030aa-29a4-4b9e-a77c-c4ce04d3c562",
					},
				}
			);

			let departments = await res.json();
			departments = departments.sort((a, b) => a.id - b.id);
			this.departments = departments;

			return departments;
		},
	};
}
