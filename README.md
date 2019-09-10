# Redux Root Saga

[![license](https://img.shields.io/npm/l/redux-root-saga)](https://github.com/MichaelHettmer/redux-root-saga/blob/master/LICENSE.md)
[![circleci](https://circleci.com/gh/MichaelHettmer/redux-root-saga.svg?style=shield)](https://circleci.com/gh/MichaelHettmer/redux-root-saga)
[![codecov](https://codecov.io/gh/MichaelHettmer/redux-root-saga/branch/master/graph/badge.svg)](https://codecov.io/gh/MichaelHettmer/redux-root-saga)
[![npm version](https://img.shields.io/npm/v/redux-root-saga)](https://www.npmjs.com/package/redux-root-saga)
[![npm downloads](https://img.shields.io/npm/dm/redux-root-saga)](https://www.npmjs.com/package/redux-root-saga)
[![pull requests](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/MichaelHettmer/redux-root-saga/compare)
[![discord](https://img.shields.io/discord/620938362379042837)](https://discord.gg/R2jNASR)
[![twitter](https://img.shields.io/twitter/follow/MichaelHettmer.svg?label=Follow%20@MichaelHettmer)](https://twitter.com/intent/follow?screen_name=MichaelHettmer)

## Configurable redux-saga execution management

Redux Root Saga provides an easy way to quickly run multiple sagas concurrently in a tested and widely used way.

This package is based on the root saga pattern from the [official documentation](https://redux-saga.js.org/docs/advanced/RootSaga.html) and therefore an easy way to get the described behavior without copy-pasting it into every new project.

Additionally the root saga behavior was extended by the following fully configurable and optional features (more to come):

* Strictly typed and fully Typescript compatible
* Maximum retry count for restarting child sagas
* Default error handling with a warning message including the saga name
* Custom error handling callback

# Getting started

## Install

```sh
$ npm install --save redux-root-saga
```
or

```sh
$ yarn add redux-root-saga
```

## Usage Example

``` typescript
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import { createRootSaga } from 'redux-root-saga';

function* saga1() { /*...*/ }
function* saga2() { /*...*/ }

const rootSaga = createRootSaga([saga1, saga2], {
    maxRetries: 3,
    errorHandler: (error, saga) => console.err(`Error in saga ${saga.name}: ${error}`);
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
```
