import {CHANGE_RGB, CHANGE_HEX, CHANGE_HSL} from './actionTypes'
import convert from './convert';


export default (state, action) => {
  switch(action.type) {
    case CHANGE_RGB:
      return {
        ...state,
        rgb: action.rgb,
        hsl: convert.rgbToHsl(action.rgb),
        hex: convert.rgbToHex(action.rgb)
      }
    case CHANGE_HSL:
      return {
        ...state,
        rgb: convert.hslToRgb(action.hsl),
        hsl: action.hsl,
        hex: convert.hslToHex(action.hsl)
      }
    case CHANGE_HEX:
      return {
        ...state,
        rgb: convert.hexToRgb(action.hex),
        hsl: convert.hexToHsl(action.hex),
        hex: action.hex
      }
    default:
      return state;
  }
}
