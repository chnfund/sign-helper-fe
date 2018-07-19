import {getActivities} from '@src/app/lib/activityService';
import {ActivityLogicState} from '@src/types/application';

const LOAD_MEETING = 'LOAD_MEETING';

const loadMeeting = (meetings) => ({type: LOAD_MEETING, payload: meetings});

export const fetchActivity = () => {
  return (dispatch) => {
    getActivities()
      .then(
        (meetings) => dispatch(loadMeeting(meetings))
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
