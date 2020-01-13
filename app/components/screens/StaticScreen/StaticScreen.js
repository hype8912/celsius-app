import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import EmptyState from "../../atoms/EmptyState/EmptyState";
import StaticScreenStyle from "./StaticScreen.styles";
import { EMPTY_STATES } from "../../../constants/UI";

class StaticScreen extends Component {
  static propTypes = {
    type: PropTypes.string,
    emptyState: PropTypes.instanceOf(Object),
    padding: PropTypes.string,
  };
  static defaultProps = {};

  render() {
    const { padding, emptyState, type } = this.props;
    const style = StaticScreenStyle();
    return (
      <RegularLayout
        padding={padding}
        fabType={
          emptyState.purpose === EMPTY_STATES.MAINTENANCE ? "hide" : type
        }
      >
        <View style={style.wrapper}>
          <EmptyState {...emptyState} />
        </View>
      </RegularLayout>
    );
  }
}

export default StaticScreen;
