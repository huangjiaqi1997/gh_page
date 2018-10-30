import {
  CHANGE_RGB,
  CHANGE_HSL,
  CHANGE_HEX
} from './actionTypes';

const changeRgb = (r, g, b) => ({
  type: CHANGE_RGB,
  rgb: [r, g, b]
});

const changeHsl = (h, s, l) => ({
  type: CHANGE_HSL,
  hsl: [h, s, l]
});

const changeHex = (hex) => ({
  type: CHANGE_HEX,
  hex: hex
});

export {
  changeRgb,
  changeHsl,
  changeHex
};