import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import RoundedBadgeStyle from "./RoundedBadge.styles";
import CelText from '../CelText/CelText';

const RoundedBadge = ({text, onPress}) => {
  const styles = RoundedBadgeStyle()
 
  return (
    <TouchableOpacity
      onPress={() => onPress()}
    >
      <View style={styles.container}>
        <CelText
          type='H6'
          margin='0 12 3 12'
        >
          {text}
        </CelText>
      </View>
    </TouchableOpacity>
  )
}

RoundedBadge.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
}

export default RoundedBadge
