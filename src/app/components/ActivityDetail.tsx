import * as React from 'react';

import UserAuthList from '@src/app/components/UserAuthList';
import {focusActivity} from '@src/app/reducers/activity';
import {Activity, AppState} from '@src/types/application';
import {connect} from 'react-redux';

type Props = {
  activity: Activity;
  focusActivityHandler: any;
  match: any;
  history: any;
};

class ActivityDetail extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
    this.goBack = this.goBack.bind(this); // i think you are missing this
  }

  componentDidMount() {
    this.props.focusActivityHandler(this.props.match.params.userId);
  }

  goBack() {
    this.props.history.goBack();
  }

  render() {
    const {activity} = this.props;
    return (
      <div>
        {activity !== null ?
          <div>
            <a className="nav-back-link" onClick={this.goBack}>&lt;返回用户列表</a>
            <div className="table-row content-row">
              <div className="table-row-part flex-d-row">
                <div className="float-left">
                  <div className="flex-1 activity-text-row">启用报名，开启审批15324254426</div>
                  <div className="flex-1 activity-text-row">发布人: 王维</div>
                </div>
              </div>
              <div className="table-row-part">
                <div className="float-right">
                  <div className="flex-1 activity-text-row text-align-right">2018/07/24</div>
                  <div className="flex-1 activity-text-row text-align-right">签到人数: 0</div>
                </div>
              </div>
            </div>
            <UserAuthList pageable={true}/>
          </div>
          : ''}
      </div>
    );
  }
}

export default connect(
  (state: AppState, ownProps: any) => ({
    user: state.activityLogic.focusUser,
  }),
  {
    focusActivityHandler: focusActivity,
  }
)(ActivityDetail);
