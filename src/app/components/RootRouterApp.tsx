import * as React from 'react';

import {ConnectedRouter} from 'connected-react-router';
import {History} from 'history';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router';

import {USER_AUTH_STATE} from '@src/app/commons/const';
import Application from '@src/app/components/Application';
import Login from '@src/app/components/Login';
import Root from '@src/app/components/Root';
import UserAuthList from '@src/app/components/UserAuthList';
import {verifyToken} from '@src/app/reducers/security';

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
                      <UserAuthList authState={USER_AUTH_STATE.NONE}/>
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
