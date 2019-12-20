import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const modalWidth = 0.9 * width;

export default {
  setModal,
  setActiveStep,
  goToNextStep,
  goToPrevStep,
};

let multistepModal;
let activeStep = 0;

/**
 * Sets the active multistep modal
 *
 * @param {Object} component - this from react component
 */
function setModal(component) {
  multistepModal = component;
  setActiveStep(0);
}

/**
 * Sets the active step of the multistep modal
 *
 * @param {Number} step - next active step
 */
function setActiveStep(step) {
  activeStep = step;
}

/**
 * Goes to next step in the active multistep modal
 */
function goToNextStep() {
  if (multistepModal && multistepModal.scrollRef) {
    multistepModal.scrollRef.getNode().scrollTo({
      x: (activeStep + 1) * modalWidth,
      animated: true,
    });
    setActiveStep(activeStep + 1);
  }
}

/**
 * Goes to previous step in the active multistep modal
 */
function goToPrevStep() {
  if (multistepModal && multistepModal.scrollRef) {
    multistepModal.scrollRef.getNode().scrollTo({
      x: (activeStep - 1) * modalWidth,
      animated: true,
    });
    setActiveStep(activeStep - 1);
  }
}
