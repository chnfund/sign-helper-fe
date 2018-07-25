import {SYS_CODE, TOKEN_KEY} from '@src/commons/const';

export const headerWithToken = (otherHeader) => ({
  ...otherHeader,
  token: localStorage.getItem(TOKEN_KEY),
});

export const processResult = (result, dispatch) => {
  if (result.success) {
    return result.data;
  } else {
    processError(result, dispatch);
  }
};

export const processError = (result, dispatch) => {
  if (result.data === SYS_CODE.NOT_LOGIN) {
    console.log(result.data);
  }
};

export const convertToParams = (obj: object) => {
  let str = '';
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (str !== '') {
        str += '&';
      }
      str += `${key}=${obj[key]}`;
    }
  }
  return str;
};
