import { EMPTY_STATES } from "../constants/UI";

export { renderHodlEmptyState };

function renderHodlEmptyState(hodlStatus, screen = undefined) {
  if (hodlStatus.state === "Pending Deactivate")
    return EMPTY_STATES.HODL_MODE_PENDING_DEACTIVATION;
  if (hodlStatus.created_by === "backoffice")
    return EMPTY_STATES.HODL_MODE_BACKOFFICE;
  if (hodlStatus.isActive && screen === "celpay") return EMPTY_STATES.HODL_MODE_WARNING_CELPAY;
  if (hodlStatus.isActive && screen === "withdraw") return EMPTY_STATES.HODL_MODE_WARNING_WITHDRAW;
}
