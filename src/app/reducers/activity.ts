import {getActivities, getActivityDetailById} from '@src/app/lib/activityService';
import * as userApi from '@src/app/lib/userService';
import {pushPath, REACT_ROUTER_PUSH_ACTION} from '@src/app/reducers/tab';
import {ActivityLogicState, PageItem} from '@src/types/application';

const LOAD_MEETING = 'LOAD_MEETING';
const ACTIVITY_FOCUS_USER = 'ACTIVITY_FOCUS_USER';
export const FETCH_ACTIVITY_DETAIL = 'FETCH_ACTIVITY_DETAIL';

const loadMeeting = (meetings) => ({type: LOAD_MEETING, payload: meetings});
export const focusUser = (userId) => {
  return (dispatch, getState) => {
    userApi.getUserById(userId).then(
      res => dispatch({type: ACTIVITY_FOCUS_USER, payload: res.data.data})
    );
  };
};

export const fetchActivity = (userId, pageIndex) => {
  return (dispatch) => {
    getActivities(userId, pageIndex)
      .then(
        (res) => dispatch(loadMeeting(res.data.data))
      );
  };
};

export const pageNav = (pageIndex) => {
  return (dispatch, getState) => {
    const {activityLogic} = getState();
    let currentPageIndex = getCurrentPageIndex(activityLogic.pages);
    switch (pageIndex) {
      case '-1':
        if (currentPageIndex === 1) {
          break;
        }
        currentPageIndex = currentPageIndex - 1;
        break;
      case '+1':
        currentPageIndex = currentPageIndex + 1;
        break;
      default:
        currentPageIndex = pageIndex;
    }

    getActivities(activityLogic.focusUserId, currentPageIndex)
      .then(
        (res) => dispatch(loadMeeting(res.data.data))
      );

    // dispatch(activePage(currentPageIndex));
  };
};

export const getCurrentPageIndex = (pages: PageItem[]) => {
  const tmpItem = pages.find(p => p.active === true);
  if (tmpItem) {
    return tmpItem.id;
  } else {
    return 1;
  }
};

export const showActivityDetail = (meetingId) => {
  return (dispatch, getState) => {
    dispatch(pushPath(`/application/auth-wait/activities/activity-detail/${meetingId}`));
  };
};

export const focusActivity = (activityId) => {
  return (dispatch, getState) => {
    getActivityDetailById(activityId).then(
      res => dispatch({
        type: FETCH_ACTIVITY_DETAIL,
        payload: res.data.data,
      })
    );
  };
};

export default (
  state: ActivityLogicState = {
    pages: [{
      id: 1,
      active: true,
    }, {
      id: 2,
      active: false,
    }],
    pageSize: 20,
    focusUserId: null,
    focusUser: null,
    focusActivity: null,
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
    case ACTIVITY_FOCUS_USER:
      return {
        ...state,
        focusUserId: action.payload.id,
        focusUser: action.payload,
      };
    case REACT_ROUTER_PUSH_ACTION:
      return {
        ...state,
        focusUserId: action.payload.location.pathname.includes('user-sign-in-activities')
          ? state.focusUserId
          : null,
        focusUser: action.payload.location.pathname.includes('user-sign-in-activities')
          ? state.focusUser
          : null,
      };
    case FETCH_ACTIVITY_DETAIL:
      return {
        ...state,
        focusActivity: action.payload,
      };
    default:
      return state;
  }
};
