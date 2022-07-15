const { error } = require("./src/constants");
const File = require("./src/file");
const { rejects, deepStrictEqual } = require("assert");


(async () => {
	{
		const filePath = "./invalid-header.csv";
		const rejection = new Error(error.FILE_FIELD_ERROR_MESSAGE);
		const result = File.csvToJson(filePath);
		await rejects(result, rejection);
	}

	{
		const filePath = "./four-items-invalid.csv";
		const rejection = new Error(error.FILE_LENGHT_ERROR_MESSAGE);
		const result = File.csvToJson(filePath);
		await rejects(result, rejection);
  }
  {
    const filePath = "./tree-items-valid.csv";
    const result = await File.csvToJson(filePath);
    const expected = [
			{
				name: "erick",
				id: 123,
				profession: "javascript instructor",
				birthDay: 1997,
			},
			{
				name: "l xuxa",
				id: 321,
				profession: "javascript specialist",
				birthDay: 1942,
			},
			{
				name: "jão",
				id: 41,
				profession: "javascript instructor",
				birthDay: 1997,
			},
		];
    
    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }
})()
