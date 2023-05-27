const sum = require("./sum");

test("adds 1+2=3", () => {
	if (sum(1, 2) !== 4) {
		console.log("hello");
	}
	expect(sum(1, 2)).toBe(3);
});