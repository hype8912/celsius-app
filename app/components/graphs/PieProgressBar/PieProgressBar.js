import React, { Component } from "react";
import { View, ART } from "react-native";
import PropTypes from "prop-types";
import * as d3 from "d3";

import PieProgressBarStyle from "./PieProgressBar.styles";
import { heightPercentageToDP } from "../../../utils/styles-util";
import CelText from "../../atoms/CelText/CelText";

const { Surface, Group, Shape } = ART;

const width = heightPercentageToDP("23.5%");
const height = heightPercentageToDP("23.5%");
const tierLevels = [
  {
    title: "SILVER",
    level: 1,
    percent: 33,
  },
  {
    title: "GOLD",
    level: 2,
    percent: 33,
  },
  {
    title: "PLATINUM",
    level: 3,
    percent: 33,
  },
];

class PieProgressBar extends Component {
  static propTypes = {
    amount: PropTypes.string,
    max: PropTypes.number,
    min: PropTypes.number,
    tier: PropTypes.string,
    level: PropTypes.number,
    color: PropTypes.string,
  };
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { tier, level, color } = this.props;
    const style = PieProgressBarStyle();
    // TODO when pie progress is introduced again uncomment //
    // const percentage = (amount - min) * 100 / (max - min);
    const sectionAngles = d3.pie().value(l => l.percent)(tierLevels);
    const path = d3
      .arc()
      .padAngle(0.05) // defines the amount of whitespace between sections
      .outerRadius(height / 2.5) // must be less than 1/2 the chart's height/width
      .innerRadius(height / 2.3); // the size of the inner 'donut' whitespace
    // .startAngle(0)
    // .endAngle(Math.PI * 2)
    // .cornerRadius(8);
    let clr;
    if (level === 3) clr = "rgba(52, 70, 137, 0.5)";
    if (level === 2) clr = "rgba(186, 129, 35, 0.5)";
    if (level === 1) clr = "rgba(134, 137, 140, 0.5)";

    return (
      <View style={[style.outerCircle, { backgroundColor: color }]}>
        <Surface width={width} height={height}>
          <Group x={width / 2} y={height / 2}>
            {sectionAngles.map(sec => {
              let colorSection;
              if (level === 1) {
                if (sec.index < 1) {
                  colorSection = "white";
                } else {
                  colorSection = clr;
                }
              }
              if (level === 2) {
                if (sec.index < 2) {
                  colorSection = "white";
                } else {
                  colorSection = clr;
                }
              }
              if (level === 3) colorSection = "white";
              return (
                <Shape
                  d={path(sec)}
                  // stroke={stroke}
                  fill={colorSection}
                  strokeWidth={2}
                  key={sec.index}
                />
              );
            })}
          </Group>
        </Surface>
        <View style={[style.innerCircle, { backgroundColor: color }]} />
        <View style={style.contentCircle}>
          <CelText color={"white"} type={"H4"} weight={"700"}>
            {tier}
          </CelText>
          <CelText color={"white"} type={"H5"} weight={"300"}>
            LEVEL
          </CelText>
        </View>
      </View>
    );
  }
}

export default PieProgressBar;
