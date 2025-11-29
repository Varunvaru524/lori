import { DefaultTheme } from '@react-navigation/native'


/**
 * Colors of the app
 */
const colors = {

  white: '#FFFFFF',
  black: '#000000',

  // Primary
  primary: '#F7884D',
  primary10: '#C35916',
  primary20: '#EA7D41',
  primary30: '#F7884D',
  primary40: '#F98A4F',
  primary50: '#FFA474',
  primary60: '#FFBA91',
  primary70: '#FFCAAA',
  primary80: '#FFD8BE',
  primary90: '#FFE9DA',
  primary95: '#FFF5EF',

  // Neutral
  neutral10: '#1F1B18',
  neutral20: '#34302D',
  neutral30: '#4B4642',
  neutral35: '#57514E',
  neutral40: '#635D5A',
  neutral50: '#7C7672',
  neutral60: '#968F8B',
  neutral70: '#B1AAA5',
  neutral80: '#CDC5C0',
  neutral90: '#EAE1DC',
  neutral95: '#F8EFEA',
  neutral98: '#FFF8F5',
  neutral99: '#FFFBFF',
  neutral100: '#FFFFFF',

  // Surface
  surface1: '#FEEEE6',

  // Error
  error: '#DE3730',
  error60: '#FF5449',
  error80: '#FFB4AB',
  error90: '#FFDAD6',
  error95: '#FFEDEA',
  error98: '#FFF8F7',

  // Custom Colors
  customColors1: {
    seed: '#FFF3C4',               // Not in use
    light: {                       // Not in use
      color: '#6C5E10',            // Not in use
      colorContainer: '#F6E388',   // Not in use
      onColorContainer: '#211B00'  // Not in use
    }
  },
  customColors2: {
    seed: '#DFF0FE',               // Not in use
    light: {                       // Not in use
      color: '#206487',
      colorContainer: '#C6E7FF',
      onColorContainer: '#001E2D'  // Not in use
    }
  },

  // Extras
  blue1: '#FAFDFF',
  blue2: '#CEEAFE',
  blue3: '#87CBFC',
  blue4: '#ABD9FA',
}

/**
 * Colors for the Navigation Theme
 */
DefaultTheme.colors.primary = colors.black
DefaultTheme.colors.background = colors.neutral98
DefaultTheme.colors.card = colors.neutral98


export default colors