/* eslint-disable react/no-multi-comp */
import React from "react";
import RNUxcam from "react-native-ux-cam";
import Constants from "../../constants";
import mixpanelAnalytics from "./mixpanel-analytics";

const { UXCAM_APP_KEY } = Constants;

async function initUxCam() {
  if (!UXCAM_APP_KEY) return;

  try {
    await RNUxcam.optIntoSchematicRecordings();
    await RNUxcam.startWithKey(UXCAM_APP_KEY);
  } catch (err) {
    mixpanelAnalytics.logError("initUxCam", err);
  }
}

async function startRecording() {
  if (!UXCAM_APP_KEY) return;

  try {
    await RNUxcam.startWithKey(UXCAM_APP_KEY);
  } catch (err) {
    mixpanelAnalytics.logError("startRecording", err);
  }
}

async function urlForCurrentUser() {
  let url;

  try {
    url = await RNUxcam.urlForCurrentUser();
  } catch (err) {
    mixpanelAnalytics.logError("urlForCurrentUser", err);
  }

  return url;
}

async function urlForCurrentSession() {
  let url;

  try {
    url = await RNUxcam.urlForCurrentSession();
  } catch (err) {
    mixpanelAnalytics.logError("urlForCurrentSession", err);
  }

  return url;
}

async function stopRecordingAndUploadData() {
  try {
    await RNUxcam.stopSessionAndUploadData();
  } catch (err) {
    mixpanelAnalytics.logError("stopRecordingAndUploadData", err);
  }
}

function hideComponentFromRecording(WrappedComponent) {
  return class extends React.Component {
    renderRegularComponent = () => {
      return <WrappedComponent {...this.props} />;
    };

    renderHiddenComponent = () => {
      return (
        <WrappedComponent
          {...this.props}
          ref={view => {
            if (view) RNUxcam.occludeSensitiveView(view);
          }}
        />
      );
    };

    render() {
      if (
        this.props.hideFromRecording &&
        this.props.hideFromRecording === true
      ) {
        return this.renderHiddenComponent(this.props);
      }

      return this.renderRegularComponent(this.props);
    }
  };
}

function hideComponentWithRefFromRecording(Component) {
  class CellInputHide extends React.Component {
    render() {
      const { forwardedRef, ...rest } = this.props;

      return <Component refs={forwardedRef} {...rest} />;
    }
  }

  return React.forwardRef((props, ref) => {
    return (
      <CellInputHide
        {...props}
        forwardedRef={ref}
        ref={view => {
          if (view) RNUxcam.occludeSensitiveView(view);
        }}
      />
    );
  });
}

export {
  initUxCam,
  startRecording,
  urlForCurrentUser,
  urlForCurrentSession,
  stopRecordingAndUploadData,
  hideComponentFromRecording,
  hideComponentWithRefFromRecording,
};
