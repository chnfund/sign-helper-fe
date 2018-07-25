import axios from 'axios';

import {HOST} from '@src/commons/config';
import {convertToParams, headerWithToken} from '@src/app/util/fetchUtils';

export const getActivityDetailById = (activityId) => {
  return axios.get(`${HOST}/admin/meeting/get-auth-meeting-detail?${convertToParams({
    meetingId: activityId,
  })}`, {
    headers: headerWithToken({}),
  });
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
  return axios.get(`${HOST}/admin/meeting/list-meeting?${convertToParams(paramsObject)}`, {
    headers: headerWithToken({}),
  });
};
