export class UserServiceClient {

  USER_LOGIN_URL = 'https://cs4550-node.herokuapp.com/api/login';
  USER_LOGOUT_URL = 'https://cs4550-node.herokuapp.com/api/logout';
  USER_PROFILE_URL = 'https://cs4550-node.herokuapp.com/api/profile';
  USER_REGISTER_URL = 'https://cs4550-node.herokuapp.com/api/register';
  USER_URL = 'https://cs4550-node.herokuapp.com/api/user/USER_ID';

  findUserById(userId) {
    return fetch(this.USER_URL.replace('USER_ID', userId))
      .then(response => response.json());
  }

  delete() {
    return fetch(this.USER_PROFILE_URL, {
      credentials: 'include',
      method: 'delete'
    });
  }

  checkIfLoggedIn() {
    return fetch(this.USER_LOGIN_URL + '/active', {
      credentials: 'include'
    });
  }

  updateUser(user, userId) {
    return fetch(this.USER_PROFILE_URL, {
      credentials: 'include',
      body: JSON.stringify(user),
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json());
  }

  login(username, password) {
    const credentials = {
      username: username,
      password: password
    };
    return fetch(this.USER_LOGIN_URL, {
      method: 'post',
      body: JSON.stringify(credentials),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  logout() {
    return fetch(this.USER_LOGOUT_URL, {
      method: 'post',
      credentials: 'include'
    });
  }

  profile() {
    return fetch(this.USER_PROFILE_URL,
      {
        credentials: 'include', // include, same-origin, *omit
      })
      .then(response => response.json());
  }

  createUser(username, password) {
    const user = {
      username: username,
      password: password
    };
    return fetch(this.USER_REGISTER_URL, {
      body: JSON.stringify(user),
      credentials: 'include', // include, same-origin, *omit
      method: 'post',
      headers: {
        'content-type': 'application/json'
      }
    });
  }
}
