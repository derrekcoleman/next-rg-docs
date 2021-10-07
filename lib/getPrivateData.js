
export const getPrivateData = async ({ message, signature }) => {

	const body = {
		message,
		signature,
	}

	const req = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body),
	}

	const privateResponse = await fetch('/api/getPrivateDocs', req).then((response) => response.json());
	return privateResponse;
}