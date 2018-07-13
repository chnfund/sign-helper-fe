import * as React from 'react';

import {toggleTab} from '@src/app/reducers/tab';
import {AppState, TabItem} from '@src/types/application';
import {connect} from 'react-redux';

type Props = {
  tabs: TabItem[];
  toggleTabHandler: any;
};

class TabNav extends React.Component<Props> {

  render() {

    const {toggleTabHandler} = this.props;

    // we can get customized param & event object in this way
    const clickHandler = (tabItem) => (evt) => {
      if (tabItem.isActive === false) {
        toggleTabHandler(tabItem);
      }
    };

    return (
      <div className="tab-nav">
        {
          this.props.tabs.map(
            t => (
              <div
                key={t.key}
                className={'tab-nav-item' + (t.isActive ? ' active' : '')}
                onClick={clickHandler(t)}
              >
                {t.title}
              </div>
            )
          )
        }
      </div>
    );
  }
}

export default connect(
  (state: AppState) => ({
    tabs: state.tab,
  }),
  {
    toggleTabHandler: toggleTab,
  }
)(TabNav);
