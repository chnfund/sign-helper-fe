import {HOST} from '@src/app/commons/config';
import {convertToParams, headerWithToken} from '@src/app/util/fetchUtils';

export const getActivityDetailById = (activityId) => {
  return fetch(`${HOST}/admin/meeting/get-auth-meeting-detail?${convertToParams({
    meetingId: activityId,
  })}`, {
    method: 'GET',
    headers: headerWithToken({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }),
  })
    .then(res => res.json());
};

export const getActivities = (userId, pageIndex) => {
  let paramsObject;
  if (userId !== null) {
    paramsObject = {
      userId,
      pageIndex,
    };
  } else {
    paramsObject = {
      pageIndex,
    };
  }
  return fetch(`${HOST}/admin/meeting/list-meeting?${convertToParams(paramsObject)}`, {
    method: 'GET',
    headers: headerWithToken({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }),
  })
    .then(res => res.json());
};
