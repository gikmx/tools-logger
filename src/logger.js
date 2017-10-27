import PATH from 'path';
import Pino from 'pino';
import { Is } from '@gik/tools-checker';
import Thrower from '@gik/tools-thrower';
import { LoggerParamTypeError as TypeErr } from './types';

/**
 * @module logger
 * @description A wrapper around [pino](http://getpino.io).
 *
 * ###### Behaviour
 * - When the environment is *non-production* it will output prettier logs.
 *
 * - All calls to `error` will use
 *   [@gik/tools-thrower](http://githib.com/gikmx/tools-thrower)
 *   halting the execution when the environment is *non-production* (ie: development)
 *   however, when in production, it will fallback to Pino's default logger.
 *
 * - When the environment is set as *production* it will load
 *   [extreme-mode](http://getpino.io/#/docs/extreme)
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
 *
 * you can also set the level using the LEVEL environment variable.
 * `~$ LEVEL=info node /path/to/your/file.js`.
 *
 * @returns {logger.Types.Instance} - A function that you can use for logging.
 * @throws {logger.Types.ParamTypeError} - When parameters are not valid.
 */
export default function Logger(cfg = {}) {

    if (!Is.object(cfg))
        Thrower([TypeErr.message, 'config', 'Object', typeof cfg], TypeErr.name);

    const config = Object.assign({
        safe: true,
        level: process.env.LEVEL || 'info',
        name: process.env.npm_package_name || PATH.basename(process.cwd()),
    }, cfg);

    let pino;
    if (process.env.NODE_ENV === 'production')
        pino = Pino(Object.assign({ extreme: true }, config));
    else {
        const pretty = Pino.pretty({ levelFirst: true, forceColor: true });
        pretty.pipe(process.stdout);
        pino = Pino(config, pretty);
    }

    const pinoError = pino.error.bind(pino);
    pino.error = (msgOrErr, errName = false) => {
        if (process.env.NODE_ENV === 'production')
            return pinoError(msgOrErr, errName || undefined);
        throw Thrower(msgOrErr, errName || 'Error');
    };

    return pino;
}
