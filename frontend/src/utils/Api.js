class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
    this.body = config.body;
    this._credentials = config.credentials;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getInformationUser() {
    return fetch(`${this.url}users/me`, {
      headers: this.headers,
      credentials: this._credentials,
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this.url}cards`, {
      headers: this.headers,
      credentials: this._credentials,
    }).then(this._checkResponse);
  }

  editProfile({ name, about }) {
    return fetch(`${this.url}users/me`, {
      method: 'PATCH',
      headers: this.headers,
      credentials: this._credentials,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkResponse);
  }

  addNewCard({ name, link }) {
    return fetch(`${this.url}cards`, {
      method: 'POST',
      headers: this.headers,
      credentials: this._credentials,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this.url}cards/${id}`, {
      method: 'DELETE',
      headers: this.headers,
      credentials: this._credentials,
    }).then(this._checkResponse);
  }

  displayNumberLike(id) {
    return fetch(`${this.url}cards/${id}/likes`, {
      method: 'PUT',
      headers: this.headers,
      credentials: this._credentials,
    }).then(this._checkResponse);
  }

  deleteLike(id) {
    return fetch(`${this.url}cards/${id}/likes`, {
      method: 'DELETE',
      headers: this.headers,
      credentials: this._credentials,
    }).then(this._checkResponse);
  }

  updateAvatar({ avatar }) {
    return fetch(`${this.url}users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      credentials: this._credentials,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._checkResponse);
  }
}
const api = new Api({
  url: 'https://api.mesto-dmitrov.nomoreparties.co/',

  headers: {
    // authorization: '320a90d1-42bc-41d6-897c-289a7d3fabd1',
    'Content-Type': 'application/json',
  },
  credentials: this._credentials,
});
export default api;
