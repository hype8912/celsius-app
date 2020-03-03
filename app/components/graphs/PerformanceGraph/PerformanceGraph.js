import React from "react";
import { View, SafeAreaView, Animated, TextInput } from "react-native";
import PropTypes from "prop-types";

import { Svg } from "expo";
import moment from "moment";
import * as path from "svg-path-properties";
import * as shape from "d3-shape";
import { scaleLinear, scaleTime } from "d3-scale";
import { heightPercentageToDP, widthPercentageToDP } from "../../../utils/styles-util";
import STYLES from "../../../constants/STYLES";
import PerformanceGraphStyle from "./PerformanceGraph.styles";
import Separator from "../../atoms/Separator/Separator";
import formatter from "../../../utils/formatter";

const { Path } = Svg;
const d3 = { shape };

class PerformanceGraph extends React.Component {

  static propTypes = {
    celStats: PropTypes.instanceOf(Array).isRequired, // y
    btcStats: PropTypes.instanceOf(Array).isRequired, // y
    ethStats: PropTypes.instanceOf(Array).isRequired, // y
    height: PropTypes.number,
    width: PropTypes.number,
    verticalPadding: PropTypes.number,
    labelWidth: PropTypes.number,
    cursorRadius: PropTypes.number
  };

  static defaultProps = {
    height: heightPercentageToDP("20.21%"),
    width: widthPercentageToDP("88%"),
    verticalPadding: heightPercentageToDP("2%"),
    labelWidth: widthPercentageToDP("20.33%"),
    cursorRadius: heightPercentageToDP("1.06%")
  };

  constructor(props) {
    super(props);

    this.state = {
      x: new Animated.Value(0)
    };

    this.cursor = {
      pointer: React.createRef(),
      dashedLine: React.createRef(),
      label: React.createRef(),
      labelText: React.createRef(),
      dateText: React.createRef()
    };
    this.label = {
      btcPercent: React.createRef(),
      ethPercent: React.createRef(),
      celPercent: React.createRef()
    };
  }

  componentDidMount() {
    this.moveCursor(0);
  }

  xDomain = [
    Math.min(
      ...this.props.celStats.map(c => c.x),
      ...this.props.btcStats.map(c => c.x),
      ...this.props.ethStats.map(c => c.x),
    ),
    Math.max(
      ...this.props.celStats.map(c => c.x),
      ...this.props.btcStats.map(c => c.x),
      ...this.props.ethStats.map(c => c.x),
    )];
  xRange = [0, this.props.width];
  yDomain = [
    Math.min(
      ...this.props.celStats.map(c => c.y),
      ...this.props.btcStats.map(c => c.y),
      ...this.props.ethStats.map(c => c.y),
    ),
    Math.max(
      ...this.props.celStats.map(c => c.y),
      ...this.props.btcStats.map(c => c.y),
      ...this.props.ethStats.map(c => c.y),
    )];
  yRange = [this.props.height, 0];
  scaleX = scaleTime().domain(this.xDomain).range(this.xRange);
  scaleY = scaleLinear().domain(this.yDomain).range(this.yRange);
  lineCEL = d3.shape.line().x(d => this.scaleX(d.x)).y(d => this.scaleY(d.y)).curve(d3.shape.curveBasis)(this.props.celStats);
  lineETH = d3.shape.line().x(d => this.scaleX(d.x)).y(d => this.scaleY(d.y)).curve(d3.shape.curveBasis)(this.props.ethStats);
  lineBTC = d3.shape.line().x(d => this.scaleX(d.x)).y(d => this.scaleY(d.y)).curve(d3.shape.curveBasis)(this.props.btcStats);
  linePropertiesCel = path.svgPathProperties(this.lineCEL);
  lineLengthCel = this.linePropertiesCel.getTotalLength();
  linePropertiesEth = path.svgPathProperties(this.lineETH);
  lineLengthEth = this.linePropertiesEth.getTotalLength();
  linePropertiesBtc = path.svgPathProperties(this.lineBTC);
  lineLengthBtc = this.linePropertiesBtc.getTotalLength();

