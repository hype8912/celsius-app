import React from "react";

import CoinSwitch from "./CoinSwitch";
import StoryWrapper from "../../atoms/StoryWrapper/StoryWrapper";

const CoinSwitchStories = () => (
  <StoryWrapper title="CoinSwitch">
    <StoryWrapper title="Default state">
      <CoinSwitch />
    </StoryWrapper>
  </StoryWrapper>
);

export default CoinSwitchStories;
