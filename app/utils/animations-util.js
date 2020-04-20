import store from "../redux/store";
import * as actions from "../redux/actions";
import { heightPercentageToDP } from "./styles-util";

const animationsUtil = {
  applyOffset,
  scrollListener,
};

const OFFSET = 50;
const BASE_OFFSET = 300;

function applyOffset(items, numCols) {
  const diagonals = findDiagonals(items, numCols);

  diagonals.forEach((diag, i) => {
    diag.forEach(elm => {
      // eslint-disable-next-line no-param-reassign
      items[elm].offset = i * OFFSET + BASE_OFFSET;
    });
  });

  return items;
}

function findDiagonals(items, numCols) {
  const offsets = [];
  let i = 0;
  const numRows = Math.ceil(items.length / numCols);

  while (i < numRows) {
    offsets.push(getAscDiagonal(i, 0, numCols, items.length));
    i++;
  }
  i--;
  for (let j = 1; j < numCols; j++) {
    offsets.push(getAscDiagonal(i, j, numCols, items.length));
  }

  return offsets;
}

function getAscDiagonal(i, j, numCols, maxLength) {
  const diagonal = [];
  while (i >= 0 && j < numCols) {
    const mappedIndex = i * numCols + j;
    if (mappedIndex < maxLength) diagonal.push(mappedIndex);
    // eslint-disable-next-line no-param-reassign
    i--;
    // eslint-disable-next-line no-param-reassign
    j++;
  }
  return diagonal;
}

function scrollListener(y) {
  const { activeScreen } = store.getState().nav;
  const {
    changeWalletHeader,
    changeCoinDetailsHeader,
    changeInterestHeader,
  } = store.getState().animations;
  const threshold = heightPercentageToDP("18%");
  if (y > threshold) {
    if (activeScreen === "WalletLanding")
      store.dispatch(actions.changeWalletHeaderContent(true));
    if (activeScreen === "CoinDetails")
      store.dispatch(actions.changeCoinDetailsHeaderContent(true));
    if (activeScreen === "WalletInterest")
      store.dispatch(actions.changeInterestHeaderContent(true));
  }
  if (y < threshold && changeCoinDetailsHeader) {
    if (activeScreen === "CoinDetails")
      store.dispatch(actions.changeCoinDetailsHeaderContent());
  }
  if (y < threshold && changeWalletHeader) {
    if (activeScreen === "WalletLanding")
      store.dispatch(actions.changeWalletHeaderContent());
  }
  if (y < threshold && changeInterestHeader) {
    if (activeScreen === "WalletInterest")
      store.dispatch(actions.changeInterestHeaderContent());
  }
}

export default animationsUtil;
