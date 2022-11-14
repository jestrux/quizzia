/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./**/*.{html,js}"],
	theme: {
		extend: {
			colors: {
				primary: "#0E3472",
				"primary-dark": "#1A2B3C",
				"primary-light": "#EBEFF3",
				accent: "#4E8BED",
			},
		},
	},
	plugins: [require("@tailwindcss/forms")],
};
