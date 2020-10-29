import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import LoyaltyProgramStyle from "./LoyaltyProgram.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import Card from "../../atoms/Card/Card";
import PieProgressBar from "../../graphs/PieProgressBar/PieProgressBar";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { getColor, widthPercentageToDP } from "../../../utils/styles-util";
import CelButton from "../../atoms/CelButton/CelButton";
import formatter from "../../../utils/formatter";
import Separator from "../../atoms/Separator/Separator";
import ThemedImage from "../../atoms/ThemedImage/ThemedImage";
import CelsiusMembershipTable from "../../organisms/CelsiusMembershipTable/CelsiusMembershipTable";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { SCREENS } from "../../../constants/SCREENS";
import { TIER_LEVELS } from "../../../constants/DATA";

@connect(
  state => ({
    currencies: state.currencies.rates,
    loyaltyInfo: state.loyalty.loyaltyInfo,
    appSettings: state.user.appSettings,
    walletSummary: state.wallet.summary,
    email: state.user.profile.email,
    celUtilityTiers: state.generalData.celUtilityTiers,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class LoyaltyProgram extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Loyalty Program",
    right: "profile",
  });

  componentDidMount() {
    const { actions } = this.props;
    actions.getLoyaltyInfo();
    actions.getUserAppSettings();
  }

  renderLoyaltyHeader = () => {
    const { loyaltyInfo, walletSummary } = this.props;
    const style = LoyaltyProgramStyle();
    const celAmount = walletSummary.coins.filter(
      coin => coin.short === "CEL"
    )[0];
    let color;
    if (loyaltyInfo.tier.title === TIER_LEVELS.BRONZE)
      color = getColor(COLOR_KEYS.BRONZE);
    if (loyaltyInfo.tier.title === TIER_LEVELS.SILVER)
      color = getColor(COLOR_KEYS.SECTION_TITLE);
    if (loyaltyInfo.tier.title === TIER_LEVELS.GOLD) color = getColor(COLOR_KEYS.ALERT_STATE);
    if (loyaltyInfo.tier.title === TIER_LEVELS.PLATINUM)
      color = getColor(COLOR_KEYS.PRIMARY_BUTTON);
    return (
      <View>
        <View style={[style.progressView, { backgroundColor: color }]}>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <CelText color={"white"} type={"H4"} weight={"700"}>
              {formatter.usd(celAmount.amount_usd)}
            </CelText>
            <CelText color={"white"} type={"H5"} weight={"300"}>
              CEL coins
            </CelText>
          </View>
          <View style={style.arcChart}>
            <PieProgressBar
              color={color}
              level={loyaltyInfo.tier_level}
              tier={loyaltyInfo.tier.title}
            />
          </View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <CelText color={"white"} type={"H4"} weight={"700"}>
              {formatter.usd(
                walletSummary.total_amount_usd
                  .minus(celAmount.amount_usd)
                  .toNumber(),
                { precision: 0 }
              )}
            </CelText>
            <CelText color={"white"} type={"H5"} weight={"300"}>
              Other coins
            </CelText>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const { loyaltyInfo, appSettings, actions } = this.props;
    const style = LoyaltyProgramStyle();

    if (!loyaltyInfo || !appSettings) return <LoadingScreen />;
    const hasTier = loyaltyInfo.tier.title !== "NONE";

    return (
      <RegularLayout padding={"0 0 100 0"}>
        <View>
          {hasTier && this.renderLoyaltyHeader()}

          <View style={style.contentWrapper}>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-around",
              }}
            >
              <CelText
                type={"H6"}
                weight={"300"}
                style={{
                  marginTop: widthPercentageToDP("23.3") / 3,
                  width: "35%",
                }}
              >
                Your CEL balance is
              </CelText>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ThemedImage
                  style={[style.starIcon, { marginTop: 2 }]}
                  lightSource={require("../../../../assets/images/loyaltyIcons/star-bg3x.png")}
                  darkSource={require("../../../../assets/images/loyaltyIcons/star-dark-bg3x.png")}
                />
                <CelText
                  type={"H3"}
                  weight={"700"}
                  style={{
                    position: "absolute",
                    top: widthPercentageToDP("23.3%") / 3.5,
                  }}
                >
                  {`${Math.round(
                    formatter.percentage(loyaltyInfo.cel_ratio)
                  )}%`}
                </CelText>
              </View>
              <CelText
                type={"H6"}
                weight={"300"}
                style={{
                  marginTop: widthPercentageToDP("23.3") / 3,
                  width: "35%",
                }}
              >
                of wallet balance
              </CelText>
            </View>
            {hasTier && (
              <Card style={style.bonusCard}>
                <View style={style.interestCard}>
                  <View>
                    <CelText
                      margin={"0 0 10 0"}
                      align={"center"}
                      type={"H2"}
                      weight={"700"}
                    >
                      {`${loyaltyInfo.tier.interestBonus * 100}%`}
                    </CelText>
                    <CelText align={"center"} type={"H5"} weight={"300"}>
                      Bonus for earning
                    </CelText>
                    <CelText
                      margin={"0 0 10 0"}
                      align={"center"}
                      type={"H5"}
                      weight={"300"}
                    >
                      rewards in CEL
                    </CelText>
                  </View>
                  <Separator vertical />
                  <View>
                    <CelText
                      margin={"0 0 10 0"}
                      align={"center"}
                      type={"H2"}
                      weight={"700"}
                    >
                      {`${loyaltyInfo.tier.loanInterestBonus * 100}%`}
                    </CelText>
                    <CelText align={"center"} type={"H5"} weight={"300"}>
                      Discount for paying
                    </CelText>
                    <CelText
                      margin={"0 0 10 0"}
                      align={"center"}
                      type={"H5"}
                      weight={"300"}
                    >
                      rewards in CEL
                    </CelText>
                  </View>
                </View>
              </Card>
            )}

            <View style={{ alignItems: "center", paddingHorizontal: 10 }}>
              <View style={style.circle}>
                <ThemedImage
                  style={[style.starIcon, { marginTop: 6 }]}
                  lightSource={require("../../../../assets/images/loyaltyIcons/star-icon3x.png")}
                  darkSource={require("../../../../assets/images/loyaltyIcons/star-dark-icon3x.png")}
                />
              </View>
              <CelText
                style={style.title}
                type={"H3"}
                align={"center"}
                weight={"600"}
              >
                How do we calculate your loyalty level?
              </CelText>
              <CelText
                style={style.explanation}
                align={"center"}
                type={"H4"}
                weight={"300"}
              >
                Your loyalty level is determined by the percentage of your
                wallet balance that is in CEL.
              </CelText>

              <CelsiusMembershipTable />

              <CelText
                align="center"
                type="H4"
                weight="300"
                margin={"20 0 10 0"}
              >
                Each loyalty level will bring you better rewards -
                <CelText align="center" type="H4" weight="700">
                  so keep HODLing!
                </CelText>
              </CelText>

              <View style={style.circle}>
                <ThemedImage
                  style={[style.starIcon, { marginTop: 6 }]}
                  lightSource={require("../../../../assets/images/loyaltyIcons/withdraw-icon3x.png")}
                  darkSource={require("../../../../assets/images/loyaltyIcons/withdraw-icon-dark3x.png")}
                />
              </View>
              <CelText style={style.title} type={"H3"} weight={"600"}>
                Withdrawing CEL
              </CelText>
              <CelText
                style={style.explanation}
                align={"center"}
                type={"H4"}
                weight={"300"}
              >
                Withdrawing CEL will affect your loyalty level.
              </CelText>

              <View style={style.circle}>
                <ThemedImage
                  style={[style.starIcon, { marginTop: 6 }]}
                  lightSource={require("../../../../assets/images/loyaltyIcons/reward-icon3x.png")}
                  darkSource={require("../../../../assets/images/loyaltyIcons/reward-dark-icon3x.png")}
                />
              </View>
              <CelText style={style.title} type={"H3"} weight={"600"}>
                Always Updating
              </CelText>
              <CelText
                style={style.explanation}
                align={"center"}
                type={"H4"}
                weight={"300"}
              >
                Your loyalty level is dynamic and will change with changing
                wallet balances. This includes new transfers and withdrawals as
                well as market fluctuations. Make sure to check your status
                every week!
              </CelText>
            </View>
            <CelButton
              margin={"30 0 10 0"}
              onPress={() =>
                actions.navigateTo(SCREENS.DEPOSIT, { coin: "CEL" })
              }
            >
              Transfer CEL
            </CelButton>
          </View>
        </View>
      </RegularLayout>
    );
  }
}

export default LoyaltyProgram;
