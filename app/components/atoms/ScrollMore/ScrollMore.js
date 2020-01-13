import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import ScrollMoreStyle from "./ScrollMore.styles";
import Icon from "../Icon/Icon";

const ScrollMore = props => {
  const { height } = props;
  const style = ScrollMoreStyle();

  const gradientArray = [];
  let i;
  for (i = 0; i < 15; i++) {
    gradientArray.push(i);
  }

  return (
    <View style={[style.caretWrapper, { top: height - 30 }]}>
      {gradientArray.map(el => (
        <View
          key={el}
          style={{
            height: 2,
            width: "100%",
            position: "absolute",
            top: el * 2,
            backgroundColor: style.gradientColor.color,
            opacity: (el * 1.5) / 15,
          }}
        />
      ))}
      <Icon
        name="IconChevronDown"
        width={10}
        height={10}
        fill={style.iconFill.color}
      />
      <Icon
        name="IconChevronDown"
        width={10}
        height={10}
        fill={style.iconFill.color}
      />
    </View>
  );
};

ScrollMore.propTypes = {
  height: PropTypes.number.isRequired,
};

export default ScrollMore;
