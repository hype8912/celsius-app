import React from 'react';
import PropTypes from 'prop-types';
import { Clipboard, TouchableOpacity } from 'react-native';



import CelText from '../CelText/CelText';
import CopyButtonStyle from './CopyButton.styles';

const CopyButton = (props) => {


  // To do add propTypes
  const { copyText, onCopy, text, color } = props;
  const style = CopyButtonStyle();


  return (
    <TouchableOpacity style={style.container} onPress={() => { Clipboard.setString(copyText); onCopy() }}>
      <CelText style={style.text} color={color}>{text}</CelText>
    </TouchableOpacity>
  )
}

CopyButton.propTypes = {
  copyText: PropTypes.string.isRequired,
  onCopy: PropTypes.func,
  text: PropTypes.string,
  color: PropTypes.string
};

CopyButton.defaultProps = {
  onCopy: () => { },
  text: 'Copy',
};

export default CopyButton
