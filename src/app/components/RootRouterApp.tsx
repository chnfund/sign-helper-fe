import * as React from 'react';

import {ConnectedRouter} from 'connected-react-router';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router';

import Application from '@src/app/components/Application';
import Login from '@src/app/components/Login';
import Root from '@src/app/components/Root';
import {verifyToken} from '@src/app/reducers/security';
import {History} from 'history';

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
            <Route exact={true} path="/auth" component={Login}/>
            <Route path="/application" component={Application}/>
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
