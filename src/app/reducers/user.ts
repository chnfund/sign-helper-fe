import {USER_AUTH_STATE} from '@src/app/commons/const';
import * as userApi from '@src/app/lib/userService';
import {User, UserLogicState} from '@src/types/application';

const LOAD_USERS = 'LOAD_USERS';
const REPLACE_USER = 'REPLACE_USER';
const USER_AUTH_UNPASS_REASON_CHANGE = 'USER_AUTH_UNPASS_REASON_CHANGE';
const USER_AUTH_UNPASS_CANCEL = 'USER_AUTH_UNPASS_CANCEL';
const SHOW_AUTH_UNPASS_DIALOG = 'SHOW_AUTH_UNPASS_DIALOG';

const loadUsers = (users) => ({type: LOAD_USERS, payload: users});
const replaceUser = (user) => ({type: REPLACE_USER, payload: user});
export const userAuthUnpassReasonChange = (txt) => ({type: USER_AUTH_UNPASS_REASON_CHANGE, payload: txt});
export const userAuthUnpassOpeCancel = () => ({type: USER_AUTH_UNPASS_CANCEL});
export const showAuthUnpassDialog = (id) => ({type: SHOW_AUTH_UNPASS_DIALOG, payload: id});

export const fetchUsers = (authState: number, pageIndex) => {
  return (dispatch) => {
    userApi.getUsers(authState, pageIndex)
      .then((res) =>
        dispatch(loadUsers(res.data))
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

export const filterUserBuyAuthState = (users: User[], authState: number) => {
  return users.filter(u => u.authenticateState === authState);
};

export default (
  state: UserLogicState = {
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
    default:
      return state;
  }
};
