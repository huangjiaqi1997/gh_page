import React from 'react';
import { connect } from 'react-redux';
import { playSong } from '../../reducer/play';
import AudioSpectrum from 'react-audio-spectrum';
import './controller.css';

const convertTime = (time) => {
  let min = Math.floor(time / 60).toFixed(0);
  min = min>9? min:0+min;
  let sec = Math.round(time % 60).toFixed(0);
  sec = sec>9? sec:0+sec;
  return min + ':' + sec
}
// 返回数组随机的index
const randomIndex = (num, prevI) => {
  const i = Math.round(num * Math.random() - 0.5)
  if (i===prevI) {
    return randomIndex(num, prevI);
  }
  return i;
}

class Controller extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isPlaying: true,
      currentTime: 0,
      duration: 0,
      model: 'list-repeat',
      vol: 0,
    };
    this.play = this.play.bind(this);
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
    this.changeTime = this.changeTime.bind(this);
    this.changeModel = this.changeModel.bind(this);
    this.changeVol = this.changeVol.bind(this);
    this.showVolbar = this.showVolbar.bind(this);
  }
  componentDidMount() {
    this.press = this.refs.press;
    this.bar = this.refs.bar;
    this.volBar = this.refs.volBar;
    this.volLen = this.refs.volLen;
    this.audio = this.refs.audio;
    // this.audio.controls = true
    // 绑定canplay事件
    // 获取duration
    this.audio.oncanplay = () => {
      this.setState({
        duration: this.audio.duration.toFixed(2),
        vol: this.audio.volume
      })
      if (this.state.isPlaying) {
        // 每隔一秒获取audio的currentTime
        setInterval(() => {
          this.setState({
            currentTime: this.audio.currentTime.toFixed(2)
          });
        }, 1000)
      }
    }
    // 播放完一首歌时
    this.audio.onended = () => {
      switch (this.state.model) {
        case 'list-repeat':
          this.next();
          break;
        case 'one-repeat':
          this.audio.load()
          break;
        case 'random':
          const index = randomIndex(this.props.playList.length, this.props.playIndex)
          this.props.playSong(index);
          break;
        default:
          return;
      }
    }

    // // 如果列表空了
    // // 初始化一部分state
    // if (this.props.playIndex === -1){
    //   this.setState({
    //     isPlaying: true,
    //     currentTime: 0,
    //     duration: 0
    //   });
    // }
  }
  play() {
    if (this.state.isPlaying === true) {
      this.audio.pause();
      this.setState({isPlaying: false});
    } else {
      this.audio.play();
      this.setState({isPlaying: true});
    }
  }
  next() {
    const list = this.props.playList;
    const i = this.props.playIndex;
    // 如果是最后一首
    if (i+1 === list.length) return this.props.playSong(0);
    // 如果列表为空
    if (list.length === 0) return;
    this.props.playSong(i+1);

    this.setState({isPlaying: true})
  }
  prev() {
    const list = this.props.playList;
    const i = this.props.playIndex;
    // 如果是第一首
    if (i === 0) return this.props.playSong(list.length-1);
    // 如果列表为空
    if (list.length === 0) return;
    this.props.playSong(i-1);
    
    this.setState({isPlaying: true})
  }
  changeTime(e) {
    let model1OL = document.querySelector('.model-1').offsetLeft;
    let currentLen = e.pageX - this.press.offsetLeft - model1OL;
    let lenPer = currentLen / this.press.offsetWidth;
    let currentTime = this.state.duration*lenPer;
    this.bar.style.left = currentLen - 6 + 'px';
    this.audio.currentTime = currentTime;
    this.setState({currentTime: currentTime});
  }

  changeModel() {
    const models = ['list-repeat', 'one-repeat', 'random']
    let index = models.indexOf(this.state.model);
    index += 1;
    if (index === models.length) index = 0;
    this.setState({model: models[index]});
  }

  changeVol(e) {
    let model1OL = document.querySelector('.model-2').offsetLeft;
    let currentLen = e.pageX - this.volLen.offsetLeft;
    let lenPer = currentLen / this.volLen.offsetWidth;
    let currentTime = 1*lenPer;
    this.volBar.style.left = currentLen - 5 + 'px';
    this.audio.volume = currentTime;
    this.setState({vol: currentTime});
  }

  showVolbar() {
    this.volLen.classList.toggle('hidden')
  }

  

  render () {
    
    const item = this.props.playList[this.props.playIndex];
    const _src = item ? item.name : '';
    const time = `${convertTime(this.state.currentTime)} / ${convertTime(this.state.duration)}`;
    
    let barLeft;
    if (this.state.duration !== 0){
      barLeft = {left: (this.state.currentTime / this.state.duration)*535 - 6};
    } else {
      barLeft = {left: -6};
    }

    const  volBarLeft = {left: this.state.vol*40 - 5}

    const playClass = !this.state.isPlaying ? 'play icon-play' : 'play icon-pause';
    
    const modelClass = `model icon-${this.state.model}`;

    return (
      <div className="control">
        {/* 如果列表为空，让audio元素这里返回一个空值 */}
        {
          this.props.playIndex === -1
          ? <audio id="audio-element" ref = "audio"></audio>
          : <audio
          id="audio-element"
          crossOrigin="anonymous"
          autoPlay="true"
          ref = "audio"
          src={require(`../../static/mp3/Beyond-${_src}.mp3`)}
          >
          </audio>
        }
        
        <AudioSpectrum
          id="audio-canvas"
          height={100}
          width={590}
          audioId={'audio-element'}
          capColor={'red'}
          capHeight={2}
          meterWidth={2}
          meterCount={512}
          meterColor={[
            {stop: 0, color: '#f00'},
            {stop: 0.5, color: '#0CD7FD'},
            {stop: 1, color: 'red'}
          ]}
          gap={4}
        />
        <div className="model-c">
          <div className="model-1">
            <div className="len" ref="press" onClick={this.changeTime}>
              <div className="bar" ref="bar" style={barLeft}></div>
            </div>
            <div className="time">{time}</div>
          </div>

          <div className="model-2">
            <i className={modelClass} onClick={this.changeModel}></i>
            <i className="vol icon-vol" onClick={this.showVolbar}></i>
            <div className="vol-len hidden" ref="volLen" onClick={this.changeVol}>
              <div className="vol-bar" ref="volBar" style={volBarLeft}></div>
            </div>
          </div>

          <div className="model-3">
            <i className="prev icon-prev" onClick={this.prev}></i>
            <i className={playClass} onClick={this.play}></i>
            <i className="next icon-next" onClick={this.next}></i>
          </div>
        </div>
      </div>
      
    )
  }
}


const mapStateToProps = (state) => ({
  playIndex: state.play.playIndex,
  playList: state.play.playList
})
const mapDispatchToProps = (dispatch) => ({
  playSong: (id) => dispatch(playSong(id))
})


export default connect(mapStateToProps, mapDispatchToProps)(Controller);