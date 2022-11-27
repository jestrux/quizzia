const columnsByType = {
	Crew: {
		Position: { similes: ["Role"], type: "text", validation: "required" },
		"First Name": {
			similes: ["First"],
			type: "text",
			validation: "required",
		},
		"Last Name": {
			similes: ["Last"],
			type: "text",
			validation: "required",
		},
		Email: {
			similes: ["E-mail", "Email Address", "E-mail Address"],
			type: "text",
			validation: "required",
		},
		Phone: { similes: [], type: "text", validation: "required" },
	},
	Cast: {
		"Character Number": {
			similes: ["Number"],
			type: "text",
			validation: "number|min:2",
		},
		"Character Name": {
			similes: ["Name", "Role"],
			type: "text",
			validation: "required",
		},
		"First Name": {
			similes: ["First"],
			type: "text",
			validation: "required",
		},
		"Last Name": {
			similes: ["Last"],
			type: "text",
			validation: "required",
		},
		Email: {
			similes: ["E-mail", "Email Address", "E-mail Address"],
			type: "email",
			validation: "email",
		},
		Phone: {
			similes: ["Phone Number", "Phone No.", "Contact"],
			type: "text",
			validation: "required",
		},
	},
	Locations: {
		Name: { similes: [], type: "text", validation: "required" },
		"Street Address": {
			similes: ["Street", "Address"],
			type: "text",
			validation: "required",
		},
		City: { similes: [], type: "text", validation: "required" },
		State: { similes: [], type: "text", validation: "required" },
		Zipcode: { similes: [], type: "text", validation: "required" },
		"Phone Number": {
			similes: ["Phone", "Phone No."],
			type: "text",
			validation: "required",
		},
	},
	Scenes: {
		"Scene Name": {
			similes: ["Scene", "Name"],
			type: "text",
			validation: "required",
		},
		Slugline: {
			similes: ["Slug", "Line"],
			type: "text",
			validation: "required",
		},
		"Scene Description": {
			similes: ["Description", "Details"],
			type: "text",
			validation: "required",
		},
		"Story Day": {
			similes: ["Day", "D/N"],
			type: "text",
			validation: "required",
		},
		Pages: { similes: [], type: "text", validation: "required" },
		Location: { similes: [], type: "text", validation: "required" },
		"Extras Count": {
			similes: ["Extras"],
			type: "text",
			validation: "required",
		},
		Cast: { similes: [], type: "text", validation: "required" },
	},
};

export default columnsByType;
