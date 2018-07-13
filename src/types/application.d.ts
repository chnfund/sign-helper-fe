export type AppState = {
  todo: TodoState;
  message: string;
  tab: TabItem[];
  users: User[];
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

export type TabItem = {
  key: number;
  title: string;
  isActive: boolean;
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
