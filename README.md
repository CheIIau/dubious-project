## What's the point

A project to try out FSD methodology
Ссылка на документацию - [feature sliced design](https://feature-sliced.design/docs/get-started/tutorial)

---

## Scripts

-   `npm run start` - Start frontend project on webpack dev server
-   `npm run start:dev:server` - Start backend server (json-server)
-   `npm run start:vite` - Start frontend project on vite (you need to replace require with import in [const.ts](/src/shared/config/i18n/const.ts))
-   `npm run build:prod` - Build prod
-   `npm run build:dev` - Build dev
-   `npm run build:watch` - Build in watch mode
-   `npm run build:vite` - Build vite
-   `npm run lint:eslint:ts` - Checking ts files by eslint
-   `npm run lint:eslint:ts:fix` - Fix ts files by eslint
-   `npm run lint:typescript:ts` - Check ts files by typescript
-   `npm run lint:scss` - Validate scss files by style linter
-   `npm run lint:scss:fix` - Fix scss files by style linter
-   `npm run test:unit` - Run unit tests with vitest
-   `npm run test:unit:ui` - Run ui of tests with vitest
-   `npm run test:unit:report` - Generate vitest report
-   `npm run test:unit:coverage` - Generate vitest report on test coverage
-   `npm run test:screenshots` - Run screenshot tests with loki
-   `npm run test:screenshots:approve` - Confirm new screenshots
-   `npm run test:screenshots:ci` - Run screenshot tests in CI
-   `npm run storybook` - Run Storybook
-   `npm run storybook:build` - Build Storybook
-   `npm run tailwind` - Generate tailwind styles file (only for storybook)
-   `npm run visual:report` - Generate and open html report of screenshot tests
-   `npm run visual:report:json` - Generate json report of screenshot tests
-   `npm run visual:report:html` - Generate html report of screenshot tests
-   `npm run remove:prod` - Remove prod folder
-   `npm run generate:slice` - Script for FSD slice generation

---

## Translation

The project uses i18next library to work with translations.
Translation files are stored in public/locales.

---

## Tests

The project uses vitest for module unit testing and loki for screenshot testing

---

## Linting

Also for strict control of the main architectural principles our own eslint plugin _eslint-plugin-dubious-plugin_ is used, which contains 3 rules

1. path-checker - forbids to use absolute imports within one module
2. layer-imports - checks if layers are used correctly from FSD point of view.
   (e.g. widgets cannot be used in features and entitites)
3. public-imports - allows import from other modules only from public api. Has auto fix

Scss linting uses our own regexp in rule _selector-class-pattern_ for classes to match BEM CSS pattern.

---

## Storybook

For building UI components and pages in isolation Storybook is used.
Requests to the server are mocked with storybook-addon-mock.

---

### Working with data

Interacting with data is done using the redux toolkit.

Requests to the server are sent using RTK Query

---

### Other stuff

The project uses our own babel plugin to remove given attributes from production build
Postcss and tailwind have also been added just for fun 

---