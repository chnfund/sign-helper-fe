import * as React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import Dialog from '@src/app/components/Dialog';
import UserAuthList from '@src/app/components/mettingLogic/UserAuthList';
import ModalWrapper from '@src/app/components/ModalWrapper';
import TabNav from '@src/app/components/TabNav';
import {getVisibleTabs, toggleTab} from '@src/app/reducers/tab';
import {userAuthUnpassConfirm, userAuthUnpassOpeCancel, userAuthUnpassReasonChange} from '@src/app/reducers/user';
import {AppState, TabItem} from '@src/types/application';

type Props = {
  authUnPassReason: string;
  unpassDialogShow: boolean;
  firstLevelTabs: TabItem[];
  secondLevelTabs: TabItem[];
  authUnpassReasonChange: any;
  unpassOpeCancelHandler: () => any;
  unpassOpeConfirmHandler: () => any;
  toggleTabHandler: () => any;
};

class RootApp extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
  }

  render(): React.ReactNode {

    const {
      authUnPassReason,
      unpassDialogShow,
      firstLevelTabs,
      secondLevelTabs,
      authUnpassReasonChange,
      unpassOpeCancelHandler,
      unpassOpeConfirmHandler,
      toggleTabHandler,
    } = this.props;

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
            <TabNav tabs={firstLevelTabs} toggleTabHandler={toggleTabHandler}/>
            <div className="main-space">
              <div className="user-activity-switch-wrapper content-row">
                {/*<div className="switch-item-group">*/}
                  {/*<div className="switch-item active">待审核用户</div>*/}
                  {/*<div className="switch-item">活动列表</div>*/}
                {/*</div>*/}
                <TabNav tabs={secondLevelTabs} toggleTabHandler={toggleTabHandler}/>
              </div>
              <UserAuthList/>
            </div>
          </div>
        </Router>
        <ModalWrapper show={unpassDialogShow}>
          <Dialog
            title="title goes here"
            cancelHandler={unpassOpeCancelHandler}
            confirmHandler={unpassOpeConfirmHandler}
          >
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
    authUnPassReason: state.userLogic.authUnpassInfo.authUnPassReason,
    unpassDialogShow: state.userLogic.authUnpassInfo.unpassDialogShow,
    firstLevelTabs: getVisibleTabs(state, 1),
    secondLevelTabs: getVisibleTabs(state, 2),
  }),
  {
    authUnpassReasonChange: userAuthUnpassReasonChange,
    unpassOpeCancelHandler: userAuthUnpassOpeCancel,
    unpassOpeConfirmHandler: userAuthUnpassConfirm,
    toggleTabHandler: toggleTab,
  }
)(RootApp);
