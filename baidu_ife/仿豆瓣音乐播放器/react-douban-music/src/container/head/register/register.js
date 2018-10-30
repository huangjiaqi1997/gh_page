import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../../../reducer/user';
import AgreeMent from './agreement';


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tel:'',
      verificaCode: '',
      pwd: '',
      name: '',
      recvAgmt: false
    };
    this.close = this.close.bind(this);
    this.register = this.register.bind(this);
    this.toLogin = this.toLogin.bind(this);
    this.recv = this.recv.bind(this);
  }

  close() {
    this.props.showHiden()
  }
  toLogin() {
    this.props.changeDialog('login');
  }
  register() {
    const {recvAgmt, ...data} = this.state;
    this.props.register(data);
  }
  changeHandle(key, v) {
    this.setState({[key]: v})
  }
  recv() {
    this.setState({recvAgmt: true});
  }

  render () {
    return (
      <form action="">
        <h2 className="login-head">欢迎来到豆瓣，请注册</h2>
        {
          !this.state.recvAgmt
          ? <AgreeMent recv={this.recv} />
          : (
            <div className="dialog-body">
              <input
                placeholder="手机号"
                className="tel"
                type="text"
                value={this.state.tel}
                onChange={e => this.setState({tel: e.target.value })}
              />
              <input
                placeholder="验证码"
                className="verificaCode"
                type="text"
                value={this.state.verificaCode}
                onChange={e => this.setState({verificaCode: e.target.value })}
              />
              <label><a href="#">发送验证码</a></label>
              <input
                placeholder="创建密码"
                className="pwd"
                type="password"
                value={this.state.pwd}
                onChange={e => this.setState({pwd: e.target.value })}
              />
              <input
                placeholder="名号"
                className="name"
                type="text"
                value={this.state.name}
                onChange={e => this.setState({name: e.target.value })}
              />
              <input
                className="login-btn"
                type="button"
                value="注册豆瓣账号"
                onClick={this.register}
              />

              <div className="other">
                <a href="#">用邮箱注册</a>
                <a href="#" onClick={this.toLogin}>登录豆瓣</a>
              </div>
            </div>)
        }
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  register: (data) => dispatch(register(data))
});


export default connect(null, mapDispatchToProps)(Register);
