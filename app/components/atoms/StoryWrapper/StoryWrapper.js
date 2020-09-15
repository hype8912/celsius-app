import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import StoryWrapperStyles from "./StoryWrapper.styles";
import CelText from "../CelText/CelText";

class StoryWrapper extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  };
  static defaultProps = {
    title: "",
  };

  render() {
    const { children, title, theme } = this.props;
    const style = StoryWrapperStyles(theme);
    return (
      <View style={style.container}>
        <CelText margin={"45 0 5 0"} type="H3" weight="semi-bold">
          {title}
        </CelText>
        {children}
      </View>
    );
  }
}

export default StoryWrapper;
