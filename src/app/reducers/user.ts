import {USER_AUTH_STATE} from '@src/app/commons/const';
import * as userApi from '@src/app/lib/userService';
import {FETCH_ACTIVITY_DETAIL} from '@src/app/reducers/activity';
import {pushPath} from '@src/app/reducers/tab';
import {PageItem, User, UserLogicState} from '@src/types/application';

const LOAD_USERS = 'LOAD_USERS';
const REPLACE_USER = 'REPLACE_USER';
const USER_AUTH_UNPASS_REASON_CHANGE = 'USER_AUTH_UNPASS_REASON_CHANGE';
const USER_AUTH_UNPASS_CANCEL = 'USER_AUTH_UNPASS_CANCEL';
const SHOW_AUTH_UNPASS_DIALOG = 'SHOW_AUTH_UNPASS_DIALOG';
const ACTIVE_USER_LIST_PAGE = 'ACTIVE_USER_LIST_PAGE';

const loadUsers = (users) => ({type: LOAD_USERS, payload: users});
const replaceUser = (user) => ({type: REPLACE_USER, payload: user});
export const userAuthUnpassReasonChange = (txt) => ({type: USER_AUTH_UNPASS_REASON_CHANGE, payload: txt});
export const userAuthUnpassOpeCancel = () => ({type: USER_AUTH_UNPASS_CANCEL});
export const showAuthUnpassDialog = (id) => ({type: SHOW_AUTH_UNPASS_DIALOG, payload: id});
export const activePage = (id) => ({type: ACTIVE_USER_LIST_PAGE, payload: id});

export const fetchUsers = (authState: number, pageIndex) => {
  return (dispatch) => {
    userApi.getUsers(authState, pageIndex)
      .then((res) =>
        dispatch(loadUsers(res.data.data))
      );
  };
};

export const authUser = (id, authState, userCategory) => {
  return (dispatch, getState) => {
    const {users, authUnpassInfo} = getState().userLogic;
    const user: User = users.find(t => t.id === id);
    const tmpUser: User = {
      ...user,
      authenticateState: authState,
      userCategory: userCategory,
      authenticateDenyReason: authUnpassInfo.authUnPassReason,
    };
    userApi.authUserFetch(
      tmpUser.id,
      tmpUser.authenticateState,
      tmpUser.userCategory,
      tmpUser.authenticateDenyReason
    )
      .then(res => dispatch(replaceUser(tmpUser)));
  };
};

export const unpassOpeConfirm = () => {
  return (dispatch, getState) => {
    const {users, authUnpassInfo} = getState().userLogic;
    const user: User = users.find(t => t.id === authUnpassInfo.userId);
    const tmpUser: User = {
      ...user,
      authenticateState: USER_AUTH_STATE.DENY,
      userCategory: null,
      authenticateDenyReason: authUnpassInfo.authUnPassReason,
    };
    userApi.authUserFetch(
      tmpUser.id,
      tmpUser.authenticateState,
      tmpUser.userCategory,
      tmpUser.authenticateDenyReason
    )
      .then(res => dispatch(replaceUser(tmpUser)));
  };
};

export const userPageNav = (authState, id) => {
  return (dispatch, getState) => {
    const {userLogic} = getState();
    let currentPageIndex = getCurrentPageIndex(userLogic.pages);
    switch (id) {
      case '-1':
        if (currentPageIndex === 1) {
          break;
        }
        currentPageIndex = currentPageIndex - 1;
        break;
      case '+1':
        currentPageIndex = currentPageIndex + 1;
        break;
      default:
        currentPageIndex = id;
    }

    userApi.getUsers(authState, currentPageIndex)
      .then((res) => {
          if (res.data.data.length === 0) {
            return;
          }
          return dispatch(loadUsers(res.data.data));
        }
      );

    // dispatch(activePage(currentPageIndex));
  };
};

export const getCurrentPageIndex = (pages: PageItem[]) => {
  const tmpItem = pages.find(p => p.active === true);
  if (tmpItem) {
    return tmpItem.id;
  } else {
    return 1;
  }
};

export const filterUserBuyAuthState = (users: User[], authState: number) => {
  return users.filter(u => u.authenticateState === authState);
};

export const showSignedActivity = (userId) => {
  return (dispatch, getState) => {
    dispatch(pushPath(`/application/auth-wait/users/user-sign-in-activities/${userId}`));
  };
};

export default (
  state: UserLogicState = {
    pages: [{
      id: 1,
      active: true,
    }, {
      id: 2,
      active: false,
    }],
    pageSize: 20,
    users: [],
    authUnpassInfo: {
      userId: '',
      authUnPassReason: '',
      unpassDialogShow: false,
    },
  },
  action
) => {
  switch (action.type) {
    case LOAD_USERS:
      return {...state, users: action.payload};
    case REPLACE_USER:
      return {
        ...state,
        users: state.users.map(u => u.id === action.payload.id ? action.payload : u),
        authUnpassInfo: {
          ...state.authUnpassInfo,
          userId: '',
          authUnPassReason: '',
          unpassDialogShow: false,
        },
      };
    case USER_AUTH_UNPASS_REASON_CHANGE:
      return {
        ...state,
        authUnpassInfo: {
          ...state.authUnpassInfo,
          authUnPassReason: action.payload,
        },
      };
    case SHOW_AUTH_UNPASS_DIALOG:
      return {
        ...state,
        authUnpassInfo: {
          ...state.authUnpassInfo,
          userId: action.payload,
          unpassDialogShow: true,
        },
      };
    case USER_AUTH_UNPASS_CANCEL:
      return {
        ...state,
        authUnpassInfo: {
          ...state.authUnpassInfo,
          userId: '',
          authUnPassReason: '',
          unpassDialogShow: false,
        },
      };
    case ACTIVE_USER_LIST_PAGE:
      return {
        ...state,
        pages: state.pages.map(p =>
          p.id === action.payload ?
            {...p, active: true} :
            {...p, active: false}
        ),
      };
    case FETCH_ACTIVITY_DETAIL:
      return {
        ...state,
        users: action.payload.signinUsers,
      };
    default:
      return state;
  }
};
