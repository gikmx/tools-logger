import Test from 'ava';
import Logger from '../lib/logger.js';
import { LoggerParamTypeError as ParamErr } from '../lib/types';

const { NODE_ENV } = process.env;

Test('should throw if sent non-object for config', (t) => {
    t.plan(2);
    const errCheck = err =>
        err.name === ParamErr.name &&
        err.message.match(/Invalid parameter «config»/) !== null;

    t.notThrows(() => Logger(), errCheck);
    t.throws(() => Logger(true), errCheck);
});

Test('errors in non-production should throw', (t) => {
    process.env.NODE_ENV = 'development';
    const log = Logger({ name: 'test' });
    t.throws(
        () => log.error('I am message', 'TestError'),
        err => err.name === 'TestError' && err.message === 'I am message',
    );
    process.env.NODE_ENV = NODE_ENV;
});

Test('errors in production should not throw', (t) => {
    process.env.NODE_ENV = 'production';
    const log = Logger({ name: 'test', level: 'trace' });
    t.notThrows(() => log.error('I am message', 'TestError'));
    process.env.NODE_ENV = NODE_ENV;
});
