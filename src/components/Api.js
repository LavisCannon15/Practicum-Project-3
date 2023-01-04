export default class Api {
  constructor(baseUrl, options) {
    this.baseUrl = baseUrl;
    this.options = options;
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, { header: this.options }) //fetch creates a server request and returns a response
      .then(
        //Checks server response
        (res) => {
          if (res.status) {
            return res.json(); //The JSON method parses the JSON response from the server and subsequently returns a promise. We can get any data that we need from inside this promise.
          }

          // if the server returns an error, reject the promise
          return Prommise.reject(`Error  ${res.status}`);
        }
      )
      .catch((err) => {
        console.log(err); // log the error to the console
      });
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, { header: this.options })
      .then((res) => {
        if (res.status) {
          return res.json();
        }
        return Prommise.reject(`Error  ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  editUserProfile(userData) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      header: this.options,
      body: JSON.stringify({
        name: userData.name,
        description: userData.description,
      }),
    })
      .then((res) => {
        if (res.status) {
          return res.json();
        }
        return Prommise.reject(`Error  ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addNewCard(data) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "PATCH",
      header: this.options,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })
      .then((res) => {
        if (res.status) {
          return res.json();
        }
        return Prommise.reject(`Error  ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteCard(data) {
    return fetch(`${this.baseUrl}/cards/${data}`, {
      method: "DELETE",
      headers: this.options,
    }).then((res) => {
      if (res.status) {
        return res.json();
      }

      return Prommise.reject(`Error  ${res.status}`);
    });
  }

  addLike(data) {
    return fetch(`${this.baseUrl}/cards/likes/${data}`, {
      method: "PUT",
      headers: this.options,
    }).then((res) => {
      if (res.status) {
        return res.json();
      }

      return Prommise.reject(`Error  ${res.status}`);
    });
  }

  removeLike(data) {
    return fetch(`${this.baseUrl}/cards/likes/${data}`, {
      method: "DELETE",
      headers: this.options,
    }).then((res) => {
      if (res.status) {
        return res.json();
      }

      return Prommise.reject(`Error  ${res.status}`);
    });
  }

  updateProfilePicture(data) {}

  // other methods for working with the API
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
