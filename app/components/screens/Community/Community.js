import React, { Component } from "react";
import { View, Image } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import * as appActions from "../../../redux/actions";

import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CommunityDashboard from "../../organisms/CommunityDashboard/CommunityDashboard";
import Card from "../../atoms/Card/Card";
import CelText from "../../atoms/CelText/CelText";
import formatter from "../../../utils/formatter";
import Separator from "../../atoms/Separator/Separator";
import CommunityStyle from "./Community.styles";
import PerformanceGraph from "../../graphs/PerformanceGraph/PerformanceGraph";
import ThemedImage from "../../atoms/ThemedImage/ThemedImage";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import CelStats from "../../organisms/CelStats/CelStats";
import Counter from "../../molecules/Counter/Counter";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

@connect(
  state => ({
    communityStats: state.community.stats,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class Community extends Component {
  static propTypes = {
    celTierStats: PropTypes.instanceOf(Object),
    totalCelUsers: PropTypes.number,
  };
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Celsius Community",
    right: "profile",
  });

  componentDidMount() {
    const { actions } = this.props;
    actions.getCommunityStatistics();
  }

  renderNetworkCounts = () => {
    const { communityStats } = this.props;
    const style = CommunityStyle();
    const usersNum = communityStats.users_num;
    return (
      <Card padding={"0 0 0 0"} color={getColor(COLOR_KEYS.BANNER_INFO)}>
        <View style={style.imageView}>
          <View>
            <CelText
              weight={"400"}
              align={"center"}
              type={"H6"}
              color={getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND)}
            >
              Celsius Network counts
            </CelText>
            <Counter
              weight={"600"}
              align={"center"}
              type={"H1"}
              color={getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND)}
              speed={10}
              number={usersNum}
            />
            <CelText
              weight={"400"}
              align={"center"}
              type={"H6"}
              color={getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND)}
            >
              members
            </CelText>
          </View>
        </View>
      </Card>
    );
  };

  renderDepositCoinSection = () => {
    const { communityStats } = this.props;
    const style = CommunityStyle();

    const highestDeposit = communityStats.highest_deposit;

    const bestCoinDepositCoin = highestDeposit.total;
    const bestCoinDepositUsd = highestDeposit.total_usd;

    const bestCoinWithdrawalCoin = -communityStats
      .withdrawals_in_highest_deposit_coin.total;
    const bestCoinWithdrawalUsd = -communityStats
      .withdrawals_in_highest_deposit_coin.total_usd;

    const image = communityStats.interest_rates.filter(
      obj => obj.coin === highestDeposit.coin
    );

    return (
      <>
        <Separator text={"MOST DEPOSITED COIN"} margin={"30 0 20 0"} />
        <View style={style.image}>
          <Image
            source={{
              uri: image && image.length && image[0].currency.image_url,
            }}
            style={style.coinImage}
          />
        </View>
        <CelText align={"center"} weight={"600"} type={"H2"} margin={"5 0 0 0"}>
          {highestDeposit.name.charAt(0).toUpperCase() +
            highestDeposit.name.slice(1)}{" "}
          ({highestDeposit.coin /* TODO: update */})
        </CelText>
        <CelText
          margin={"20 0 0 0"}
          weight={"300"}
          align={"center"}
          type={"H6"}
        >
          Net Deposit
        </CelText>
        <CelText weight={"600"} align={"center"} type={"H2"} margin="7 0 7 0">
          {`${formatter.crypto(
            bestCoinDepositCoin - bestCoinWithdrawalCoin,
            "",
            { noPrecision: true }
          )} ${highestDeposit.coin}` /* TODO: update */}
        </CelText>
        <CelText weight={"300"} align={"center"} type={"H5"}>
          {formatter.usd(bestCoinDepositUsd - bestCoinWithdrawalUsd, {
            symbol: "",
          }) /* TODO: update */}{" "}
          USD
        </CelText>
        <Card margin={"20 0 0 0"}>
          <View style={style.amountsView}>
            <View>
              <CelText weight={"300"} align={"center"} type={"H6"}>
                Deposits
              </CelText>
              <CelText
                weight={"600"}
                align={"center"}
                type={"H3"}
                margin={"5 0 10 0"}
              >
                {formatter.usd(bestCoinDepositCoin, {
                  symbol: "",
                }) /* TODO: update */}{" "}
                {highestDeposit.coin}
              </CelText>
              <CelText weight={"300"} align={"center"} type={"H6"}>
                {formatter.usd(bestCoinDepositUsd, {
                  symbol: "",
                }) /* TODO: update */}{" "}
                USD
              </CelText>
            </View>
            <Separator margin={"20 0 20 0"} />
            <View>
              <CelText weight={"300"} align={"center"} type={"H6"}>
                Withdrawals
              </CelText>
              <CelText
                weight={"600"}
                align={"center"}
                type={"H3"}
                margin={"5 0 10 0"}
              >
                {formatter.usd(bestCoinWithdrawalCoin, {
                  symbol: "",
                }) /* TODO: update */}{" "}
                {highestDeposit.coin}
              </CelText>
              <CelText weight={"300"} align={"center"} type={"H6"}>
                {formatter.usd(bestCoinWithdrawalUsd, {
                  symbol: "",
                }) /* TODO: update */}{" "}
                USD
              </CelText>
            </View>
          </View>
        </Card>
      </>
    );
  };

  renderDepositTotalSection = () => {
    const { communityStats } = this.props;
    const style = CommunityStyle();

    const totalDepositsUsd = communityStats.total_deposits_usd;
    const totalWithdrawalsUsd = -communityStats.total_withdrawals_USD;
    return (
      <>
        <Separator text={"TOTAL COINS DEPOSITED"} margin={"30 0 20 0"} />

        <CelText weight={"300"} align={"center"} type={"H6"}>
          Net Deposit
        </CelText>
        <CelText weight={"600"} align={"center"} type={"H2"} margin="7 0 7 0">
          {formatter.usd(totalDepositsUsd - totalWithdrawalsUsd, {
            symbol: "",
          })}{" "}
          USD
        </CelText>
        <Card margin={"20 0 15 0"}>
          <View style={style.amountsView}>
            <View>
              <CelText weight={"300"} align={"center"} type={"H6"}>
                Deposits
              </CelText>
              <CelText
                weight={"600"}
                align={"center"}
                type={"H4"}
                margin={"5 0 0 0"}
              >
                {formatter.usd(totalDepositsUsd, { symbol: "" })} USD
              </CelText>
            </View>
            <Separator margin={"10 0 10 0"} />
            <View>
              <CelText weight={"300"} align={"center"} type={"H6"}>
                Withdrawals
              </CelText>
              <CelText
                weight={"600"}
                align={"center"}
                type={"H4"}
                margin={"5 0 0 0"}
              >
                {formatter.usd(totalWithdrawalsUsd, { symbol: "" })} USD
              </CelText>
            </View>
          </View>
        </Card>

        <CelText weight={"600"} align={"center"} type={"H2"} style={style.text}>
          {formatter.round(communityStats.total_depositors_num, {
            noPrecision: true,
          })}
        </CelText>
        <CelText
          weight={"300"}
          align={"center"}
          type={"H6"}
          style={style.secondText}
        >
          Members are depositing
        </CelText>
      </>
    );
  };

  render() {
    const { communityStats } = this.props;
    const style = CommunityStyle();

    if (!communityStats) {
      return <LoadingScreen />;
    }

    return (
      <RegularLayout>
        {this.renderNetworkCounts()}

        <CommunityDashboard
          name={`ASSETS AS OF ${communityStats.community_settings.date}`}
          info
          buttonTypes={[
            {
              buttonType: "Total AUM",
              icon: "Total",
            },
            {
              buttonType: "Col. & Cash",
              icon: "PiggyBank",
            },
          ]}
        />

        {this.renderDepositCoinSection()}

        {this.renderDepositTotalSection()}

        <Separator text={"CEL VS BTC VS ETH"} margin={"30 0 30 0"} />
        <CelText
          weight={"300"}
          align={"center"}
          type={"H6"}
          margin={"0 0 20 0"}
        >
          Last 12 months
        </CelText>
        <View style={style.graphMargin}>
          {communityStats ? (
            <PerformanceGraph
              celStats={communityStats.coin_comparison_graphs.CEL}
              ethStats={communityStats.coin_comparison_graphs.ETH}
              btcStats={communityStats.coin_comparison_graphs.BTC}
            />
          ) : null}
        </View>

        {/* <CommunityDashboard name={"BORROW"} info buttonTypes={["Loans", "Average", "Total"]}/>*/}

        <CommunityDashboard
          name={"CELPAY"}
          info
          buttonTypes={[
            {
              buttonType: "Total",
              icon: "Total",
            },
            {
              buttonType: "Transactions",
              icon: "Transactions",
            },
          ]}
        />

        <CommunityDashboard
          name={"INTEREST"}
          info
          buttonTypes={[
            {
              buttonType: "Earned",
              icon: "Earned",
            },
            {
              buttonType: "Average",
              icon: "Average",
            },
          ]}
        />

        {/* { this.renderCommunityStatsTable() }*/}
        <CelStats
          celTierStats={communityStats.tier_stats}
          totalCelUsers={
            communityStats.percentage_of_users_earn_interest_in_cel
          }
        />

        {communityStats.no_of_users_referred > 0 ? (
          <CommunityDashboard name={"REFERRED"}>
            <Card padding={"0 0 0 0"}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ margin: 12 }}>
                  <CelText
                    type={"H6"}
                    weight={"300"}
                    align={"left"}
                  >{`You and your ${communityStats.no_of_users_referred} referrals earned`}</CelText>
                  <CelText
                    align={"left"}
                    type={"H1"}
                    weight={"600"}
                  >{`${communityStats.referrers_reward_amount_usd} USD`}</CelText>
                </View>
                <ThemedImage
                  style={style.bulldogImage}
                  lightSource={require("../../../../assets/images/community/frenchie.png")}
                  darkSource={require("../../../../assets/images/community/frenchie-dark.png")}
                />
              </View>
            </Card>
          </CommunityDashboard>
        ) : null}

        {/* <CommunityDashboard name={"PRODUCT UPDATES"}/> */}

        {/* <CommunityDashboard name={"MEET US IN PERSON AT"}/> */}
        <Separator margin="20 0 20 0" />
        <CelText align="center" type="H7">
          The numbers are showing a dollar value of coins at the time of
          transaction realization. Numbers reflect data in real-time, unless
          noted otherwise.
        </CelText>
      </RegularLayout>
    );
  }
}

export default Community;
