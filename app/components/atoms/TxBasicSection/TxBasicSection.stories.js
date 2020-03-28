import React from "react";

import TxBasicSection from "./TxBasicSection";
import StoryWrapper from "../StoryWrapper/StoryWrapper";

const TxBasicSectionStories = () => (
  <StoryWrapper title="BasicSection">
    <StoryWrapper title="Default state">
      <TxBasicSection />
    </StoryWrapper>
  </StoryWrapper>
);

export default TxBasicSectionStories;
