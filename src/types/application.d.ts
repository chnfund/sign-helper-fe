import {RouterState} from 'connected-react-router';

export type AppState = {
  message: string;
  tabLogic: TabLogicState;
  userLogic: UserLogicState;
  activityLogic: ActivityLogicState;
  appLogic: AppLogicState;
  securityLogic: SecurityLogicState;
  router: RouterState;
};

export type AppLogicState = {
  superModeContent: string;
  isSuperModeActive: boolean;
  superModeData: {
    userList: User[];
    activityList: Activity[];
  };
};

export type TabLogicState = {
  currentRelContent: string;
  lastRelContent: string;
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

export type SecurityLogicState = {
  loginPhoneNumber: string;
  loginCaptcha: string;
  token: string;
};

export type User = {
  id: number;
  name: string;
  phoneNumber: number;
  companyType: number;
  companyName: string;
  companySubTypeName: string;
  role: string;
  activitySignCount: number;
  authState: number;
  isIR: number;
  authFailReason: string;
};

export type ActivityLogicState = {
  activities: Activity[];
};

export type Activity = {
  id: number;
  title: string;
  publisher: string;
  publisherRole: string;
  activityStartDate: string;
  signCount: number;
};

export type AuthUnpassInfo = {
  userId: string;
  authUnPassReason: string;
  unpassDialogShow: false;
};
