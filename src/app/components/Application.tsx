import * as React from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router';

import Dialog from '@src/app/components/Dialog';
import ModalWrapper from '@src/app/components/ModalWrapper';
import TabNav from '@src/app/components/TabNav';

import {
  checkPath,
  getVisibleTabs, navPath,
} from '@src/app/reducers/tab';
import {
  unpassOpeConfirm,
  userAuthUnpassOpeCancel,
  userAuthUnpassReasonChange
} from '@src/app/reducers/user';

import {USER_AUTH_STATE} from '@src/app/commons/const';
import ActivityDetail from '@src/app/components/ActivityDetail';
import ActivityList from '@src/app/components/ActivityList';
import UserAuthList from '@src/app/components/UserAuthList';
import UserSingInActivityList from '@src/app/components/UserSingInActivityList';
import {Activity, AppState, TabItem} from '@src/types/application';

type Props = {
  authUnPassReason: string;
  unpassDialogShow: boolean;
  firstLevelTabs: TabItem[];
  secondLevelTabs: TabItem[];
  activities: Activity[];
  authUnpassReasonChange: any;
  unpassOpeCancelHandler: () => any;
  unpassOpeConfirmHandler: () => any;
  toggleTabHandler: () => any;
  checkPathHandler: () => any;
};

class Application extends React.Component<Props> {
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
      checkPathHandler,
    } = this.props;

    const handleReasonChange = (evt) => {
      const val = evt.target.value;
      authUnpassReasonChange(val);
    };

    return (
      <div className="App">
        <header className="App-header text-align-left">
          小程序审核后台
        </header>
        <div className="main-space-wrapper">
          <TabNav
            tabs={firstLevelTabs}
            toggleTabHandler={toggleTabHandler}
            second={false}
            checkPathHandler={checkPathHandler}
          />
          <div className="main-space">
            <div className="user-activity-switch-wrapper content-row">
              <TabNav
                tabs={secondLevelTabs}
                toggleTabHandler={toggleTabHandler}
                second={true}
                checkPathHandler={checkPathHandler}
              />
            </div>
            <Route
              exact={true}
              path="/application/auth-wait/users"
              render={() => (
                <UserAuthList pageable={true} authState={USER_AUTH_STATE.NONE}/>
              )}
            />
            <Route
              exact={true}
              path="/application/auth-wait/activities"
              render={() => (
                <ActivityList pageable={true}/>
              )}
            />
            <Route
              exact={true}
              path="/application/auth-finish/pass"
              render={() => (
                <UserAuthList pageable={true} authState={USER_AUTH_STATE.PASS}/>
              )}
            />
            <Route
              exact={true}
              path="/application/auth-finish/deny"
              render={() => (
                <UserAuthList pageable={true} authState={USER_AUTH_STATE.DENY}/>
              )}
            />
            <Route
              exact={true}
              path="/application/auth-wait/users/user-sign-in-activities/:userId?"
              component={UserSingInActivityList}
            />
            <Route
              exact={true}
              path="/application/auth-wait/activities/activity-detail/:activityId?"
              component={ActivityDetail}
            />
          </div>
        </div>
        <ModalWrapper show={unpassDialogShow}>
          <Dialog
            title="不通过原因"
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
    activities: state.activityLogic.activities,
  }),
  {
    authUnpassReasonChange: userAuthUnpassReasonChange,
    unpassOpeCancelHandler: userAuthUnpassOpeCancel,
    unpassOpeConfirmHandler: unpassOpeConfirm,
    toggleTabHandler: navPath,
    checkPathHandler: checkPath,
  }
)(Application);
