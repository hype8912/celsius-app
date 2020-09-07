import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, TouchableOpacity, View } from "react-native";

import PickerModalStyle from "./PickerModal.styles";
import CelModal from "../CelModal/CelModal.js"
import CelText from "../../atoms/CelText/CelText";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { getColor } from "../../../utils/styles-util";
import Separator from "../../atoms/Separator/Separator";

class PickerModal extends Component {

  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    items: PropTypes.instanceOf(Array),
    onPress: PropTypes.func,
    closeModal: PropTypes.func,
  };
  static defaultProps = {}

  isSelected = (item) => {
    const { value } = this.props
    return value && item.value === value.value
  }

  render() {
    const style = PickerModalStyle()
    const { items, name, onPress, closeModal } = this.props;

    return (
      <CelModal
        name={name}
        style={style.container}
      >
        <View style={style.wrapper}>
          <ScrollView style={style.scroll}>
            {items.map((item, i) => (
              <TouchableOpacity
                style={style.item}
                onPress={() => {
                  onPress(item.value)
                  closeModal()
                }}
              >
                <CelText
                  align="center"
                  type="H4"
                  weight={this.isSelected(item) ? "bold" : null}
                  color={this.isSelected(item) ? getColor(COLOR_KEYS.HEADLINE) : null}
                >
                  {item.label}
                </CelText>

                { i !== items.length - 1  && <Separator margin="10 0 10 0" />}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </CelModal>
    );
  }
}

export default PickerModal
