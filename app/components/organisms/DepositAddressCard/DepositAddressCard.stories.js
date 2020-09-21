import React from "react";

import DepositAddressCard from "../DepositAddressCard/DepositAddressCard";
import StoryWrapper from "../../atoms/StoryWrapper/StoryWrapper";

const DepositAddressCardStories = () => (
  <StoryWrapper title="DepositAddressCard">
    <StoryWrapper title="Default state">
      <DepositAddressCard />
    </StoryWrapper>
  </StoryWrapper>
);

export default DepositAddressCardStories;
