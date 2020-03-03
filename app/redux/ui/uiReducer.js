import ACTIONS from '../../constants/ACTIONS';


/**
 * TODO make it a function add JSDoc & desc for return
 */
const initialState = {
  fabMenuOpen: false,
  fabType: 'hide',

  message: undefined,
  openedModal: undefined,
  activeTab: undefined,

  isKeypadOpen: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SHOW_MESSAGE:
      return {
        ...state,
        message: {
          type: action.msgType,
          text: action.text,
        }
      };
      
    case ACTIONS.CLEAR_MESSAGE:
      return {
        ...state,
        message: undefined,
      };

    case ACTIONS.TOGGLE_KEYPAD:
      return {
        ...state,
        isKeypadOpen: action.isKeypadOpen,
      }

    case ACTIONS.OPEN_MODAL:
      return {
        ...state,
        openedModal: action.modal,
      }

    case ACTIONS.CLOSE_MODAL:
      return {
        ...state,
        openedModal: undefined,
      }

    case ACTIONS.OPEN_FAB_MENU:
      return {
        ...state,
        fabMenuOpen: true
      }

    case ACTIONS.CLOSE_FAB_MENU:
      return {
        ...state,
        fabMenuOpen: false
      }

    case ACTIONS.SET_FAB_TYPE:
      if (action.fabType !== state.fabType) {
        return {
          ...state,
          fabType: action.fabType
        }
      }
      return state;

    case ACTIONS.ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.activeTab
      }

    default:
      return state;

  }
}
