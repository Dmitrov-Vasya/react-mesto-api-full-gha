export const baseURL = 'https://api.mesto-dmitrov.nomoreparties.co';

export function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
}

export const register = ({ password, email }) => {
  return fetch(`${baseURL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      credentials: 'include',
    },
    body: JSON.stringify({ password, email }),
  }).then(checkResponse);
};

export const authorize = ({ email, password }) => {
  return fetch(`${baseURL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      credentials: 'include',
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

export const checkToken = () => {
  return fetch(`${baseURL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      credentials: 'include',
      // Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};
