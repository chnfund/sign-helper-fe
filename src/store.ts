import {connectRouter, routerMiddleware} from 'connected-react-router';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import activityReducer from '@src/app/reducers/activity';
import appReducer from '@src/app/reducers/app';
import securityReducer from '@src/app/reducers/security';
import tabReducer from '@src/app/reducers/tab';
import userReducer from '@src/app/reducers/user';

const reducer = combineReducers({
  tabLogic: tabReducer,
  userLogic: userReducer,
  activityLogic: activityReducer,
  appLogic: appReducer,
  securityLogic: securityReducer,
});

export default (history) => createStore(
  connectRouter(history)(reducer),
  composeWithDevTools(
    applyMiddleware(
      thunk,
      routerMiddleware(history)
    )
  )
);
