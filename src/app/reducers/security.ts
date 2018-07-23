import {push} from 'react-router-redux';

import * as userApi from '@src/app/lib/userService';
import {SecurityLogicState} from '@src/types/application';

const LOGIN_PHONE_NUMBER_CHANGE = 'LOGIN_PHONE_NUMBER_CHANGE';
const LOGIN_CAPTCHA_CHANGE = 'LOGIN_CAPTCHA_CHANGE';
const SHOW_WAIT_CAPTCHA_MESSAGE = 'SHOW_WAIT_CAPTCHA_MESSAGE';
const SHOW_MESSAGE = 'SHOW_MESSAGE';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const loginPhoneNC = (txt) => ({type: LOGIN_PHONE_NUMBER_CHANGE, payload: txt});
export const loginCaptchaC = (txt) => ({type: LOGIN_CAPTCHA_CHANGE, payload: txt});
const showWaitCaptchaMessage = () => ({type: SHOW_WAIT_CAPTCHA_MESSAGE});
const loginSuccess = (token) => ({type: LOGIN_SUCCESS, payload: token});
const showMessage = (msg) => ({type: SHOW_MESSAGE, payload: msg});

export const getCaptcha = () => {
  return (dispatch, getState) => {
    const {loginPhoneNumber} = getState().securityLogic;
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

export const verifyToken = () => {
  return (dispatch, getState) => {
    // const {userLogic} = getState();
    // const token = userLogic.token;
    // if (token === null) {
      dispatch(push('auth'));
    // }
  };
};

export default (
  state: SecurityLogicState = {
    token: null,
    // token: null,
    loginPhoneNumber: '',
    loginCaptcha: '',
  },
  action
) => {
  switch (action.type) {
    case LOGIN_PHONE_NUMBER_CHANGE:
      return {
        ...state,
        loginPhoneNumber: action.payload,
      };
    case LOGIN_CAPTCHA_CHANGE:
      return {
        ...state,
        loginCaptcha: action.payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginCaptcha: '',
        loginPhoneNumber: '',
        token: action.payload,
      };
    default:
      return state;
  }
};
