import React, { Component } from "react";

import RegularLayout from "../RegularLayout/RegularLayout";
import { THEMES } from "../../../constants/UI";

class AuthLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { children } = this.props;
    const theme = THEMES.LIGHT;

    const childrenWithProps = React.Children.map(children, child => {
      if (child) return React.cloneElement(child, { theme });
    });

    return <RegularLayout fabType="hide">{childrenWithProps}</RegularLayout>;
  }
}

export default AuthLayout;
