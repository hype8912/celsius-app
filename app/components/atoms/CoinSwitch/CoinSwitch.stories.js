import React from "react";

import CoinSwitch from "../CoinSwitch/CoinSwitch";
import StoryWrapper from "../StoryWrapper/StoryWrapper";

const CoinSwitchStories = () => (
  <StoryWrapper title="CoinSwitch">
    <StoryWrapper title="Default state">
      <CoinSwitch />
    </StoryWrapper>
  </StoryWrapper>
);

export default CoinSwitchStories;
