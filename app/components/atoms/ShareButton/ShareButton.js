import React from "react";
import PropTypes from "prop-types";
import { Share, TouchableOpacity } from "react-native";

import CelText from "../CelText/CelText";
import ShareButtonStyle from "./ShareButton.styles";

const ShareButton = props => {
  const { shareText, title, name = "Share" } = props;
  const style = ShareButtonStyle();

  return (
    <TouchableOpacity
      style={style.container}
      onPress={() => Share.share({ message: shareText, title, name })}
    >
      <CelText style={style.text}>{name}</CelText>
    </TouchableOpacity>
  );
};

ShareButton.propTypes = {
  shareText: PropTypes.string.isRequired,
  title: PropTypes.string,
};

ShareButton.defaultProps = {
  title: "",
};

export default ShareButton;
