import React, { Component } from "react";
import { View } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as appActions from "../../../redux/actions";
import MyCelInterestTabStyle from "./MyCelInterestTab.styles";
import CelText from "../../atoms/CelText/CelText";
// import STYLES from "../../../constants/STYLES";
import ThemedImage from "../../atoms/ThemedImage/ThemedImage";
import PerCoinCellInterestCard from "../../molecules/PerCoinCelInterestCard/PerCoinCelInterestCard";

@connect(
  state => ({
    loyaltyInfo: state.user.loyaltyInfo,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class MyCelInterestTab extends Component {
  render() {
    const { width, loyaltyInfo } = this.props;
    const style = MyCelInterestTabStyle();

    return (
      <View style={style.contentWrapper}>
        <View style={{ width, marginBottom: 10 }}>
          <View style={style.wrapper}>
            <View style={style.circle}>
              <ThemedImage
                style={[style.starIcon, { marginTop: 6 }]}
                lightSource={require("../../../../assets/images/loyaltyIcons/interestCircleIcon3x.png")}
                darkSource={require("../../../../assets/images/loyaltyIcons/interestCircleIconDark3x.png")}
              />
            </View>
            <View style={{ marginTop: 30 }}>
              <CelText
                style={style.title}
                type={"H3"}
                weight={"600"}
                align={"center"}
              >
                Earn better interest
              </CelText>
              <CelText align={"center"} type={"H4"} weight={"300"}>
                Choose to earn weekly interest in CEL tokens and earn more
                interest on all non-CEL deposits.
              </CelText>
            </View>
          </View>
          <View style={style.wrapper}>
            <CelText align={"center"} type={"H4"} weight={"300"}>
              Based on your{" "}
              <CelText align={"center"} type={"H4"} weight={"500"}>
                Loyalty Level{" "}
                <CelText align={"center"} type={"H4"} weight={"300"}>
                  your interest in CEL would be:{" "}
                </CelText>
              </CelText>
            </CelText>
            <CelText
              style={style.title}
              align={"center"}
              type={"H1"}
              weight={"600"}
            >
              {`${loyaltyInfo.tier.interestBonus * 100}%`} higher
            </CelText>
          </View>
        </View>
        <PerCoinCellInterestCard />
      </View>
    );
  }
}

export default MyCelInterestTab;
