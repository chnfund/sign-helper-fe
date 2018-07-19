import * as React from 'react';
import {connect} from 'react-redux';

import {
  AUTH_FAIL, AUTH_SUCCESS,
  authPass, COMPANY_TYPE,
  fetchUsers,
  getVisibleUsers, setIRAndAuthPass,
  showAuthUnpassDialog
} from '@src/app/reducers/user';
import {AppState, User} from '@src/types/application';

type Props = {
  users: User[];
  fetchUserHandler: any;
  authPassHandler: any;
  showAuthUnpassDialogHandler: any;
  setIRAndAuthPassHandler: any;
};

class UserAuthList extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchUserHandler();
  }

  render() {
    const {users, authPassHandler, showAuthUnpassDialogHandler, setIRAndAuthPassHandler} = this.props;

    const genUserOpBtns = (user: User) => {

      const authFailBtn = (tmpUser: User) => {
        return (tmpUser.authState !== AUTH_FAIL ? (
          <button
            className="operate-btn btn-warn"
            onClick={() => showAuthUnpassDialogHandler(tmpUser.id)}
          >
            不通过
          </button>) : <button className="operate-btn" disabled={true}>不通过</button>);
      };

      const authSuccessBtn = (tmpUser: User) => {
        if (tmpUser.companyType === COMPANY_TYPE.INSTI) {
          return (
            <button
              className={'operate-btn' + (tmpUser.authState !== AUTH_SUCCESS ? ' btn-info' : '')}
              disabled={tmpUser.authState === AUTH_SUCCESS}
              onClick={() => authPassHandler(tmpUser.id)}
            >
              通过
            </button>
          );
        } else {
          return (
            <div>
              <button
                className={'operate-btn' + (tmpUser.isIR === 1 && tmpUser.authState === AUTH_SUCCESS ? '' : ' btn-info')}
                disabled={tmpUser.isIR === 1 && tmpUser.authState === AUTH_SUCCESS}
                onClick={() => setIRAndAuthPassHandler(tmpUser.id, true)} // TODO IR/NOIR action.
              >
                IR
              </button>
              <button
                className={'operate-btn' + (tmpUser.isIR !== 1 && tmpUser.authState === AUTH_SUCCESS ? '' : ' btn-info')}
                disabled={tmpUser.isIR !== 1 && tmpUser.authState === AUTH_SUCCESS}
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
                    <div className="activity-sign-count">签到过{user.activitySignCount}场会议</div>}
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
    users: getVisibleUsers(state, state.userLogic.users),
  }),
  {
    fetchUserHandler: fetchUsers,
    authPassHandler: authPass,
    showAuthUnpassDialogHandler: showAuthUnpassDialog,
    setIRAndAuthPassHandler: setIRAndAuthPass,
  }
)
(UserAuthList);
