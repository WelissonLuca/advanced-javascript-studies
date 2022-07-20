const Fibonacci = require("./fibonacci");
const sinon = require("sinon");
const { deepStrictEqual } = require("assert");

(async () => {
	{
		const fibonacci = new Fibonacci();
		const spy = sinon.spy(fibonacci, fibonacci.execute.name);
		for await (const ii of fibonacci.execute(3)) {
		}
		const expectedCount = 4;
		deepStrictEqual(spy.callCount, expectedCount);
	}

	{
		const fibonacci = new Fibonacci();
		const spy = sinon.spy(fibonacci, fibonacci.execute.name);
		const [...result] = fibonacci.execute(5);
		const { args } = spy.getCall(2);
		const expectedResult = [0, 1, 1, 2, 3];
		const expectedParams = Object.values({
			input: 3,
			current: 1,
			next: 2,
		});
    deepStrictEqual(args, expectedParams);
    deepStrictEqual(result, expectedResult);
	}
})();
