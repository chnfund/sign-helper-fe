import * as React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import Dialog from '@src/app/components/Dialog';
import ModalWrapper from '@src/app/components/ModalWrapper';
import TabContent from '@src/app/components/TabContent';
import TabNav from '@src/app/components/TabNav';
import {userAuthUnpassReasonChange} from '@src/app/reducers/user';
import {AppState} from '@src/types/application';
import {connect} from 'react-redux';

type Props = {
  authUnPassReason: string;
  authUnpassReasonChange: any;
};

class RootApp extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
  }

  render(): React.ReactNode {

    const {authUnPassReason, authUnpassReasonChange} = this.props;

    const handleReasonChange = (evt) => {
      const val = evt.target.value;
      authUnpassReasonChange(val);
    };

    return (
      <div className="App">
        <header className="App-header">
          <div className="App-logo float-left">🐯</div>
          <div className="App-logo float-left">🐯</div>
          <div className="App-logo float-left">🐯</div>
          <div className="App-logo float-left">🐯</div>
          <div className="App-logo float-left">🐯</div>
          <div className="App-logo float-left">🐯</div>
        </header>
        <Router>
          <div className="main-space-wrapper">
            <TabNav/>
            <TabContent contents={[]}/>
          </div>
        </Router>
        <ModalWrapper>
          <Dialog title="title goes here">
            <textarea
              name=""
              id=""
              cols={30}
              rows={10}
              value={authUnPassReason}
              onChange={handleReasonChange}
            />
          </Dialog>
        </ModalWrapper>
      </div>
    );
  }
}

export default connect(
  (state: AppState) => ({
    authUnPassReason: state.userLogic.authUnPassReason,
  }),
  {
    authUnpassReasonChange: userAuthUnpassReasonChange,
  }
)(RootApp);
