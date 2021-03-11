import React, { useEffect } from 'react';
import setAuthToken from './utils/setAuthToken';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  Alert,
  Landing,
  Navbar,
  Login,
  Register,
  Dashboard,
  PrivateRoute,
  CreateProfile,
} from './components';

import { Error } from './pages';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authAction';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Route exact path='/' component={Landing} />
        <section className='container'>
          <Alert />
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute
              exact
              path='/create-profile'
              component={CreateProfile}
            />
            <Route path='*'>
              <Error />
            </Route>
          </Switch>
        </section>
      </Router>
    </Provider>
  );
};

export default App;
