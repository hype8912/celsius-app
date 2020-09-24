import React from "react";
import { MODALS } from "../../../constants/UI";
import InfoModal from "../InfoModalNew/InfoModal";

class CancelLoanModal extends React.Component {
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
    actions.closeModal();
    await actions.getAllLoans();
    this.setState({
      isLoading: false,
    });
    actions.closeModal();
  };

  render() {
    const { isLoading } = this.state;
    return (
      <InfoModal
        name={MODALS.LOAN_CANCEL_MODAL}
        heading={"You Are About To Cancel Your Loan Request"}
        paragraphs={[
          "By doing this you won’t be receiving any funds and your loan status will change to canceled.",
        ]}
        yesButtonStyle={"red"}
        yesCopy={"Cancel Loan Request"}
        onYes={this.cancelLoan}
        loading={isLoading}
      />
    );
  }
}

export default CancelLoanModal;
