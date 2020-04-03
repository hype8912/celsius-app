import { EMPTY_STATES } from "../constants/UI";

export { renderHodlEmptyState };

function renderHodlEmptyState(hodlStatus) {
  if (hodlStatus.state === "Pending Deactivate")
    return EMPTY_STATES.HODL_MODE_PENDING_DEACTIVATION;
  if (hodlStatus.created_by === "backoffice")
    return EMPTY_STATES.HODL_MODE_BACKOFFICE;
  if (hodlStatus.isActive) return EMPTY_STATES.HODL_MODE_WARNING;
}
