/**
 * @name LoggerInstance
 * @memberof Types
 * @typedef {Object}
 * @description An instance of the logger (see [Pino](http://getpino.io))
 * @property {function} error - Throws an error on development, logs an error on production
 * @property {function} warn - Logs a warning.
 * @property {function} info - Logs information.
 * @property {function} debug - Logs debug information.
 * @property {function} trace - Logs all the information and shows packages' logs.
 */
export const LoggerInstance = {
    error: Function,
    warn: Function,
    info: Function,
    debug: Function,
    trace: Function,
};

/**
 * @name ParamTypeError
 * @memberof Types
 * @typedef {Error}
 * @description Thrown when invalid parameters are sent to the constructor.
 */
export const LoggerParamTypeError = {
    message: 'Invalid parameter «%s», Expecting {%s}, got "%s"',
    name: 'LoggerParamTypeError',
};

export default {
    ParamTypeError: LoggerParamTypeError,
    Instance: LoggerInstance,
};
