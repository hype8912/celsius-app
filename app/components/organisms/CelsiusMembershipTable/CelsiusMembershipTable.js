import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as appActions from "../../../redux/actions";

import formatter from "../../../utils/formatter";

import CelText from "../../atoms/CelText/CelText";
import CelsiusMembershipTableStyle from "./CelsiusMembershipTable.styles";
import { addThemeToComponents, getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

@connect(
  state => ({
    celUtilityTiers: state.generalData.celUtilityTiers,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class CelsiusMembershipTable extends Component {
  static propTypes = {};
  static defaultProps = {};

  // TODO: refactor with a map or something, move to organism

  render() {
    const { celUtilityTiers } = this.props;
    const style = CelsiusMembershipTableStyle();

    const hasBronze = !!celUtilityTiers.BRONZE

    const Table = (
      <View style={style.wrapper}>
        <View style={style.tableWrapper}>
          <View style={style.tierWrapper}>
            { hasBronze && (
              <View style={[style.tierCommon, style.tierBronze]}>
                <CelText type="H6" color="white" weight="600">
                  {" "}
                  {celUtilityTiers.BRONZE.title}{" "}
                </CelText>
              </View>
            )}
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

          <View style={style.percentageRow}>
            { hasBronze && (
              <View style={style.tierData}>
                <CelText type="H7" weight="500" align="center">
                  {formatter.percentage(
                    celUtilityTiers.BRONZE.minimum_cel_percentage
                  )}
                  -
                  {formatter.percentage(
                    celUtilityTiers.BRONZE.maximum_cel_percentage
                  )}
                  %
                </CelText>
              </View>
            )}
            <View style={style.tierData}>
              <CelText type="H7" weight="500" align="center">
                {formatter.percentage(
                  celUtilityTiers.SILVER.minimum_cel_percentage
                )}
                -
                {formatter.percentage(
                  celUtilityTiers.SILVER.maximum_cel_percentage
                )}
                %
              </CelText>
            </View>
            <View style={style.tierData}>
              <CelText type="H7" weight="500" align="center">
                {formatter.percentage(
                  celUtilityTiers.GOLD.minimum_cel_percentage
                )}
                -
                {formatter.percentage(
                  celUtilityTiers.GOLD.maximum_cel_percentage
                )}
                %
              </CelText>
            </View>
            <View style={style.tierData}>
              <CelText type="H7" weight="500" align="center">
                {`> ${formatter.percentage(
                  celUtilityTiers.PLATINUM.minimum_cel_percentage
                )}%`}
              </CelText>
            </View>
          </View>

          <View style={style.separator}>
            <CelText
              type="H7"
              weight="500"
              color={getColor(COLOR_KEYS.HEADLINE)}
            >
              Earnings Bonus
            </CelText>
          </View>

          <View style={style.percentageRow}>
            { hasBronze && (
              <View style={style.tierData}>
                <CelText type="H7" weight="500" align="center">
                  {`${formatter.percentage(
                    celUtilityTiers.BRONZE.interest_bonus
                  )}%`}
                </CelText>
              </View>
            )}
            <View style={style.tierData}>
              <CelText type="H7" weight="500" align="center">
                {`${formatter.percentage(
                  celUtilityTiers.SILVER.interest_bonus
                )}%`}
              </CelText>
            </View>
            <View style={style.tierData}>
              <CelText type="H7" weight="500" align="center">
                {`${formatter.percentage(
                  celUtilityTiers.GOLD.interest_bonus
                )}%`}
              </CelText>
            </View>
            <View style={style.tierData}>
              <CelText type="H7" weight="500" align="center">
                {`${formatter.percentage(
                  celUtilityTiers.PLATINUM.interest_bonus
                )}%`}
              </CelText>
            </View>
          </View>

          <View style={style.separator}>
            <CelText
              type="H7"
              weight="500"
              color={getColor(COLOR_KEYS.HEADLINE)}
            >
              {" "}
              Discount on Loan Interest
            </CelText>
          </View>

          <View style={style.percentageRow}>
            { hasBronze && (
              <View style={style.tierData}>
                <CelText type="H7" weight="500" align="center">
                  {`${formatter.percentage(
                    celUtilityTiers.BRONZE.loan_interest_bonus
                  )}%`}
                </CelText>
              </View>
            )}
            <View style={style.tierData}>
              <CelText type="H7" weight="500" align="center">
                {`${formatter.percentage(
                  celUtilityTiers.SILVER.loan_interest_bonus
                )}%`}
              </CelText>
            </View>
            <View style={style.tierData}>
              <CelText type="H7" weight="500" align="center">
                {`${formatter.percentage(
                  celUtilityTiers.GOLD.loan_interest_bonus
                )}%`}
              </CelText>
            </View>
            <View style={style.tierData}>
              <CelText type="H7" weight="500" align="center">
                {`${formatter.percentage(
                  celUtilityTiers.PLATINUM.loan_interest_bonus
                )}%`}
              </CelText>
            </View>
          </View>
        </View>
      </View>
    );

    const childrenWithProps = addThemeToComponents(Table, [
      CelText.displayName,
    ]);

    return childrenWithProps;
  }
}

export default CelsiusMembershipTable;
