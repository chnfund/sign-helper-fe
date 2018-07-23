import * as React from 'react';
import {connect} from 'react-redux';

import ActivityList from '@src/app/components/ActivityList';
import Dialog from '@src/app/components/Dialog';
import ModalWrapper from '@src/app/components/ModalWrapper';
import TabNav from '@src/app/components/TabNav';
import UserAuthList from '@src/app/components/UserAuthList';

import {
  getRelContentPayload, SUPER_ACTIVITY_LIST, SUPER_ACTIVITY_USER_LIST,
  TAB_ACTIVITY_LIST, TAB_AUTH_DENY,
  TAB_AUTH_PASS,
  TAB_USER_LIST_WAIT_FOR_AUTH
} from '@src/app/reducers/app';
import {
  getVisibleTabs,
  toggleTab
} from '@src/app/reducers/tab';
import {
  getVisibleUsers,
  userAuthUnpassConfirm,
  userAuthUnpassOpeCancel,
  userAuthUnpassReasonChange
} from '@src/app/reducers/user';
import {Activity, AppState, TabItem, User} from '@src/types/application';

type Props = {
  currentRelContent: string;
  authUnPassReason: string;
  unpassDialogShow: boolean;
  firstLevelTabs: TabItem[];
  secondLevelTabs: TabItem[];
  activities: Activity[];
  superActivities: Activity[];
  users: User[];
  superUsers: User[];
  authUnpassReasonChange: any;
  unpassOpeCancelHandler: () => any;
  unpassOpeConfirmHandler: () => any;
  toggleTabHandler: () => any;
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
      activities,
      superActivities,
      users,
      superUsers,
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
          return <UserAuthList users={users}/>;
        case TAB_ACTIVITY_LIST:
          return <ActivityList activities={activities}/>;
        case TAB_AUTH_PASS:
          return <UserAuthList users={users}/>;
        case TAB_AUTH_DENY:
          return <UserAuthList users={users}/>;
        case SUPER_ACTIVITY_LIST:
          return <div><ActivityList activities={superActivities}/></div>;
        case SUPER_ACTIVITY_USER_LIST:
          return (
            <div>
              <ActivityList activities={superActivities}/>
              <UserAuthList users={superUsers}/>
            </div>
          );
        default:
          return <UserAuthList users={users}/>;
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
          <div className="main-space-wrapper">
            <TabNav tabs={firstLevelTabs} toggleTabHandler={toggleTabHandler} second={false}/>
            <div className="main-space">
              <div className="user-activity-switch-wrapper content-row">
                <TabNav tabs={secondLevelTabs} toggleTabHandler={toggleTabHandler} second={true}/>
              </div>
              {getRelComponent(currentRelContent)}
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
    currentRelContent: getRelContentPayload(state),
    authUnPassReason: state.userLogic.authUnpassInfo.authUnPassReason,
    unpassDialogShow: state.userLogic.authUnpassInfo.unpassDialogShow,
    firstLevelTabs: getVisibleTabs(state, 1),
    secondLevelTabs: getVisibleTabs(state, 2),
    activities: state.activityLogic.activities,
    superActivities: state.appLogic.superModeData.activityList,
    users: getVisibleUsers(state, state.userLogic.users),
    superUsers: state.appLogic.superModeData.userList,
  }),
  {
    authUnpassReasonChange: userAuthUnpassReasonChange,
    unpassOpeCancelHandler: userAuthUnpassOpeCancel,
    unpassOpeConfirmHandler: userAuthUnpassConfirm,
    toggleTabHandler: toggleTab,
  }
)(Application);
