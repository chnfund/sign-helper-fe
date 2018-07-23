import {getActivities} from '@src/app/lib/activityService';
import {ActivityLogicState} from '@src/types/application';

const LOAD_MEETING = 'LOAD_MEETING';

const loadMeeting = (meetings) => ({type: LOAD_MEETING, payload: meetings});

export const fetchActivity = (pageIndex) => {
  return (dispatch) => {
    getActivities(pageIndex)
      .then(
        (res) => dispatch(loadMeeting(res.data))
      );
  };
};

export default (
  state: ActivityLogicState = {
    activities: [],
  },
  action
) => {
  switch (action.type) {
    case LOAD_MEETING:
      return {
        ...state,
        activities: action.payload,
      };
    default:
      return state;
  }
};
