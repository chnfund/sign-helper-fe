import * as userApi from '@src/app/lib/userService';
import {AppState, User, UserLogicState} from '@src/types/application';

import {
  getRelContentPayload,
  TAB_AUTH_FAIL,
  TAB_AUTH_SUCCESS,
  TAB_USER_LIST_WAIT_FOR_AUTH
} from '@src/app/reducers/tab';

export const AUTH_WAIT = 2;
export const AUTH_SUCCESS = 1;
export const AUTH_FAIL = 0;

export const COMPANY_TYPE = {
  LIST: 1,
  INSTI: 2,
};

export const IR_ENUM = {
  NOT_IR: 0,
  IS_IR: 1,
};

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

export const userAuthUnpassConfirm = () => {
  return (dispatch, getState) => {
    const {userLogic} = getState();
    const user: User = userLogic.users.find(t => t.id === userLogic.authUnpassInfo.userId);
    const tmpUser: User = {...user, authState: 0};
    userApi.updateUser(tmpUser)
      .then(res => dispatch(replaceUser(res)));
  };
};

export const fetchUsers = () => {
  return (dispatch) => {
    userApi.getUsers()
      .then((users) =>
        dispatch(loadUsers(users))
      );
  };
};

export const authPass = (id) => {
  return (dispatch, getState) => {
    const {users} = getState().userLogic;
    const user: User = users.find(t => t.id === id);
    const tmpUser: User = {...user, authState: 1};
    userApi.updateUser(tmpUser)
      .then(res => dispatch(replaceUser(res)));
  };
};

export const setIRAndAuthPass = (id, irOrNot: boolean) => {
  return (dispatch, getState) => {
    const {users} = getState().userLogic;
    const user: User = users.find(t => t.id === id);
    const tmpUser: User = {...user, authState: 1, isIR: irOrNot ? IR_ENUM.IS_IR : IR_ENUM.NOT_IR};
    userApi.updateUser(tmpUser)
      .then(res => dispatch(replaceUser(res)));
  };
};

export const getVisibleUsers = (state: AppState, users: User[]) => {
  const relContent = getRelContentPayload(state);

  switch (relContent) {
    case TAB_USER_LIST_WAIT_FOR_AUTH:
      return users.filter(u => u.authState === AUTH_WAIT);
    case TAB_AUTH_FAIL:
      return users.filter(u => u.authState === AUTH_FAIL);
    case TAB_AUTH_SUCCESS:
      return users.filter(u => u.authState === AUTH_SUCCESS);
    default:
      return users;
  }

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
