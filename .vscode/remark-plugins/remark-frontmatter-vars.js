// http-url:https://unpkg.com/dot-prop@~7.2.0/index.js
var isObject = (value) => {
	const type = typeof value;
	return value !== null && (type === "object" || type === "function");
	};
	var disallowedKeys = /* @__PURE__ */ new Set([
	"__proto__",
	"prototype",
	"constructor"
	]);
	var digits = new Set("0123456789");
	function getPathSegments(path) {
	const parts = [];
	let currentSegment = "";
	let currentPart = "start";
	let isIgnoring = false;
	for (const character of path) {
		switch (character) {
		case "\\":
			if (currentPart === "index") {
			throw new Error("Invalid character in an index");
			}
			if (currentPart === "indexEnd") {
			throw new Error("Invalid character after an index");
			}
			if (isIgnoring) {
			currentSegment += character;
			}
			currentPart = "property";
			isIgnoring = !isIgnoring;
			break;
		case ".":
			if (currentPart === "index") {
			throw new Error("Invalid character in an index");
			}
			if (currentPart === "indexEnd") {
			currentPart = "property";
			break;
			}
			if (isIgnoring) {
			isIgnoring = false;
			currentSegment += character;
			break;
			}
			if (disallowedKeys.has(currentSegment)) {
			return [];
			}
			parts.push(currentSegment);
			currentSegment = "";
			currentPart = "property";
			break;
		case "[":
			if (currentPart === "index") {
			throw new Error("Invalid character in an index");
			}
			if (currentPart === "indexEnd") {
			currentPart = "index";
			break;
			}
			if (isIgnoring) {
			isIgnoring = false;
			currentSegment += character;
			break;
			}
			if (currentPart === "property") {
			if (disallowedKeys.has(currentSegment)) {
				return [];
			}
			parts.push(currentSegment);
			currentSegment = "";
			}
			currentPart = "index";
			break;
		case "]":
			if (currentPart === "index") {
			parts.push(Number.parseInt(currentSegment, 10));
			currentSegment = "";
			currentPart = "indexEnd";
			break;
			}
			if (currentPart === "indexEnd") {
			throw new Error("Invalid character after an index");
			}
		default:
			if (currentPart === "index" && !digits.has(character)) {
			throw new Error("Invalid character in an index");
			}
			if (currentPart === "indexEnd") {
			throw new Error("Invalid character after an index");
			}
			if (currentPart === "start") {
			currentPart = "property";
			}
			if (isIgnoring) {
			isIgnoring = false;
			currentSegment += "\\";
			}
			currentSegment += character;
		}
	}
	if (isIgnoring) {
		currentSegment += "\\";
	}
	switch (currentPart) {
		case "property": {
		if (disallowedKeys.has(currentSegment)) {
			return [];
		}
		parts.push(currentSegment);
		break;
		}
		case "index": {
		throw new Error("Index was not closed");
		}
		case "start": {
		parts.push("");
		break;
		}
	}
	return parts;
	}
	function isStringIndex(object, key) {
	if (typeof key !== "number" && Array.isArray(object)) {
		const index = Number.parseInt(key, 10);
		return Number.isInteger(index) && object[index] === object[key];
	}
	return false;
	}
	function getProperty(object, path, value) {
	if (!isObject(object) || typeof path !== "string") {
		return value === void 0 ? object : value;
	}
	const pathArray = getPathSegments(path);
	if (pathArray.length === 0) {
		return value;
	}
	for (let index = 0; index < pathArray.length; index++) {
		const key = pathArray[index];
		if (isStringIndex(object, key)) {
		object = index === pathArray.length - 1 ? void 0 : null;
		} else {
		object = object[key];
		}
		if (object === void 0 || object === null) {
		if (index !== pathArray.length - 1) {
			return value;
		}
		break;
		}
	}
	return object === void 0 ? value : object;
	}

	// http-url:https://unpkg.com/escape-string-regexp@^5.0.0/index.js
	function escapeStringRegexp(string) {
	if (typeof string !== "string") {
		throw new TypeError("Expected a string");
	}
	return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
	}

	// http-url:https://unpkg.com/unist-util-is@^5.0.0/index.js
	var convert = function(test) {
	if (test === void 0 || test === null) {
		return ok;
	}
	if (typeof test === "string") {
		return typeFactory(test);
	}
	if (typeof test === "object") {
		return Array.isArray(test) ? anyFactory(test) : propsFactory(test);
	}
	if (typeof test === "function") {
		return castFactory(test);
	}
	throw new Error("Expected function, string, or object as test");
	};
	function anyFactory(tests) {
	const checks = [];
	let index = -1;
	while (++index < tests.length) {
		checks[index] = convert(tests[index]);
	}
	return castFactory(any);
	function any(...parameters) {
		let index2 = -1;
		while (++index2 < checks.length) {
		if (checks[index2].call(this, ...parameters))
			return true;
		}
		return false;
	}
	}
	function propsFactory(check) {
	return castFactory(all);
	function all(node) {
		let key;
		for (key in check) {
		if (node[key] !== check[key])
			return false;
		}
		return true;
	}
	}
	function typeFactory(check) {
	return castFactory(type);
	function type(node) {
		return node && node.type === check;
	}
	}
	function castFactory(check) {
	return assertion;
	function assertion(...parameters) {
		return Boolean(check.call(this, ...parameters));
	}
	}
	function ok() {
	return true;
	}

	// http-url:https://unpkg.com/unist-util-visit-parents@4.1.1/color.js
	function color(d) {
	return "\x1B[33m" + d + "\x1B[39m";
	}

	// http-url:https://unpkg.com/unist-util-visit-parents@^4.0.0/index.js
	var CONTINUE = true;
	var SKIP = "skip";
	var EXIT = false;
	var visitParents = function(tree, test, visitor, reverse) {
	if (typeof test === "function" && typeof visitor !== "function") {
		reverse = visitor;
		visitor = test;
		test = null;
	}
	var is = convert(test);
	var step = reverse ? -1 : 1;
	factory(tree, null, [])();
	function factory(node, index, parents) {
		var value = typeof node === "object" && node !== null ? node : {};
		var name;
		if (typeof value.type === "string") {
		name = typeof value.tagName === "string" ? value.tagName : typeof value.name === "string" ? value.name : void 0;
		Object.defineProperty(visit, "name", {
			value: "node (" + color(value.type + (name ? "<" + name + ">" : "")) + ")"
		});
		}
		return visit;
		function visit() {
		var result = [];
		var subresult;
		var offset;
		var grandparents;
		if (!test || is(node, index, parents[parents.length - 1] || null)) {
			result = toResult(visitor(node, parents));
			if (result[0] === EXIT) {
			return result;
			}
		}
		if (node.children && result[0] !== SKIP) {
			offset = (reverse ? node.children.length : -1) + step;
			grandparents = parents.concat(node);
			while (offset > -1 && offset < node.children.length) {
			subresult = factory(node.children[offset], offset, grandparents)();
			if (subresult[0] === EXIT) {
				return subresult;
			}
			offset = typeof subresult[1] === "number" ? subresult[1] : offset + step;
			}
		}
		return result;
		}
	}
	};
	function toResult(value) {
	if (Array.isArray(value)) {
		return value;
	}
	if (typeof value === "number") {
		return [CONTINUE, value];
	}
	return [value];
	}

	// http-url:https://unpkg.com/mdast-util-find-and-replace@~2.1.0/index.js
	var own = {}.hasOwnProperty;
	var findAndReplace = function(tree, find, replace, options) {
	let settings;
	let schema;
	if (typeof find === "string" || find instanceof RegExp) {
		schema = [[find, replace]];
		settings = options;
	} else {
		schema = find;
		settings = replace;
	}
	if (!settings) {
		settings = {};
	}
	const ignored = convert(settings.ignore || []);
	const pairs = toPairs(schema);
	let pairIndex = -1;
	while (++pairIndex < pairs.length) {
		visitParents(tree, "text", visitor);
	}
	return tree;
	function visitor(node, parents) {
		let index = -1;
		let grandparent;
		while (++index < parents.length) {
		const parent = parents[index];
		if (ignored(parent, grandparent ? grandparent.children.indexOf(parent) : void 0, grandparent)) {
			return;
		}
		grandparent = parent;
		}
		if (grandparent) {
		return handler(node, grandparent);
		}
	}
	function handler(node, parent) {
		const find2 = pairs[pairIndex][0];
		const replace2 = pairs[pairIndex][1];
		let start = 0;
		let index = parent.children.indexOf(node);
		let nodes = [];
		let position;
		find2.lastIndex = 0;
		let match = find2.exec(node.value);
		while (match) {
		position = match.index;
		let value = replace2(...match, {
			index: match.index,
			input: match.input
		});
		if (typeof value === "string") {
			value = value.length > 0 ? { type: "text", value } : void 0;
		}
		if (value !== false) {
			if (start !== position) {
			nodes.push({
				type: "text",
				value: node.value.slice(start, position)
			});
			}
			if (Array.isArray(value)) {
			nodes.push(...value);
			} else if (value) {
			nodes.push(value);
			}
			start = position + match[0].length;
		}
		if (!find2.global) {
			break;
		}
		match = find2.exec(node.value);
		}
		if (position === void 0) {
		nodes = [node];
		index--;
		} else {
		if (start < node.value.length) {
			nodes.push({ type: "text", value: node.value.slice(start) });
		}
		parent.children.splice(index, 1, ...nodes);
		}
		return index + nodes.length + 1;
	}
	};
	function toPairs(schema) {
	const result = [];
	if (typeof schema !== "object") {
		throw new TypeError("Expected array or object as schema");
	}
	if (Array.isArray(schema)) {
		let index = -1;
		while (++index < schema.length) {
		result.push([
			toExpression(schema[index][0]),
			toFunction(schema[index][1])
		]);
		}
	} else {
		let key;
		for (key in schema) {
		if (own.call(schema, key)) {
			result.push([toExpression(key), toFunction(schema[key])]);
		}
		}
	}
	return result;
	}
	function toExpression(find) {
	return typeof find === "string" ? new RegExp(escapeStringRegexp(find), "g") : find;
	}
	function toFunction(replace) {
	return typeof replace === "function" ? replace : () => replace;
	}

	// http-url:https://unpkg.com/@donmahallem/remark-variables@latest/dist/esm/index.js
	var plugin = (options) => (node, file) => {
	const result = findAndReplace(node, /\{[a-zA-Z\.\- ]+\}/, (match) => {
		const cleanedKey = match.slice(2, match.length - 2).trim();
		return getProperty(options.data || file.data, cleanedKey) || "unknown";
	});
	if (result.endIndex === null || result.index === null || result.index === -1 || !result.map) {
		return node;
	}
	const rootNode = node;
	rootNode.children = [
		...rootNode.children.slice(0, result.index),
		result.map,
		...rootNode.children.slice(result.endIndex)
	];
	return rootNode;
	};
	export {
	plugin as default
	};
