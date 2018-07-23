import * as React from 'react';

import {ConnectedRouter} from 'connected-react-router';
import {History} from 'history';
import {connect} from 'react-redux';
import {Redirect, Route, Switch} from 'react-router';

import {USER_AUTH_STATE} from '@src/app/commons/const';
import Application from '@src/app/components/Application';
import Login from '@src/app/components/Login';
import Root from '@src/app/components/Root';
import UserAuthList from '@src/app/components/UserAuthList';
import {verifyToken} from '@src/app/reducers/security';
import ActivityList from '@src/app/components/ActivityList';

type Props = {
  history: History;
  verifyTokenHandler: any;
};

class RootRouterApp extends React.Component<Props> {
  componentDidMount() {
    this.props.verifyTokenHandler();
  }

  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <Root>
          <Switch>
            <Redirect exact={true} from="/" to="/application"/>
            <Redirect exact={true} from="/application" to="/application/auth-wait/users"/>
            <Redirect exact={true} from="/application/auth-wait" to="/application/auth-wait/users"/>
            <Redirect exact={true} from="/application/auth-finish" to="/application/auth-finish/pass"/>
            <Route path="/auth" component={Login}/>
            <Route
              path="/application"
              component={() => (
                <Application>
                  <Route
                    path="/application/auth-wait/users"
                    component={() => (
                      <UserAuthList authState={USER_AUTH_STATE.NONE}/>
                    )}
                  />
                  <Route
                    path="/application/auth-wait/activities"
                    component={() => (
                      <ActivityList />
                    )}
                  />
                  <Route
                    path="/application/auth-finish/pass"
                    component={() => (
                      <UserAuthList authState={USER_AUTH_STATE.PASS}/>
                    )}
                  />
                  <Route
                    path="/application/auth-finish/deny"
                    component={() => (
                      <UserAuthList authState={USER_AUTH_STATE.DENY}/>
                    )}
                  />
                </Application>
              )}
            />
          </Switch>
        </Root>
      </ConnectedRouter>
    );
  }
}

export default connect(
  () => ({}),
  {
    verifyTokenHandler: verifyToken,
  }
)(RootRouterApp);
