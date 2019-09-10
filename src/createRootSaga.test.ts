import mockConsole from 'jest-mock-console';
import { expectSaga } from 'redux-saga-test-plan';
import { delay, call } from 'redux-saga/effects';
import createRootSaga from './createRootSaga';

describe('test saga management with createRootSaga', () => {
    it('should return a saga', () => {
        const sagaCreator = createRootSaga([]);
        const saga = sagaCreator();
        expect(saga).toBeDefined();
        expect(saga.next).toBeDefined();
    });

    it('should spawn all specified sagas without restarting them', async () => {
        function* saga1() {
            yield delay(0);
        }
        function* saga2() {
            yield delay(0);
        }
        const { effects } = await expectSaga(createRootSaga([saga1, saga2], { maxRetries: 0 })).run();

        expect(effects.call[0]).toEqual(call(saga1));
        expect(effects.call[2]).toEqual(delay(0));
        expect(effects.call[3]).toEqual(call(saga2));
        expect(effects.call[5]).toEqual(delay(0));
        expect(effects.fork).toHaveLength(2);
    });

    it('should call default error handler with console.warn as often as exceptions are thrown', async () => {
        function* saga() {
            yield delay(0);
            throw new Error('error in saga');
        }
        mockConsole('warn');
        await expectSaga(createRootSaga([saga], { maxRetries: 2, restartDelay: 0 })).run();
        expect(console.warn).toHaveBeenCalledTimes(3);
    });

    it('should call error handler exactly as often as exceptions are thrown', async () => {
        function* saga1() {
            yield delay(0);
            throw new Error('error in saga1');
        }
        function* saga2() {
            yield delay(0);
            throw new Error('error in saga2');
        }

        let errorCounts = 0;
        await expectSaga(
            createRootSaga([saga1, saga2], {
                maxRetries: 1,
                onError: () => {
                    errorCounts++;
                },
            }),
        ).run();

        expect(errorCounts).toBe(4);
    });

    it('should use custom options if available and otherwise fallback to default options', async () => {
        function* saga() {
            yield delay(0);
            throw new Error('error in saga');
        }
        mockConsole('warn');
        await expectSaga(
            createRootSaga([[saga, {}], [saga, { maxRetries: 3 }]], { maxRetries: 2, restartDelay: 0 }),
        ).run();
        expect(console.warn).toHaveBeenCalledTimes(7);
    });
});
