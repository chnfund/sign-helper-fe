export type AppState = {
  todo: TodoState;
  message: string;
  tabLogic: TabLogicState;
  userLogic: UserLogicState;
};

export type TodoState = {
  todos: TodoItemState[];
  currentTodo: string;
  filter: string;
};

export type TodoItemState = {
  id: number;
  name: string;
  isComplete: boolean;
};

export type TabLogicState = {
  tabs: TabItem[];
};

export type TabItem = {
  id: number;
  title: string;
  isActive: boolean;
  parentId: number;
  relContent: string;
};

export type UserLogicState = {
  users: User[];
  authUnpassInfo: AuthUnpassInfo;
};

export type User = {
  id: number;
  name: string;
  phoneNumber: number;
  companyType: string;
  companyName: string;
  role: string;
  activitySignCount: number;
  authPassed: number;
};

export type AuthUnpassInfo = {
  userId: string;
  authUnPassReason: string;
  unpassDialogShow: false;
};
