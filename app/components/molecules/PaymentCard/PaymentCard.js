import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// import PaymentCardStyle from "./PaymentCard.styles";
import Card from "../../atoms/Card/Card";
import CelText from "../../atoms/CelText/CelText";
import CoinIcon from "../../atoms/CoinIcon/CoinIcon";
import formatter from "../../../utils/formatter";
import Separator from "../../atoms/Separator/Separator";
import STYLES from "../../../constants/STYLES";
import Icon from "../../atoms/Icon/Icon";
import * as appActions from "../../../redux/actions";

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class PaymentCard extends Component {
  static propTypes = {
    image: PropTypes.string,
    coinShort: PropTypes.string,
    name: PropTypes.string,
    loanCollateral: PropTypes.number,
    coinAmount: PropTypes.number,
  };
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      // initial state
    };
  }

  navigate = hasEnoughForALoan => {
    const { reason, actions, coinShort } = this.props;

    if (hasEnoughForALoan) {
      if (reason) {
        actions.showMessage(
          "success",
          "You have successfully changed interest payment method"
        );
        return actions.navigateTo("LoanSettings");
      }
      actions.navigateTo("LoanPrepaymentPeriod", { coin: coinShort });
    }
    return;
  };

  render() {
    const {
      coinShort,
      image,
      loanCollateral,
      coinAmount,
      actions,
      name,
    } = this.props;
    // const style = PaymentCardStyle();

    const hasEnoughForALoan = loanCollateral < coinAmount;
    return (
      <Card
        onPress={() => this.navigate(hasEnoughForALoan)}
        padding={"12 50 12 12"}
        styles={{ opacity: hasEnoughForALoan ? 1 : 0.5 }}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={{ alignSelf: "center", marginRight: 10 }}>
            <CoinIcon
              customStyles={{ width: 40, height: 40 }}
              coinShort={coinShort}
              url={image}
            />
          </View>
          <View>
            <CelText weight={"600"} type={"H3"}>
              {formatter.capitalize(name)}
            </CelText>
            <View style={{ flexDirection: "row" }}>
              <CelText
                weight={"300"}
                type={"H6"}
                color={
                  hasEnoughForALoan
                    ? STYLES.COLORS.DARK_GRAY6
                    : STYLES.COLORS.RED
                }
              >{`500 ${coinShort}`}</CelText>
              <Separator margin={"0 5 0 5"} vertical />
              <CelText
                weight={"300"}
                type={"H6"}
                color={
                  hasEnoughForALoan
                    ? STYLES.COLORS.DARK_GRAY6
                    : STYLES.COLORS.RED
                }
              >{`${formatter.usd(100)} USD`}</CelText>
            </View>
            {!hasEnoughForALoan && (
              <View>
                <Separator margin={"10 0 10 0"} />
                <View>
                  <CelText
                    align={"left"}
                    weight={"300"}
                    type={"H6"}
                  >{`Additional 17.37 ${coinShort} required for a first month of loan interest payment`}</CelText>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 10,
                    }}
                  >
                    <Icon
                      fill={STYLES.COLORS.CELSIUS_BLUE}
                      width="17"
                      height="17"
                      name="CirclePlus"
                    />
                    <CelText
                      onPress={() =>
                        actions.navigateTo("Deposit", { coin: coinShort })
                      }
                      color={STYLES.COLORS.CELSIUS_BLUE}
                      type="H5"
                      margin={"0 0 0 5"}
                    >
                      Deposit more
                    </CelText>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      </Card>
    );
  }
}

export default PaymentCard;
