import * as React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import Dialog from '@src/app/components/Dialog';
import ModalWrapper from '@src/app/components/ModalWrapper';
import TabContent from '@src/app/components/TabContent';
import TabNav from '@src/app/components/TabNav';

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
        <Router>
          <div className="main-space-wrapper">
            <TabNav/>
            <TabContent contents={[]}/>
          </div>
        </Router>
        <ModalWrapper>
          <Dialog title="title goes here">
            this is dialog content.
          </Dialog>
        </ModalWrapper>
      </div>
    );
  }
}

export default RootApp;
