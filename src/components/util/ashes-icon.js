import {createIconSet} from 'react-native-vector-icons';
const glyphMap = {
  basic: '\uE800',
  'ceremonial:class': '\uE801',
  'ceremonial:power': '\uE802',
  'charm:class': '\uE803',
  'charm:power': '\uE804',
  discard: '\uE805',
  exhaust: '\uE806',
  'illusion:class': '\uE807',
  'illusion:power': '\uE808',
  main: '\uE809',
  'natural:class': '\uE80a',
  'natural:power': '\uE80b',
  side: '\uE80c',
  'divine:power': '\uE80f',
  'divine:class': '\uE810',
  'time:power': '\uE811',
  'time:class': '\uE812',
  'sympathy:class': '\uE81e',
  'sympathy:power': '\uE81f',
};
export const AshesIcon = createIconSet(glyphMap, 'phg-ashes', 'phg-ashes.ttf');
