import React, { Component } from "react";
import { View } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as appActions from "../../../redux/actions";
import MyCelInterestTabStyle from "./MyCelInterestTab.styles";
import CelText from "../../atoms/CelText/CelText";
import ThemedImage from "../../atoms/ThemedImage/ThemedImage";
import PerCoinCellInterestCard from "../../molecules/PerCoinCelInterestCard/PerCoinCelInterestCard";
import { isUSResident } from "../../../utils/user-util/user-util";

@connect(
  state => ({
    loyaltyInfo: state.loyalty.loyaltyInfo,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class MyCelInterestTab extends Component {
  rewardsCopy = () => {
    const style = MyCelInterestTabStyle();

    if (isUSResident()) {
      return (
        <View style={{ marginTop: 30 }}>
          <CelText align={"center"} type={"H4"} weight={"300"}>
            Unfortunately, American residents can not earn in CEL token at this
            time. Enjoy your in-kind rewards, and HODL CEL to get discounts on
            your loans!
          </CelText>
        </View>
      );
    }

    return (
      <View style={{ marginTop: 30 }}>
        <CelText
          style={style.title}
          type={"H3"}
          weight={"600"}
          align={"center"}
        >
          Earn More Rewards
        </CelText>
        <CelText align={"center"} type={"H4"} weight={"300"}>
          Choose to earn in CEL tokens and earn more on all your assets.
        </CelText>
      </View>
    );
  };

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
                unicornSource={require("../../../../assets/images/loyaltyIcons/interestCircleIconUnicorn3x.png")}
              />
            </View>
            {this.rewardsCopy()}
          </View>
          {!isUSResident() && (
            <View style={style.wrapper}>
              <CelText align={"center"} type={"H4"} weight={"300"}>
                Based on your{" "}
                <CelText align={"center"} type={"H4"} weight={"500"}>
                  Loyalty Level{" "}
                  <CelText align={"center"} type={"H4"} weight={"300"}>
                    your rewards will increase :{" "}
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
          )}
        </View>
        <PerCoinCellInterestCard />
      </View>
    );
  }
}

export default MyCelInterestTab;
