/* global test:true,expect:true */
import Logger from '../lib/logger.js';

const { NODE_ENV } = process.env;

test('should throw if sent non-object for config', () => {
    expect(() => Logger()).not.toThrowError();
    expect(() => Logger(true)).toThrowError(/Invalid parameter/);
});

test('errors in non-production should throw', () => {
    process.env.NODE_ENV = 'development';
    const log = Logger({ name: 'test' });
    expect(() => log.error('I am message', 'TestError')).toThrowError(/I am message/);
    process.env.NODE_ENV = NODE_ENV;
});

test('errors in production should not throw', () => {
    process.env.NODE_ENV = 'production';
    const log = Logger({ name: 'test', level: 'trace' });
    expect(() => log.error('I am message', 'TestError')).not.toThrow();
    process.env.NODE_ENV = NODE_ENV;
});
