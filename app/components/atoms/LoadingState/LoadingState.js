import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import LoadingStateStyle from "./LoadingState.styles";
import CelText from "../CelText/CelText";
import Spinner from "../Spinner/Spinner";

const LoadingState = ({ heading = "Please wait. This may take a moment" }) => {
  const style = LoadingStateStyle();
  return (
    <View style={style.container}>
      <View style={{ alignSelf: "center" }}>
        <Spinner size={50} />
      </View>

      <CelText
        margin="20 0 15 0"
        align="center"
        type="H4"
        style={{ paddingHorizontal: 20 }}
      >
        {heading}
      </CelText>
    </View>
  );
};

LoadingState.propTypes = {
  heading: PropTypes.string,
  image: PropTypes.string,
};

export default LoadingState;
