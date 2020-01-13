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
import { widthPercentageToDP } from "../../../utils/styles-util";
import CelButton from "../../atoms/CelButton/CelButton";
import STYLES from "../../../constants/STYLES";
import formatter from "../../../utils/formatter";
import Separator from "../../atoms/Separator/Separator";
import ThemedImage from "../../atoms/ThemedImage/ThemedImage";

@connect(
  state => ({
    currencies: state.currencies.rates,
    loyaltyInfo: state.user.loyaltyInfo,
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

  // TODO: refactor with a map or something, move to organism
  renderLoyaltyTable = () => {
    const { celUtilityTiers } = this.props;
    const style = LoyaltyProgramStyle();
    return (
      <View style={style.tableWrapper}>
        <View style={style.tierWrapper}>
          <View style={[style.tierSilver, style.tierCommon]}>
            <CelText type="H6" color="white" weight="600">
              {" "}
              SILVER{" "}
            </CelText>
          </View>
          <View style={[style.tierGold, style.tierCommon]}>
            <CelText type="H6" color="white" weight="600">
              {" "}
              GOLD{" "}
            </CelText>
          </View>
          <View style={[style.tierPlatinum, style.tierCommon]}>
            <CelText type="H6" color="white" weight="600">
              {" "}
              PLATINUM{" "}
            </CelText>
          </View>
        </View>

        <View style={style.minPercentage}>
          <View style={style.tierData}>
            <CelText type="H7" weight="500">
              {`< ${formatter.percentage(
                celUtilityTiers.SILVER.maximum_cel_percentage
              )}%`}
            </CelText>
          </View>
          <Separator vertical height={"60%"} margin="7 0 0 5" />
          <View style={style.tierData}>
            <CelText type="H7" weight="500">
              {`< ${formatter.percentage(
                celUtilityTiers.GOLD.maximum_cel_percentage
              )}%`}
            </CelText>
          </View>
          <Separator vertical height={"60%"} margin="7 0 0 2" />
          <View style={style.tierData}>
            <CelText type="H7" weight="500">
              {`> ${formatter.percentage(
                celUtilityTiers.PLATINUM.minimum_cel_percentage
              )}%`}
            </CelText>
          </View>
        </View>

        <View style={style.separator}>
          <CelText type="H7" weight="500">
            Bonus interest:
          </CelText>
        </View>

        <View style={style.bonus}>
          <View style={style.tierData}>
            <CelText type="H7" weight="500">
              {`${formatter.percentage(
                celUtilityTiers.SILVER.interest_bonus
              )}%`}
            </CelText>
          </View>
          <Separator vertical height={"60%"} margin="7 0 0 0" />
          <View style={style.tierData}>
            <CelText type="H7" weight="500">
              {`${formatter.percentage(celUtilityTiers.GOLD.interest_bonus)}%`}
            </CelText>
          </View>
          <Separator vertical height={"60%"} margin="7 0 0 7" />
          <View style={style.tierData}>
            <CelText type="H7" weight="500">
              {`${formatter.percentage(
                celUtilityTiers.PLATINUM.interest_bonus
              )}%`}
            </CelText>
          </View>
        </View>

        <View style={style.separator}>
          <CelText type="H7" weight="500">
            {" "}
            Loan interest discount:{" "}
          </CelText>
        </View>

        <View style={style.loan}>
          <View style={style.tierData}>
            <CelText type="H7" weight="500">
              {`${formatter.percentage(
                celUtilityTiers.SILVER.loan_interest_bonus
              )}%`}
            </CelText>
          </View>
          <Separator vertical height={"60%"} margin="7 0 0 0" />
          <View style={style.tierData}>
            <CelText type="H7" weight="500">
              {`${formatter.percentage(
                celUtilityTiers.GOLD.loan_interest_bonus
              )}%`}
            </CelText>
          </View>
          <Separator vertical height={"60%"} margin="7 0 0 7" />
          <View style={style.tierDataLast}>
            <CelText type="H7" weight="500">
              {`${formatter.percentage(
                celUtilityTiers.PLATINUM.loan_interest_bonus
              )}%`}
            </CelText>
          </View>
        </View>
      </View>
    );
  };

  // TODO: move to organism
  renderLoyaltyHeader = () => {
    const { loyaltyInfo, walletSummary } = this.props;
    const style = LoyaltyProgramStyle();
    const celAmount = walletSummary.coins.filter(
      coin => coin.short === "CEL"
    )[0];
    let color;
    if (loyaltyInfo.tier_level === 1) color = STYLES.COLORS.GRAY;
    if (loyaltyInfo.tier_level === 2) color = STYLES.COLORS.ORANGE;
    if (loyaltyInfo.tier_level === 3) color = STYLES.COLORS.CELSIUS_BLUE;

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
                walletSummary.total_amount_usd - celAmount.amount_usd,
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

    // Todo(ns) make text below(and calculation) PieProgressBar visible and useful
    return (
      <RegularLayout padding={"0 0 100 0"}>
        <View>
          {hasTier && this.renderLoyaltyHeader()}

          <View style={style.contentWrapper}>
            <View style={{ flexDirection: "row" }}>
              <CelText
                type={"H6"}
                weight={"300"}
                style={{ marginTop: widthPercentageToDP("23.3") / 3 }}
              >
                CEL balance is
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
                      {`${loyaltyInfo.tier.loanInterestBonus * 100}%`}
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
                      interest in CEL
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
                      {`${loyaltyInfo.tier.interestBonus * 100}%`}
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
                      interest in CEL
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
                How do we calculate loyalty level?
              </CelText>
              <CelText
                style={style.explanation}
                align={"center"}
                type={"H4"}
                weight={"300"}
              >
                Your loyalty level is determined by the ratio of CEL to other
                coins in your wallet.
              </CelText>

              {this.renderLoyaltyTable()}

              <CelText
                align="center"
                type="H4"
                weight="300"
                margin={"20 0 10 0"}
              >
                Each loyalty level will bring you better interest rates -
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
                Withdrawing funds will affect your loyalty level, so make sure
                to HODL to keep the numbers going!
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
                wallet balances. This includes new wallet activity as well as
                market fluctuations, so be sure to check your status every week!
              </CelText>
            </View>
            <CelButton
              margin={"30 0 10 0"}
              onPress={() => actions.navigateTo("Deposit", { coin: "CEL" })}
            >
              Deposit CEL
            </CelButton>
          </View>
        </View>
      </RegularLayout>
    );
  }
}

export default LoyaltyProgram;
