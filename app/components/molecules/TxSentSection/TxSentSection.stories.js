import React from "react";

import TxSentSection from "./TxSentSection";
import StoryWrapper from "../../atoms/StoryWrapper/StoryWrapper";

const TxSentSectionStories = () => (
  <StoryWrapper title="SentSection">
    <StoryWrapper title="Default state">
      <TxSentSection />
    </StoryWrapper>
  </StoryWrapper>
);

export default TxSentSectionStories;
