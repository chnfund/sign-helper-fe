import * as React from 'react';

import {TabItem} from '@src/types/application';

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
                key={t.id}
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

export default TabNav;
