class Api {
	constructor({ baseUrl, headers }) {
		this._headers = headers;
		this._baseUrl = baseUrl;
	}

	_checkResponse(res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Ошибка ${res.status}`);
	}

	getCards() {
		return fetch(`${this._baseUrl}`, {
			headers: this._headers()
		})
			.then(this._checkResponse);
	}

	addCard(question, answer, hint) {
		return fetch(`${this._baseUrl}/cards`, {
			method: 'POST',
			headers: this._headers(),
			body: JSON.stringify({
				question, answer, hint
			})
		})
			.then(this._checkResponse)
	}
}

const api = new Api({
	baseUrl: 'http://localhost:3002',
	headers() {
		return {
			'Access-Control-Allow-Origin': '*',
			Accept: 'application/json',
			'Content-Type': 'application/json'
		}
	}
})

export default api;
