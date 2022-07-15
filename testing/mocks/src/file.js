const { readFile } = require("fs/promises");
const User = require("./user");
const { error } = require("./constants");

const DEFAULT_OPTIONS = {
	maxLines: 3,
	fields: ["id", "name", "profession", "age"],
};

class File {
	static async csvToJson(filePath) {
		const content = await File.getFileContent(filePath);
		const validation = File.isValid(content);
		if (!validation.valid) {
			throw new Error(validation.error);
		}

		const users = File.parserCsvToJson(content);

		return users;
	}

	static async getFileContent(filePath) {
		return (await readFile(filePath)).toString("utf8");
	}

	static isValid(csvString, options = DEFAULT_OPTIONS) {
		const [header, ...fileWithoutHeaders] = csvString.split("\n");
		const isHeaderValid = header === options.fields.join(",");
		if (!isHeaderValid) {
			return {
				error: error.FILE_FIELD_ERROR_MESSAGE,
				valid: false,
			};
		}

		const isContentLegthAccepted =
			fileWithoutHeaders.length > 0 &&
			fileWithoutHeaders.length <= options.maxLines;

		if (!isContentLegthAccepted) {
			return {
				error: error.FILE_LENGHT_ERROR_MESSAGE,
				valid: false,
			};
		}

		return {
			valid: true,
		};
	}

	static parserCsvToJson(csvString) {
		const lines = csvString.split("\n");
		const firstLine = lines.shift(",");
		const header = firstLine.split(",");
		const users = lines.map(line => {
			const columns = line.split(",");
			let user = {};
			for (const index in columns) {
				user[header[index]] = columns[index];
			}

			return new User(user);
		});

		return users;
	}
}

module.exports = File;
