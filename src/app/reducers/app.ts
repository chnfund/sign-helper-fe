import * as activityApi from '@src/app/lib/activityService';
import {AppLogicState, AppState} from '@src/types/application';

export const TAB_WAIT_FOR_AUTH = 'TAB_WAIT_FOR_AUTH';
export const TAB_AUTH_COMPLETED = 'TAB_AUTH_COMPLETED';
export const TAB_AUTH_SUCCESS = 'TAB_AUTH_SUCCESS';
export const TAB_AUTH_FAIL = 'TAB_AUTH_FAIL';
export const TAB_USER_LIST_WAIT_FOR_AUTH = 'TAB_USER_LIST_WAIT_FOR_AUTH';
export const TAB_ACTIVITY_LIST = 'TAB_ACTIVITY_LIST';

export const SUPER_ACTIVITY_LIST = 'SUPER_ACTIVITY_LIST';
export const SUPER_ACTIVITY_USER_LIST = 'SUPER_ACTIVITY_USER_LIST';

export const ACTION_SHOW_SIGNED_ACTIVITY = 'ACTION_SHOW_SIGNED_ACTIVITY';
export const actionShowSignedActivity = (activities) => ({type: ACTION_SHOW_SIGNED_ACTIVITY, payload: activities});

export const showSignedActivity = (userId) => {
  return (dispatch, getState) => {
    activityApi.getActivitiesBySignInUserId(userId)
      .then(res => {
        if (res.success) {
          dispatch(actionShowSignedActivity(res.data));
        }
      });
  };
};

export const getRelContentPayload = (state: AppState) => {
  const {tabs} = state.tabLogic;
  let activeParentTabId = 0;
  const tmpTab = tabs.find(t => t.parentId === null && t.isActive === true);
  if (tmpTab !== null) {
    activeParentTabId = tmpTab.id;
  }
  const tmpActiveSecondTab = tabs.find(t => t.parentId === activeParentTabId && t.isActive === true);
  if (tmpActiveSecondTab.id >= 0) {
    return tmpActiveSecondTab.relContent;
  }
  return TAB_USER_LIST_WAIT_FOR_AUTH;
};

export default (
  state: AppLogicState = {
    superModeData: {
      userList: [],
      activityList: [],
    },
    isSuperModeActive: false,
    superModeContent: '',
  },
  action
) => {
  switch (action.type) {
    case ACTION_SHOW_SIGNED_ACTIVITY:
      return {
        ...state,
        isSuperModeActive: true,
        superModeContent: SUPER_ACTIVITY_LIST,
        superModeData: {
          ...state.superModeData,
          activityList: action.payload,
        },
      };
    default:
      return state;
  }
};
