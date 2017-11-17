import PATH from 'path';
import Pino from 'pino';
import { Is } from '@gik/tools-checker';
import Thrower from '@gik/tools-thrower';
import { LoggerParamTypeError as TypeErr } from './types';

/**
 * @module logger
 * @description A wrapper around [pino](http://getpino.io).
 * > - [Standalone version](https://github.com/gikmx/tools-logger).
 * > - [Report a Bug](https://github.com/gikmx/tools-logger/issues).
 *
 * ###### Behaviour
 * - When the environment is *non-production* it will output prettier logs.
 *
 * - Unless `cfg.nothrow` is set to true, All calls to `error` will use
 *   [@gik/tools-thrower](http://githib.com/gikmx/tools-thrower)
 *   halting the execution when the environment is *non-production* (ie: development)
 *   however, when in production it will always fallback to Pino's default logger.
 *
 * - When `cfg.extreme` is set to true and the environment is set as *production*
 *   it will load [extreme-mode](http://getpino.io/#/docs/extreme)
 *   adding an even faster approach to logging. (make sure to read the documentation
 *   about the caveats)
 *
 * @param {Object} cfg - The default configuration applied for every environment.
 * [additional params](http://getpino.io/#/docs/API?id=constructor)
 * @param {string} [cfg.name] - The name for the returned logger instance.
 * By default, it will first try to determine the current process' package
 * name, if that fails, then it will use the current process' dirname.
 * @param {string} [cfg.level=info] - The level of debugging that should be used
 * supported levels are, check out [logger.Instance](#logger.Instance) for more info.
 * @param {boolean} [cfg.nothrow=false] - Whether `log.error` should always log
 * instead of throwing in all environments.
 * @param {boolean} [cfg.extreme=false] - Whether Pino should initialize Extreme mode
 * when in production environment.
 *
 * you can also set the level using the LEVEL environment variable.
 * `~$ LEVEL=info node /path/to/your/file.js`.
 *
 * @returns {Types.Instance} - A function that you can use for logging.
 * @throws {Types.ParamTypeError} - When parameters are not valid.
 */
export default function Logger(cfg = {}) {

    if (!Is.object(cfg))
        Thrower([TypeErr.message, 'config', 'Object', typeof cfg], TypeErr.name);

    const nothrow = cfg.nothrow === undefined ? false : cfg.nothrow;
    const extreme = cfg.extreme === undefined ? false : cfg.extreme;

    const config = Object.assign({
        safe: true,
        level: process.env.LEVEL || 'info',
        name: process.env.npm_package_name || PATH.basename(process.cwd()),
    }, cfg, {
        // get rid of custom params
        nothrow: undefined,
        extreme: undefined,
    });

    let pino;
    if (process.env.NODE_ENV === 'production') {
        pino = Pino(Object.assign({
            extreme: extreme === undefined ? false : extreme,
        }, config));
    } else {
        const pretty = Pino.pretty({ levelFirst: true, forceColor: true });
        pretty.pipe(process.stdout);
        pino = Pino(config, pretty);
    }

    const pinoError = pino.error.bind(pino);
    pino.error = (...args) => {
        if (process.env.NODE_ENV !== 'production' && !nothrow) {
            const [msgOrErr, errName] = args;
            throw Thrower(msgOrErr, errName || 'Error');
        }
        return pinoError(...args);
    };

    return pino;
}
