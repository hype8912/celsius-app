import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as appActions from "../../../redux/actions";
import Separator from "../../atoms/Separator/Separator";

import formatter from "../../../utils/formatter";

import CelText from "../../atoms/CelText/CelText";
import CelsiusMembershipTableStyle from "./CelsiusMembershipTable.styles";
import { addThemeToComponents } from "../../../utils/styles-util";
import { THEMES } from "../../../constants/UI";
import STYLES from "../../../constants/STYLES";

@connect(
  state => ({
    celUtilityTiers: state.generalData.celUtilityTiers,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class CelsiusMembershipTable extends Component {
  static propTypes = {};
  static defaultProps = {};

  render() {
    const { celUtilityTiers } = this.props;
    const style = CelsiusMembershipTableStyle(THEMES.LIGHT);

    const Table = (
      <View style={style.wrapper}>
        <View style={style.tableWrapper}>
          <View style={style.tierWrapper}>
            <View style={[style.tierSilver, style.tierCommon]}>
              <CelText type="H6" color="white" weight="600">
                {" "}
                {celUtilityTiers.SILVER.title}{" "}
              </CelText>
            </View>
            <View style={[style.tierGold, style.tierCommon]}>
              <CelText type="H6" color="white" weight="600">
                {" "}
                {celUtilityTiers.GOLD.title}{" "}
              </CelText>
            </View>
            <View style={[style.tierPlatinum, style.tierCommon]}>
              <CelText type="H6" color="white" weight="600">
                {" "}
                {celUtilityTiers.PLATINUM.title}{" "}
              </CelText>
            </View>
          </View>

          <View style={style.minPercentage}>
            <View style={style.tierData}>
              <CelText type="H7" weight="500">
                {`< ${formatter.percentage(
                  celUtilityTiers.SILVER.maximum_cel_percentage
                )}%`}
              </CelText>
            </View>
            <Separator vertical height={"60%"} margin="7 0 0 5" />
            <View style={style.tierData}>
              <CelText type="H7" weight="500">
                {`< ${formatter.percentage(
                  celUtilityTiers.GOLD.maximum_cel_percentage
                )}%`}
              </CelText>
            </View>
            <Separator vertical height={"60%"} margin="7 0 0 2" />
            <View style={style.tierData}>
              <CelText type="H7" weight="500">
                {`> ${formatter.percentage(
                  celUtilityTiers.PLATINUM.minimum_cel_percentage
                )}%`}
              </CelText>
            </View>
          </View>

          <View style={style.separator}>
            <CelText type="H7" weight="500" color={STYLES.COLORS.WHITE}>
              Bonus
            </CelText>
          </View>

          <View style={style.bonus}>
            <View style={style.tierData}>
              <CelText type="H7" weight="500">
                {`${formatter.percentage(
                  celUtilityTiers.SILVER.interest_bonus
                )}%`}
              </CelText>
            </View>
            <Separator vertical height={"60%"} margin="7 0 0 0" />
            <View style={style.tierData}>
              <CelText type="H7" weight="500">
                {`${formatter.percentage(
                  celUtilityTiers.GOLD.interest_bonus
                )}%`}
              </CelText>
            </View>
            <Separator vertical height={"60%"} margin="7 0 0 7" />
            <View style={style.tierData}>
              <CelText type="H7" weight="500">
                {`${formatter.percentage(
                  celUtilityTiers.PLATINUM.interest_bonus
                )}%`}
              </CelText>
            </View>
          </View>

          <View style={style.separator}>
            <CelText type="H7" weight="500" color={STYLES.COLORS.WHITE}>
              {" "}
              Loan interest
            </CelText>
          </View>

          <View style={style.loan}>
            <View style={style.tierData}>
              <CelText type="H7" weight="500">
                {`${formatter.percentage(
                  celUtilityTiers.SILVER.loan_interest_bonus
                )}%`}
              </CelText>
            </View>
            <Separator vertical height={"60%"} margin="7 0 0 0" />
            <View style={style.tierData}>
              <CelText type="H7" weight="500">
                {`${formatter.percentage(
                  celUtilityTiers.GOLD.loan_interest_bonus
                )}%`}
              </CelText>
            </View>
            <Separator vertical height={"60%"} margin="7 0 0 7" />
            <View style={style.tierDataLast}>
              <CelText type="H7" weight="500">
                {`${formatter.percentage(
                  celUtilityTiers.PLATINUM.loan_interest_bonus
                )}%`}
              </CelText>
            </View>
          </View>
        </View>
      </View>
    );

    const childrenWithProps = addThemeToComponents(
      Table,
      [CelText.displayName],
      THEMES.LIGHT
    );

    return childrenWithProps;
  }
}

export default CelsiusMembershipTable;
