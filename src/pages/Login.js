import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userLogin } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  handleButton = (event) => {
    event.preventDefault();
    const { history, dispatch } = this.props;
    history.push('/carteira');

    const { email } = this.state;
    dispatch(userLogin(email));
  };

  render() {
    const { email, password } = this.state;
    const isEmailValid = email.includes('@') && email.toLowerCase().includes('.com');
    const minNumber = 6;
    const isPasswordValid = password.length >= minNumber;
    return (
      <form onSubmit={ this.handleButton }>
        <fieldset>
          <legend>Login</legend>
          <input
            type="email"
            name="email"
            id="input-email"
            value={ email }
            placeholder="Digite seu email"
            data-testid="email-input"
            onChange={ this.handleChange }
          />
          <input
            type="password"
            name="password"
            id="input-password"
            value={ password }
            placeholder="Digite sua senha"
            minLength="6"
            data-testid="password-input"
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            disabled={ !isEmailValid || !isPasswordValid }
          >
            Entrar

          </button>
        </fieldset>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
