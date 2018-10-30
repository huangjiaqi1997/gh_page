import React from 'react';
import { connect } from 'react-redux';
import './side.css';


class Side extends React.Component {
  constructor(props) {
    super(props);
    this.changeLrc = this.changeLrc.bind(this);
    this.state = {
      showLrc: false
    }
  }
  changeLrc() {
    this.setState({
      showLrc: !this.state.showLrc
    });
  }

  render() {
    const playItem = this.props.playList[this.props.playIndex]
    // 被移出或是空列表
    if (!playItem) return <div className="side"></div>
    
    const { img, cate, name, info, lrc } = playItem;

    return (
      <div className="side">
        {/* 歌词界面 或 细节界面 */}
        {
          this.state.showLrc
          ?
          (<div className="lrc-container">
            <div className="close-lrc" onClick={this.changeLrc}>
              <a href="#">收起歌词</a>
            </div>
            <div className="lrc">
              {lrc}
            </div>
          </div>)
          :
          (<div className="detail">
            <div className="img-wrapper">
              <img src={img} alt="" />
            </div>
            <div><a href="#">{cate}</a></div>
            <div className="singer-name"><a href="#">{name}</a></div>
            <div className="singer-info">{info}</div>
            {
              !lrc ? '' :
              <div className="open-lrc">
                <a href="#" onClick={this.changeLrc}>查看歌词</a>
              </div>
            }
          </div>)
        }
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  playIndex: state.play.playIndex,
  playList: state.play.playList
})


export default connect(mapStateToProps)(Side);