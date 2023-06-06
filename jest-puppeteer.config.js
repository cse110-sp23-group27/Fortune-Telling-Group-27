module.exports = {
	launch: {
			headless: false,
			sloMo: 250
		},
	preset: "ts-jest",
	transform: {
		"^.+\\.(ts|tsx)?$": "ts-jest",
		"^.+\\.(js|jsx)$": "babel-jest"
		}
};