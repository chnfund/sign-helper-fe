import {HOST} from '@src/app/commons/config';
import {convertToParams, headerWithToken} from '@src/app/util/fetchUtils';

export function getActivitiesBySignInUserId(id: number) {
  return fetch(`${HOST}/activity/userId/${id}`)
    .then(res => res.json());
}

export const getActivities = (pageIndex) => {
  return fetch(`${HOST}/admin/meeting/list-meeting?${convertToParams({
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
