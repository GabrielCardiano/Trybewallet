import { fetchCurrencies } from '../../tests/helpers/FetchFunctions';

// Actions de login
export const USER_LOGIN = 'USER_LOGIN';

export const userLogin = (email) => ({
  type: USER_LOGIN,
  payload: { email },
});

// Actions de requisição da API
export const FETCH_CURRENCY_REQUEST = 'FETCH_CURRENCY_REQUEST';
export const FETCH_CURRENCY_SUCCESS = 'FETCH_CURRENCY_SUCCESS';
export const FETCH_CURRENCY_FAILURE = 'FETCH_CURRENCY_FAILURE';

const fetchCurrencyRequest = () => ({
  type: FETCH_CURRENCY_REQUEST,
});

const fetchCurrencySuccess = (currencies) => ({
  type: FETCH_CURRENCY_SUCCESS,
  payload: { currencies },
});

const fetchCurrencyFailure = (errorMessage) => ({
  type: FETCH_CURRENCY_FAILURE,
  payload: { errorMessage },
});

export const fetchCurrencyThunk = () => async (dispatch) => {
  try {
    dispatch(fetchCurrencyRequest());
    const data = await fetchCurrencies();
    const currencies = Object.keys(data)
      .filter((currency) => currency !== 'USDT');
    dispatch(fetchCurrencySuccess(currencies));
  } catch (error) {
    dispatch(fetchCurrencyFailure('Falha na requisição da API'));
  }
};

// Action de salvar despesas na carteira
export const SAVE_EXPENSES = 'SAVE_EXPENSES';

export const saveExpenses = (expenses) => ({
  type: SAVE_EXPENSES,
  payload: { expenses },
});

// Action de deletar uma despesa
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const deleteExpense = (expense) => ({
  type: DELETE_EXPENSE,
  payload: expense,
});

// Action de editar despesas
// export const EDIT_EXPENSE = 'EDIT_EXPENSE';

// export const editExpense = (expense) => ({
//   type: EDIT_EXPENSE,
//   payload: expense,
// });

// export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';

// export const updateExpense = (editedExpense) => ({
//   type: UPDATE_EXPENSE,
//   payload: editedExpense,
// });
