/**
 * Thrown when a non-object configuration is sent to the logger.
 * @typedef {Error}
 * @memberof Types
 */
export const LoggerParamTypeError = {
    message: 'Invalid parameter «%s», Expecting {%s}, got "%s"',
    name: 'LoggerParamTypeError',
};

/**
 * An instance of the logger (see [Pino](http://getpino.io))
 * @typedef {Object}
 * @memberof Types
 */
export const LoggerInstance = {};

export default {
    ParamTypeError: LoggerParamTypeError,
    Instance: LoggerInstance,
};
