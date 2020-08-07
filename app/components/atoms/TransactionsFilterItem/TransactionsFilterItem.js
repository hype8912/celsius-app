import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, View } from "react-native";

import TransactionsFilterItemStyle from "./TransactionsFilterItem.styles";
import STYLES from "../../../constants/STYLES";
import Icon from "../Icon/Icon";
import CelText from "../CelText/CelText";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

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
      return { backgroundColor: COLORS.TRANSPARENT };
    }

    if (isActive && !item.image_url) {
      return { backgroundColor: getColor(COLOR_KEYS.POSITIVE_STATE) };
    }

    if (isActive && !!item.image_url) {
      return { backgroundColor: COLORS.TRANSPARENT };
    }
  };

  renderIcon = () => {
    const { isActive, item } = this.props;

    // Date icon
    if (!item.icon && !item.image_url) {
      return (
        <Icon
          name={item.icon || "CheckboxChecked"}
          fill={
            isActive ? COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND : COLORS.TRANSPARENT
          }
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
          fill={
            isActive ? COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND : COLORS.TRANSPARENT
          }
          height={item.image_url ? "26" : "12"}
          width={item.image_url ? "26" : "12"}
        />
      );
    }

    // Coin icon
    if (item.image_url) {
      if (isActive) {
        return (
          <Icon
            name={item.icon}
            fill={COLOR_KEYS.HEADLINE}
            height={item.image_url ? "26" : "12"}
            width={item.image_url ? "26" : "12"}
          />
        );
      }
      return (
        <Icon
          name={item.icon}
          fill={COLOR_KEYS.PARAGRAPH}
          height={item.image_url ? "26" : "12"}
          width={item.image_url ? "26" : "12"}
          iconOpacity={0.2}
        />
      );
    }
  };

  renderClearSelect = () => {
    const style = TransactionsFilterItemStyle();
    const { isActive, item } = this.props;
    if (!isActive || !item.value || !item.icon) return null;

    return (
      <View style={style.clearSelectWrapper}>
        <Icon
          name={"Close"}
          fill={COLOR_KEYS.PARAGRAPH}
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
