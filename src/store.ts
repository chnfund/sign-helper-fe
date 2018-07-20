import {routerMiddleware} from 'react-router-redux';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import activityReducer from '@src/app/reducers/activity';
import appReducer from '@src/app/reducers/app';
import tabReducer from '@src/app/reducers/tab';
import userReducer from '@src/app/reducers/user';
import {createBrowserHistory} from 'history';

const reducer = combineReducers({
  tabLogic: tabReducer,
  userLogic: userReducer,
  activityLogic: activityReducer,
  appLogic: appReducer,
});

export default createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(
      thunk,
      routerMiddleware(createBrowserHistory())
    )
  )
);
