import * as React from 'react';

import {TabItem} from '@src/types/application';

type Props = {
  tabs: TabItem[];
};

class TabSwitcher extends React.Component<Props> {
  render() {
    return (
      <div className="check-state-tab">
        {
          this.props.tabs.map(
            t => (
              <div key={t.title} className={'check-state-tab-item' + (t.isActive ? ' active' : '')}>
                {t.title}
              </div>
            )
          )
        }
      </div>
    );
  }
}

export default TabSwitcher;
