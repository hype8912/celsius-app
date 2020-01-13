import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View } from "react-native";

import Card from "../../atoms/Card/Card";
import STYLES from "../../../constants/STYLES";
import CelText from "../../atoms/CelText/CelText";
import * as appActions from "../../../redux/actions";
import { getTheme, widthPercentageToDP } from "../../../utils/styles-util";
import formatter from "../../../utils/formatter";
import { THEMES } from "../../../constants/UI";
import Spinner from "../../atoms/Spinner/Spinner";
import { isUSCitizen } from "../../../utils/user-util";
import Badge from "../../atoms/Badge/Badge";
import CelSwitch from "../../atoms/CelSwitch/CelSwitch";
import Separator from "../../atoms/Separator/Separator";
import userBehaviorUtil from "../../../utils/user-behavior-util";

@connect(
  state => ({
    interestRates: state.generalData.interestRates,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class InterestCard extends Component {
  static propTypes = {
    coin: PropTypes.string,
    setUserAppSettings: PropTypes.func.isRequired,
    inCEL: PropTypes.bool,
  };
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = { loading: false };
  }

  handleValueChange = async value => {
    const { setUserAppSettings, coin, interestInCoins } = this.props;
    this.setState({ loading: true });
    // // TODO see if needed
    // if(!value) await deleteSecureStoreKey('HIDE_MODAL_INTEREST_IN_CEL')

    await setUserAppSettings({
      interest_in_cel: true,
      interest_in_cel_per_coin: {
        ...interestInCoins,
        [coin]: value,
      },
    });

    userBehaviorUtil.interestInCEL({
      ...interestInCoins,
      [coin]: value,
    });

    this.setState({ loading: false });
  };

  render() {
    const { tier, coin, actions, interestRates, interestRate } = this.props;
    const { loading } = this.state;

    if (!interestRate.eligible) return null;
    if (tier === "NONE") return null;
    if (isUSCitizen()) return null;
    if (coin === "CEL") return null;

    const theme = getTheme();

    return (
      <View style={{ paddingHorizontal: 5 }}>
        <Separator margin={"20 0 22 0"} />
        <View style={{ justifyContent: "space-between" }}>
          {!interestRate.inCEL && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <CelText style={{ width: "75%" }}>
                Switch to earning interest in CEL to increase your interest rate
                to:
              </CelText>

              <Badge
                margin="12 0 10 12"
                style={{ alignContent: "center" }}
                color={STYLES.COLORS.GREEN}
              >
                <CelText align="justify" type="H5" color="white">
                  {formatter.percentageDisplay(interestRates[coin].cel_rate)}
                </CelText>
              </Badge>
            </View>
          )}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
              marginHorizontal: widthPercentageToDP("2%"),
            }}
          >
            <CelText color={"#737A82"} type={"H4"} weight={"300"}>
              Earn interest in CEL
            </CelText>
            {loading ? (
              <Spinner size={30} />
            ) : (
              <CelSwitch
                value={interestRate.inCEL}
                onValueChange={this.handleValueChange}
              />
            )}
          </View>
          <Card
            color={
              theme !== THEMES.DARK
                ? STYLES.COLORS.LIGHT_GRAY
                : STYLES.COLORS.DARK_GRAY
            }
          >
            <CelText weight={"300"} type={"H7"}>
              To earn interest in CEL on all your deposited coins, visit{" "}
              <CelText
                onPress={() => actions.navigateTo("MyCel")}
                weight={"300"}
                type={"H7"}
                color={STYLES.COLORS.CELSIUS_BLUE}
              >
                My CEL
              </CelText>{" "}
              page.
            </CelText>
          </Card>
        </View>
      </View>
    );
  }
}

export default InterestCard;
