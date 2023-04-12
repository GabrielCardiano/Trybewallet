import { USER_LOGIN } from '../actions';

// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  email: '',
  password: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_LOGIN: {
    return {
      ...state,
      email: action.payload.email,
    };
  }
  default:
    return state;
  }
};

export default user;
