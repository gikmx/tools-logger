/**
 * Thrown when a non-object configuration is sent to the logger.
 * @typedef {Error}
 * @memberof Tools.__types
 */
export const LoggerParamTypeError = {
    message: 'Invalid parameter «%s», Expecting {%s}, got "%s"',
    name: 'LoggerParamTypeError',
};

/**
 * An instance of the logger
 * @typedef LoggerInstance
 * @memberof Tools.__types
 * @see [Pino](http://getpino.io)
 */
export const LoggerInstance = {};

/**
 * @module __types
 * @memberof Tools
 */
export default {
    ParamTypeError: LoggerParamTypeError,
    Instance: LoggerInstance,
};
