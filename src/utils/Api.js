export default class Api {
  constructor(baseUrl, options) {
    this.baseUrl = baseUrl;
    this.options = options;
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.options,
    }) //fetch creates a server request and returns a response
      .then(this._processResponse);
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: this.options,
    }).then(this._processResponse);
  }

  getCardLikes(data) {
    return fetch(`${this.baseUrl}/cards/likes/${data}`, {
      method: "GET",
      headers: this.options,
    }).then(this._processResponse);
  }

  editUserProfile(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.options,
      body: JSON.stringify({
        name: data.name,
        about: data.description,
      }),
    }).then(this._processResponse);
  }

  addNewCard(data) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.options,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._processResponse);
  }

  deleteCard(data) {
    return fetch(`${this.baseUrl}/cards/${data}`, {
      method: "DELETE",
      headers: this.options,
    }).then(this._processResponse);
  }

  addLike(data) {
    return fetch(`${this.baseUrl}/cards/likes/${data}`, {
      method: "PUT",
      headers: this.options,
    }).then(this._processResponse);
  }

  removeLike(data) {
    return fetch(`${this.baseUrl}/cards/likes/${data}`, {
      method: "DELETE",
      headers: this.options,
    }).then(this._processResponse);
  }

  updateProfilePicture(data) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.options,
      body: JSON.stringify({
        avatar: data.link,
      }),
    }).then(this._processResponse);
  }

  _processResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  };
}
/*
const api = new Api("https://around.nomoreparties.co/v1/group-12",
    {
    authorization: "233760b2-865b-418c-a988-0a5daaaf7846",
    "Content-Type": "application/json",
  },
);
*/

//Token: 233760b2-865b-418c-a988-0a5daaaf7846
//Group ID: group-12
