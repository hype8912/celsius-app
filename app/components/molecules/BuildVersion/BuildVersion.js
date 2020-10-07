import React, { Component } from "react";
import PropTypes from "prop-types";

import appUtil from "../../../utils/app-util";
import CelText from "../../atoms/CelText/CelText";
import Constants from "../../../../constants";

const { ENV } = Constants;

class BuildVersion extends Component {
  static propTypes = {
    margin: PropTypes.string,
    color: PropTypes.string,
  };

  static defaultProps = {
    margin: "0 0 0 0",
    opacity: 1,
    color: "",
  };

  constructor(props) {
    super(props);
    this.state = {
      revisionId: "",
    };
  }

  async componentDidMount() {
    const appVersion = await appUtil.getRevisionId();
    this.setState({ revisionId: appVersion.revisionId });
  }

  render() {
    const { revisionId } = this.state;
    const { margin, color } = this.props;
    return (
      <>
        <CelText
          weight="light"
          align="center"
          type="H7"
          margin={margin}
          color={color}
        >
          App version: {revisionId}
        </CelText>
        {ENV !== "PRODUCTION" && (
          <CelText
            weight="light"
            align="center"
            type="H7"
            margin={margin}
            color={color}
          >
            Environment: {ENV}
          </CelText>
        )}
      </>
    );
  }
}

export default BuildVersion;
