import * as React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import ActivityList from '@src/app/components/ActivityList';
import Dialog from '@src/app/components/Dialog';
import ModalWrapper from '@src/app/components/ModalWrapper';
import TabNav from '@src/app/components/TabNav';
import UserAuthList from '@src/app/components/UserAuthList';
import {
  getRelContentPayload,
  getVisibleTabs,
  TAB_ACTIVITY_LIST, TAB_AUTH_FAIL, TAB_AUTH_SUCCESS,
  TAB_USER_LIST_WAIT_FOR_AUTH,
  toggleTab
} from '@src/app/reducers/tab';
import {
  userAuthUnpassConfirm,
  userAuthUnpassOpeCancel,
  userAuthUnpassReasonChange
} from '@src/app/reducers/user';
import {AppState, TabItem} from '@src/types/application';

type Props = {
  currentRelContent: string;
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
      currentRelContent,
    } = this.props;

    const handleReasonChange = (evt) => {
      const val = evt.target.value;
      authUnpassReasonChange(val);
    };

    const getRelComponent = (relContent) => {
      switch (relContent) {
        case TAB_USER_LIST_WAIT_FOR_AUTH:
          return <UserAuthList/>;
        case TAB_ACTIVITY_LIST:
          return <ActivityList/>;
        case TAB_AUTH_SUCCESS:
          return <UserAuthList/>;
        case TAB_AUTH_FAIL:
          return <UserAuthList/>;
        default:
          return <UserAuthList/>;
      }
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
            <TabNav tabs={firstLevelTabs} toggleTabHandler={toggleTabHandler} second={false}/>
            <div className="main-space">
              <div className="user-activity-switch-wrapper content-row">
                <TabNav tabs={secondLevelTabs} toggleTabHandler={toggleTabHandler} second={true}/>
              </div>
              {getRelComponent(currentRelContent)}
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
    currentRelContent: getRelContentPayload(state),
  }),
  {
    authUnpassReasonChange: userAuthUnpassReasonChange,
    unpassOpeCancelHandler: userAuthUnpassOpeCancel,
    unpassOpeConfirmHandler: userAuthUnpassConfirm,
    toggleTabHandler: toggleTab,
  }
)(RootApp);
