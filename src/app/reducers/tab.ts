import {TabItem} from '@src/types/application';

const initState = [{
  key: 0,
  title: '待审核',
  isActive: true,
}, {
  key: 1,
  title: '已审核',
  isActive: false,
}];

const TOGGLE_TAB = 'TOGGLE_TAB';

export const toggleTab = (tab) => ({type: TOGGLE_TAB, payload: tab});

export default (state: TabItem[] = initState, action) => {
  switch (action.type) {
    case TOGGLE_TAB:
      return state.map(t =>
        t.key === action.payload.key && action.payload.isActive === false
          ? {...action.payload, isActive: true} : {...t, isActive: false});
    default:
      return state;
  }
};
