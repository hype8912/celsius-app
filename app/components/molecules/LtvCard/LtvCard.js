import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import LtvCardStyle from "./LtvCard.styles";
import CelText from "../../atoms/CelText/CelText";
import Card from "../../atoms/Card/Card";
import Icon from "../../atoms/Icon/Icon";
import Separator from "../../atoms/Separator/Separator";
import formatter from "../../../utils/formatter";
import STYLES from "../../../constants/STYLES";

class LtvCard extends Component {
  static propTypes = {
    loan: PropTypes.instanceOf(Object),
  };
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      info: false,
    };
  }

  set = () => {
    const { info } = this.state;
    this.setState({ info: !info });
  };

  renderContent = loan => {
    const content = [
      { title: "Current LTV:", value: `${Math.round(loan.current_ltv)}%` },
      { title: "Contract LTV:", value: `${formatter.percentage(loan.ltv)}%` },
      {
        title: "Margin LTV:",
        value: `${Math.round(loan.margin_call_threshold)}%`,
      },
      {
        title: "Liquidation LTV:",
        value: `${Math.round(loan.liquidation_threshold)}%`,
      },
    ];

    return content.map((c, i) => {
      return (
        <View>
          <View
            style={{
              marginVertical: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <CelText
              color={i === 0 ? STYLES.COLORS.RED : STYLES.COLORS.DARK_GRAY}
              weight={"500"}
              type={"H5"}
            >
              {c.title}
            </CelText>
            <CelText
              color={i === 0 ? STYLES.COLORS.RED : STYLES.COLORS.DARK_GRAY}
              weight={"500"}
              type={"H5"}
            >
              {c.value}
            </CelText>
          </View>
          {i !== content.length - 1 && <Separator />}
        </View>
      );
    });
  };

  render() {
    const style = LtvCardStyle();
    const { loan } = this.props;
    const { info } = this.state;

    return (
      <Card
        onPress={() => this.setState({ info: !info })}
        style={style.container}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <CelText>LTV Information</CelText>
          <Icon
            name={info ? "IconChevronDown" : "IconChevronUp"}
            width={15}
            height={15}
          />
        </View>
        {info && this.renderContent(loan)}
        <Card color={style.card.color}>
          <CelText>
            If the Margin Call is not resolved, collateral may be deducted from
            your wallet or a portion of your collateral may be liquidated.
          </CelText>
        </Card>
      </Card>
    );
  }
}

export default LtvCard;
