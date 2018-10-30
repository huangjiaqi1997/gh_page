import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../../reducer/user';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      telEml:'',
      pwd: '',
      // autoLogin => 设置登录储存cookie，重载时检测cookies
      saveCookie: false
    };
    this.closeHandle = this.closeHandle.bind(this);
    this.login = this.login.bind(this);
    this.toRegister = this.toRegister.bind(this);
    // this.changeHandle = this.changeHandle.bind(this);
  }

  closeHandle() {
    this.props.showHiden()
  }
  toRegister() {
    this.props.changeDialog('register');
  }
  login() {
    const {telEml, pwd} = this.state;
    this.state.saveCookie
    ? this.props.login({telEml, pwd, saveCookie: true})
    : this.props.login({telEml, pwd, saveCookie: false})
  }
  // changeHandle(key, v) {
  //   this.setState({[key]: v})
  // }

  render () {
    console.log(this.state);
    return (
      <form action="">
        <h2 className="login-head">欢迎来到豆瓣，请登录</h2>
        <input
          className="tel-eml"
          type="text"
          value={this.state.telEml}
          onChange={e => this.setState({telEml: e.target.value })}
        />
        <input
          className="pwd"
          type="password"
          value={this.state.pwd}
          onChange={e => this.setState({pwd: e.target.value })}
        />
        <input
          className="login-btn"
          type="button"
          value="登录豆瓣"
          onClick={this.login}/>
        <div className="auto-login-c">
          <input
            type="checkbox"
            id="auto-login"
            onClick={e => this.setState({saveCookie: e.target.checked})}
          />
          <label htmlFor="auto-login">下次自动登录</label>
        </div>
        <div className="other">
          <div className="other-login">
            第三方登陆
            <a href="#">微信</a>
            <a href="#">微博</a>
          </div>
          <div className="to-register">
            <a href="#" onClick={this.toRegister}>注册豆瓣账号</a>
          </div>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch(login(data))
});



export default connect(null, mapDispatchToProps)(Login);

