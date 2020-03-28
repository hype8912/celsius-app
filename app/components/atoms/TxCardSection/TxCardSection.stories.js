import React from "react";

import TxCardSection from "./TxCardSection";
import StoryWrapper from "../StoryWrapper/StoryWrapper";

const TxCardSectionStories = () => (
  <StoryWrapper title="CardSection">
    <StoryWrapper title="Default state">
      <TxCardSection />
    </StoryWrapper>
  </StoryWrapper>
);

export default TxCardSectionStories;
