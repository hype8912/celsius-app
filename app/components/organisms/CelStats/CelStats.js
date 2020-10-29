import React, { Component } from "react";
import { View } from "react-native";

import CelsiusStatsStyle from "./CelStats.styles";
import CelText from "../../atoms/CelText/CelText";
import Separator from "../../atoms/Separator/Separator";
import formatter from "../../../utils/formatter";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

class CelStats extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  setTierColor = tier => {
    switch (tier) {
      case "platinum":
        return getColor(COLOR_KEYS.BANNER_INFO);
      case "gold":
        return getColor(COLOR_KEYS.ALERT_STATE);
      case "silver":
        return getColor(COLOR_KEYS.SECTION_TITLE);
      case "bronze":
        return getColor(COLOR_KEYS.BRONZE);
      default:
        return null;
    }
  };

  render() {
    const style = CelsiusStatsStyle();
    const { celTierStats, totalCelUsers } = this.props;

    if (!celTierStats || !totalCelUsers) {
      return null;
    }

    const TEXT_LENGTH = 80;
    const TEXT_HEIGHT = 22;
    const OFFSET = TEXT_LENGTH / 2 - TEXT_HEIGHT / 2;

    return (
      <View style={style.container}>
        <Separator text={"EARN IN CEL"} margin={"30 0 20 0"} />

        <View style={style.celTierHead}>
          <View style={style.celTierHeadIndentation} />

          <View style={style.celTierItem}>
            <CelText type={"H7"} align={"center"}>
              Total earned in CEL*
            </CelText>
          </View>
          <View style={style.celTierItem}>
            <CelText type={"H7"} align={"center"}>
              Percentage of Users in Tier
            </CelText>
          </View>
          <View style={style.celTierItem}>
            <CelText type={"H7"} align={"center"}>
              Percent earning in CEL
            </CelText>
          </View>
        </View>

        {celTierStats.map((i, k) => (
          <View style={style.celTierWrapper} key={k}>
            <View
              style={[
                style.celTierIndentation,
                { backgroundColor: this.setTierColor(i.name.toLowerCase()) },
              ]}
            >
              <View
                style={{
                  width: TEXT_HEIGHT,
                  height: TEXT_LENGTH,
                }}
              >
                <View
                  style={{
                    transform: [
                      { rotate: "-90deg" },
                      { translateX: -OFFSET },
                      { translateY: -OFFSET },
                    ],
                    height: 22,
                    width: 80,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CelText
                    color={getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND)}
                    allCaps
                    weight={"600"}
                    type={"H7"}
                  >
                    {i.name}
                  </CelText>
                </View>
              </View>
            </View>
            <View style={style.celTierItem}>
              <CelText
                weight={"600"}
                type={"H5"}
                align={"center"}
                margin={"30 0 15 0"}
              >
                {`${formatter.usd(i.totalCelInterests, "", {
                  noPrecision: true,
                })}`}
              </CelText>
            </View>
            <Separator vertical height={"50%"} margin={"20 0 0 0"} />
            <View style={style.celTierItem}>
              <CelText
                weight={"600"}
                type={"H5"}
                align={"center"}
                margin={"30 0 15 0"}
              >
                {formatter.percentageDisplay(i.percentageOfUsers / 100)}
              </CelText>
            </View>
            <Separator vertical height={"50%"} margin={"20 0 0 0"} />
            <View style={style.celTierItem}>
              <CelText
                weight={"600"}
                type={"H5"}
                align={"center"}
                margin={"30 0 15 0"}
              >
                {formatter.percentageDisplay(
                  i.interestInCelInPercentages / 100
                )}
              </CelText>
            </View>
          </View>
        ))}
        <CelText type={"H7"}>* Cumulative figures in USD values</CelText>
        <CelText
          type={"H2"}
          weight={"600"}
          align={"center"}
          margin={"10 0 10 0"}
        >
          {formatter.percentageDisplay(totalCelUsers / 100)}
        </CelText>
        <CelText
          type={"H7"}
          align={"center"}
          weight={"300"}
          style={style.celStatsBottomCopy}
        >
          of app users chose to earn in CEL !
        </CelText>
      </View>
    );
  }
}

export default CelStats;
