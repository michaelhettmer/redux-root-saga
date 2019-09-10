import { all, spawn, call, delay, ForkEffectDescriptor } from 'redux-saga/effects';
import { Saga, CombinatorEffect, SimpleEffect } from '@redux-saga/types';

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
    onError?: (e: unknown, saga: Saga, options: Options) => void;

    /**
     * Delay between saga crash and saga restart. Default is 1000ms.
     */
    restartDelay?: number;

    /**
     * Maximum number of tries to restart a child saga until its execution is suspended.
     * Counts per saga. Default value is 'Infinity' so the child saga will always be restarted
     * if it throws an exception.
     */
    maxRetries?: number;
}

/**
 *  Creates a root saga which starts and manages the execution of 1:n child sagas.
 *
 * @param sagas Array of child sagas the root saga should manage. Sagas can optionally be passed as a tuple of the saga
 * and a custom options object. If a property is set in the custom options object, it will override the value specified
 * in the general and default options object. All unset custom options or if no custom options are at all will fall back
 * to the general and default property.
 * @param options Specify and control the default behavior of the root saga and how the execution of the child sagas
 * is managed. Single properties or all can be overwritten by passing a custom options object alongside a single saga.
 */
const createRootSaga = (
    sagas: (Saga | [Saga, Options])[],
    { onError = defaultErrorHandler, restartDelay = 1000, maxRetries = Infinity }: Options = {},
): (() => Generator<CombinatorEffect<'ALL', SimpleEffect<'FORK', ForkEffectDescriptor>>, void, unknown>) => {
    return function* rootSaga() {
        yield all(
            sagas.map(sagaParam =>
                spawn(function* spawnedSaga() {
                    // If saga is passed inside a tuple with custom options extract both
                    const saga = sagaParam instanceof Array ? sagaParam[0] : sagaParam;
                    const options = sagaParam instanceof Array ? sagaParam[1] : { onError, restartDelay, maxRetries };

                    // All unset custom options will fallback to the default options
                    if (options.onError === undefined) options.onError = onError;
                    if (options.restartDelay === undefined) options.restartDelay = restartDelay;
                    if (options.maxRetries === undefined) options.maxRetries = maxRetries;

                    // Restart saga as often as specified in options
                    for (let i = 0; i < options.maxRetries + 1; i++) {
                        try {
                            yield call(saga);
                            break;
                        } catch (e) {
                            options.onError(e, saga, options);
                        }
                        if (options.maxRetries > 1) yield delay(options.restartDelay);
                    }
                }),
            ),
        );
    };
};

export default createRootSaga;
