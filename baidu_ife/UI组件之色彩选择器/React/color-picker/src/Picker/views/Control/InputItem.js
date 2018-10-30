import React from 'react';
import './InputItem.css';

class InputItem extends React.Component {

  /* 调用changeInput，把label、value传给父组件  */
  onChange(e) {
    const label = this.props.labelValue;
    const value = e.target.value;
    if (label !== 'HEX') {
      this.props.changeInput(label, value)
    } else if (label === 'HEX' && value.length === 7) {
      this.props.changeInput(label, value)
    }
  }

  /* 鼠标点击，改变RGBHSL的值 */
  onClick(e) {
    const flag = e.target.className;
    const label = this.props.labelValue;
    const input = this.refs.input;
    if (flag === 'btn-up') {
      if (label === 'R' || label === 'G' || label === 'B') {
        this.props.changeInput(this.props.labelValue, ++input.value)
      } else {
        const value = parseFloat(input.value) + 0.1;
        this.props.changeInput(this.props.labelValue, value)
      } 

    } else {
      if (label === 'R' || label === 'G' || label === 'B') {
        this.props.changeInput(this.props.labelValue, --input.value)
      } else {
        const value = parseFloat(input.value) - 0.1;
        this.props.changeInput(this.props.labelValue, value)
      } 
    }
  }

  /**
   * 接收inputValue，labelValue，changeInput
   * input应用ref
   * input绑定onChange
   */  
  render() {
    const label = this.props.labelValue
    return(
      <div className="input-item">
        <label>{label}</label>
        <input
          ref="input"
          onChange={this.onChange.bind(this)}
          value={this.props.inputValue}
        />
        {label === 'HEX'
        ? ''
        : <span className="btn-container">
            <span className="btn-up" onClick={this.onClick.bind(this)}></span>
            <span className="btn-down" onClick={this.onClick.bind(this)}></span>
          </span>
        }
      </div>
    )
  }
}


export default InputItem;