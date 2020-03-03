import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Constants } from 'expo'
import { View, TouchableOpacity, TextInput } from 'react-native'
import { withNavigationFocus } from 'react-navigation'


import CelNumpadStyle from './CelNumpad.styles'
import CelText from '../../atoms/CelText/CelText'
import {
  KEYBOARD_TYPE,
  KEYPAD_PURPOSES,
  PHONES_WITH_CUSTOM_KEYPAD
} from '../../../constants/UI'
import Icon from '../../atoms/Icon/Icon'
import STYLES from '../../../constants/STYLES'

const BUTTONS = {
  [KEYPAD_PURPOSES.WITHDRAW]: [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['.', '0', '<']
  ],
  [KEYPAD_PURPOSES.CELPAY]: [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['.', '0', '<']
  ],
  [KEYPAD_PURPOSES.VERIFICATION]: [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['', '0', '<']
  ],
  [KEYPAD_PURPOSES.AMOUNT]: [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['.', '0', '<']
  ],
  [KEYPAD_PURPOSES.BORROW]: [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['', '0', '<']
  ]
}

const deviceModel = Constants.platform.ios
  ? Constants.platform.ios.model
  : Constants.platform.android.model
const shouldShowCustomKeypad = PHONES_WITH_CUSTOM_KEYPAD.includes(deviceModel)

const KEYBOARDS = {
  [KEYPAD_PURPOSES.WITHDRAW]: KEYBOARD_TYPE.NUMERIC,
  [KEYPAD_PURPOSES.VERIFICATION]: KEYBOARD_TYPE.NUMERIC,
  [KEYPAD_PURPOSES.CELPAY]: KEYBOARD_TYPE.NUMERIC,
  [KEYPAD_PURPOSES.AMOUNT]: KEYBOARD_TYPE.NUMERIC,
  [KEYPAD_PURPOSES.INTEREST_CALCULATOR]: KEYBOARD_TYPE.NUMERIC,
  [KEYPAD_PURPOSES.BORROW]: KEYBOARD_TYPE.NUMBER_PAD
}

class CelNumpad extends Component {
  static propTypes = {
    field: PropTypes.string,
    autofocus: PropTypes.bool,
    value: PropTypes.string,
    onPress: PropTypes.func,
    updateFormField: PropTypes.func.isRequired,
    setKeypadInput: PropTypes.func.isRequired,
    toggleKeypad: PropTypes.func.isRequired,
    purpose: PropTypes.string.isRequired
  }

  static defaultProps = {
    autofocus: true,
    value: ''
  }

  componentDidMount = () => {
    const { autofocus, toggleKeypad, setKeypadInput, field } = this.props
    if (this.inputRef) {
      setKeypadInput(this.inputRef, field)
      if (autofocus) toggleKeypad()
    }
  }

  componentDidUpdate (prevProps) {
    const { isFocused, setKeypadInput, field } = this.props

    if (prevProps.isFocused === true && isFocused === false) {
      setKeypadInput(false, field)
    }
    if (prevProps.isFocused === false && isFocused === true) {
      setKeypadInput(this.inputRef, field)
    }
  }

  componentWillUnmount = () => {
    const { setKeypadInput, field } = this.props
    setKeypadInput(false, field)
  }

  changeInputText = text => {
    const { value, onPress, updateFormField, field } = this.props

    let newValue
    if (text.includes('.') && text.includes(',')) {
      newValue = value
    } else {
      newValue = text.replace(',', '.')
    }

    if (onPress) {
      onPress(newValue)
    } else {
      updateFormField(field, newValue)
    }
  }

  pressButton (button) {
    const { updateFormField, onPress, field, value } = this.props

    let newValue = value

    if (button === '<') {
      newValue = value.toString().slice(0, -1)
    } else if (button === '.') {
      if (!value) {
        newValue = '.'
      } else if (!value.toString().includes('.')) {
        newValue = `${value}${button}`
      } else {
        newValue = value
      }
    } else if (!isNaN(button)) {
      // Number pressed
      if (value) {
        newValue = `${value}${button}`
      } else {
        newValue = button
      }
    }

    if (onPress) {
      onPress(newValue)
    } else {
      updateFormField(field, newValue)
    }
  }

  render () {
    const { purpose, value, isFocused } = this.props
    const style = CelNumpadStyle()
    const buttons = BUTTONS[purpose]

    if (!isFocused) return null

    if (shouldShowCustomKeypad && purpose !== KEYPAD_PURPOSES.INTEREST_CALCULATOR) {
      return (
        <View style={style.container}>
          <View style={style.buttonsWrapper}>
            {buttons.map(btns => (
              <View key={btns[0]} style={style.buttonsRow}>
                {btns.map(btn => (
                  <TouchableOpacity
                    key={btn}
                    style={style.button}
                    onPress={() => this.pressButton(btn)}
                  >
                    {btn === '<' ? (
                      <Icon
                        name='Backspace'
                        fill={STYLES.COLORS.DARK_GRAY}
                        width='32'
                        style={{ marginTop: 10 }}
                      />
                    ) : (
                      <CelText type='H0'>{btn}</CelText>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </View>
      )
    }

    return (
      <TextInput
        style={{ opacity: 0, position: 'absolute' }}
        value={value || ''}
        onChangeText={this.changeInputText}
        keyboardType={KEYBOARDS[purpose]}
        ref={input => {
          this.inputRef = input
        }}
      />
    )
  }
}

export default withNavigationFocus(CelNumpad)
