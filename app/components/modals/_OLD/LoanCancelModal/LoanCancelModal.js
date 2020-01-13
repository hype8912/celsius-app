import React from "react";

import { MODALS } from "../../../../constants/UI";
import CelButton from "../../../atoms/CelButton/CelButton";
import CelText from "../../../atoms/CelText/CelText";
import CelModal from "../../../organisms/CelModal/CelModal";

class LoanCancelModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  cancelLoan = async () => {
    const { actions } = this.props;
    this.setState({
      isLoading: true,
    });
    await actions.cancelLoan();
    await actions.getAllLoans();
    this.setState({
      isLoading: false,
    });
  };

  render() {
    const { actions } = this.props;
    const { isLoading } = this.state;

    return (
      <CelModal name={MODALS.LOAN_CANCEL_MODAL}>
        <CelText align="center" type="H2" weight="bold" margin="20 0 20 0">
          Confirm Loan Request Cancelation
        </CelText>
        <CelText align="center" type="H4" margin="0 0 24 0">
          Your pending loan request will be terminated and you will not receive
          any funds. Once confirmed, this action cannot be undone.
        </CelText>

        <CelButton
          onPress={this.cancelLoan}
          margin="5 0 5 0"
          color="red"
          loading={isLoading}
        >
          Cancel Loan Request
        </CelButton>
        <CelButton basic onPress={actions.closeModal}>
          Go Back
        </CelButton>
      </CelModal>
    );
  }
}

export default LoanCancelModal;
