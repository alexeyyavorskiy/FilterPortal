# UltNg4

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.0.

Project is component based. 

`Dashboard page` have 2 main components: DiagramBlock and DashboardBlock components.

DashboardBlock has input parameters: parameters for showing/hide component elements and

objects. Dynamic form controls generated on base of input objects in ObjectList Component.

ObjectList Component used also on `parameterList page` and in `EditNetwork pages.`

Config file (`src/config/config.json`) loaded on application start.
You can set 

- `server Url`

- `files`, that should be downloaded be clicking of corresponding button.

Localization files placed in `src/i18n` folder.

## To run application locally install:

- [Node.js](https://nodejs.org)
- [Angular CLI](https://github.com/angular/angular-cli)
- on first start run  `npm i` command from project folder

## Development server

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `npm run build-prod` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
