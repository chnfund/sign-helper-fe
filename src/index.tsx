import * as React from 'react';
import * as ReactDom from 'react-dom';

import {Provider} from 'react-redux';

import RootApp from '@src/app/components/RootApp';
import store from '@src/store';

import mainStyle from '@src/resource/css/main.css';
import normalizeStyle from '@src/resource/css/normalize.css';
import {cssRaw} from 'typestyle';

// import global css style: normalize & main style sheet.
cssRaw(`
${normalizeStyle}
${mainStyle}
`);

ReactDom.render(
    <Provider store={store}>
        <RootApp/>
    </Provider>,
    document.getElementById('root') as HTMLElement
);
