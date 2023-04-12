// Coloque aqui suas actions
export const USER_LOGIN = 'USER_LOGIN';

export const userLogin = (email) => ({
  type: USER_LOGIN,
  payload: { email },
});

export const USER_PASSWORD = 'USER_PASSWORD';

export const userPassword = (password) => ({
  type: USER_PASSWORD,
  payload: { password },
});
