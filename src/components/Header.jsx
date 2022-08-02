import React, { Component } from 'react';
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
        <div data-testid="header-user-name">
          { isLoading ? <Loading /> : objUser.name}
        </div>
      </header>
    );
  }
}
