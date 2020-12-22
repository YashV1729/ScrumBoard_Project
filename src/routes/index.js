import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import * as routes from '../constants/routes';
import withAuthentication from '../utils/withAuthentication';

import Navigation from '../navigation';
import SignUpScreen from '../screens/SignUp';
import SignInScreen from '../screens/SignIn';
import PasswordForgetScreen from '../screens/PasswordForget';
import BoardsScreen from '../screens/Boards';
import BoardScreen from '../screens/Board';
import AccountScreen from '../screens/Account';
import NotFoundScreen from '../screens/NotFound';

const Routes = () => (
  <Router>
    <React.Fragment>
      <Navigation />
      <Switch className="container">
        {
          <Route
            exact
            path={routes.LANDING}
            render={() => <Redirect to={routes.BOARDS} />}
          />
        }
        <Route exact path={routes.SIGN_UP} component={SignUpScreen} />
        <Route exact path={routes.SIGN_IN} component={SignInScreen} />
        <Route
          exact
          path={routes.PASSWORD_FORGET}
          component={PasswordForgetScreen}
        />
        {<Route exact path={routes.BOARDS} component={BoardsScreen} />}
        <Route exact path={routes.ACCOUNT} component={AccountScreen} />
        <Route exact path={routes.BOARD} component={BoardScreen} />
        <Route component={NotFoundScreen} />
      </Switch>
    </React.Fragment>
  </Router>
);

export default withAuthentication(Routes);
