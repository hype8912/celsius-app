import React from "react";

import InfoBox from "../InfoBox/InfoBox";
import StoryWrapper from "../StoryWrapper/StoryWrapper";
import STYLES from "../../../constants/STYLES";

const InfoBoxStories = () => (
  // NOTE (djenader): half size is not working, opened not working
  <StoryWrapper title="InfoBox">
    <StoryWrapper title="Default state">
      <InfoBox
        size={"full"}
        onPress={() => {}}
        backgroundColor={STYLES.COLORS.ORANGE}
        titleText={"Title"}
        boldText={"Bold text"}
        infoText={"Info Text"}
        right
        triangle
        opened
        explanationText={"Explanation text"}
      />
    </StoryWrapper>
    <StoryWrapper title="Half size">
      <InfoBox
        size={"half"}
        onPress={() => {}}
        backgroundColor={STYLES.COLORS.ORANGE}
        titleText={"Title"}
        boldText={"Bold text"}
        infoText={"Info Text"}
        right
        triangle
        opened
        explanationText={"Explanation text"}
      />
    </StoryWrapper>
    <StoryWrapper title="Left">
      <InfoBox
        size={"half"}
        onPress={() => {}}
        backgroundColor={STYLES.COLORS.ORANGE}
        titleText={"Title"}
        boldText={"Bold text"}
        infoText={"Info Text"}
        left
        triangle
        opened
        explanationText={"Explanation text"}
      />
    </StoryWrapper>
  </StoryWrapper>
);

export default InfoBoxStories;
