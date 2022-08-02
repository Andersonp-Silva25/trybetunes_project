import React, { Component } from 'react';
import Header from './Header';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      isDisable: true,
    };
  }

  verifyInput = ({ target: { value } }) => {
    const lengthInput = value.length >= 2;
    this.setState({ isDisable: !lengthInput });
  }

  render() {
    const { isDisable } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <form>
            <label htmlFor="search">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Nome do Artista ou Banda"
                data-testid="search-artist-input"
                onChange={ this.verifyInput }
              />
            </label>
            <button
              type="submit"
              data-testid="search-artist-button"
              disabled={ isDisable }
            >
              Pesquisar

            </button>
          </form>
        </div>
      </>
    );
  }
}
