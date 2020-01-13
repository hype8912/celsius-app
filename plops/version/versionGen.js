module.exports = {
  description: "Sets the version and build number of the app",
  prompts: [
    {
      type: "input",
      name: "version",
      message: "App version (eg. 4.0.0)?",
    },
    {
      type: "input",
      name: "buildNumber",
      message: "Build number (eg. 50)?",
    },
  ],
  actions: [
    {
      type: "modify",
      path: "android/app/build.gradle",
      pattern: /versionName(.+?)\n/,
      template: ['versionName "{{version}}"\n'].join("\n"),
    },
    {
      type: "modify",
      path: "android/app/build.gradle",
      pattern: /versionCode(.+?)\n/,
      template: ["versionCode {{buildNumber}}\n"].join("\n"),
    },
    {
      type: "modify",
      path: "ios/celsius/Info.plist",
      pattern: /<key>CFBundleVersion<\/key>\n(.+?)<\/string>/,
      template: [
        "<key>CFBundleVersion</key>",
        "\t<string>{{buildNumber}}</string>",
      ].join("\n"),
    },
    {
      type: "modify",
      path: "ios/celsius/Info.plist",
      pattern: /<key>CFBundleShortVersionString<\/key>\n(.+?)<\/string>/,
      template: [
        "<key>CFBundleShortVersionString</key>",
        "\t<string>{{version}}</string>",
      ].join("\n"),
    },
  ],
};
