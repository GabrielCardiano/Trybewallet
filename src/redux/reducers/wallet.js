// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  FETCH_CURRENCY_REQUEST,
  FETCH_CURRENCY_SUCCESS,
  FETCH_CURRENCY_FAILURE,
  SAVE_EXPENSES,
  DELETE_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  isFetching: false,
  errorMessage: null,

};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_CURRENCY_REQUEST:
    return ({ ...state, isFetching: true });

  case FETCH_CURRENCY_SUCCESS:
    return ({ ...state, isFetching: false, currencies: action.payload.currencies });

  case FETCH_CURRENCY_FAILURE:
    return ({ ...state, isFetching: false, errorMessage: action.payload.errorMessage });

  case SAVE_EXPENSES:
    return ({ ...state, expenses: [...state.expenses, action.payload.expenses] });

  case DELETE_EXPENSE: {
    return ({
      ...state,
      expenses: [...state.expenses.filter((expense) => expense !== action.payload)],
    });
  }
  default:
    return state;
  }
};

export default wallet;
