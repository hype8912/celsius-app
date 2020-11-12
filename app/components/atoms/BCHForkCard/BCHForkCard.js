import { Linking } from "react-native";
import React from 'react';
import Card from "../Card/Card";
import CelText from "../CelText/CelText";

const BCHForkCard = (props) => {
  return (
    <Card>
      <CelText type="H2" weight="bold" align="center">
        Attention
      </CelText>
      <CelText margin="20 0 20 0" align="center">
        Bitcoin Cash (BCH) {props.type} are temporarily unavailable due to the BCH protocol fork. BCH operations should resume shortly pending a security review from our custodian, Fireblocks.
      </CelText>

      <CelText
        link
        onPress={() => Linking.openURL("https://support.fireblocks.io/hc/en-us/articles/360017383379")}
      >
        More info >
      </CelText>
    </Card>
  )
}

export default BCHForkCard
