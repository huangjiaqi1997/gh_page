import React from 'react';
import Light from './Light/Light';
import Gradation from './Gradation/Gradation';
import Control from './Control/Control';

import './picker.css';

class Picker extends React.Component {
  render() {
    return (
      <div className="container">
        <Light />
        <Gradation />
        <Control />
      </div>
    )
  }
}

export default Picker;