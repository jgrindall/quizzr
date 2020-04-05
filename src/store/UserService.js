const getAuthHeaders = () => {
  let user = JSON.parse(localStorage.getItem('user'));
  if (user && user.authdata) {
    return { 'Authorization': 'Basic ' + user.authdata };
  }
  else {
    return {

    };
  }
};

const logout = () => {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
};

const handleResponse = (response) => {
  debugger;
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        location.reload(true);
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
};

const LOGIN_URL = 'http://localhost:8082/login';
const LIST_URL = 'http://localhost:8082/list';

const login = (username, password) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  };

  return fetch(LOGIN_URL, requestOptions)
    .then(handleResponse)
    .then(user => {
      // login successful if there's a user in the response
      if (user) {
        // store user details and basic auth credentials in local storage
        // to keep user logged in between page refreshes
        user.authdata = window.btoa(username + ':' + password);
        localStorage.setItem('user', JSON.stringify(user));
      }
      return user;
    });
};

const getQuestions = () => {
  const requestOptions = {
    method: 'GET',
    headers: getAuthHeaders()
  };
  return fetch(LIST_URL, requestOptions).then(handleResponse);
};

const UserService = {
  login,
  logout,
  getQuestions
};

export default UserService;
