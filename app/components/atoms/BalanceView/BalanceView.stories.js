import React from "react";

import BalanceView from "../BalanceView/BalanceView";
import StoryWrapper from "../StoryWrapper/StoryWrapper";

const BalanceViewStories = () => (
  <StoryWrapper title="BalanceView">
    <StoryWrapper title="Default state">
      <BalanceView usd={10000} crypto={20000} coin={"BTC"} />
    </StoryWrapper>
  </StoryWrapper>
);

export default BalanceViewStories;
