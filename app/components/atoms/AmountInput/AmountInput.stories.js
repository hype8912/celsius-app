import React from "react";

import AmountInput from "../AmountInput/AmountInput";
import StoryWrapper from "../../atoms/StoryWrapper/StoryWrapper";

const AmountInputStories = () => (
  <StoryWrapper title="AmountInput">
    <StoryWrapper title="Default state">
      <AmountInput />
    </StoryWrapper>
  </StoryWrapper>
);

export default AmountInputStories;
