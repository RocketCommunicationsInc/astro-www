// The purpose of this plugin is to convert snippets of markdown from the GLOSSARY page to snippets of JSON.
// It is not intended to convert the entire file. The pattern match will only match for a snippet of one entire letter, put into a new file
// The output is a new file and the files need to be combined

import fs from "fs";

function parseMarkdown(input) {
	const pattern = /^-\s(.+?)\s-\s(.+?)\s\{data-category="(.+?)"\sdata-tags="(.+?)"\}$/;
	const match = input.match(pattern)

	if (!match) {
		throw new Error(
			"Invalid markdown. Cannot parse"
		);
	}

	// destructure each piece from the pattern match
	const [_, title, description, categories, tags] = match;

	// lowercase and hyphenate the title
	const mainTitle = title.toLowerCase().replace(/\s+/g, "-");
	return {
		[mainTitle]: {
			name: title,
			description: description,
			categories: categories.split(",").map((category) => category.trim()),
			tags: tags.split(",").map((tag) => tag.trim()),
		},
	};
}

function convertMarkdownToJson(markdown) {
	// convert each markdown line into an array
	const markdownLines = markdown.split("\n").filter((line) => line.trim());
	let jsonResult = {};

	// map through and convert to json result
	markdownLines.map((line) => {
		const parsedLine = parseMarkdown(line);
		jsonResult = {...jsonResult, ...parsedLine}
	});

	return jsonResult;
}

function main() {
	// grab input/output files as array
	const args = process.argv.slice(2);

	if (args.length === 0) {
		console.error("Error: input file required to parse markdown to JSON;.");
		process.exit(1);
	}

	// specify input and output from args array
	const inputFile = args[0];
	const outputFileIndex = args.indexOf("-o");
	const outputFile = outputFileIndex !== -1 ? args[outputFileIndex +1] : null;

	try {
		// grab markdown from file and parse to json
		const markdown = fs.readFileSync(inputFile, "utf8");
		const json = convertMarkdownToJson(markdown);
		const jsonOutput = JSON.stringify(json, null, 2);

		// if the user specifies an output file as an argument option, write to a new file
		if (outputFile) {
			fs.writeFileSync(outputFile, jsonOutput)
		} else {
			console.log(jsonOutput)
		}
	} catch (error) {
		console.error(error.message)
		process.exit(1);
	}
}

main();
