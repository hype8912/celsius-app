import React, { Component } from "react";
import { WebView } from "react-native-webview";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as appActions from "../redux/actions";
import { getColor } from "./styles-util";
import { COLOR_KEYS } from "../constants/COLORS";

// fix https://github.com/facebook/react-native/issues/10865
const patchPostMessageJsCode = `(${String(function() {
  const originalPostMessage = window.ReactNativeWebView.postMessage;
  const patchedPostMessage = function(message, targetOrigin, transfer) {
    originalPostMessage(message, targetOrigin, transfer);
  };
  patchedPostMessage.toString = function() {
    return String(Object.hasOwnProperty).replace(
      "hasOwnProperty",
      "postMessage"
    );
  };
  window.ReactNativeWebView.postMessage = patchedPostMessage;
})})();`;

/**
 *
 * @param {*} onMsg: callback after received response, error of Google captcha or when user cancel
 * @param {*} siteKey: your site key of Google captcha
 * @param {*} style: custom style
 * @param {*} url: base url
 * @param {*} reCaptchaPassed: When reCaptcha is passed, call a function
 */

@connect(
  state => ({
    formData: state.forms.formData,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class GoogleReCaptcha extends Component {
  constructor(props) {
    super(props);
    this.state = {
      captchaHeight: 150,
    };
  }

  generateTheWebViewContent = key => {
    const { type, buttonDisabled } = this.props;
    const originalForm = `<!DOCTYPE html>
       <html>
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
        <script>
          function onSubmit(token) {
            // after receiving token send it to message
            window.ReactNativeWebView.postMessage(token);
            grecaptcha.reset();
          }

          function validate(event) {
            event.preventDefault();
            window.ReactNativeWebView.postMessage('increaseReCap')
            grecaptcha.execute()
          }

          function onload() {
            const element = document.getElementById('submit');
            element.onclick = validate;
          }

          function onCaptchaError(){
            window.ReactNativeWebView.postMessage('captchaError')
          }
        </script>
        <script src="https://www.google.com/recaptcha/api.js" async defer></script>

        <style>
            .btn_login {
              background-color: ${getColor(COLOR_KEYS.PRIMARY_BUTTON)} ;
              width:120px;
              height: 50px;
              color: ${getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND)};
              padding: 8px 32px; margin-top: 8px;
              border: none; border-radius: 25px; font-size: medium;
            }

             .btn_login_disabled {
              background-color:transparent;
              width:120px;
              height: 50px;
              color: #4156A6; padding: 8px 32px; margin-top: 8px;
              border: solid;
              border-width: 2px;
              border-radius: 25px; font-size: medium;
              opacity: 0.5;
            }

            .btn_register {
              background-color: ${getColor(COLOR_KEYS.PRIMARY_BUTTON)};
              width:230px;
              height: 50px;
              color: ${getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND)};
              padding: 8px 32px; margin-top: 8px;
              border: none; border-radius: 25px; font-size: medium;
            }

             .btn_register_disabled {
              background-color:transparent;
              width:230px;
              height: 50px;
              color: #4156A6; padding: 8px 32px; margin-top: 8px;
              border: solid;
              border-width: 2px;
              border-radius: 25px; font-size: medium;
              opacity: 0.5;
            }

            .grecaptcha-badge {
              top: 80px !important;
              margin-right: 9.2%;
              transform: scale(0.5);
              visibility: hidden;
            }
          </style>

        </head>
        <body>
            <div
                id='recaptcha'
                class="g-recaptcha"
                data-sitekey="${key}"
                data-callback="onSubmit"
                data-size="invisible"
                data-error-callback="onCaptchaError"
              >
            </div>
            <div style="text-align: center">
                <button
                  class='${this.buttonStyle()}'
                  id='submit'
                >
                   ${type !== "register" ? "Log in" : "Create wallet"}
                </button>
            </div>
          <script>
            document.getElementById('submit').disabled = ${buttonDisabled};
            onload();
          </script>
        </body>
      </html>
     `;

    return originalForm;
  };

  buttonStyle = () => {
    const { type, buttonDisabled } = this.props;
    let btnStyle;

    if (type === "register") {
      btnStyle = "btn_register";
      if (buttonDisabled) {
        btnStyle = "btn_register_disabled";
      }
    } else {
      btnStyle = "btn_login";
      if (buttonDisabled) {
        btnStyle = "btn_login_disabled";
      }
    }
    return btnStyle;
  };

  onMsg = event => {
    if (event && event.nativeEvent.data) {
      if (event.nativeEvent.data === "captchaError") {
        this.onCaptchaError();
        this.setState({ captchaHeight: 150 });
      } else if (event.nativeEvent.data === "increaseReCap") {
        this.setState({ captchaHeight: 500 });
      } else {
        this.onCaptchaPassed(event);
        this.setState({ captchaHeight: 150 });
      }
    }
  };

  onCaptchaError = () => {
    const { actions } = this.props;
    actions.showMessage(
      "error",
      "Cannot connect to reCaptcha service. Check your internet connection and try again."
    );
  };

  onCaptchaPassed = event => {
    const { actions, reCaptchaPassed } = this.props;
    actions.updateFormField("reCaptchaKey", event.nativeEvent.data);
    reCaptchaPassed();
  };

  render() {
    const { siteKey, style, url } = this.props;
    const { captchaHeight } = this.state;
    return (
      <WebView
        originWhitelist={["*"]}
        mixedContentMode={"always"}
        onMessage={this.onMsg}
        javaScriptEnabled
        injectedJavaScript={patchPostMessageJsCode}
        automaticallyAdjustContentInsets
        style={[
          {
            backgroundColor: "transparent",
            width: "100%",
            height: captchaHeight,
          },
          style,
        ]}
        source={{
          html: this.generateTheWebViewContent(siteKey),
          baseUrl: `${url}`,
        }}
      />
    );
  }
}
export default GoogleReCaptcha;
