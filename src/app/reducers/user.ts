import {USER_CATEGORY} from '@src/app/commons/const';
import * as userApi from '@src/app/lib/userService';
import {AppState, User, UserLogicState} from '@src/types/application';

import {
  getRelContentPayload,
  TAB_AUTH_FAIL,
  TAB_AUTH_SUCCESS,
  TAB_USER_LIST_WAIT_FOR_AUTH
} from '@src/app/reducers/app';

export const AUTH_WAIT = 2;
export const AUTH_SUCCESS = 1;
export const AUTH_FAIL = 0;

const LOAD_USERS = 'LOAD_USERS';
const REPLACE_USER = 'REPLACE_USER';
const USER_AUTH_UNPASS_REASON_CHANGE = 'USER_AUTH_UNPASS_REASON_CHANGE';
const USER_AUTH_UNPASS_CANCEL = 'USER_AUTH_UNPASS_CANCEL';
const SHOW_AUTH_UNPASS_DIALOG = 'SHOW_AUTH_UNPASS_DIALOG';
const LOGIN_PHONE_NUMBER_CHANGE = 'LOGIN_PHONE_NUMBER_CHANGE';
const LOGIN_CAPTCHA_CHANGE = 'LOGIN_CAPTCHA_CHANGE';
const SHOW_WAIT_CAPTCHA_MESSAGE = 'SHOW_WAIT_CAPTCHA_MESSAGE';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const SHOW_MESSAGE = 'SHOW_MESSAGE';

const loadUsers = (users) => ({type: LOAD_USERS, payload: users});
const replaceUser = (user) => ({type: REPLACE_USER, payload: user});
export const userAuthUnpassReasonChange = (txt) => ({type: USER_AUTH_UNPASS_REASON_CHANGE, payload: txt});
export const userAuthUnpassOpeCancel = () => ({type: USER_AUTH_UNPASS_CANCEL});
export const showAuthUnpassDialog = (id) => ({type: SHOW_AUTH_UNPASS_DIALOG, payload: id});
export const loginPhoneNC = (txt) => ({type: LOGIN_PHONE_NUMBER_CHANGE, payload: txt});
export const loginCaptchaC = (txt) => ({type: LOGIN_CAPTCHA_CHANGE, payload: txt});
const showWaitCaptchaMessage = () => ({type: SHOW_WAIT_CAPTCHA_MESSAGE});
const loginSuccess = (token) => ({type: LOGIN_SUCCESS, payload: token});
const showMessage = (msg) => ({type: SHOW_MESSAGE, payload: msg});

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

export const getCaptcha = () => {
  return (dispatch, getState) => {
    const {loginPhoneNumber} = getState().userLogic.login;
    userApi.requestCaptcha(loginPhoneNumber)
      .then(res => {
        if (res.success) {
          dispatch(showWaitCaptchaMessage());
        }
      });
  };
};

export const loginSubmit = () => {
  return (dispatch, getState) => {
    const {loginPhoneNumber, loginCaptcha} = getState().userLogic.login;
    userApi.loginSubmit(loginPhoneNumber, loginCaptcha)
      .then(res => {
        if (res.success) {
          dispatch(loginSuccess(res.data));
        } else {
          dispatch(showMessage(res.data));
        }
      });
  };
};

export const setIRAndAuthPass = (id, irOrNot: boolean) => {
  return (dispatch, getState) => {
    const {users} = getState().userLogic;
    const user: User = users.find(t => t.id === id);
    const tmpUser: User = {
      ...user,
      authState: 1,
      isIR: irOrNot ? USER_CATEGORY.Company.IR : USER_CATEGORY.Company.NONE_IR,
    };
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
    login: {
      token: '2233',
      // token: null,
      loginPhoneNumber: '',
      loginCaptcha: '',
    },
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
    case LOGIN_PHONE_NUMBER_CHANGE:
      return {
        ...state,
        login: {
          ...state.login,
          loginPhoneNumber: action.payload,
        },
      };
    case LOGIN_CAPTCHA_CHANGE:
      return {
        ...state,
        login: {
          ...state.login,
          loginCaptcha: action.payload,
        },
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        login: {
          loginCaptcha: '',
          loginPhoneNumber: '',
          token: action.payload,
        },
      };
    default:
      return state;
  }
};
