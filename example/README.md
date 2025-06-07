# Test with example

To get started with the project, run `npm` in the root directory to install the required dependencies for each package:

```sh
cd example
npm install
```

> You can use [`yarn`](https://classic.yarnpkg.com/) or [`npm`](https://github.com/npm/cli) for the development.

While developing, you can run the [example app](/example/) to test your changes. Any changes you make in your library's JavaScript code will be reflected in the example app without a rebuild. If you change any native code, then you'll need to rebuild the example app.

To start the packager:

```sh
npm expo start
```

To run the example app on Android:

```sh
npm example android
```

To run the example app on iOS:

```sh
npm example ios
```

To run the example app on Web:

```sh
npm example web
```

Remember to add tests for your change if possible. Run the unit tests by:

```sh
npm test
```

### Linting and tests

[ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [TypeScript](https://www.typescriptlang.org/)

We use [TypeScript](https://www.typescriptlang.org/) for type checking, [ESLint](https://eslint.org/) with [Prettier](https://prettier.io/) for linting and formatting the code, and [Jest](https://jestjs.io/) for testing.
