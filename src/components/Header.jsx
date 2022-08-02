import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      objUser: {},
      isLoading: true,
    };
  }

  componentDidMount() {
    this.findUsername();
  }

  findUsername = async () => {
    this.setState({ isLoading: false, objUser: await getUser() });
  }

  render() {
    const { isLoading, objUser } = this.state;
    return (
      <header data-testid="header-component">
        <nav>
          <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </nav>
        <div data-testid="header-user-name">
          { isLoading ? <Loading /> : objUser.name}
        </div>
      </header>
    );
  }
}
