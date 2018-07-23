import * as React from 'react';
import {connect} from 'react-redux';

import Dialog from '@src/app/components/Dialog';
import ModalWrapper from '@src/app/components/ModalWrapper';
import TabNav from '@src/app/components/TabNav';

import {
  getVisibleTabs,
  toggleTab
} from '@src/app/reducers/tab';
import {
  unpassOpeConfirm,
  userAuthUnpassOpeCancel,
  userAuthUnpassReasonChange
} from '@src/app/reducers/user';

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
    } = this.props;

    const handleReasonChange = (evt) => {
      const val = evt.target.value;
      authUnpassReasonChange(val);
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
            {this.props.children}
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
    toggleTabHandler: toggleTab,
  }
)(Application);
