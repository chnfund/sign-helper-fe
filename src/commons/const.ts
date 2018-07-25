export const TOKEN_KEY = 'token';
// 系统代码
export const SYS_CODE = {
  // 用户未登录
  NOT_LOGIN: -999,
  // 微信登录失效
  WX_SESSION_EXPIRED: -1000,
  // 未找到用户
  USER_NOT_EXISTS: -1001,
  // 未授权
  NOT_AUTH: -1002,
  // 会议删除需要先取消
  MEETING_DELETE_NEED_CANCEL: -2001,
  // 报名通过人数超过限制
  APPLICANT_PASS_EXCEED: -3001,
};

// 公司类型
export const COMPANY_TYPE = {
  // 上市公司
  List: 1,
  // 机构
  Insti: 2,
};

// 用户类别
export const USER_CATEGORY = {
  Company: {
    IR: 1,
    NONE_IR: 2,
  },
};

// 用户认证状态
export const USER_AUTH_STATE = {
  // 待审核
  NONE: 0,
  PASS: 1,
  DENY: 2,
};
