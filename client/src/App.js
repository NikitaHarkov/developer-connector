import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Landing, Navbar, Login, Register } from './components';
import { Error } from './pages';
import './App.css';
//Redux
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Route exact path='/' component={Landing} />
        <section className='container'>
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route path='*'>
              <Error />
            </Route>
          </Switch>
        </section>
      </Router>
    </Provider>
  );
}

export default App;
