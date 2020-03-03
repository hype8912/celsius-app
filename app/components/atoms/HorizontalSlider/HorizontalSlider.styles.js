// import STYLES from '../../../constants/STYLES';
import { getThemedStyle } from '../../../utils/styles-util'

const base = {
  container: {}
}

const themed = {
  light: {},

  dark: {},

  celsius: {}
}

const HorizontalSliderStyle = () => getThemedStyle(base, themed)

export default HorizontalSliderStyle
