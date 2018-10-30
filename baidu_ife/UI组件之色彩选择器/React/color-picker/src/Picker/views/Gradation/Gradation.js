import React from 'react';
import {connect} from 'react-redux';
import {changeHsl} from '../../actions';
import './Gradation.css';

class Gradation extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   graH: 0,
    //   graOT: 0,
    //   spanH: 0,
    // }
  }
  


  /* 渲染完成后，获取相关DOM的值，设置在state中，spanTop全部由全局state驱动 */
  componentDidMount() {
    const gra = document.querySelector('.gradation');
    const graH = gra.clientHeight;
    const graOT = gra.offsetTop;
    const spanH = document.querySelector('.gradation span').offsetHeight;
    // this.setState({
    //   graH: graH,
    //   graOT: graOT,
    //   spanH: spanH
    // })
    this.graH = graH;
    this.graOT = graOT,
    this.spanH = spanH
  }

  mouseToColor(e) {
    const pageY = e.pageY;
    const h = ((pageY - this.graOT) / this.graH).toFixed(2);
    this.props.changeHsl(h, this.props.s, this.props.l)
  }
  
  mouseDown(e) {
    const _this = this;
    const target = e.target;
    this.mouseToColor(e);

    document.onmousemove = function(e) {
      _this.mouseDown(e);
    }
    document.onmouseup = function(e) {
      document.onmousemove = null;
    }
  }



  render() {
    return(
      <div
        className="gradation"
        onMouseDown={this.mouseDown.bind(this)}
      >
        <span
        className="selection"
        style={{top: this.graH * this.props.h + this.graOT - this.spanH / 2 + 'px'}}
        ></span>
      </div>
    )
  }
}
// onMove={this.onMove.bind(this)}
const mapStateToProps = (state) => ({
  h: state.hsl[0],
  s: state.hsl[1],
  l: state.hsl[2]
});
const mapDispatchToProps = (dispatch) => ({
  changeHsl: (h, s, l) => dispatch(changeHsl(h, s, l)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Gradation);