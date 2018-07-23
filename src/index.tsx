import * as React from 'react';
import * as ReactDom from 'react-dom';

import {createBrowserHistory} from 'history';
import {Provider} from 'react-redux';

import RootRouterApp from '@src/app/components/RootRouterApp';
import store from '@src/store';

import mainStyle from '@src/resource/css/main.css';
import normalizeStyle from '@src/resource/css/normalize.css';
import {cssRaw} from 'typestyle';

// import global css style: normalize & main style sheet.
cssRaw(`
${normalizeStyle}
${mainStyle}
`);

const history = createBrowserHistory();

ReactDom.render(
  <Provider store={store(history)}>
    <RootRouterApp history={history}/>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
