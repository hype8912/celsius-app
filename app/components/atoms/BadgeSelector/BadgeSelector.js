import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import BadgeSelectorStyle from './BadgeSelector.styles';
import RoundedBadge from '../RoundedBadge/RoundedBadge'

class BadgeSelector extends Component {
  static propTypes = {
    badges: PropTypes.instanceOf(Array)
  };

  renderRowItem (item) {
    const { onPressBadge } = this.props
    return (
      <View style ={{margin: 6}} key={item}>
        <RoundedBadge 
          onPress = {() => onPressBadge(item)}
          text = {item}
        />
      </View>
    )
  }

  render() {
    const style = BadgeSelectorStyle()
    const { badges } = this.props
    return (
     <View style={style.container}>
       {
         badges.map((item) => this.renderRowItem(item))
       }
     </View>
    )
  }
}

export default BadgeSelector
