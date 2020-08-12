// BUY_COINS_PAYMENT_STATUSES.APPROVED
import { BUY_COINS_PAYMENT_STATUSES } from "../constants/DATA";

const simplexCreditApproved = {
  id: BUY_COINS_PAYMENT_STATUSES.APPROVED,
  fiat_amount: "122.11",
  amount: "0.5",
  fee: "10",
  user_id: "26d12326-ed9f-40d5-bba9-28e4566ad3d0",
  order_id: "9af50780-b014-4d8a-9a29-a2a8a43ebe7c",
  status: "approved",
  fiat_currency: "USD",
  coin: "ETH",
  created_at: "2020-02-06T12:56:27.597Z",
  updated_at: "2020-02-06T13:00:09.078Z",
  time: "06 Feb 2020",
  type: "DEPOSIT_CONFIRMED",
};

// BUY_COINS_PAYMENT_STATUSES.APPROVED.CANCELED
const simplexCreditCanceled = {
  id: BUY_COINS_PAYMENT_STATUSES.CANCELLED,
  user_id: "26d12326-ed9f-40d5-bba9-28e4566ad3d0",
  order_id: "4cf8e659-6205-43b3-a9c2-9aa9dbb61b94",
  status: "declined",
  fiat_currency: "USD",
  coin: "ETH",
  created_at: "2020-02-05T10:27:18.228Z",
  updated_at: "2020-02-05T16:28:00.751Z",
  time: "05 Feb 2020",
  type: "CANCELED",
};

// BUY_COINS_PAYMENT_STATUSES.APPROVED.PENDING
const simplexCreditPending = {
  id: BUY_COINS_PAYMENT_STATUSES.PENDING,
  user_id: "26d12326-ed9f-40d5-bba9-28e4566ad3d0",
  order_id: "4cf8e659-6205-43b3-a9c2-9aa9dbb61b94",
  status: "pending",
  fiat_currency: "USD",
  coin: "XRP",
  created_at: "2020-02-05T10:27:18.228Z",
  updated_at: "2020-02-05T16:28:00.751Z",
  time: "05 Feb 2020",
  type: "CANCELED",
};

export default {
  [BUY_COINS_PAYMENT_STATUSES.PENDING]: simplexCreditPending,
  [BUY_COINS_PAYMENT_STATUSES.APPROVED]: simplexCreditApproved,
  [BUY_COINS_PAYMENT_STATUSES.CANCELED]: simplexCreditCanceled,
};
