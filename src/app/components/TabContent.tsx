import * as React from 'react';

import UserAuthList from '@src/app/components/mettingLogic/UserAuthList';

type Props = {
  contents: React.ReactNode[];
};

class TabContent extends React.Component<Props> {
  render() {
    return (
      <div className="main-space">
        <div className="user-activity-switch-wrapper content-row">
          <div className="switch-item-group">
            <div className="switch-item active">待审核用户</div>
            <div className="switch-item">活动列表</div>
          </div>
        </div>
        <UserAuthList/>
      </div>
    );
  }
}

export default TabContent;
