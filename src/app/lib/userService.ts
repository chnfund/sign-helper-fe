import {HOST} from '@src/app/commons/config';
import {convertToParams, headerWithToken} from '@src/app/util/fetchUtils';

export const requestCaptcha = (loginPhoneNumber: string) => {
  return fetch(`${HOST}/sms/send-captcha`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      mobile: loginPhoneNumber,
      action: 2,
    }),
  }).then(res => res.json());
};

export const loginSubmit = (loginPhoneNumber, loginCaptcha) => {
  return fetch(`${HOST}/admin/login`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      phoneNumber: loginPhoneNumber,
      verifyCode: loginCaptcha,
    }),
  }).then(res => res.json());
};

export const getUsers = (authState: number, pageIndex) => {
  return fetch(`${HOST}/admin/user/list-auth-user?${convertToParams({
    authState,
    pageIndex,
  })}`, {
    method: 'GET',
    headers: headerWithToken({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }),
  })
    .then(res => res.json());
};

export const authUserFetch = (userId, authState, userCategory, denyReason) => {
  return fetch(`${HOST}/admin/user/auth`, {
    method: 'POST',
    headers: headerWithToken({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({
      userId,
      authState,
      userCategory,
      denyReason,
    }),
  }).then(res => res.json());
};
