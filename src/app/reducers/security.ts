import {push} from 'react-router-redux';

import {TOKEN_KEY} from '@src/app/commons/const';
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
    const {loginPhoneNumber, loginCaptcha} = getState().securityLogic;
    userApi.loginSubmit(loginPhoneNumber, loginCaptcha)
      .then(res => {
        if (res.success) {
          localStorage.setItem(TOKEN_KEY, res.data);
          dispatch(loginSuccess(res.data));
          dispatch(push('application'));
        } else {
          dispatch(showMessage(res.data));
        }
      });
  };
};

export const verifyToken = () => {
  return (dispatch) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token === null) {
      dispatch(push('/auth'));
    }
  };
};

export default (
  state: SecurityLogicState = {
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
        token: action.payload,
      };
    default:
      return state;
  }
};
