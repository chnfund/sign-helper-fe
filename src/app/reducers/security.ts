import {push} from 'react-router-redux';

import * as userApi from '@src/app/lib/userService';
import {showMessage} from '@src/app/reducers/message';
import {LOGIN_PHONE_NUMBER, TOKEN_KEY} from '@src/commons/const';
import {SecurityLogicState} from '@src/types/application';

const LOGIN_PHONE_NUMBER_CHANGE = 'LOGIN_PHONE_NUMBER_CHANGE';
const LOGIN_CAPTCHA_CHANGE = 'LOGIN_CAPTCHA_CHANGE';
const SHOW_WAIT_CAPTCHA_MESSAGE = 'SHOW_WAIT_CAPTCHA_MESSAGE';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const loginPhoneNC = (txt) => ({type: LOGIN_PHONE_NUMBER_CHANGE, payload: txt});
export const loginCaptchaC = (txt) => ({type: LOGIN_CAPTCHA_CHANGE, payload: txt});
const showWaitCaptchaMessage = () => ({type: SHOW_WAIT_CAPTCHA_MESSAGE});
const loginSuccess = (token) => ({type: LOGIN_SUCCESS, payload: token});

export const getCaptcha = () => {
  return (dispatch, getState) => {
    const {loginPhoneNumber} = getState().securityLogic;
    dispatch(showMessage('发送获取验证码请求..'));
    userApi.requestCaptcha(loginPhoneNumber)
      .then(res => {
        if (res.data.success) {
          dispatch(showWaitCaptchaMessage());
          dispatch(showMessage('验证码获取成功!'));
        } else {
          dispatch(showMessage('验证码获取失败, 错误消息:' + res.data.msg));
        }
      });
  };
};

export const loginSubmit = () => {
  return (dispatch, getState) => {
    const {loginPhoneNumber, loginCaptcha} = getState().securityLogic;
    userApi.loginSubmit(loginPhoneNumber, loginCaptcha)
      .then(res => {
        if (res.data.success) {
          localStorage.setItem(TOKEN_KEY, res.data.data);
          localStorage.setItem(LOGIN_PHONE_NUMBER, loginPhoneNumber);
          dispatch(loginSuccess(res.data.data));
          dispatch(push('application'));
        } else {
          dispatch(showMessage('登陆失败:' + res.data.msg));
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

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem(TOKEN_KEY);
    dispatch(push('/auth'));
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
