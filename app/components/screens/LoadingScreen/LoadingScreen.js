import React, { Component } from "react";

import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import LoadingState from "../../atoms/LoadingState/LoadingState";

class LoadingScreen extends Component {
  static defaultProps = {};
  render() {
    const { loadingState, fabType } = this.props;
    return (
      <RegularLayout fabType={fabType}>
        <LoadingState {...loadingState} />
      </RegularLayout>
    );
  }
}

export default LoadingScreen;
