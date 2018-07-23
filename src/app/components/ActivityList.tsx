import * as React from 'react';
import {connect} from 'react-redux';

import {fetchActivity} from '@src/app/reducers/activity';
import {Activity, AppState} from '@src/types/application';

type Props = {
  activities: Activity[];
  fetchActivityHandler: (pageIndex: number) => any;
};

class ActivityList extends React.Component<Props> {

  componentDidMount() {
    this.props.fetchActivityHandler(1);
  }

  render() {
    const {activities} = this.props;

    return (
      <div>
        {activities.map(meeting => (
          <div key={meeting.id} className="table-row content-row">
            <div className="table-row-part flex-d-row">
              <div className="float-left">
                <div className="flex-1 activity-text-row">
                  {meeting.title.substring(0, 20)}
                </div>
                <div className="flex-1 activity-text-row">
                  发布人: {meeting.position} {meeting.fullName}
                </div>
              </div>
            </div>
            <div className="table-row-part">
              <div className="float-right">
                <div className="flex-1 activity-text-row text-align-right">
                  {meeting.showTime}
                </div>
                <div className="flex-1 activity-text-row text-align-right">
                  签到人数: {meeting.signinNumber}
                </div>
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
    activities: state.activityLogic.activities,
  }),
  {
    fetchActivityHandler: fetchActivity,
  }
)(ActivityList);
