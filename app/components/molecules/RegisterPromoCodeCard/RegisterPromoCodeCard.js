import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import RegisterPromoCodeCardStyle from "./RegisterPromoCodeCard.styles";
import CelText from "../../atoms/CelText/CelText";
import Card from "../../atoms/Card/Card";
import Icon from "../../atoms/Icon/Icon";
import CelButton from "../../atoms/CelButton/CelButton";
import STYLES from "../../../constants/STYLES";
import { MODALS } from "../../../constants/UI";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

class RegisterPromoCodeCard extends Component {
  static propTypes = {
    promoCode: PropTypes.string,
    openModal: PropTypes.func.isRequired,
  };
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false,
    };
  }

  renderPromoCodeBody = () => {
    const { promoCode, openModal } = this.props;
    const style = RegisterPromoCodeCardStyle();

    if (promoCode) {
      return (
        <View style={style.referralBody}>
          <View style={style.indentation} />
          <View style={style.referralCopy}>
            <CelText type={"H5"} weight={"500"} color={STYLES.COLORS.WHITE}>
              In order to receive your referral reward, you must:
            </CelText>
            <CelText
              margin={"10 0 0 0"}
              type={"H6"}
              weight={"300"}
              color={STYLES.COLORS.WHITE}
            >
              1. Complete KYC (Identity Verification)
            </CelText>
            <CelText
              margin={"10 0 0 0"}
              type={"H6"}
              weight={"300"}
              color={STYLES.COLORS.WHITE}
            >
              2. Receive confirmation of account verification
            </CelText>
            <CelText
              margin={"10 0 0 0"}
              type={"H6"}
              weight={"300"}
              color={STYLES.COLORS.WHITE}
            >
              3. Transfer $200 or more worth of coins to your Celsius wallet
            </CelText>
          </View>
        </View>
      );
    }
    return (
      <View style={style.referralBody}>
        <View style={style.indentation} />
        <View style={style.referralCopy}>
          <CelText
            margin={"10 0 0 0"}
            type={"H6"}
            weight={"300"}
            color={STYLES.COLORS.WHITE}
          >
            Enter your code below. When your crypto balance reaches $200, you
            and your friend will get rewarded! Balance must remain for at least
            30 days to qualify.
          </CelText>
          <CelText
            margin={"10 0 0 0"}
            type={"H6"}
            weight={"400"}
            color={STYLES.COLORS.WHITE}
          >
            NOTE: You will NOT be able to enter a referral code after account
            verification.
          </CelText>
          <CelText
            margin={"10 0 0 0"}
            type={"H6"}
            weight={"300"}
            color={STYLES.COLORS.WHITE}
          >
            1. Complete KYC (Identity Verification)
          </CelText>
          <CelText
            margin={"10 0 0 0"}
            type={"H6"}
            weight={"300"}
            color={STYLES.COLORS.WHITE}
          >
            2. Receive confirmation of account verification
          </CelText>
          <CelText
            margin={"10 0 0 0"}
            type={"H6"}
            weight={"300"}
            color={STYLES.COLORS.WHITE}
          >
            3. Transfer $200 or more worth of coins to your Celsius wallet
          </CelText>
          <View style={{ alignItems: "flex-start" }}>
            <CelButton
              onPress={() => openModal(MODALS.REGISTER_PROMO_CODE_MODAL)}
              color={"white"}
              textColor={STYLES.COLORS.CELSIUS_BLUE}
              size={"small"}
              margin={"20 0 15 0"}
              style={{ justifyContent: "flex-start" }}
            >
              Enter Referral Code
            </CelButton>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const style = RegisterPromoCodeCardStyle();

    const { promoCode } = this.props;
    const { isExpanded } = this.state;

    return (
      <Card
        size="full"
        color={
          promoCode
            ? getColor(COLOR_KEYS.POSITIVE_STATE)
            : getColor(COLOR_KEYS.BANNER_INFO)
        }
        onPress={() => {
          this.setState({ isExpanded: !isExpanded });
        }}
      >
        <View style={style.referralHeading}>
          <View style={style.iconWrapper}>
            <View style={style.iconStyle}>
              <Icon
                name={promoCode ? "Checked" : "Present"}
                width="20"
                height="20"
                fill={
                  promoCode ? STYLES.COLORS.GREEN : STYLES.COLORS.CELSIUS_BLUE
                }
              />
            </View>
          </View>
          <View style={style.titleWrapper}>
            <CelText
              type={"H5"}
              weight={"500"}
              color={STYLES.COLORS.WHITE}
              style={{ marginTop: 10 }}
            >
              {promoCode ? "Referral Code Activated" : "Have a referral code?"}
            </CelText>
            {!promoCode && (
              <View style={style.caretStyle}>
                <Icon
                  name={isExpanded ? "UpArrow" : "DownArrow"}
                  width="15"
                  height="15"
                  fill={STYLES.COLORS.WHITE}
                />
              </View>
            )}
          </View>
        </View>
        {isExpanded && <View>{this.renderPromoCodeBody()}</View>}
      </Card>
    );
  }
}

export default RegisterPromoCodeCard;
