
/**
 * Thrown when a non-object configuration is sent to the logger.
 * @typedef {Error} LoggerParamTypeError
 * @memberof Tools.__types
 */
export const LoggerParamTypeError = {
    message: 'Invalid configuration, expecting {Object}',
    name: 'LoggerParamTypeError',
};

/**
 * An instance of the logger
 * @typedef LoggerInstance
 * @memberof Tools.__types
 * @see {Object} [Pino](http://getpino.io)
 */
export const LoggerInstance = {};

export default {
    ParamTypeError: LoggerParamTypeError,
    Instance: LoggerInstance,
};
