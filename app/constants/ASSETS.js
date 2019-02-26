const FONTS = [
  { 'barlow-thin': require('../../assets/fonts/Barlow/Barlow-Thin.ttf') },
  { 'barlow-thin-italic': require('../../assets/fonts/Barlow/Barlow-ThinItalic.ttf') },
  { 'barlow-extra-light': require('../../assets/fonts/Barlow/Barlow-ExtraLight.ttf') },
  { 'barlow-extra-light-italic': require('../../assets/fonts/Barlow/Barlow-ExtraLightItalic.ttf') },
  { 'barlow-light': require('../../assets/fonts/Barlow/Barlow-Light.ttf') },
  { 'barlow-light-italic': require('../../assets/fonts/Barlow/Barlow-LightItalic.ttf') },
  { 'barlow-regular': require('../../assets/fonts/Barlow/Barlow-Regular.ttf') },
  { 'barlow-regular-italic': require('../../assets/fonts/Barlow/Barlow-Italic.ttf') },
  { 'barlow-medium': require('../../assets/fonts/Barlow/Barlow-Medium.ttf') },
  { 'barlow-medium-italic': require('../../assets/fonts/Barlow/Barlow-MediumItalic.ttf') },
  { 'barlow-semi-bold': require('../../assets/fonts/Barlow/Barlow-SemiBold.ttf') },
  { 'barlow-semi-bold-italic': require('../../assets/fonts/Barlow/Barlow-SemiBoldItalic.ttf') },
  { 'barlow-bold': require('../../assets/fonts/Barlow/Barlow-Bold.ttf') },
  { 'barlow-bold-italic': require('../../assets/fonts/Barlow/Barlow-BoldItalic.ttf') },
  { 'barlow-extra-bold': require('../../assets/fonts/Barlow/Barlow-ExtraBold.ttf') },
  { 'barlow-extra-bold-italic': require('../../assets/fonts/Barlow/Barlow-ExtraBoldItalic.ttf') },
  { 'barlow-black': require('../../assets/fonts/Barlow/Barlow-Black.ttf') },
  { 'barlow-black-italic': require('../../assets/fonts/Barlow/Barlow-BlackItalic.ttf') },

];

const WEIGHT = {
  '100': '-thin',
  '200': '-extra-light',
  '300': '-light',
  '400': '-regular',
  '500': '-medium',
  '600': '-semi-bold',
  '700': '-bold',
  '900': '-black'
};

const CACHE_IMAGES = [
  require('../../assets/images/illustrations-v3/PolarBearFistUp3x.png'),
  require('../../assets/images/illustrations-v3/PolarBearHODL3x.png'),
  require('../../assets/images/illustrations-v3/PolarBearSad3x.png'),
  require('../../assets/images/bear-happyKYC3x.png'),
  require('../../assets/images/deerTransactionHistory.png'),
  require('../../assets/images/illuNoKYC3x.png'),
  // require('../../assets/images/OfflineMode/deer-tangled3x.png'),
  require('../../assets/images/diane-sad.png'),
  require('../../assets/images/empty-profile/empty-profile.png'),
  require('../../assets/images/icons/contacts-circle/contacts-circle.png'),
  require('../../assets/images/icons/fb-circle/fb-circle.png'),
  require('../../assets/images/icons/tw-circle/tw-circle.png'),
];

export default {
  FONTS,
  CACHE_IMAGES,
  WEIGHT,
}
