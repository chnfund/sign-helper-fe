import * as React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import TabSwitcher from '@src/app/components/TabSwitcher';

type Props = {
  title?: string;
  targetAddress?: string;
  pushToTarget?: void;
  currentTodo?: string;
  updateCurrent?: (val: any) => void;
};

class RootApp extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
  }

  render(): React.ReactNode {

    const tabs = [{
      title: '待审核',
      isActive: true,
    }, {
      title: '已审核',
      isActive: false,
    }];

    return (
      <div className="App">
        <header className="App-header">
          <div className="App-logo">🐯</div>
        </header>
        <Router>
          <div className="main-space-wrapper">
            <TabSwitcher tabs={tabs}/>
            <div className="main-space">
              <div className="user-activity-switch-wrapper content-row">
                <div className="switch-item-group">
                  <div className="switch-item active">待审核用户</div>
                  <div className="switch-item">活动列表</div>
                </div>
              </div>
              <div className="table-header content-row">
                <span className="table-header-item text-align-left">用户个人资料 | 来源</span>
                <span className="table-header-item">审核结果</span>
              </div>
              <div className="table-row content-row">
                <div className="table-row-part flex-d-row">
                  <div className="company-card-img-holder float-left"/>
                  <div className="custom-info float-left">
                    <div className="flex-1">
                      上市公司
                    </div>
                    <div className="flex-1">
                      余亮&nbsp;&nbsp;&nbsp;&nbsp;18888888888
                    </div>
                    <div className="flex-1">
                      万科A&nbsp;&nbsp;&nbsp;&nbsp;董秘
                    </div>
                  </div>
                </div>
                <div className="table-row-part">
                  <div className="button-group-wrapper">
                    <button className="operate-btn">不通过</button>
                    <button className="operate-btn">不通过</button>
                    <button className="operate-btn">不通过</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default RootApp;
