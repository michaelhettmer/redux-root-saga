<div align="center">
<img src="./logo_wide_slim.png" alt="React Hooks Use Previous Logo" />

<h1>redux-root-saga</h1>

<p>Strongly typed and well tested React Hooks to store and retrieve previous values from any component property.</p>
</div>

---

[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![Version][version-badge]][package]
[![Downloads][downloads-badge]][npmtrends]
[![MIT License][license-badge]][license]
[![Semantic Release][release-badge]][release]
[![Conventional Commits][commits-badge]][commits]
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg)](#contributors-)
[![PRs Welcome][prs-badge]][prs]
[![Code of Conduct][coc-badge]][coc]
[![Discord][discord-badge]][discord]
[![Twitter][twitter-badge]][twitter]

## About

Redux Root Saga provides an easy way to quickly run multiple sagas concurrently in a tested and widely used way.

This package is originally based on the root saga pattern from the [official documentation](https://redux-saga.js.org/docs/advanced/RootSaga.html) and therefore an easy way to get the described behavior without copy-pasting it into every new project.

See [#-features] for an overview of all available options and the extended functionality.

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [⚙️ Installation](#️-installation)
- [⚡️ Getting Started](#️-getting-started)
- [🎯 Features](#-features)
- [Other Solutions](#other-solutions)
- [Issues](#issues)
  - [🐛 Bugs](#-bugs)
  - [💡 Feature Requests](#-feature-requests)
- [Contributors ✨](#contributors-)
- [LICENSE](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## ⚙️ Installation

### Latest stable release

```sh
npm install --save redux-root-saga
```

or

```sh
yarn add redux-root-saga
```

### Latest Release Candidate

```sh
npm install --save redux-root-saga@next
```

or

```sh
yarn add redux-root-saga@next
```

## ⚡️ Getting Started

``` typescript
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import createRootSaga from 'redux-root-saga';

function* saga1() {
    /*...*/
}
function* saga2() {
    /*...*/
}

// Option 1: Execute all specified sagas concurrently with default options.
const rootSaga = createRootSaga([saga1, saga2]);

// Option 2: Start all sagas with (partly) customized default options.
const rootSaga = createRootSaga([saga1, saga2], {
    maxRetries: 3,
    errorHandler: (error, saga, options) => console.err(
        `Error in saga ${saga.name} with options ${options}: ${error}`);
});

// Option 3: Start all sagas with (partly) customized default options
// and use specific custom options only for saga1.
// All other options of saga1 fallback to the (customized) default ones.
const rootSaga = createRootSaga([[saga1, { maxRetries: Infinity }], saga2], {
    maxRetries: 3,
    onError: (error, saga, options) => console.error(
        `Error in saga ${saga.name} with options ${options}: ${error}`),
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
```

## 🎯 Features

* Strictly typed and fully Typescript compatible
* Maximum retry count for restarting child sagas
* Default error handling with a warning message including the saga name
* Custom error handling callback

## Other Solutions

I'm not aware of any, if you are please [make a pull request][prs] and add it here!

## Issues

_Looking to contribute? Look for the [Good First Issue][good-first-issue]
label._

### 🐛 Bugs

Please file an issue for bugs, missing documentation, or unexpected behavior.

[**See Bugs**][bugs]

### 💡 Feature Requests

Please file an issue to suggest new features. Vote on feature requests by adding
a 👍. This helps maintainers prioritize what to work on.

[**See Feature Requests**][requests]

## Contributors ✨

Thanks goes to these people ([emoji key][emojis]):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://michael-hettmer.de"><img src="https://avatars0.githubusercontent.com/u/13876624?v=4" width="100px;" alt=""/><br /><sub><b>Michael Hettmer</b></sub></a><br /><a href="https://github.com/MichaelHettmer/redux-root-saga/commits?author=MichaelHettmer" title="Code">💻</a> <a href="https://github.com/MichaelHettmer/redux-root-saga/commits?author=MichaelHettmer" title="Documentation">📖</a> <a href="#infra-MichaelHettmer" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/MichaelHettmer/redux-root-saga/commits?author=MichaelHettmer" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors][all-contributors] specification.
Contributions of any kind welcome!

## LICENSE

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<!-- prettier-ignore-start -->
[npm]: https://www.npmjs.com
[node]: https://nodejs.org
[build-badge]: https://circleci.com/gh/MichaelHettmer/redux-root-saga/tree/master.svg?style=shield
[build]: https://circleci.com/gh/MichaelHettmer/redux-root-saga
[coverage-badge]: https://codecov.io/gh/MichaelHettmer/redux-root-saga/branch/master/graph/badge.svg
[coverage]: https://codecov.io/gh/MichaelHettmer/redux-root-saga
[version-badge]: https://img.shields.io/npm/v/redux-root-saga.svg
[package]: https://www.npmjs.com/package/redux-root-saga
[downloads-badge]: https://img.shields.io/npm/dm/redux-root-saga.svg
[npmtrends]: http://www.npmtrends.com/redux-root-saga
[license-badge]: https://img.shields.io/npm/l/redux-root-saga.svg
[license]: https://github.com/MichaelHettmer/redux-root-saga/blob/master/LICENSE
[release-badge]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[release]: https://github.com/semantic-release/semantic-release
[commits-badge]: https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg
[commits]: https://conventionalcommits.org
[twitter-badge]: https://img.shields.io/twitter/follow/MichaelHettmer.svg?label=Follow%20@MichaelHettmer
[twitter]: https://twitter.com/intent/follow?screen_name=MichaelHettmer
[discord-badge]: https://img.shields.io/discord/620938362379042837
[discord]: https://discord.gg/MEpKcF3
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg
[prs]: http://makeapullrequest.com
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg
[coc]: https://github.com/MichaelHettmer/redux-root-saga/blob/master/CODE_OF_CONDUCT.md
[emojis]: https://github.com/all-contributors/all-contributors#emoji-key
[all-contributors]: https://github.com/all-contributors/all-contributors
[bugs]: https://github.com/MichaelHettmer/redux-root-saga/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+sort%3Acreated-desc+label%3Abug
[requests]: https://github.com/MichaelHettmer/redux-root-saga/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc+label%3Aenhancement
[good-first-issue]: https://github.com/MichaelHettmer/redux-root-saga/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc+label%3Aenhancement+label%3A%22good+first+issue%22
<!-- prettier-ignore-end -->