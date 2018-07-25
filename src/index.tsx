import * as React from 'react';
import * as ReactDom from 'react-dom';

import {createHashHistory as createHistory} from 'history';
import {throttle} from 'lodash';
import {Provider} from 'react-redux';

import RootRouterApp from '@src/app/components/RootRouterApp';
import store from '@src/store';

import {APP_CONTEXT_PATH} from '@src/app/commons/config';
import {saveState} from '@src/localStorage';
import mainStyle from '@src/resource/css/main.css';
import normalizeStyle from '@src/resource/css/normalize.css';
import {cssRaw} from 'typestyle';

// import global css style: normalize & main style sheet.
cssRaw(`
${normalizeStyle}
${mainStyle}
`);

const history = createHistory({basename: APP_CONTEXT_PATH});

const storeImp = store(history);

storeImp.subscribe(throttle(() => {
  saveState({
    ...storeImp.getState(),
  });
}, 1000));

ReactDom.render(
  <Provider store={storeImp}>
    <RootRouterApp history={history}/>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
