import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types'


import { getTheme } from '../../../utils/styles-util'
// import ThemedImageStyle from "./ThemedImage.styles";
import { THEMES } from '../../../constants/UI'

function getThemeImage (props) {

  const { lightSource, darkSource, celSource } = props
  const theme = getTheme()

  switch (theme) {
    case THEMES.DARK:
      return darkSource

    case THEMES.CELSIUS:
      return celSource

    case THEMES.LIGHT:
      default:
      return lightSource
  }
}

const ThemedImage = props => (
  <Image
    style={ props.style }
    source={ getThemeImage(props) }
  />
)

ThemedImage.propTypes = {
  lightSource: PropTypes.number,
  darkSource: PropTypes.number,
  celSource: PropTypes.number,
  style: PropTypes.instanceOf(Object),
}


export default ThemedImage
