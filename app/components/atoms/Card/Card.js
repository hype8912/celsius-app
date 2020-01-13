import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity } from "react-native";

import { getPadding, getMargins } from "../../../utils/styles-util";
import CardStyle from "./Card.styles";
import Icon from "../Icon/Icon";
import STYLES from "../../../constants/STYLES";

class Card extends React.Component {
  static propTypes = {
    margin: PropTypes.string,
    opacity: PropTypes.number,
    padding: PropTypes.string,
    color: PropTypes.string,
    styles: PropTypes.instanceOf(Object),
    onPress: PropTypes.func,
    size: PropTypes.oneOf([
      "full",
      "half",
      "third",
      "halfExtra",
      "thirdExtra",
      "twoThirds",
    ]),
    close: PropTypes.bool,
    noBorder: PropTypes.bool,
  };
  static defaultProps = {
    margin: "8 0 8 0",
    padding: "12 12 12 12",
    size: "full",
    opacity: 1,
    styles: {},
    onPress: null,
    close: false,
    color: "",
    noBorder: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
  }

  closeCard = () => this.setState({ open: false });

  render() {
    const {
      margin,
      padding,
      size,
      opacity,
      children,
      styles,
      onPress,
      close,
      color,
      noBorder,
      theme,
    } = this.props;
    const { open } = this.state;
    const style = CardStyle(theme);
    const paddingStyles = getPadding(padding);
    const marginStyles = getMargins(margin);
    const opacityStyles = { opacity };
    const borderStyle = noBorder ? {} : style.cardBorder;
    const background = color
      ? { backgroundColor: color }
      : style.cardBackground;

    const cardStyles = [
      style.card,
      paddingStyles,
      marginStyles,
      opacityStyles,
      style[size],
      background,
      styles,
      borderStyle,
    ];

    const closeIconColor =
      color === STYLES.COLORS.CELSIUS_BLUE
        ? STYLES.COLORS.WHITE
        : STYLES.COLORS.DARK_GRAY_OPACITY;

    const card = (
      <Fragment>
        {close && (
          <TouchableOpacity
            style={{ position: "absolute", right: 10, top: 0 }}
            onPress={this.closeCard}
          >
            <Icon name="Close" fill={closeIconColor} width="25" />
          </TouchableOpacity>
        )}
        {children}
      </Fragment>
    );
    if (!open) return null;
    if (onPress) {
      return (
        <TouchableOpacity onPress={onPress} style={cardStyles}>
          {card}
        </TouchableOpacity>
      );
    }

    return <View style={cardStyles}>{card}</View>;
  }
}

export default Card;
