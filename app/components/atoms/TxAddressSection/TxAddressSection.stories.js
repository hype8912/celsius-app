import React from "react";

import TxAddressSection from "./TxAddressSection";
import StoryWrapper from "../StoryWrapper/StoryWrapper";

const TxAddressSectionStories = () => (
  <StoryWrapper title="AddressSection">
    <StoryWrapper title="Default state">
      <TxAddressSection />
    </StoryWrapper>
  </StoryWrapper>
);

export default TxAddressSectionStories;
