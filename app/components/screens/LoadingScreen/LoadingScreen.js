import React, { Component } from "react";

import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import LoadingState from "../../atoms/LoadingState/LoadingState";

class LoadingScreen extends Component {
  static defaultProps = {}
  render() {
    const { loadingState } = this.props;
    return (
      <RegularLayout>
        <LoadingState { ...loadingState } />
      </RegularLayout>
    );
  }
}

export default LoadingScreen;
