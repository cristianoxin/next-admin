const request = ({ url, method = "GET", params={} }) => {
	let requestUrl = url;
	const requestParams = {};

	if (method === "GET") {
		if (Object.keys(params).length) {
			const paramsArray = [];
			for (const key in params) {
				paramsArray.push(`${key}=${params[key]}`);
			}
			requestUrl = `${ requestUrl }?${ paramsArray.join("&") }`;
		}
	}
	else if (method === "POST") {
		requestParams.method = "POST";
		requestParams.headers = {
			"Content-Type" : "application/json"
		};
		requestParams.body = JSON.stringify(params);
	}

	return fetch(requestUrl, requestParams).then((response) => { return response.json() });
}

export default request;