import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from 'prop-types';

import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import EmptyState from "../../atoms/EmptyState/EmptyState";
import StaticScreenStyle from "./StaticScreen.styles";

class StaticScreen extends Component {
  static propTypes = {
    type: PropTypes.string
  };
  static defaultProps = {};

  render() {
    const { emptyState, type } = this.props;
    const style = StaticScreenStyle();
    return (
      <RegularLayout fabType={type}>
        <View style={style.wrapper}>
          <EmptyState {...emptyState} />
        </View>
      </RegularLayout>
    );
  }
}

export default StaticScreen;
