import React, { Component } from "react";
import { View, TouchableOpacity, Linking } from "react-native";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Markdown from "react-native-markdown-renderer";

import * as appActions from "../../../redux/actions";
import LoanTermsOfUseStyle from "./LoanTermsOfUse.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CelButton from "../../atoms/CelButton/CelButton";
import CelCheckbox from "../../atoms/CelCheckbox/CelCheckbox";
import Card from "../../atoms/Card/Card";
import ExpandableItem from "../../molecules/ExpandableItem/ExpandableItem";
import Icon from "../../atoms/Icon/Icon";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import mixpanelAnalytics from "../../../utils/mixpanel-analytics";
import {
  getColor,
  getFontSize,
  getFontFamily,
} from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

@connect(
  state => ({
    formData: state.forms.formData,
    loanTermsOfUse: state.generalData.loanTermsOfUse,
    pdf: state.generalData.pdf,
    theme: state.user.appSettings.theme,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class LoanTermsOfUse extends Component {
  static navigationOptions = () => ({
    title: "Terms and Conditions",
    customCenterComponent: { steps: 8, currentStep: 8, flowProgress: true },
  });

  constructor(props) {
    super(props);

    this.state = {
      loading: false
    }
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.getLoanTermsOfUse();
  }

  getToUProps = () => {
    const { loanTermsOfUse } = this.props;

    let textArray = loanTermsOfUse.split("\n");
    if (textArray.length === 1) textArray = loanTermsOfUse.split("↵");

    const textArrayParsed = textArray.map(s => ({
      text: s,
      type: s.includes("## ") ? "heading" : "paragraph",
    }));

    const sections = [];
    textArrayParsed.forEach(el => {
      if (el.type === "heading") {
        sections.push([el]);
      } else {
        sections[sections.length - 1].push(el);
      }
    });

    const sectionsMerged = sections.map(s => ({
      heading: s[0].text.replace("## ", ""),
      text: s
        .splice(1)
        .map(text => text.text)
        .join("\n"),
    }));

    const introSection = sectionsMerged[0];
    const otherSections = sectionsMerged.splice(1);

    const checkboxes = [6, 13, otherSections.length - 1];
    const checkboxTexts = [
      `I have read, understood and agree to the above mentioned in sections 1 - 7`,
      `I have read, understood and agree to the above mentioned in sections 8 - 14`,
      `I have read, understood and agree to the above mentioned in sections 15 - ${otherSections.length}`,
    ];

    return {
      introSection,
      otherSections,
      checkboxes,
      checkboxTexts,
    };
  };

  continue = async () => {
    const { actions } = this.props;
    this.setState({
      loading: true
    })
    await actions.applyForALoan()
    mixpanelAnalytics.loanToUAgreed();
    this.setState({
      loading: false
    })
  };

  render() {
    const { formData, pdf, actions, loanTermsOfUse } = this.props;
    const { loading } = this.state;
    const styles = LoanTermsOfUseStyle();

    if (!loanTermsOfUse || !pdf) return <LoadingScreen />;

    const {
      introSection,
      otherSections,
      checkboxes,
      checkboxTexts,
    } = this.getToUProps();

    const canContinue =
      formData.loansToU0 && formData.loansToU1 && formData.loansToU2;

    const markdownStyle = {
      text: {
        fontSize: getFontSize("H5"),
        color: getColor(COLOR_KEYS.PARAGRAPH),
        fontFamily: getFontFamily("regular"),
      },
      link: {
        color: getColor(COLOR_KEYS.LINK),
        textDecorationLine: "underline",
      },
      listOrderedItemIcon: {
        marginLeft: 10,
        marginRight: 10,
        lineHeight: 40,
      },
      listUnorderedItemIcon: {
        marginLeft: 10,
        marginRight: 10,
        lineHeight: 40,
      },
    };

    return (
      <RegularLayout fabType={"hide"} padding="0 0 100 0">
        <View style={{ padding: 20 }}>
          <CelText weight="bold" type="H3" align="center">
            {introSection.heading}
          </CelText>
          <Markdown color={"red"} style={markdownStyle}>
            {introSection.text}
          </Markdown>
        </View>

        <View style={{ paddingTop: 20, paddingHorizontal: 20 }}>
          {otherSections.map((s, i) => (
            <View>
              <ExpandableItem
                heading={`${i + 1}. ${s.heading}`}
                margin="5 0 5 0"
              >
                <Markdown style={markdownStyle}>{s.text}</Markdown>
              </ExpandableItem>

              {checkboxes.includes(i) && (
                <Card margin={"20 0 20 0"} padding={"15 15 0 15"}>
                  <CelCheckbox
                    onChange={(field, value) =>
                      actions.updateFormField(field, value)
                    }
                    field={`loansToU${checkboxes.indexOf(i)}`}
                    value={formData[`loansToU${checkboxes.indexOf(i)}`]}
                    uncheckedCheckBoxColor={getColor(
                      COLOR_KEYS.DOT_INDICATOR_INACTIVE
                    )}
                    checkedCheckBoxColor={getColor(COLOR_KEYS.POSITIVE_STATE)}
                    rightText={checkboxTexts[checkboxes.indexOf(i)]}
                  />
                </Card>
              )}
            </View>
          ))}
        </View>

        <View style={{ padding: 20 }}>
          <Card padding={"20 0 20 0"}>
            <View style={styles.shareCard}>
              <TouchableOpacity
                onPress={() => Linking.openURL(pdf)}
                style={styles.shareButton}
              >
                <Icon
                  name="Share"
                  height="24"
                  fill={getColor(COLOR_KEYS.PARAGRAPH)}
                  style={styles.iconStyle}
                />
                <CelText align={"center"}>Download</CelText>
              </TouchableOpacity>
            </View>
          </Card>
        </View>

        <CelButton
          onPress={this.continue}
          style={styles.requestButton}
          disabled={!canContinue}
          loading={loading}
        >
          Request loan
        </CelButton>
      </RegularLayout>
    );
  }
}

export default LoanTermsOfUse;
