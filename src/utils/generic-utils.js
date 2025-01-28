import {Dimensions, StatusBar} from 'react-native';
import {DESIGN_SCREEN_WIDTH} from '@constants';

export const screenWidth = Dimensions.get('window').width;

export const screenHeight = Dimensions.get('window').height;

export const STATUSBAR_HEIGHT = StatusBar.currentHeight;

export function getSize(width) {
  if (screenWidth > DESIGN_SCREEN_WIDTH) {
    const proportion = screenWidth / DESIGN_SCREEN_WIDTH;

    return width * proportion;
  }

  return width;
}

export function getSafeNumber(number) {
  const length = number?.length;

  if (typeof number !== 'string' || !length) {
    return '';
  }

  let safeNumber = '';

  if (length <= 4) {
    for (let i = 0; i < length; i++) {
      safeNumber += i < length - 1 ? '*' : number[i];
    }
  } else {
    for (let i = 0; i < length; i++) {
      safeNumber += i < length - 3 ? '*' : number[i];
    }
  }

  return safeNumber;
}
