# Code Structure and Best practices

Celsius app project is divided into the following sections:

- `/components`
- `/constants`
- `/context`
- `/mock-data`
- `/navigator`
- `/redux`
- `/services`
- `/utils`

## Components (/components)

A folder containing all React Native components used in the app.
Components are separated into different folders based on the [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/) principles.
Following types of components exist in the app:

- `atoms` - Smallest components used throughout the app, think of them as basic Bootstrap components
- `molecules` - More complex components used throughout the app, think of them as complex Bootstrap components
- `organisms` - Celsius specific and custom components (sections, tables, modals...)
- `graphs` - All components related to graphs
- `layouts` - Layouts wrapping screens (eg. `AuthLayout`)
- `screens` - Screens in the app

### 💚 DO:

- run `yarn plop Component` to create all needed component files
- run `yarn plop Screen` to create all needed screen files

### ❌ DON'T:

- call services from components

### ❓ DO IF YOU MUST:

### ❗ TO BE DISCUSSED:

Look at the Airbnb React/JSX Style Guide (https://github.com/airbnb/javascript/tree/master/react)
Always use getDerivedStateFromProps when you set a variable that is connected with redux in initial state of the component (through the constructor)

## Constants (/constants)

All constants used through out the app.

### 💚 DO:

### ❌ DON'T:

### ❓ DO IF YOU MUST:

### ❗ TO BE DISCUSSED:

## Context (/context)

### 💚 DO:

### ❌ DON'T:

### ❓ DO IF YOU MUST:

### ❗ TO BE DISCUSSED:

- Do we need this?

## Mock Data (/mock-data)

The `/mock-data` folder contains fake models meant for easier testing.
Mock data flags can be toggled in `dev-settings.json`

### 💚 DO:

### ❌ DON'T:

### ❓ DO IF YOU MUST:

### ❗ TO BE DISCUSSED:

## Navigator (/navigator)

### 💚 DO:

### ❌ DON'T:

### ❓ DO IF YOU MUST:

### ❗ TO BE DISCUSSED:

- Do we need this?

## Redux (/redux)

All logic responsible for redux actions and reducers is located in `/redux` folder

### 💚 DO:

- run `yarn plop Redux` to create and wire all needed redux files

### ❌ DON'T:

### ❓ DO IF YOU MUST:

### ❗ TO BE DISCUSSED:

## Services (/services)

Services are the only way of communicating with the server or with third party services.

### 💚 DO:

- run `yarn plop Service` to create service file
- make methods extremely stupid oneliners
- document all services
- add mock data flags to services

### ❌ DON'T:

- put `axios` calls anywhere else
- map or format data in services

### ❓ DO IF YOU MUST:

### ❗ TO BE DISCUSSED:

## Utils (/utils)

The `/utils` folder contains all the specific methods for:

- data handling
- formatting,
- calculations reused through out the app
- ui/ux helpers
- utils for third party services
- ...

### 💚 DO:

- document utility methods

### ❌ DON'T:

### ❓ DO IF YOU MUST:

### ❗ TO BE DISCUSSED:
