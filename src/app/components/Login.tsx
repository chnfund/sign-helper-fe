import * as React from 'react';
import {connect} from 'react-redux';

import {getCaptcha, loginCaptchaC, loginPhoneNC, loginSubmit} from '@src/app/reducers/security';
import {AppState} from '@src/types/application';

type Props = {
  appLoginNeeded: boolean;
  loginPhoneNumber: string;
  loginCaptcha: string;
  loginPhoneNCHandler: any;
  loginCaptchaCHandler: any;
  getCaptchaHandler: any;
  loginSubmitHandler: any;
};

class Login extends React.Component<Props> {
  render() {
    const {
      loginPhoneNumber,
      loginCaptcha,
      getCaptchaHandler,
      loginSubmitHandler,
      loginPhoneNCHandler,
      loginCaptchaCHandler,
    } = this.props;

    const handleLoginPhoneNumberChange = (evt) => {
      const val = evt.target.value;
      loginPhoneNCHandler(val);
    };

    const handleLoginCaptchaChange = (evt) => {
      const val = evt.target.value;
      loginCaptchaCHandler(val);
    };

    return (
      <div>
        <label>手机号</label>
        <input type="text" value={loginPhoneNumber} onChange={handleLoginPhoneNumberChange}/>
        <label>验证码</label>
        <input type="text" value={loginCaptcha} onChange={handleLoginCaptchaChange}/>
        <button onClick={getCaptchaHandler}>获取验证码</button>
        <button className="operate-btn btn-info" onClick={loginSubmitHandler}>登陆</button>
      </div>
    );
  }
}

export default connect(
  (state: AppState) => ({
    appLoginNeeded: state.securityLogic.token == null,
    loginPhoneNumber: state.securityLogic.loginPhoneNumber,
    loginCaptcha: state.securityLogic.loginCaptcha,
  }),
  {
    loginPhoneNCHandler: loginPhoneNC,
    loginCaptchaCHandler: loginCaptchaC,
    getCaptchaHandler: getCaptcha,
    loginSubmitHandler: loginSubmit,
  }
)(Login);
