import * as React from 'react';
import {connect} from 'react-redux';

import {COMPANY_TYPE, USER_AUTH_STATE, USER_CATEGORY} from '@src/app/commons/const';
import {AppState, User} from '@src/types/application';
import {
  authUser,
  fetchUsers, filterUserBuyAuthState,
  showAuthUnpassDialog
} from '../reducers/user';

type Props = {
  authState: number;
  users: User[];
  fetchUserHandler: any;
  authUserHandler: (id: number, authState: number, userCategory: number) => any;
  showAuthUnpassDialogHandler: any;
  showSignedActivityHandler: any;
};

class UserAuthList extends React.Component<Props> {
  static defaultProps = {
    users: [],
  };

  componentDidMount() {
    this.props.fetchUserHandler(this.props.authState, 1);
  }

  render() {
    const {
      users,
      authUserHandler,
      showAuthUnpassDialogHandler,
      showSignedActivityHandler,
    } = this.props;

    const genUserOpBtns = (user: User) => {

      const authFailBtn = (tmpUser: User) => {
        return (tmpUser.authenticateState !== USER_AUTH_STATE.DENY ? (
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
              className={'operate-btn' + (tmpUser.authenticateState !== USER_AUTH_STATE.PASS ? ' btn-info' : '')}
              disabled={tmpUser.authenticateState === USER_AUTH_STATE.PASS}
              onClick={() => authUserHandler(tmpUser.id, USER_AUTH_STATE.PASS, null)}
            >
              通过
            </button>
          );
        } else {
          return (
            <div>
              <button
                className={'operate-btn' + (tmpUser.userCategory === USER_CATEGORY.Company.IR && tmpUser.authenticateState === USER_AUTH_STATE.PASS ? '' : ' btn-info')}
                disabled={tmpUser.userCategory === USER_CATEGORY.Company.IR && tmpUser.authenticateState === USER_AUTH_STATE.PASS}
                onClick={() => authUserHandler(tmpUser.id, USER_AUTH_STATE.PASS, USER_CATEGORY.Company.IR)}
              >
                IR
              </button>
              <button
                className={'operate-btn' + (tmpUser.userCategory !== USER_CATEGORY.Company.IR && tmpUser.authenticateState === USER_AUTH_STATE.PASS ? '' : ' btn-info')}
                disabled={tmpUser.userCategory !== USER_CATEGORY.Company.IR && tmpUser.authenticateState === USER_AUTH_STATE.PASS}
                onClick={() => authUserHandler(tmpUser.id, USER_AUTH_STATE.PASS, USER_CATEGORY.Company.NONE_IR)}
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
                  {!(user.signinCount > 0) ?
                    '' :
                    <div
                      className="activity-sign-count"
                      onClick={() => showSignedActivityHandler(user.id)}
                    >
                      签到过{user.signinCount}场会议
                    </div>
                  }
                </div>
                <div className="flex-1">
                  {user.fullName}&nbsp;&nbsp;{user.position}
                </div>
                <div className="flex-1">
                  {user.mobile}
                </div>
                <div className="flex-1">
                  {user.companyName}
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

export default connect((
    state: AppState,
    props: any
  ) => ({
    users: filterUserBuyAuthState(state.userLogic.users, props.authState),
  }),
  {
    fetchUserHandler: fetchUsers,
    authUserHandler: authUser,
    showAuthUnpassDialogHandler: showAuthUnpassDialog,
  }
)
(UserAuthList);
