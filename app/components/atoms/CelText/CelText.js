import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'


import { getMargins, getScaledFont } from '../../../utils/styles-util'
import STYLES from '../../../constants/STYLES'
import ASSETS from '../../../constants/ASSETS'
import CelTextStyle from './CelText.styles'
import { THEMES } from '../../../constants/UI';

class CelText extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['H0', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7']),
    font: PropTypes.oneOf(['barlow']),
    weight: PropTypes.oneOf([
      '100',
      '200',
      '300',
      '400',
      '500',
      '600',
      '700',
      '800',
      '900',
      'thin',
      'extra-light',
      'light',
      'regular',
      'medium',
      'semi-bold',
      'bold',
      'black'
    ]),
    italic: PropTypes.bool,
    color: PropTypes.string,
    margin: PropTypes.string,
    style: PropTypes.oneOfType([
      PropTypes.number, // StyleSheet.create() returns number
      PropTypes.instanceOf(Object)
    ]),
    align: PropTypes.oneOf(['auto', 'left', 'right', 'center', 'justify']),
    allCaps: PropTypes.bool,
    onPress: PropTypes.func,
    size: PropTypes.number,
    theme: PropTypes.oneOf(Object.values(THEMES)),
  }
  static defaultProps = {
    font: 'barlow',
    type: 'H5',
    margin: '0 0 0 0',
    style: {},
    align: 'left',
    allCaps: false,
    italic: false
  }

  getFontSize = type => getScaledFont(STYLES.FONTSIZE[type])

  getFontWeightForType (type) {
    if (type === 'H1') return 'bold'

    return 'regular'
  }

  getFontFamily = () => {
    const { font, weight, italic, type } = this.props

    const fontWeight = weight || this.getFontWeightForType(type)
    let fontFamily = `${font}${ASSETS.WEIGHT[fontWeight.toString()]}`
    if (italic) fontFamily = `${fontFamily}-italic`

    return fontFamily
  }

  getTextColor = () => {
    const { color, theme, type } = this.props
    const cmpStyle = CelTextStyle(theme)

    if (color) return { color }

    return {
      ...cmpStyle.textColor,
      ...cmpStyle[type]
    }

  }

  getFontStyle = () => {
    const { type, margin, align, size, theme } = this.props
    const cmpStyle = CelTextStyle(theme)
    const fontSize = size
      ? { fontSize: getScaledFont(size), lineHeight: getScaledFont(size) }
      : { fontSize: this.getFontSize(type) }
    const fontFamily = { fontFamily: this.getFontFamily() }
    const colorStyle = this.getTextColor()
    const marginStyle = getMargins(margin)
    const alignStyle = { textAlign: align }

    return [
      cmpStyle.text,
      colorStyle,
      fontSize,
      fontFamily,
      marginStyle,
      alignStyle
    ]
  }

  render () {
    const { children, style, allCaps, onPress } = this.props
    const fontStyle = this.getFontStyle()
    return (
      <Text style={[fontStyle, style]} onPress={onPress}>
        {allCaps ? children.toUpperCase() : children}
      </Text>
    )
  }
}

export default CelText
