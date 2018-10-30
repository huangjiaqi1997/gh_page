import React from 'react';

class PlayItem extends React.Component {
  constructor(props) {
    super(props);
    this.collectHandler = this.collectHandler.bind(this);
    this.playHandler = this.playHandler.bind(this);
    this.removeHandler = this.removeHandler.bind(this);
  }
 
  collectHandler() {
    this.props.collectSong(this.props.index)
  }
  playHandler() {
    this.props.playSong(this.props.index)
  }
  removeHandler() {
    this.props.removeSong(this.props.index)
  }



  render () {
    const isPlayClass = this.props.isPlay ? ' is-play' : '';
    const collectClass = this.props.isColl ? 'icon-collected' : 'icon-no-collected';
    return (
      <div className={`play-item${isPlayClass}`}>
        <span className="item-collect">
          <a className={collectClass} onClick={this.collectHandler} href="#"></a>
        </span>

        <div className="name-singer-wrapper" onClick={this.playHandler}>
          <span className="item-name">{this.props.name}</span>
          <span className="item-singer" >{this.props.singer}</span>
        </div>

        <span className="item-share"><a href="#">分享</a></span>
        <span className="item-remove" onClick={this.removeHandler}><a href="#">移除</a></span>
      </div>
    )
  }
}


export default PlayItem;