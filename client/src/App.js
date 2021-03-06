import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Landing, Navbar, Login, Register } from './components';
import { Error } from './pages';
import './App.css';
function App() {
  return (
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
  );
}

export default App;
