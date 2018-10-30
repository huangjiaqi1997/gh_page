import React from 'react';
import { connect } from 'react-redux';
import { removeAll, playSong, collectSong, removeSong, getPlayList } from '../../reducer/play';
import PlayItem from './playItem';

import './playList.css';


class PlayList extends React.Component {
  constructor(props) {
    super(props);
    this.collect = this.collect.bind(this);
    this.play = this.play.bind(this);
    this.remove = this.remove.bind(this);
    this.removeAll = this.removeAll.bind(this);
  }

  collect(i) {
    this.props.collectSong(i);
  }
  
  play(i) {
    this.props.playSong(i);
  }

  removeAll() {
    this.props.removeAll();
    // 当歌曲数为零时
    // 重设playingId为-1
    // 表示没有歌曲
    this.props.playSong(-1);
  }

  remove(i) {
    this.props.removeSong(i);

    const index = this.props.playIndex;
    // 如果恰好是playingId被移除了
    // 设置新的playingId为第一首
    // 但此时的playLIst仍是之前的
    if (i === index) {
      // 只有一项
      // 移除后playList其实已经是空了
      if (this.props.playList.length === 1) {
        return this.props.playSong(-1);
      }
      this.props.playSong(0);
    }
  }

  componentDidMount() {
    // this.props.getPlayList();
  }
  


  render () {
    const listPer =` ${this.props.playIndex + 1} / ${this.props.playList.length}`;
    return (
      <div className="play-list">

        {/* 头 */}
        <div className="list-head">
          <div className="list-head-l">
            {`正在播放${listPer}`}
          </div>
          <div className="list-head-r">
            <a href="#" onClick={this.removeAll}>清空全部</a>
          </div>
        </div>

        <div className="items-container">
          <div className="items-wrapper">
            {
              this.props.playList.map((item, i) => (
                <PlayItem
                  key={item._id}
                  index={i}
                  name={item.name}
                  singer={item.singer.name}
                  isColl={item.isColl}
                  playSong={this.play}
                  collectSong={this.collect}
                  removeSong={this.remove}
                  isPlay={i === this.props.playIndex}
                />
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  playIndex: state.play.playIndex,
  playList: state.play.playList,
})
const mapDispatchToProps = (dispatch) => ({
  playSong: (index) => dispatch(playSong(index)),
  collectSong: (id) => dispatch(collectSong(id)),
  removeSong: (id) => dispatch(removeSong(id)),
  removeAll: () => dispatch(removeAll()),
  getPlayList: () => dispatch(getPlayList())
})


export default connect(mapStateToProps, mapDispatchToProps)(PlayList);