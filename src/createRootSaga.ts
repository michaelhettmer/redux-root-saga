import { all, spawn, call } from 'redux-saga/effects';
import { Saga } from '@redux-saga/types';

const defaultErrorHandler = (e: unknown, saga: Saga) => {
    console.warn(`${saga.name} has failed`, e);
};

interface Options {
    errorHandler?: (e: unknown, saga: Saga) => void;
}

const createRootSaga = (sagas: Saga[], { errorHandler = defaultErrorHandler }: Options) => {
    return function* rootSaga() {
        yield all(
            sagas.map(saga =>
                spawn(function* spawnedSaga() {
                    while (true) {
                        try {
                            yield call(saga);
                            break;
                        } catch (e) {
                            errorHandler(e, saga);
                        }
                    }
                }),
            ),
        );
    };
};

export default createRootSaga;
