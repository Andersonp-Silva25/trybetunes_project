import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from './services/userAPI';
import Loading from './Loading';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      isDisableButton: true,
      login: '',
      isLoading: false,
    };
  }

  inputChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value }, () => this.onDisableButtonClick());
  }

  onDisableButtonClick = () => {
    const { login } = this.state;
    const { length } = login;
    const minLength = 3;
    const checkLength = length >= minLength;
    if (checkLength) {
      this.setState({ isDisableButton: false });
    } else {
      this.setState({ isDisableButton: true });
    }
  }

  onEnterClick = async (event) => {
    event.preventDefault();
    const { login } = this.state;
    const { history } = this.props;
    this.setState({ isLoading: true });
    await createUser({ name: login });
    history.push('/search');
  }

  render() {
    const { isDisableButton, isLoading } = this.state;
    const { history } = this.props;
    return (
      <div data-testid="page-login">

        { isLoading
          ? <Loading />
          : (
            <form>
              <label htmlFor="login">
                <input
                  type="text"
                  name="login"
                  id="login"
                  data-testid="login-name-input"
                  placeholder="Digite seu nome de Usuario"
                  onChange={ this.inputChange }
                />
              </label>
              <button
                type="submit"
                data-testid="login-submit-button"
                disabled={ isDisableButton }
                onClick={ this.onEnterClick }
              >
                Entrar
              </button>
            </form>
          )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
