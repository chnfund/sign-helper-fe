import {HOST} from '@src/app/commons/config';

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

export const getUsers = () => {
  return fetch(`${HOST}/user`)
    .then(res => res.json());
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
