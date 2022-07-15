const Service = require("./src/service");
const sinon = require("sinon");
const { deepStrictEqual } = require("assert");
const BASE_URL1 = "https://swapi.dev/api/planets/1/";
const BASE_URL2 = "https://swapi.dev/api/planets/2/";
const mocks = {
	tatooine: require("./mocks/tatooine.json"),
	alderaan: require("./mocks/alderaan.json"),
};

(async () => {
	const service = new Service();
	const stub = sinon.stub(service, service.makeRequest.name);
	stub.withArgs(BASE_URL1).resolves(mocks.tatooine);
	stub.withArgs(BASE_URL2).resolves(mocks.alderaan);

	{
		const result = await service.getPlanet(BASE_URL1);
		const expected = {
			name: "Tatooine",
			surfaceWater: "1",
			aparredIn: 5,
		};

		deepStrictEqual(result, expected);
	}

	{
		const result = await service.getPlanet(BASE_URL2);
		const expected = {
			name: "Alderaan",
			surfaceWater: "40",
			aparredIn: 2,
		};

		deepStrictEqual(result, expected);
	}
})();
