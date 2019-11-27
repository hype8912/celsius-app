![Power to the people](./assets/images/power-to-the-people.png)

# Celsius Mobile App

>The Celsius mobile app enables you to calculate loan and interest rate based on your crypto holdings.

## Install Application on your mobile device

1. [Android users](https://play.google.com/store/apps/details?id=network.celsius.wallet)
2. [iPhone users](https://apps.apple.com/us/app/celsius-network/id1387885523)

## Dev section


### Dev environment setup

```
yarn global add expo expo-cli

yarn install

yarn run start:dev:staging
```

### Ask dev team for:

- `/config` folder
- `app.json`
- relevant credentials

## Testing the app in staging environment

- install `expo` app on device
- ask dev team for expo credentials
- [Open Staging](https://expo.io/@celsiustech/celsius?release-channel=staging)

### Dev commands

```bash
$ yarn start
```
- starts expo project (use one of `yarn run start:dev` commands instead) 

```bash
$ yarn run start:dev
```
- starts expo project with environment settings from `app.json` 


```bash
$ yarn run start:dev:local
```
- updates `app.json` with local/dev settings and starts expo project

```bash
$ yarn run start:dev:staging
```
- updates `app.json` with staging settings and starts expo project

```bash
$ yarn run start:dev:preprod
```
- updates `app.json` with pre-prod settings and starts expo project

```bash
$ yarn run start:dev:production
```
- updates `app.json` with production settings and starts expo project

$ yarn run ios
```
- starts ios simulator and react native debugger

```bash
$ yarn run android
```

```bash
$ yarn run lint
```
- checks the code for linting errors

```bash
$ yarn run set:env:dev
```
- updates `app.json` with local environment variables

```bash
$ yarn run set:env:staging
```
- updates `app.json` with staging environment variables

```bash
$ yarn run set:env:preprod
```
- updates `app.json` with pre-prod environment variables

```bash
$ yarn run set:env:production
```
- updates `app.json` with production environment variables

```bash
$ yarn run plop
```
- runs plop [More...](https://github.com/plopjs/plop). Available plops for: _TODO_

### Tools

* [React Native Debugger](https://github.com/jhen0409/react-native-debugger)

* [API Docs v1](https://documenter.getpostman.com/view/4207695/celsius/RW1aHzQg#bf6e3009-2736-4a6e-b1a0-c0928c704550) 
* [API Docs v3](https://documenter.getpostman.com/view/4207695/S11RLvpb) 

* Testflight for iPhone
* Sentry
