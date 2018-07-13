import * as userApi from '@src/app/lib/userService';
import {User} from '@src/types/application';

const LOAD_USERS = 'LOAD_USERS';

const REPLACE_USER = 'REPLACE_USER';

const loadUsers = (users) => ({type: LOAD_USERS, payload: users});
const replaceUser = (user) => ({type: REPLACE_USER, payload: user});

export const fetchUsers = () => {
  return (dispatch) => {
    userApi.getUsers()
      .then((users) =>
        dispatch(loadUsers(users))
      );
  };
};

export const authPass = (id) => {
  return (dispatch, getState) => {
    const {users} = getState();
    const user: User = users.find(t => t.id === id);
    const tmpUser: User = {...user, authPassed: 1};
    userApi.updateUser(tmpUser)
      .then(res => dispatch(replaceUser(res)));
  };
};

export const authNotPass = (id) => {
  return (dispatch, getState) => {
    const {users} = getState();
    const user: User = users.find(t => t.id === id);
    const tmpUser: User = {...user, authPassed: 0};
    userApi.updateUser(tmpUser)
      .then(res => dispatch(replaceUser(res)));
  };
};

export default (state: User[] = [], action) => {
  switch (action.type) {
    case LOAD_USERS:
      return action.payload;
    case REPLACE_USER:
      return state.map(u => u.id === action.payload.id ? action.payload : u);
    default:
      return state;
  }
};
