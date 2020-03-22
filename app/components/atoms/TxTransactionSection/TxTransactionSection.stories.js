import React from "react";

import TxTransactionSection from "./TxTransactionSection";
import StoryWrapper from "../StoryWrapper/StoryWrapper";

const TxTransactionSectionStories = () => (
  <StoryWrapper title="TransactionSection">
    <StoryWrapper title="Default state">
      <TxTransactionSection />
    </StoryWrapper>
  </StoryWrapper>
);

export default TxTransactionSectionStories;
