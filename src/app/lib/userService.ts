import {HOST} from '@src/app/commons/config';
import {SYS_CODE} from '@src/app/commons/const';

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

export const getUsers = (dispatch) => {
  return fetch(`${HOST}/admin/user/list-auth-user`)
    .then(res => res.json().then(result => {
      processResult(result, dispatch);
    }));
};

export const updateUser = (user) => {
  return fetch(`${HOST}/user/${user.id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  }).then(res => res.json());
};

const processResult = (result, dispatch) => {
  if (result.success) {
    return result.data;
  } else {
    processError(result, dispatch);
  }
};

const processError = (result, dispatch) => {
  if (result.data === SYS_CODE.NOT_LOGIN) {
    console.log(result.data);
  }
};
