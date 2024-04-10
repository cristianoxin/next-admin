export const spliceRequestParams = (params) => {
	const paramsArray = [];
	for (const key in params) {
		paramsArray.push(`${key}="${params[key]}"`);
	}
	return paramsArray.join(",");
}