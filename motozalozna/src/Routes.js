import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AppTable from './AppTable';

const Routes = () => (
  <div>
    <Switch>
      <Route exact path="/" component={AppTable} />
      {/* <Route exact path='/reset/:token' component={ResetPassword} /> */}
      {/* <Route exact path='/forgotPassword' component={ForgotPassword} /> */}
    </Switch>
  </div>
);

export default Routes;
