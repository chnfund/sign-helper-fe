import {AppState, TabLogicState} from '@src/types/application';

const initState = {
  currentRelContent: null,
  lastRelContent: null,
  tabs: [{
    id: 0,
    title: '待审核',
    isActive: true,
    parentId: null,
  }, {
    id: 1,
    title: '已审核',
    isActive: false,
    parentId: null,
  }, {
    id: 2,
    title: '待审核用户',
    isActive: true,
    parentId: 0,
  }, {
    id: 3,
    title: '活动列表',
    isActive: false,
    parentId: 0,
  }, {
    id: 4,
    title: '通过',
    isActive: true,
    parentId: 1,
  }, {
    id: 5,
    title: '不通过',
    isActive: false,
    parentId: 1,
  }],
};

export const getVisibleTabs = (state: AppState, tabLevel: number) => {
  const {tabs} = state.tabLogic;
  let activeParentTabId = 0;
  const tmpTab = tabs.find(t => t.parentId === null && t.isActive === true);
  if (tmpTab.id >= 0) {
    activeParentTabId = tmpTab.id;
  }
  if (tabLevel === 1) {
    return tabs.filter(t => t.parentId === null);
  } else if (tabLevel === 2) {
    return tabs.filter(t => t.parentId !== null && t.parentId === activeParentTabId);
  }
  return [];
};

const TOGGLE_TAB = 'TOGGLE_TAB';

export const toggleTab = (tab) => ({type: TOGGLE_TAB, payload: tab});

export default (state: TabLogicState = initState, action) => {
  switch (action.type) {
    case TOGGLE_TAB:
      return {
        ...state,
        tabs: state.tabs.map(
          t => {
            if (t.id === action.payload.id && action.payload.isActive === false) {
              return {...action.payload, isActive: true};
            } else if (t.parentId === action.payload.parentId) {
              return {...t, isActive: false};
            } else {
              return t;
            }
          }
        ),
      };
    default:
      return state;
  }
};
