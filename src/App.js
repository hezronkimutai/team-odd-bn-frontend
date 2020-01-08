import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Signout from './containers/user/signout/signout';
import VerifyEmail from './views/auth/VerifyEmail';
import Signin from './containers/user/signin/signin';
import Notfound from './NotFound';
import SocialLogin from './containers/user/social/SocialAuthLogin';
import Dashboard from './views/Dashboard/index';
import './assets/css/App.scss';

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="container">
        <Switch>
          <Route path="/signin" exact component={Signin} />
          <Route path="/social/auth/success" exact component={SocialLogin} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/signout" exact component={Signout} />
          <Route path="/dashboard" exact component={VerifyEmail} />
          <Route component={Notfound} />
        </Switch>
      </div>
    </Router>
  </Provider>
);

export default App;
