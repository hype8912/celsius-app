import moxios from "moxios";
import axios from "axios";
import generalDataService from "../app/services/general-data-service";
import mockGeneralDataStore from "../celsius-app-creds/mock-data/mockGeneralDataStore";
import API_URL from "../app/services/api-url";

describe("Live server - fetch initial data", () => {
  test("getInitialData", async () => {
    const data = await generalDataService.getCelsiusInitialData();
    expect(data.withdrawal_settings).not.toBeDefined();
  });
});

describe("Mock server - fetch initial data", () => {
  beforeEach(() => {
    moxios.install(axios);
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test("getInitialData", () => {
    const data = mockGeneralDataStore;

    const withdrawalSettings = {
      maximum_withdrawal_amount: "15000",
      minimum_withdrawal_amount: "0.95",
      daily_withdrawal_limit: "50000",
    };

    moxios.stubRequest(`${API_URL}/initial_data`, {
      status: 200,
      response: withdrawalSettings,
    });

    moxios.wait(() => {
      expect(data.withdrawalSettings.maximum_withdrawal_amount).toBe(
        withdrawalSettings.maximum_withdrawal_amount
      );
    });
  });
});
