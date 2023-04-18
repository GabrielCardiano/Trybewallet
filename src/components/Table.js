import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Table.css';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </thead>

        <tbody>
          {
            expenses.map((expense) => {
              const { exchangeRates } = expense;
              const currencyName = Object.entries(exchangeRates)
                .find((coin) => coin[0] === expense.currency);
              const valueInReal = expense.value * currencyName[1].ask;
              return (
                <tr key={ expense.id }>
                  <td>{expense.description}</td>
                  <td>{expense.tag}</td>
                  <td>{expense.method}</td>
                  <td>{Number(expense.value).toFixed(2)}</td>
                  <td>{currencyName[1].name}</td>
                  <td>{Number(currencyName[1].ask)}</td>
                  <td>{valueInReal.toFixed(2)}</td>
                  <td>Real</td>
                </tr>
              );
            })
          }
        </tbody>

      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
