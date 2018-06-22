import {PixelRatio, Platform} from "react-native";

export const PIXEL_RATIO = PixelRatio.get();
// Font scaling for different iOS devices
// PIXEL_RATIO === 3 => FONT_SCALE = 1, iPhone X
// PIXEL_RATIO === 2.5 => FONT_SCALE = 0.9, iPhoneSE
// PIXEL_RATIO === 2 => FONT_SCALE = 0.8
const IPHONEX = 3;
// export const FONT_SCALE = 1 + ((PIXEL_RATIO - IPHONEX) / 5);
export const FONT_SCALE = calcFontScale();

function calcFontScale() {
  let scale;
  if (Platform.OS === 'ios') {
    scale = 1 + ((PIXEL_RATIO - IPHONEX) / 5);
  } else {
    scale = PixelRatio.getFontScale();
  }
  return scale;
}

export const COLORS = {
  blue: '#4156A6',
  green: '#4FB895',
  pink: '#A866AA',
  yellow: '#E19F30',
  gray: '#899099',
}

export const STYLES = {
  PRIMARY_BLUE: '#4156A6',
  PRIMARY_GREEN: '#4FB895',
  PRIMARY_RED: '#EF461A',
  WHITE_TEXT_COLOR: '#ffffff',
  INPUT_BACKGROUND_COLOR_WHITE: 'rgba(255, 255, 255, 0.1)',
  INPUT_COLOR_WHITE: '#ffffff',
  INPUT_LABEL_COLOR_WHITE: '#ffffff',
  COIN_DATA_GREEN: '#55BB99',
  GRAY_1: '#EEEEEE',
  GRAY_2: '#3D4853',
  GRAY_3: '#E9E9EF',
  GRAY_4: '#9DA3A9',
  GRAY_5: '#CED1D4',
  GRAY_6: '#C8C8C8',
  GRAY_7: '#899099',
  YELLOW: '#E19F30',
};

export const GLOBAL_STYLE_DEFINITIONS = {
  normalText: {
    color: STYLES.GRAY_2,
    fontSize: FONT_SCALE * 18,
    fontFamily: 'agile-extra-light',
  },
  heading: {
    color: STYLES.GRAY_2,
    fontFamily: 'agile-bold',
    fontSize: FONT_SCALE * 21,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: FONT_SCALE * 25,
    marginTop: 10,
    marginBottom: 10,
  },
  boldText: { fontFamily: 'agile-bold' },
  centeredColumn: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  // celsius form styles
  inputWrapper: {
    paddingLeft: 18,
    paddingRight: 18,
    paddingBottom: 14,
    paddingTop: 23,
    marginBottom: 20,
    borderRadius: 8,
    height: 60,
  },
  blueInputWrapper: { backgroundColor: 'rgba(256, 256, 256, 0.15)' },
  whiteInputWrapper: { backgroundColor: STYLES.INPUT_COLOR_WHITE },
  inputItem: {
    borderBottomColor: 'transparent',
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  input: {
    fontFamily: 'agile-bold',
    fontSize: FONT_SCALE * 20,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    height: 23,
    top: 0,
  },
  blueInputTextColor: { color: STYLES.INPUT_COLOR_WHITE },
  whiteInputTextColor: { color: STYLES.GRAY_2 },
  inputLabelActive: {
    color: 'white',
    fontSize: FONT_SCALE * 12,
    opacity: 0.8,
    top: -10,
    fontFamily: 'agile-light',
    position: 'absolute',
  },
  inputLabelInactive: {
    color: STYLES.INPUT_LABEL_COLOR_WHITE,
    fontFamily: 'agile-light',
    fontSize: FONT_SCALE * 20,
    opacity: 0.8,
    top: -20,
    position: 'absolute',
  },
  selectLabelInactive: {
    color: STYLES.INPUT_LABEL_COLOR_WHITE,
    fontFamily: 'agile-light',
    fontSize: FONT_SCALE * 20,
    opacity: 0.8,
  },
  selectLabelActive: {
    color: 'white',
    fontSize: FONT_SCALE * 12,
    opacity: 0.8,
    fontFamily: 'agile-light',
    position: 'absolute',
    top: 5,
    left: 18,
  },
  inputIconRight: {
    position: 'absolute',
    right: 15,
    width: 25,
    top: 0,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.4,
  },

};

export const FONTS = [
  {'Roboto': require('native-base/Fonts/Roboto.ttf')},
  {'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf')},
  {'agile-medium': require('../../../assets/fonts/Agile-Medium.otf')},
  {'agile-light': require('../../../assets/fonts/Agile-Light.otf')},
  {'agile-extra-light': require('../../../assets/fonts/Agile-Extralight.otf')},
  {'agile-bold': require('../../../assets/fonts/Agile-Bold.otf')},
  {'agile-book': require('../../../assets/fonts/Agile-Book.otf')},
  {'agile-extra-bold': require('../../../assets/fonts/Agile-Extrabold.otf')},
  {'inconsolata-regular': require('../../../assets/fonts/Inconsolata-Regular.ttf')},
];

