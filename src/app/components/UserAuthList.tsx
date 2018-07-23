import * as React from 'react';
import {connect} from 'react-redux';

import {COMPANY_TYPE, USER_AUTH_STATE} from '@src/app/commons/const';
import {showSignedActivity} from '@src/app/reducers/app';
import {AppState, User} from '@src/types/application';
import {
  authPass,
  fetchUsers,
  setIRAndAuthPass,
  showAuthUnpassDialog
} from '../reducers/user';

type Props = {
  users: User[];
  fetchUserHandler: any;
  authPassHandler: any;
  showAuthUnpassDialogHandler: any;
  setIRAndAuthPassHandler: any;
  showSignedActivityHandler: any;
};

class UserAuthList extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchUserHandler();
  }

  render() {
    const {
      users,
      authPassHandler,
      showAuthUnpassDialogHandler,
      setIRAndAuthPassHandler,
      showSignedActivityHandler,
    } = this.props;

    const genUserOpBtns = (user: User) => {

      const authFailBtn = (tmpUser: User) => {
        return (tmpUser.authState !== USER_AUTH_STATE.DENY ? (
          <button
            className="operate-btn btn-warn"
            onClick={() => showAuthUnpassDialogHandler(tmpUser.id)}
          >
            不通过
          </button>) : <button className="operate-btn" disabled={true}>不通过</button>);
      };

      const authSuccessBtn = (tmpUser: User) => {
        if (tmpUser.companyType === COMPANY_TYPE.Insti) {
          return (
            <button
              className={'operate-btn' + (tmpUser.authState !== USER_AUTH_STATE.PASS ? ' btn-info' : '')}
              disabled={tmpUser.authState === USER_AUTH_STATE.PASS}
              onClick={() => authPassHandler(tmpUser.id)}
            >
              通过
            </button>
          );
        } else {
          return (
            <div>
              <button
                className={'operate-btn' + (tmpUser.isIR === 1 && tmpUser.authState === USER_AUTH_STATE.PASS ? '' : ' btn-info')}
                disabled={tmpUser.isIR === 1 && tmpUser.authState === USER_AUTH_STATE.PASS}
                onClick={() => setIRAndAuthPassHandler(tmpUser.id, true)}
              >
                IR
              </button>
              <button
                className={'operate-btn' + (tmpUser.isIR !== 1 && tmpUser.authState === USER_AUTH_STATE.PASS ? '' : ' btn-info')}
                disabled={tmpUser.isIR !== 1 && tmpUser.authState === USER_AUTH_STATE.PASS}
                onClick={() => setIRAndAuthPassHandler(tmpUser.id, false)}
              >
                非IR
              </button>
            </div>
          );
        }
      };

      return (
        <div className="button-group-wrapper">
          {authFailBtn(user)}
          {authSuccessBtn(user)}
        </div>
      );

    };

    return (
      <div>
        <div className="table-header content-row">
          <span className="table-header-item text-align-left">用户个人资料 | 来源</span>
          <span className="table-header-item">审核结果</span>
        </div>
        {users.map(user => (
          <div key={user.id} className="table-row content-row">
            <div className="table-row-part flex-d-row">
              <div className="company-card-img-holder float-left"/>
              <div className="custom-info float-left">
                <div className="flex-1">
                  {user.companySubTypeName}
                  {!(user.activitySignCount > 0) ?
                    '' :
                    <div
                      className="activity-sign-count"
                      onClick={() => showSignedActivityHandler(user.id)}
                    >
                      签到过{user.activitySignCount}场会议
                    </div>
                  }
                </div>
                <div className="flex-1">
                  {user.name}&nbsp;&nbsp;{user.phoneNumber}
                </div>
                <div className="flex-1">
                  {user.companyName}&nbsp;&nbsp;{user.role}
                </div>
              </div>
            </div>
            <div className="table-row-part">
              {genUserOpBtns(user)}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default connect(
  (
    state: AppState
  ) => ({
  }),
  {
    fetchUserHandler: fetchUsers,
    authPassHandler: authPass,
    showAuthUnpassDialogHandler: showAuthUnpassDialog,
    setIRAndAuthPassHandler: setIRAndAuthPass,
    showSignedActivityHandler: showSignedActivity,
  }
)
(UserAuthList);
