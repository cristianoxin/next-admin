export const spliceRequestParams = (params) => {
	const paramsArray = [];
	for (const key in params) {
		if (typeof params[key] === "number") {
			paramsArray.push(`${key}=${params[key]}`);
		}
		else if (typeof params[key] === "string") {
			paramsArray.push(`${key}="${params[key]}"`);
		}
	}
	return paramsArray.join(",");
}