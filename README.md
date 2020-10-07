![Power to the people](./assets/images/power-to-the-people.png)

# Celsius Mobile App

> The Celsius mobile app enables you to calculate loan and interest rate based on your crypto holdings.

[celsius.network](celsius.network)

## Install Application on your mobile device

1. [Android](https://play.google.com/store/apps/details?id=network.celsius.wallet&hl=en)
2. [iOS](https://apps.apple.com/us/app/celsius-network/id1387885523)

### Dev commands

**Running the app in dev environment**

- `$ yarn start` - starts metro bundler project
- `$ yarn ios` - starts ios simulator and react native debugger
- `$ yarn android` - starts android simulator and react native debugger
- `$ yarn test` - runs unit tests

**Environment variables setup**

- `$ yarn creds:init` - clones credentials repo
- `$ yarn creds:update` - pulls the latest creds
- `$ yarn set:env`\
  pulls the latest creds and runs `set-env` script\
  Use `env` parameter to specify environment. One of `BETA`, `BETA_LOZA`, `BETA_SLJIVA`, `BETA_TRAVARICA`, `BETA_STORYBOOK`, `PRODUCTION`. Defaults to `BETA`\
  eg. `yarn set:env env=BETA`

**Deploy App**

- `$ yarn deploy`\
  Runs `deploy-app` script\
  Use `env` parameter to specify environment. One of `BETA`, `BETA_LOZA`, `BETA_SLJIVA`, `BETA_TRAVARICA`, `BETA_STORYBOOK`, `PRODUCTION`. Defaults to `BETA`\
  eg. `yarn deploy env=BETA_TRAVARICA`\
  Use `android-only` or `ios-only` parameters to update only one platform\
  eg. `yarn deploy env=BETA_TRAVARICA ios-only`

**Code Styling**

- `$ yarn lint` - checks the code for linting errors
- `$ yarn prettier:format` - formats code according to [prettier](https://prettier.io/)
- `$ yarn prettier:hook` - prettier hook for `pre:commit`

**Hooks**

- `$ yarn pre:commit` - checks code style before every commit

**Other**

- `$ yarn plop` - runs plop [More...](https://github.com/amwmedia/plop).

### Useful Links

- [Celsius Handbook](https://sites.google.com/mvpworkshop.co/celsius-devs-handbook/home)
- [Celsius App Links](https://sites.google.com/mvpworkshop.co/celsius-devs-handbook/app-links)
