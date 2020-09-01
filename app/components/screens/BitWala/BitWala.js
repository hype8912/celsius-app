import React, { Component } from "react";
import { Linking, Image } from "react-native";

import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CelButton from "../../atoms/CelButton/CelButton";
import { widthPercentageToDP } from "../../../utils/styles-util";

class BitWala extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Bitwala",
  });

  render() {
    return (
      <RegularLayout fabType="hide">
        <Image
          style={{
            alignSelf: "center",
            width: widthPercentageToDP("50%"),
            resizeMode: "contain",
          }}
          source={require(`../../../../assets/images/target-missed.png`)}
        />

        <CelText type="H2" align="center" weight="bold" margin="0 0 20 0">
          Sorry, Celsius does not operate in Germany
        </CelText>
        <CelText align="center">
          Hey there! Unfortunately, Celsius does not operate in Germany. Go
          check out our licensed partner, Bitwala. They'll get you earning
          interest in no time!
        </CelText>

        <CelButton
          onPress={() =>
            Linking.openURL(
              "https://www.bitwala.com/de/earning/?utm_source=celsius&utm_campaign=partnership&utm_medium=app-modal"
            )
          }
          margin="50 0 20 0"
        >
          Go to Bitwala site
        </CelButton>
      </RegularLayout>
    );
  }
}

export default BitWala;
