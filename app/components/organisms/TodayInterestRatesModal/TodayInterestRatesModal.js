import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


import * as appActions from "../../../redux/actions";
import TodayInterestRatesModalStyle from "./TodayInterestRatesModal.styles";
import CelText from "../../atoms/CelText/CelText";
import CelModal from "../CelModal/CelModal";
import { MODALS } from "../../../constants/UI";
import InterestRateInfoTable from "../../molecules/InterestRateInfoTable/InterestRateInfoTable";
import CelButton from "../../atoms/CelButton/CelButton";
import STYLES from "../../../constants/STYLES";

@connect(
  state => ({
    interestRates: state.generalData.interestRates
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class TodayInterestRatesModal extends Component {
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      pressed: false
    };
  }

  navigateToLoyalty = () => {
    const {actions} = this.props;
    actions.navigateTo("LoyaltyProgram");
    actions.closeModal()
  };

  render() {
    const { actions, interestRates } = this.props;
    const {pressed} = this.state;
    const style = TodayInterestRatesModalStyle();


    return (
      <CelModal name={MODALS.TODAY_INTEREST_RATES_MODAL}
                header
                primaryText={"HODL"}
                secondaryText={"with Celsius"}
      >
       <CelText
         weight='300'
         fontSize='H1'
         align={"center"}
         style={style.explanation}
       >
         Bonus rates are provided if you chose to earn interest in CEL tokens.
         <CelText
           onPress={this.navigateToLoyalty}
           style={{color: STYLES.COLORS.CELSIUS_BLUE}}>
           Learn more
         </CelText>
       </CelText>

        <InterestRateInfoTable pressed={pressed}/>

        { (!pressed && interestRates && Object.keys(interestRates).length > 5) &&
          <CelButton
            basic
            onPress={() => this.setState({ pressed: true })}
          >
            See all
          </CelButton>
        }

        <CelButton
          onPress={() => {
            actions.navigateTo("WalletLanding");
            actions.closeModal()
          }}
          margin="15 0 15 0"
        >
          Go to wallet
        </CelButton>
      </CelModal>
    );
  }
}

export default TodayInterestRatesModal
