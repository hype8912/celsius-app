import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image, TouchableOpacity, View } from "react-native";

import TransactionsFilterItemStyle from "./TransactionsFilterItem.styles";
import STYLES from "../../../constants/STYLES";
import { THEMES } from "../../../constants/UI";
import Icon from "../Icon/Icon";
import CelText from "../CelText/CelText";
import { getTheme } from "../../../utils/styles-util";

const { COLORS } = STYLES;

class TransactionsFilterItem extends Component {
  static propTypes = {
    item: PropTypes.instanceOf(Object),
    isActive: PropTypes.bool,
    onPress: PropTypes.func.isRequired,
  };
  static defaultProps = {};

  setBackgroundStyle = () => {
    const { isActive, item } = this.props;

    if (!isActive) {
      return { backgroundColor: "transparent" };
    }

    if (isActive && !item.image_url) {
      return { backgroundColor: COLORS.GREEN };
    }

    if (isActive && !!item.image_url) {
      return { backgroundColor: COLORS.transparent };
    }
  };

  renderIcon = () => {
    const { isActive, item } = this.props;
    const style = TransactionsFilterItemStyle();

    // Date icon
    if (!item.icon && !item.image_url) {
      return (
        <Icon
          name={item.icon || "CheckboxChecked"}
          fill={isActive ? COLORS.WHITE : COLORS.TRANSPARENT}
          height={item.image_url ? "26" : "12"}
          width={item.image_url ? "26" : "12"}
        />
      );
    }

    // Transaction Type icon
    if (item.icon && !item.image_url) {
      return (
        <Icon
          name={item.icon || "CheckboxChecked"}
          fill={isActive ? COLORS.WHITE : COLORS.TRANSPARENT}
          height={item.image_url ? "26" : "12"}
          width={item.image_url ? "26" : "12"}
        />
      );
    }

    // Coin icon
    if (item.image_url) {
      if (isActive) {
        return (
          <Image source={{ uri: item.image_url }} style={style.iconWrapper} />
        );
      }
      return (
        <Icon
          name={item.icon || "CheckboxChecked"}
          fill={COLORS.DARK_GRAY3}
          height={item.image_url ? "26" : "12"}
          width={item.image_url ? "26" : "12"}
        />
      );
    }
  };

  renderClearSelect = () => {
    const style = TransactionsFilterItemStyle();
    const { isActive, item } = this.props;
    const theme = getTheme();

    if (!isActive || !item.value || !item.icon) return null;

    return (
      <View style={style.clearSelectWrapper}>
        <Icon
          name={"Close"}
          fill={
            theme === THEMES.LIGHT
              ? COLORS.DARK_GRAY3
              : STYLES.COLORS.WHITE_OPACITY5
          }
          height={"16"}
          width={"16"}
        />
      </View>
    );
  };

  render() {
    const { item, onPress } = this.props;
    const style = TransactionsFilterItemStyle();
    const backgroundStyle = this.setBackgroundStyle();

    return (
      <View style={style.itemStyle}>
        <TouchableOpacity
          style={style.optionPickerWrapper}
          onPress={() => {
            this.renderClearSelect();
            onPress(item);
          }}
        >
          <View style={[style.iconWrapper, backgroundStyle]}>
            {this.renderIcon()}
          </View>

          <CelText>{item.title}</CelText>

          {this.renderClearSelect()}
        </TouchableOpacity>
      </View>
    );
  }
}

export default TransactionsFilterItem;
