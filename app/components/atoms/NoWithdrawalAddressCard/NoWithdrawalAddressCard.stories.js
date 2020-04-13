import React from "react";
import StoryWrapper from "../StoryWrapper/StoryWrapper";
import NoWithdrawalAddressCard from "../NoWithdrawalAddressCard/NoWithdrawalAddressCard";

const imageUrl = "https://s2.coinmarketcap.com/static/img/coins/128x128/1.png";

const NoWithdrawalAddressCardStories = () => (
  <StoryWrapper title="NoWithdrawalAddressCard">
    <NoWithdrawalAddressCard
      imageUrl={imageUrl}
      coinName={"Bitcoin"}
      coinShort={"BTC"}
      onPress={() => {}}
    />
  </StoryWrapper>
);

export default NoWithdrawalAddressCardStories;
