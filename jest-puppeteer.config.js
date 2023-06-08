module.exports = {
	launch: {
			headless: false,
			sloMo: 250,
			defaultViewport: null,
      		args: ['--start-maximized'] 
		},
	preset: "ts-jest",
	transform: {
		"^.+\\.(ts|tsx)?$": "ts-jest",
		"^.+\\.(js|jsx)$": "babel-jest"
		}
};