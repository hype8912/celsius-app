const execSync = require("child_process").execSync;
const Constants = require("./celsius-app-creds/production/constants");

// Setting env from command args, BETA is default
let ENV = process.argv.find(a => a.includes("env="));
ENV = ENV && ENV.split("=")[1];
ENV = ENV && ENV.toUpperCase();
ENV = ENV || "BETA";

// Checking for platform specific flags
const iosOnly = !!process.argv.find(a => a.includes("ios-only"));
const androidOnly = !!process.argv.find(a => a.includes("android-only"));

const codePushChannels = {
  BETA: "Beta",
  BETA_STORYBOOK: "Beta-Storybook",
  BETA_LOZA: "Beta-Loza",
  BETA_SLJIVA: "Beta-Sljiva",
  BETA_TRAVARICA: "Beta-Travarica",
  PRODUCTION: `v${Constants.CLIENT_VERSION}`,
};

// Setting desired environment
execSync(`yarn set:env --env=${ENV}`, { encoding: "utf-8", stdio: "inherit" });

// Codepush iOS App
if (!androidOnly) {
  // eslint-disable-next-line no-console
  console.log(`Starting codepush to ${codePushChannels[ENV]} iOS channel`);
  execSync(
    `appcenter codepush release-react -a celsius-network/celsius -d ${codePushChannels[ENV]}`,
    { encoding: "utf-8", stdio: "inherit" }
  );
  // eslint-disable-next-line no-console
  console.log(`Finished codepush to ${codePushChannels[ENV]} iOS channel`);
}

// Codepush Android App
if (!iosOnly) {
  // eslint-disable-next-line no-console
  console.log(`Starting codepush to ${codePushChannels[ENV]} Android channel`);
  execSync(
    `appcenter codepush release-react -a celsius-network/celsius-1 -d ${codePushChannels[ENV]}`,
    { encoding: "utf-8", stdio: "inherit" }
  );
  // eslint-disable-next-line no-console
  console.log(`Finished codepush to ${codePushChannels[ENV]} Android channel`);
}

// eslint-disable-next-line no-console
console.log(`${codePushChannels[ENV]} App Deployed Successfully!`);
