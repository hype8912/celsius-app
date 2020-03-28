import React from "react";

import TxInfoSection from "./TxInfoSection";
import StoryWrapper from "../StoryWrapper/StoryWrapper";

const TxInfoSectionStories = () => (
  <StoryWrapper title="InfoSection">
    <StoryWrapper title="Default state">
      <TxInfoSection />
    </StoryWrapper>
  </StoryWrapper>
);

export default TxInfoSectionStories;
