import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
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
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/search" component={ Search } />
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route path="/:QualquerOutraCoisa" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
