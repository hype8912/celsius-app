import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View } from "react-native";

import Card from "../../atoms/Card/Card";
import CelText from "../../atoms/CelText/CelText";
import * as appActions from "../../../redux/actions";
import { getColor, widthPercentageToDP } from "../../../utils/styles-util";
import formatter from "../../../utils/formatter";
import Spinner from "../../atoms/Spinner/Spinner";
import { isUSCitizen } from "../../../utils/user-util/user-util";
import Badge from "../../atoms/Badge/Badge";
import CelSwitch from "../../atoms/CelSwitch/CelSwitch";
import Separator from "../../atoms/Separator/Separator";
import mixpanelAnalytics from "../../../utils/mixpanel-analytics";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { SCREENS } from "../../../constants/SCREENS";

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

    await setUserAppSettings({
      interest_in_cel: true,
      interest_in_cel_per_coin: {
        ...interestInCoins,
        [coin]: value,
      },
    });

    mixpanelAnalytics.interestInCEL({
      ...interestInCoins,
      [coin]: value,
    });

    this.setState({ loading: false });
  };

  render() {
    const { tier, coin, actions, interestRate } = this.props;
    const { loading } = this.state;

    if (!interestRate.eligible) return null;
    if (tier === "NONE") return null;
    if (isUSCitizen()) return null;
    if (coin === "CEL") return null;

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
                Switch to earning rewards in CEL to increase your rewards rate
                to:
              </CelText>

              <Badge
                margin="12 0 10 12"
                style={{ alignContent: "center" }}
                color={getColor(COLOR_KEYS.POSITIVE_STATE)}
              >
                <CelText align="justify" type="H5" color="white">
                  {formatter.percentageDisplay(interestRate.specialRate)}
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
              Earn rewards in CEL
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
          <Card color={getColor(COLOR_KEYS.BACKGROUND)} noBorder>
            <CelText weight={"300"} type={"H7"}>
              To earn rewards in CEL on all your transferred coins, visit{" "}
              <CelText
                onPress={() => actions.navigateTo(SCREENS.MY_CEL)}
                weight={"300"}
                type={"H7"}
                link
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
