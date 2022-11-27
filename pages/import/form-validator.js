class FormValidator {
	constructor(scope, fields) {
		this.scope = scope;
		if (!fields || !Object.keys(fields).length) throw "No fields passed!";

		const fieldsAndRules = Object.entries(fields);
		let fieldsWithoutRules = fieldsAndRules.filter(
			([field, rules]) => !rules || !rules.length
		);
		if (fieldsWithoutRules.length > 0) {
			const fieldsNames = fieldsWithoutRules.map(([field]) => field);
			throw `Some fields (${fieldsNames.join(", ")}) had no rules!`;
		}

		const rules = fieldsAndRules.flatMap(([field, rules]) =>
			rules.split("|")
		);
		const unknownRules = rules.filter((r) => {
			const [rule] = r.split(":");
			return rule !== "required" && this[rule] === undefined;
		});
		if (unknownRules.length > 0)
			throw `Some rules (${unknownRules.join(", ")}) are invalid!`;

		const rulesRequiringPresetValues = ["max", "min", "maxNum", "minNum"];
		const inValidRules = rules.filter((r) => {
			const [rule, expectedValue] = r.split(":");
			const requiresPresetValue =
				rulesRequiringPresetValues.indexOf(rule) !== -1;

			return (
				requiresPresetValue &&
				(expectedValue === undefined || !expectedValue.length)
			);
		});
		if (inValidRules.length > 0)
			throw `Some rules (${inValidRules.join(
				", "
			)}) require preset values!`;

		this.fields = fields;
	}

	//returns label name from camelCase field
	gl(field) {
		const fieldName = field
			.replace(/([A-Z])/g, " $1")
			.replace(/_/g, " ")
			.toLowerCase();

		return fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
	}

	validateRow = (row) => {
		let validationErrors = {};
		return new Promise((resolve) => {
			for (let [field, value] of Object.entries(row)) {
				this.validateField(field, value);
				if (errors.length) validationErrors[field] = errors;
			}

			resolve(validationErrors);
		});
	};

	validateField = (field, value) => {
		const rules = this.fields[field];
		const rulesArray = rules.split("|");
		let noValue = value === undefined || value == null;
		if (!noValue) {
			if (rulesArray.includes("array")) noValue = !value.length;
			else noValue = !value.toString().length;
		}

		let errors = noValue ? [`${this.gl(field)} is required`] : [];

		rulesArray.forEach((r) => {
			let [rule, expected = true] = r.split(":");
			if (rule === "required") return;

			if (rulesArray.includes("number")) {
				if (rule === "max") rule = "maxNum";
				else if (rule === "min") rule = "minNum";
			}

			// call the validator method
			errors = errors.concat(this[rule](field, value, expected));
		});

		return errors;
	};

	checked(field, value) {
		if (!value) return [`${this.gl(field)} should be checked`];

		return [];
	}

	array(field, value) {
		if (value && !Array.isArray(value))
			return [`${this.gl(field)} should be a list`];

		return [];
	}

	number(field, value) {
		if (isNaN(value)) return [`${this.gl(field)} should be a number`];

		return [];
	}

	max(field, value, expected) {
		if (value.toString().length > expected)
			return [
				`${this.gl(field)} can't have more than ${expected} characters`,
			];

		return [];
	}

	min(field, value, expected) {
		if (value.toString().length < expected)
			return [
				`${this.gl(field)} can't have less than ${expected} characters`,
			];

		return [];
	}

	maxNum(field, value, expected) {
		if (Number(value) > Number(expected))
			return [
				`${this.gl(field)} can't be more than ${Number(
					expected
				).toLocaleString()}`,
			];

		return [];
	}

	minNum(field, value, expected) {
		if (Number(value) < Number(expected))
			return [
				`${this.gl(field)} can't be less than ${Number(
					expected
				).toLocaleString()}`,
			];

		return [];
	}

	email(field, value) {
		let errors = [];
		const indexOfAt = value.indexOf("@");
		if (indexOfAt === -1) errors.push(`${this.gl(field)} should have an @`);

		if (value.indexOf(".") === -1 || value.lastIndexOf(".") < indexOfAt)
			errors.push(`${this.gl(field)} should have a . after @`);

		return errors;
	}

	phone(field, value) {
		let expectedLength = 9;
		if (value.charAt(0) === "0") expectedLength = 10;
		else if (value.charAt(0) === "+") expectedLength = 13;
		else if (value.indexOf("255") === 0) expectedLength = 12;

		if (value && value.length < expectedLength)
			return [`${this.gl(field)} is too short`];
		else if (value && value.length > expectedLength)
			return [`${this.gl(field)} is too long`];

		return [];
	}

	isStrongPassword(value, field) {
		let errors = [];
		const hasLowerCase = /[a-z]/.test(value);
		const hasUpperCase = /[A-Z]/.test(value);
		const hasNumber = /[0-9]/.test(value);
		/*
		 ** Fix eslint error: unnecessary escapes
		 ** Original: /[!@#\$%\^&\*]/.test(value)
		 */
		const hasCharacter = /[!@#$%^&*]/.test(value);

		if (!hasLowerCase)
			errors.push(
				`${this.gl(field)} should have at least one lowercase letter`
			);

		if (!hasUpperCase)
			errors.push(
				`${this.gl(field)} should have at least one uppercase letter`
			);

		if (!hasNumber)
			errors.push(`${this.gl(field)} should have at least one number`);

		if (!hasCharacter)
			errors.push(
				`${this.gl(field)} should have at least one special character`
			);

		return errors;
	}
}

export default FormValidator;
