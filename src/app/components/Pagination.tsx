import * as React from 'react';

import {PageItem} from '@src/types/application';

type Props = {
  pages: PageItem[];
  clickHandler: any;
  style?: any;
  className?: string;
};

class Pagination extends React.Component<Props> {

  render() {
    const {clickHandler} = this.props;

    const clickHandlerWrapper = (evt) => clickHandler(evt.target.value);

    return (
      <div style={...this.props.style} className={this.props.className}>
        <button
          key={'-1'}
          className="btn btn-default"
          onClick={clickHandlerWrapper}
          value={'-1'}
        >
          {'<'}
        </button>
        {/*{this.props.pages.map(p => (*/}
          {/*<button*/}
            {/*key={p.id}*/}
            {/*className={'btn' + (p.active ? ' btn-info' : ' btn-default')}*/}
            {/*disabled={p.active}*/}
            {/*onClick={clickHandlerWrapper}*/}
            {/*value={p.id}*/}
          {/*>*/}
            {/*{p.id}*/}
          {/*</button>*/}
        {/*))}*/}
        <button
          key={'+1'}
          className="btn btn-default"
          onClick={clickHandlerWrapper}
          value={'+1'}
        >
          {'>'}
        </button>
      </div>
    );
  }
}

export default Pagination;