  moveCursor(value) {
    const ratio = value/this.lineLengthCel;
    const { x, y } = this.linePropertiesCel.getPointAtLength((1 - ratio) * this.lineLengthCel);
    const ethY = this.linePropertiesEth.getPointAtLength((1 - ratio) * this.lineLengthEth).y;
    const btcY = this.linePropertiesBtc.getPointAtLength((1 - ratio) * this.lineLengthBtc).y;
    const label = this.scaleX.invert(x);
    const cel = this.scaleY.invert(y);
    const eth = this.scaleY.invert(ethY);
    const btc = this.scaleY.invert(btcY);

    this.cursor.dashedLine.current.setNativeProps({
      top: y - heightPercentageToDP("0.8%"),
      height: this.props.height - y,
      left: x
    });
    this.cursor.pointer.current.setNativeProps({
      top: y - heightPercentageToDP("1.4%"),
      left: x - this.props.cursorRadius - widthPercentageToDP("0.5%")
    });
    const date = moment(label).format("MMM D, YYYY")
    this.cursor.labelText.current.setNativeProps({ text: `${date}` });
    this.cursor.label.current.setNativeProps({ top: y - heightPercentageToDP("7.2%"), left: x - widthPercentageToDP("12%") });

    this.label.celPercent.current.setNativeProps({ text: `${formatter.percentage(cel)} %` });
    this.label.ethPercent.current.setNativeProps({ text: `${formatter.percentage(eth)} %` });
    this.label.btcPercent.current.setNativeProps({ text: `${formatter.percentage(btc)} %` });
  };

  render() {
    const { x } = this.state;
    const styles = PerformanceGraphStyle();
    const currencies = ["cel", "eth", "btc"];

    return (
      <SafeAreaView style={styles.root}>
        <View style={styles.container}>
          <Svg height={this.props.height} width={this.props.width}>
            <Path d={this.lineETH} stroke={STYLES.COLORS.GREEN} strokeWidth={1.5} fill="transparent"/>
            <Path d={this.lineBTC} stroke={STYLES.COLORS.ORANGE} strokeWidth={1.5} fill="transparent"/>
            <Path d={this.lineCEL} stroke={STYLES.COLORS.CELSIUS_BLUE} strokeWidth={1.5} fill="transparent"/>
          </Svg>
          <View style={{ position: "absolute" }}>
            <View ref={this.cursor.label} style={[styles.pointer]}>
              <View style={[styles.label, styles.labelBoxBackgroundColor]}>
                <TextInput ref={this.cursor.labelText} style={styles.labelText} editable={false}/>
              </View>
              <View style={[styles.triangle, styles.triangleBackgroundColor]}/>
            </View>
            <View ref={this.cursor.pointer}>
              <View style={[styles.cursor, styles.cursorBackgroundColor, { borderColor: STYLES.COLORS.CELSIUS_BLUE }]}>
                <View style={[styles.circle, { backgroundColor: STYLES.COLORS.CELSIUS_BLUE }]}/>
              </View>
            </View>
            <View ref={this.cursor.dashedLine}>
              <Separator opacity={1} color={STYLES.COLORS.CELSIUS_BLUE} size={2} dashed vertical/>
            </View>
          </View>
          <Animated.ScrollView
            style={styles.scrollPointer}
            contentContainerStyle={{ width: this.lineLengthCel * 2 }}
            bounces={false}
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x } } }],
              { listener: (event) => this.moveCursor(event.nativeEvent.contentOffset.x) },
              { useNativeDriver: true }
            )}
            horizontal
          />
        </View>
        <View style={styles.percentageView}>
          {currencies.map(c => {
            let color;
              if (c === "cel") color = STYLES.COLORS.CELSIUS_BLUE;
              if (c === "btc") color = STYLES.COLORS.ORANGE;
              if (c === "eth") color = STYLES.COLORS.GREEN;
              return (
                <View key={c} style={styles.singlePercent}>
                  <View style={[styles.dot, { backgroundColor: color }]}/>
                  <View>
                    <TextInput style={[styles.labelText, { color }]}
                               editable={false}>{`${c.toUpperCase()} Change `}</TextInput>
                    <TextInput style={[styles.labelText, { color }]} ref={this.label[`${c}Percent`]}
                               editable={false}/>
                  </View>
                </View>
              );
            }
          )}
        </View>
      </SafeAreaView>
    );
  }
}


export default PerformanceGraph;
