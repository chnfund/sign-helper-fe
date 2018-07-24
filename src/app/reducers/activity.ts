import {getActivities} from '@src/app/lib/activityService';
import {ActivityLogicState, PageItem} from '@src/types/application';

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

    getActivities(currentPageIndex)
      .then(
        (res) => dispatch(loadMeeting(res.data))
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
