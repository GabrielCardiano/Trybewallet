import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Header.css';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;

    const totalExpenses = expenses
      .map((item) => item.value * item.exchangeRates[item.currency].ask);

    const valueInReal = totalExpenses.reduce((acc, curr) => acc + curr, 0);

    return (
      <header>
        <p data-testid="email-field">{email}</p>
        <section id="total-expenses">
          <p>Despesa total:</p>
          <span data-testid="total-field">{valueInReal.toFixed(2)}</span>
          <span data-testid="header-currency-field">BRL</span>
        </section>

      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
