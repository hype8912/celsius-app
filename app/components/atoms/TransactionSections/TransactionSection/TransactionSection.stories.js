import React from "react";

import TransactionSection from "./TransactionSection";
import StoryWrapper from "../../StoryWrapper/StoryWrapper";

const TransactionSectionStories = () => (
  <StoryWrapper title="TransactionSection">
    <StoryWrapper title="Default state">
      <TransactionSection />
    </StoryWrapper>
  </StoryWrapper>
);

export default TransactionSectionStories;
