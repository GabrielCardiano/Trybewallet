import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencyThunk, saveExpenses } from '../redux/actions';
import { fetchCurrencies } from '../tests/helpers/FetchFunctions';
import './WalletForm.css';

const INITIAL_STATE = {
  tag: 'alimentação',
  value: '',
  description: '',
  currency: 'USD',
  method: 'dinheiro',
};

class WalletForm extends Component {
  state = INITIAL_STATE;

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencyThunk());
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { dispatch, expenses } = this.props;
    const id = expenses.length;
    const fetchQuotations = await fetchCurrencies();

    dispatch(saveExpenses({
      ...this.state,
      id,
      exchangeRates: fetchQuotations,
    }));

    this.setState(INITIAL_STATE);
  };

  render() {
    const { currencies } = this.props;
    const {
      tag,
      value,
      description,
      currency,
      method,
    } = this.state;

    return (
      <form id="wallet-form" onSubmit={ this.handleSubmit }>
        <label htmlFor="input-category">
          Categoria:
          <select
            name="tag"
            id="input-categorie"
            value={ tag }
            onChange={ this.handleChange }
            data-testid="tag-input"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>

        <label htmlFor="input-value">
          Valor:
          <input
            type="number"
            name="value"
            id="input-value"
            spellCheck="true"
            value={ value }
            onChange={ this.handleChange }
            data-testid="value-input"
          />
        </label>

        <label htmlFor="input-description">
          Descrição:
          <input
            type="text"
            name="description"
            id="input-description"
            spellCheck="true"
            value={ description }
            onChange={ this.handleChange }
            data-testid="description-input"
          />
        </label>

        <label htmlFor="input-currency">
          Moeda:
          <select
            name="currency"
            id="input-currency"
            value={ currency }
            onChange={ this.handleChange }
            data-testid="currency-input"
          >
            {
              currencies && currencies.map((coin) => (
                <option
                  key={ coin }
                  value={ coin }
                >
                  {coin}
                </option>
              ))
            }
          </select>
        </label>

        <label htmlFor="input-payment">
          Método de pagamento:
          <select
            name="method"
            id="input-payment"
            value={ method }
            onChange={ this.handleChange }
            data-testid="method-input"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de débito">Cartão de débito</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
          </select>
        </label>

        <button
          type="submit"
        >
          Adicionar Despesa
        </button>

      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
