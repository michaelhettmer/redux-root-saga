import { all, spawn, call, delay } from 'redux-saga/effects';
import { Saga } from '@redux-saga/types';

/**
 * Default error handling implementation. Prints the thrown exception argument
 * and the name of the crashed saga with log level 'warn'.
 *
 * @param e The exception argument that got thrown. Usually of type Error('message').
 * @param saga The saga that throw the exception.
 */
export const defaultErrorHandler = (e: unknown, saga: Saga) => {
    console.warn(`${saga.name} has failed`, e);
};

/**
 * Options to pass to createRootSaga function to control its behavior.
 */
export interface Options {
    /**
     * Error handler that gets called when a saga throws an execption.
     */
    errorHandler?: (e: unknown, saga: Saga) => void;

    /**
     * Delay between saga crash and saga restart. Default is 1000ms.
     */
    restartDelay?: number;
}

/**
 *  Create a root saga which starts and manages the execution of 1:n child sagas.
 *
 * @param sagas Array of child sagas the root saga should manage.
 * @param options Specify and control the behavior of the root saga and how the execution of the child sagas is managed.
 */
const createRootSaga = (sagas: Saga[], { errorHandler = defaultErrorHandler, restartDelay = 1000 }: Options) => {
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
                        yield delay(restartDelay);
                    }
                }),
            ),
        );
    };
};

export default createRootSaga;
