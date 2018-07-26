import {getActivities, getActivityDetailById} from '@src/app/lib/activityService';
import * as userApi from '@src/app/lib/userService';
import {showMessage} from '@src/app/reducers/message';
import {pushPath, REACT_ROUTER_PUSH_ACTION} from '@src/app/reducers/tab';
import {ActivityLogicState} from '@src/types/application';

const LOAD_MEETING = 'LOAD_MEETING';
const ACTIVITY_FOCUS_USER = 'ACTIVITY_FOCUS_USER';
export const FETCH_ACTIVITY_DETAIL = 'FETCH_ACTIVITY_DETAIL';
const ACTIVITY_LIST_GO_TO_PAGE = 'ACTIVITY_LIST_GO_TO_PAGE';
const ACTIVITY_LIST_PAGE_DISABLE_PREV = 'ACTIVITY_LIST_PAGE_DISABLE_PREV';
const ACTIVITY_LIST_PAGE_DISABLE_NEXT = 'ACTIVITY_LIST_PAGE_DISABLE_NEXT';

const loadMeeting = (meetings) => ({type: LOAD_MEETING, payload: meetings});
export const activePage = (id) => ({type: ACTIVITY_LIST_GO_TO_PAGE, payload: id});

export const focusUser = (userId) => {
  return (dispatch, getState) => {
    dispatch(showMessage('开始载入选择用户的信息...'));
    userApi.getUserById(userId).then(
      res => {
        if (res.data.success) {
          dispatch({type: ACTIVITY_FOCUS_USER, payload: res.data.data});
          dispatch(showMessage('载入选择用户的信息完成'));
        } else {
          dispatch(showMessage(res.data.msg));
        }
      }
    );
  };
};

export const fetchActivity = (userId, pageIndex) => {
  return (dispatch) => {
    getActivities(userId, pageIndex)
      .then(
        (res) => dispatch(loadMeeting(res.data.data.list))
      );
  };
};

export const pageNav = (pageIndex) => {
  return (dispatch, getState) => {
    const {activityLogic} = getState();
    let currentPageIndex = activityLogic.page.currentPageIndex;
    switch (pageIndex) {
      case '-1':
        if (currentPageIndex === 1) {
          dispatch({type: ACTIVITY_LIST_PAGE_DISABLE_PREV});
          return;
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
      .then((res) => {
        if (res.data.data.list.length === 0) {
          if (pageIndex === '-1') {
            dispatch({type: ACTIVITY_LIST_PAGE_DISABLE_PREV});
          } else if (pageIndex === '+1') {
            dispatch({type: ACTIVITY_LIST_PAGE_DISABLE_NEXT});
          }
          return;
        } else {
          dispatch(activePage(currentPageIndex));
          dispatch(loadMeeting(res.data.data.list));
        }
      });
  };
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
    page: {
      pages: [1, 2],
      currentPageIndex: 1,
      pageSize: 20,
      prevPageAvailable: true,
      nextPageAvailable: true,
    },
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
    case ACTIVITY_LIST_GO_TO_PAGE:
      return {
        ...state,
        page: {
          ...state.page,
          currentPageIndex: action.payload,
          prevPageAvailable: true,
          nextPageAvailable: true,
        },
      };
    case ACTIVITY_LIST_PAGE_DISABLE_PREV:
      return {
        ...state,
        page: {
          ...state.page,
          prevPageAvailable: false,
          nextPageAvailable: true,
        },
      };
    case ACTIVITY_LIST_PAGE_DISABLE_NEXT:
      return {
        ...state,
        page: {
          ...state.page,
          prevPageAvailable: true,
          nextPageAvailable: false,
        },
      };
    default:
      return state;
  }
};
