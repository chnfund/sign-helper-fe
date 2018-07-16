import * as React from 'react';
import {connect} from 'react-redux';

import {AUTH_WAIT, authNotPass, authPass, fetchUsers, getVisibleUsers} from '@src/app/reducers/user';
import {AppState, User} from '@src/types/application';

type Props = {
  users: User[];
  fetchUserHandler: any;
  authPassHandler: any;
  authNotPassHandler: any;
};

class UserAuthList extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchUserHandler();
  }

  render() {
    const {users, authPassHandler, authNotPassHandler} = this.props;

    return (
      <div className="user-authen-list">
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
                  {user.companyType}
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
              <div className="button-group-wrapper">
                <button className="operate-btn btn-warn" onClick={() => authNotPassHandler(user.id)}>不通过</button>
                <button className="operate-btn btn-info" onClick={() => authPassHandler(user.id)}>通过</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default connect(
  (state: AppState) => ({
    users: getVisibleUsers(state.users, AUTH_WAIT),
  }),
  {
    fetchUserHandler: fetchUsers,
    authPassHandler: authPass,
    authNotPassHandler: authNotPass,
  }
)(UserAuthList);
