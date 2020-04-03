import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { Provider } from 'react-redux';
import store from './store';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './components/private-route/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';
import LeaveForm from './components/dashboard/LeaveForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Fill_updates from './components/dashboard/Fill_updates';
import Leaves from './components/dashboard/Leaves';
import Updates from './components/dashboard/Updates';
import Employee from './components/dashboard/Employee';
import DailyUpdates from './components/dashboard/DailyUpdates';
import DailyUpdatesPage from './components/dashboard/DailyUpdatesPage';
// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds

  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = '/';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div style={{ height: '100%' }}>
            <Route exact path='/' component={Login} />

            <Switch>
              <PrivateRoute exact path='/register' component={Register} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute exact path='/Leaves' component={Leaves} />
              <PrivateRoute exact path='/Updates' component={Updates} />
              <PrivateRoute exact path='/leaveForm' component={LeaveForm} />
              <PrivateRoute exact path='/employee' component={Employee} />
              <PrivateRoute
                exact
                path='/DailyUpdates'
                component={DailyUpdatesPage}
              />
              <PrivateRoute
                exact
                path='/DailyUpdatesForm'
                component={DailyUpdates}
              />
              <PrivateRoute
                exact
                path='/fill_updates'
                component={Fill_updates}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
