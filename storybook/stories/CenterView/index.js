import React from "react";
import PropTypes from "prop-types";
import { View, ScrollView } from "react-native";
import style from "./style";

export default function CenterView({ children }) {
  return <ScrollView style={style.main}>{children}</ScrollView>;
}

CenterView.defaultProps = {
  children: null,
};

CenterView.propTypes = {
  children: PropTypes.node,
};
