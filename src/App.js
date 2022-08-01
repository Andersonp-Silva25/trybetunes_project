import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Album from './Album';
import Favorites from './Favorites';
import Login from './Login';
import NotFound from './NotFound';
import Profile from './Profile';
import ProfileEdit from './ProfileEdit';
import Search from './Search';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <p>TrybeTunes.</p>
        <Route path="/" component={ Login } />
        <Route path="/search" component={ Search } />
        <Route path="/album/:id" component={ Album } />
        <Route path="/favorites" component={ Favorites } />
        <Route path="/profile" component={ Profile } />
        <Route path="/profile/edit" component={ ProfileEdit } />
        <Route path="/:QualquerOutraCoisa" component={ NotFound } />
      </BrowserRouter>
    );
  }
}

export default App;
