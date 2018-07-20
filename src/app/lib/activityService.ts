import {HOST} from '@src/app/commons/config';

export function getActivitiesBySignInUserId(id: number) {
  return fetch(`${HOST}/activity/userId/${id}`)
    .then(res => res.json());
}

export const getActivities = () => {
  return fetch(`${HOST}/activity`)
    .then(res => res.json());
};
