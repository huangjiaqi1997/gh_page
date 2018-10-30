import React from 'react';
import {connect} from 'react-redux';
import {changeHsl} from '../../actions';
import convert from '../../convert';
import './Light.css';

class Light extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spanLeft: 0,
      spanTop: 0
    }
  }

  /**
   * 设置DOM相关数据保存在state中，这里的spanTop由本地state主动控制
   */
  componentDidMount() {
    const lig = document.querySelector('.light');
    const span = document.querySelector('.light span');
    const ligH = lig.clientHeight;
    const spanH = span.offsetHeight;
    const ligOT = lig.offsetTop;
    const ligOL = lig.offsetLeft; 

    this.ligH = ligH;
    this.spanH = spanH;
    this.ligOT = ligOT;
    this.ligOL = ligOL;
    /**
     * 在此之后的render后生效
     */
    this.setState({
      spanTop:  (ligH - ligH * this.props.l) + ligOT - spanH / 2 + 'px',
      spanLeft: (ligH - ligH * this.props.l) + ligOL - spanH / 2 + 'px'
    })
    
  }

  mouseToColorSpanPos(e) {
    const pageX = e.pageX;
    const pageY = e.pageY;

    const mouOB = this.ligH - (pageY - this.ligOT);
    const mouOR = this.ligH - (pageX - this.ligOL);
    
    const mouL = mouOB * 1.414 + (mouOR - mouOB) / 1.414;
    const ligL = this.ligH * 1.414;
    const l = (mouL / ligL).toFixed(2);

    this.props.changeHsl(this.props.h, this.props.s, l)
     
    this.setState({
      spanTop:  pageY - this.spanH / 2 + 'px',
      spanLeft: pageX - this.spanH / 2 + 'px'
    })

    console.log('Light onClick: ' + this.props.h, this.props.s, l)
  }
 
  
  mouseDown(e) {
    const _this = this;
    const target = e.target;
    this.mouseToColorSpanPos(e);

    document.onmousemove = function(e) {
      _this.mouseToColorSpanPos(e);
    }
    document.onmouseup = function(e) {
      document.onmousemove = null;
    }
  }

  render() {
    /**
     * Light的背景色取决于中间的颜色条
     * 其变化应该取决于H和S
     * 这里h不确定，S衡为1,L应衡为0.5
     */
    // onClick={this.onClick.bind(this)}
    const rgbStr = convert.hslToRgb([this.props.h, 1, 0.5]).join(',');
    console.log(rgbStr);
    return(
      <div
        className="light"
        
        style={{background: `linear-gradient(to right bottom, rgb(255,255,255), rgb(${rgbStr}), rgb(0,0,0))`}}
        onMouseDown={this.mouseDown.bind(this)}
      >
        <span
          className="selection"
          style={{
            top: this.state.spanTop,
            left: this.state.spanLeft
          }}
        ></span>
      </div>
    )
  }
}
 /* onMove={this.onMove.bind(this)} */
const mapStateToProps = (state) => ({
  h: state.hsl[0],
  s: state.hsl[1],
  l: state.hsl[2]
});
const mapDispatchToProps = (dispatch) => ({
  changeHsl: (h, s, l) => dispatch(changeHsl(h, s, l)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Light);