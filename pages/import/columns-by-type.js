const columnsByType = {
	Crew: {
		Position: { type: "text", validation: "required" },
		"First Name": { type: "text", validation: "required" },
		"Last Name": { type: "text", validation: "required" },
		Email: { type: "text", validation: "required" },
		Phone: { type: "text", validation: "required" },
	},
	Cast: {
		"Character Number": { type: "text", validation: "number|min:2" },
		"Character Name": { type: "text", validation: "required" },
		"First Name": { type: "text", validation: "required" },
		"Last Name": { type: "text", validation: "required" },
		Email: { type: "email", validation: "email" },
		Phone: { type: "text", validation: "required" },
	},
	Locations: {
		Name: { type: "text", validation: "required" },
		"Street Address": { type: "text", validation: "required" },
		City: { type: "text", validation: "required" },
		State: { type: "text", validation: "required" },
		Zipcode: { type: "text", validation: "required" },
		"Phone Number": { type: "text", validation: "required" },
	},
	Scenes: {
		"Scene Name": { type: "text", validation: "required" },
		Slugline: { type: "text", validation: "required" },
		"Scene Description": { type: "text", validation: "required" },
		"Story Day": { type: "text", validation: "required" },
		Pages: { type: "text", validation: "required" },
		Location: { type: "text", validation: "required" },
		"Extras Count": { type: "text", validation: "required" },
		Cast: { type: "text", validation: "required" },
	},
};

export default columnsByType;
