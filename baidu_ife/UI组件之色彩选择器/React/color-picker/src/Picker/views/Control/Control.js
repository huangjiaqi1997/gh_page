import React from 'react';
import {connect} from 'react-redux';
import {changeRgb, changeHsl, changeHex} from '../../actions';
import InputItem from './InputItem'

class RgbHslControl extends React.Component {
  
  changeInput(label, value) {
    console.log(label, value)
    const r = this.props.r;
    const g = this.props.g;
    const b = this.props.b;
    const h = this.props.h;
    const s = this.props.s;
    const l = this.props.l;
    const hex = this.props.hex;
    switch(label) {
      case 'R':
        this.props.changeRgb(value, g, b)
        break;
      case 'G':
        this.props.changeRgb(r, value, b)
        break;
      case 'B':
        this.props.changeRgb(r, g, value)
        break;
      case 'H':
        this.props.changeHsl(value, s, l)
        break;
      case 'S':
        this.props.changeHsl(h, value, l)
        break;
      case 'L':
        this.props.changeHsl(h, s, value)
        break;
      case 'HEX':
        this.props.changeHex(hex)
        break;
      default:
        return;
    }
    
  }

  render() {
    const labels = ['R', 'G', 'B', 'H', 'S', 'L', 'HEX'];
    return(
      <div className="control">
        {
          labels.map((item, index) => (
            <InputItem
              key={index}
              labelValue={item}
              inputValue={this.props.rgbHslArr[index]}
              changeInput={this.changeInput.bind(this)}
            />
          ))
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const rgbHslArr = state.rgb.concat(state.hsl);
  rgbHslArr.push(state.hex);
  return {
    r: state.rgb[0],
    g: state.rgb[1],
    b: state.rgb[2],
    h: state.hsl[0],
    s: state.hsl[1],
    l: state.hsl[2],
    hex: state.hex,
    rgbHslArr: rgbHslArr
  }

};
const mapDispatchToProps = (dispatch) => ({
  changeRgb: (r, g, b) => dispatch(changeRgb(r, g, b)),
  changeHsl: (h, s, l) => dispatch(changeHsl(h, s, l)),
  changeHex: (hex) => dispatch(changeHex(hex))
})

export default connect(mapStateToProps, mapDispatchToProps)(RgbHslControl);