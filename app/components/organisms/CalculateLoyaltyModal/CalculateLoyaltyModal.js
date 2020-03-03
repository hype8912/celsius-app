import React, { Component } from "react";
import { View } from "react-native";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CalculateLoyalityModalStyle from './CalculateLoyaltyModal.styles'
import * as appActions from "../../../redux/actions";
import CelText from "../../atoms/CelText/CelText";
import CelModal from "../CelModal/CelModal";
import CelsiusMembershipTable from '../../organisms/CelsiusMembershipTable/CelsiusMembershipTable'
import { MODALS } from "../../../constants/UI";

@connect(
  state => ({
    state
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class CalculateLoyaltyModal extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const style = CalculateLoyalityModalStyle();

    return (
      <CelModal
        name={MODALS.MY_CEL_LOYALTY_CALCULATOR_MODAL}
      >
        <CelText
          margin={"0 0 10 0"}
          align={"center"}
          weight='bold'
          type={"H2"}
        >
         How do we calculate loyalty level?
        </CelText>
        <CelText
          margin={"10 0 10 0"}
          weight={"300"}
          type={"H5"}
          align={'center'}
        >
          Your loyalty level is determined by the ratio of CEL to other coins in your wallet.
        </CelText>
        <CelsiusMembershipTable />
        <View style={style.footerContainer}>
          <CelText
            margin={"10 0 10 0"}
            weight={"300"}
            type={"H5"}
            align={'center'}
          >
          Each loyalty level will bring you better interest rates - {' '}
            <CelText
              weight={"500"}
              type={"H5"}
            >
            so keep HODling!
            </CelText>
          </CelText> 
        </View>
      </CelModal>
    );
  }
}

export default CalculateLoyaltyModal
