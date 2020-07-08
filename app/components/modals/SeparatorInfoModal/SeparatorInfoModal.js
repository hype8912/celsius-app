import React, { Component } from "react";
import PropTypes from "prop-types";
import { MODALS } from "../../../constants/UI";
import InfoModal from "../InfoModalNew/InfoModal";

class SeparatorInfoModal extends Component {
  static propTypes = {
    actions: PropTypes.instanceOf(Object),
    data: PropTypes.instanceOf(Object),
  };
  static defaultProps = {
    data: {
      title: "",
      body: [],
    },
  };

  render() {
    const { actions, data } = this.props;
    return (
      <InfoModal
        name={MODALS.SEPARATOR_INFO_MODAL}
        heading={data.title}
        paragraphs={data.body}
        yesCopy={"Close"}
        onYes={() => actions.closeModal()}
      />
    );
  }
}

export default SeparatorInfoModal;
