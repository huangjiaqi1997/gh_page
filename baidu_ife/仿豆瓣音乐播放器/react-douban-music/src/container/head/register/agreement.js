import React, { Component } from 'react';
import './agreement.css';

class AgreeMent extends Component {
  constructor(props) {
    super(props);
    this.recvHandle = this.recvHandle.bind(this);
  }
  recvHandle() {
    this.props.recv();
  }
  render() {
    return (
      <div className="dialog-body">
        <div className="agmt-c">
          <h3>豆瓣用户协议</h3>
          <p>本协议为豆瓣《使用协议》的修订版本，自2017年10月16日公布。</p>
          <a href="#">查看历史版本</a>
          <p><em>请您务必审慎阅读、充分理解协议中相关条款内容，特别是粗体标注的内容。您一旦注册豆瓣，即视为您已了解并完全同意本协议各项内容，包括豆瓣对使用协议随时所做的任何修改。如您不同意本协议及/或随时对其的修改，请您立即停止注册及使用豆瓣所提供的全部服务。</em></p>
          <h4>1、接受条款</h4>
          <p>1.1 豆瓣网的运营者及相关关联公司（以下简称“豆瓣”）根据本使用协议的条款及不时发布的规则为您提供基于豆瓣网（包括豆瓣pc端、豆瓣及豆瓣相关客户端、移动网页端等）的互联网服务。本协议的条款可由豆瓣随时修改，修改后的使用协议一经在网站上公布即有效代替原来的使用协议。您一旦在豆瓣网注册，即成为豆瓣用户（以下简称“用户”或“您”），并受本协议的约束。</p>
          <p>1.2 当您使用豆瓣网单项服务时，您和豆瓣应遵守豆瓣随时公布的与该服务相关的指引和规则。前述所有的指引和规则，均构成本使用协议的一部分。</p>
          <p><em>1.3 您应遵守本协议的各项条款，合法合理使用豆瓣提供的服务，否则，豆瓣有权依据本协议中断或终止为您提供服务。同时，豆瓣保留在任何时候收回您所使用的账号的权利。</em></p>
        </div>
        <input onClick={this.recvHandle} type="button" value="同意协议"/>
        <p>同意后，再进行下一步的注册流程</p>
      </div>  
    )
  }
}


export default AgreeMent;