export const CACHE_IMAGES = [
  require('../../../assets/images/logo-header.png'),
  require('../../../assets/images/background.png'),
  require('../../../assets/images/machor.png'),
  require('../../../assets/images/progress-1.png'),
  require('../../../assets/images/progress-2.png'),
  require('../../../assets/images/icons/celsius_symbol_white.png'),
  require('../../../assets/images/icons/animated-spinner.gif'),
  require('../../../assets/images/icons/icon-check.png'),
  require('../../../assets/images/icons/camera-flip.png'),
  require('../../../assets/images/Your-Place.png'),
  require('../../../assets/images/Welcome-Animal.png'),
  require('../../../assets/images/Headshot-cat.jpg'),
  require('../../../assets/images/caret.png'),
  require('../../../assets/images/two-thumbs-up.png'),
  require('../../../assets/images/bubble-pointer.png'),
  require('../../../assets/images/emc.png'),
  require('../../../assets/images/whale-good-job.png'),
  require('../../../assets/images/icons/celsius-spinner.gif'),
  require('../../../assets/images/lending-interest-chart.png'),
  require('../../../assets/images/polar-bear-hodl.png'),
  require('../../../assets/images/monkey-empty.png'),
  require('../../../assets/images/avatar-mouse-girl.jpg'),
  require('../../../assets/images/Welcome_Doggirl.gif'),
  require('../../../assets/images/Welcome_Penguin.gif'),
  require('../../../assets/images/Welcome_Polar-Bear.gif'),
  require('../../../assets/images/Welcome_Whale.gif'),
  require('../../../assets/images/Welcome_Doggirl.png'),
  require('../../../assets/images/Welcome_Penguin.png'),
  require('../../../assets/images/Welcome_Polar-Bear.png'),
  require('../../../assets/images/Welcome_Whale.png'),
  require('../../../assets/images/polar-bear_large.png'),
  'https://api.staging.celsius.network/profile-images/avatar/avatar-bear.jpg',
  'https://api.staging.celsius.network/profile-images/avatar/avatar-cat.jpg',
  'https://api.staging.celsius.network/profile-images/avatar/avatar-deer.jpg',
  'https://api.staging.celsius.network/profile-images/avatar/avatar-hippo.jpg',
  'https://api.staging.celsius.network/profile-images/avatar/avatar-monkey.jpg',
  'https://api.staging.celsius.network/profile-images/avatar/avatar-mouse-girl.jpg',
  'https://api.staging.celsius.network/profile-images/avatar/avatar-monkey-girl.jpg',
  'https://api.staging.celsius.network/profile-images/avatar/avatar-girl-dog.jpg',
  'https://api.staging.celsius.network/profile-images/avatar/avatar-sheep.jpg',
  require('../../../assets/images/avatar-bear.jpg'),
  require('../../../assets/images/avatar-cat.jpg'),
  require('../../../assets/images/avatar-deer.jpg'),
  require('../../../assets/images/avatar-girl-dog.jpg'),
  require('../../../assets/images/avatar-hippo.jpg'),
  require('../../../assets/images/avatar-monkey.jpg'),
  require('../../../assets/images/avatar-monkey-girl.jpg'),
  require('../../../assets/images/avatar-sheep.jpg'),
  require('../../../assets/images/camera-mask-circle.png'),
  require('../../../assets/images/camera-mask-document.png'),
  require('../../../assets/images/phone_doggirl3x.png'),
  require('../../../assets/images/wallet-girl3x.png'),
  require('../../../assets/images/bear-NoKYC3x.png'),
  require('../../../assets/images/bear-happyKYC3x.png'),
  require('../../../assets/images/App-Login-Animations_Deer.gif'),
  require('../../../assets/images/App-Login-Animations_Hippo.gif'),
  require('../../../assets/images/App-Login-Animations_Squirelgirl.gif'),
  require('../../../assets/images/App-Login-Animations_Monkey-Girl.gif'),
  require('../../../assets/images/App-Login-Animations_Doggirl.gif'),
  require('../../../assets/images/App-Login-Animations_Sheep.gif'),
];
