// copies app.json from celsius-app-creds repo

const fs = require("fs");
const path = require("path");

const { CONFIG, DIRECTORY_PATH } = process.env;

const DEFAULT_CREDS_DIR = "./celsius-app-creds";

const ALL_CONFIGS = {
  // DEV: 'DEV',
  STAGING: "STAGING",
  PRODUCTION: "PRODUCTION",
  RESKINNING: "RESKINNING",
};

const ENV_FILES = {
  APP_JSON: "app.json",
  CONSTANTS: "constants.js",
  BRANCH: "branch.json",
  // BUILD_GRADLE: "build.gradle",
  // ANDROID_KEYSTORE: 'celsius.jks', // check if we need this

  // Key for codePush
  INFO_PLIST: "info.plist",
  ANDROID_STRINGS: "strings.xml",

  GOOGLE_SERVICES: "google-services.json",
  GOOGLE_INFO_PLIST: "GoogleService-Info.plist",

  // These will be removed when we fix google packages
  GOOGLE_SERVICES_FALLBACK: "google-services.json",
  GOOGLE_INFO_PLIST_FALLBACK: "GoogleService-Info.plist",
};

if (Object.keys(ALL_CONFIGS).indexOf(CONFIG) !== -1) {
  Object.keys(ENV_FILES).forEach(copyFileFromCelsiusCreds);

  // eslint-disable-next-line no-console
  console.log(
    `Generated all env specific files for ${CONFIG} environment successfully`
  );
  return true;
}

// eslint-disable-next-line no-console
console.log(
  `Please specify correct CONFIG variable, one of ${Object.keys(
    ALL_CONFIGS
  ).join(", ")}`
);
return false;

function getDestination(fileKey) {
  const pathToFile = ENV_FILES[fileKey];

  switch (fileKey) {
    case "INFO_PLIST":
      return path.resolve(__dirname, `ios/celsius/${pathToFile}`);

    case "ANDROID_STRINGS":
      return path.resolve(
        __dirname,
        `android/app/src/main/res/values/${pathToFile}`
      );

    case "GOOGLE_SERVICES":
    case "BUILD_GRADLE":
      return path.resolve(__dirname, `android/app/${pathToFile}`);

    case "GOOGLE_INFO_PLIST":
      return path.resolve(__dirname, `ios/${pathToFile}`);

    default:
      return path.resolve(__dirname, pathToFile);
  }
}

function copyFileFromCelsiusCreds(fileKey) {
  let src;
  const pathToFile = ENV_FILES[fileKey];
  const dest = getDestination(fileKey);
  const directoryPath = DIRECTORY_PATH || DEFAULT_CREDS_DIR;

  switch (CONFIG) {
    case ALL_CONFIGS.PRODUCTION:
      src = path.resolve(
        __dirname,
        `${directoryPath}/production/${pathToFile}`
      );
      break;

    case ALL_CONFIGS.RESKINNING:
      src = path.resolve(
        __dirname,
        `${directoryPath}/reskinning/${pathToFile}`
      );
      break;

    case ALL_CONFIGS.DEV:
    case ALL_CONFIGS.STAGING:
    default:
      src = path.resolve(__dirname, `${directoryPath}/staging/${pathToFile}`);
  }

  if (!fs.existsSync(src)) {
    // eslint-disable-next-line no-console
    console.log(`${src} doesn't exist`);
    return false;
  }

  const data = fs.readFileSync(src, "utf-8");
  fs.writeFileSync(dest, data);

  // eslint-disable-next-line no-console
  console.log(`${pathToFile} was copied to ${dest}`);
}
