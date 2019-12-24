import React, { Component } from "react";
import PropTypes from "prop-types";

// import LoanTriggerStyle from "./LoanTrigger.styles";
import Banner from "../Banner/Banner";
import STYLES from "../../../constants/STYLES";
import userBehaviorUtil from "../../../utils/user-behavior-util";

class LoanTrigger extends Component {
  static propTypes = {
    actions: PropTypes.instanceOf(Object),
    steps: PropTypes.string,
  };
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { actions, steps } = this.props;
    // const style = LoanTriggerStyle();

    const content = `Celsius offers cash loans against your crypto? Borrow dollars or stablecoins and get the spending money you need at the lowest rates in the industry!`;

    return (
      <Banner
        backgroundColor={STYLES.COLORS.CELSIUS_BLUE}
        image={require("../../../../assets/images/illustration-borrow-dollars_white.png")}
        action={() => {
          actions.navigateTo("BorrowChooseLoan");
          userBehaviorUtil.userInitiatingLoanOnWallet();
        }}
        buttonText={"Get a loan"}
        title={"Did you know..."}
        content={content}
        close={() => actions.closeBanner()}
        type={"loan"}
        steps={steps}
      />
    );
  }
}

export default LoanTrigger;
