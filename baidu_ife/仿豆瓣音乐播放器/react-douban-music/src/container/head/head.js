import React from 'react';
import { connect } from 'react-redux';
import Login from './login/login';
import Register from './register/register';
import { getUserInfo } from '../../reducer/user';
import './head.css';


class Head extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialog: 'login',
      showDialog: false
    };
    this.changeDiaHandle = this.changeDiaHandle.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.showDialog = this.showDialog.bind(this);
  }

  changeDiaHandle(val) {
    this.setState({dialog: val});
  }
  closeDialog() {
    this.setState({showDialog: false});
  }
  // 点击右部登录按钮
  showDialog() {
    this.setState({showDialog: true, dialog: 'login'});    
  }
  // 获取cookie
  componentDidMount() {
    // this.props.getUserInfo();
  }
  

  render() {
    const userName = this.props.userName;
    return (
      <div className="head">
        <div className="head-l">
          <a href="https://music.douban.com/artists/">豆瓣音乐人</a>
        </div>

        <div className="head-r">
        {
          userName
          ? `您好，${userName}`
          : <a href="#" onClick={this.showDialog}>登录</a>
        }

        </div>
        {/* 注册登陆后根据store判断dialog显示 */}
        {
          !this.props.userName
          ?
            this.state.showDialog
            ? <div className="login-register">
                <div onClick={this.closeDialog} className="close"><a href="#">×</a></div>
                {
                  this.state.dialog === 'login'
                  ? <Login changeDialog={this.changeDiaHandle} />
                  : <Register changeDialog={this.changeDiaHandle} />
                }
              </div>
            : ''


          : ''
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.user.userName
})
const mapDispatchToProps = (dispatch) => ({
  getUserInfo: () => dispatch(getUserInfo())
})

export default connect(mapStateToProps, mapDispatchToProps)(Head);