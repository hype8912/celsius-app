import React from "react";

import Card from "../Card/Card";
import StoryWrapper from "../StoryWrapper/StoryWrapper";
import CelText from "../CelText/CelText";
import STYLE from "../../../constants/STYLES";

const CardStories = () => (
  <StoryWrapper title="Card">
    <StoryWrapper title="Default state">
      <StoryWrapper>
        <Card size={"full"} color={STYLE.COLORS.CELSIUS_BLUE}>
          <CelText color={STYLE.COLORS.WHITE}>Full</CelText>
        </Card>
      </StoryWrapper>
      <StoryWrapper>
        <Card size={"half"} color={STYLE.COLORS.CELSIUS_BLUE}>
          <CelText color={STYLE.COLORS.WHITE}>Half</CelText>
        </Card>
      </StoryWrapper>
      <StoryWrapper>
        <Card size={"third"} color={STYLE.COLORS.CELSIUS_BLUE}>
          <CelText color={STYLE.COLORS.WHITE}>Third</CelText>
        </Card>
      </StoryWrapper>
      <StoryWrapper>
        <Card size={"halfExtra"} color={STYLE.COLORS.CELSIUS_BLUE}>
          <CelText color={STYLE.COLORS.WHITE}>Half Extra</CelText>
        </Card>
      </StoryWrapper>
      <StoryWrapper>
        <Card size={"thirdExtra"} color={STYLE.COLORS.CELSIUS_BLUE}>
          <CelText color={STYLE.COLORS.WHITE}>Third Extra</CelText>
        </Card>
      </StoryWrapper>
      <StoryWrapper>
        <Card size={"twoThirds"} color={STYLE.COLORS.CELSIUS_BLUE}>
          <CelText color={STYLE.COLORS.WHITE}>Two Thirds</CelText>
        </Card>
      </StoryWrapper>
    </StoryWrapper>
  </StoryWrapper>
);

export default CardStories;
