import PATH from 'path';
import Pino from 'pino';
import PinoDebug from 'pino-debug';
import { Is } from '@gik/tools-checker';
import Thrower from '@gik/tools-thrower';
import { LoggerParamTypeError as TypeErr } from './types';

/**
 * PinoDebug can only be called once, this keeps track when that's been done
 * in order to prevent a second call.
 * @private
 */
let hasDebugBeenEnabled = false;

/**
 * A wrapper around [pino](http://getpino.io)
 * @module logger
 * @memberof Tools
 */
export default function Logger(cfg = {}) {

    /**
     * @throws {LoggerParamTypeError}
     */
    if (!Is.object(cfg))
        throw Thrower(`${TypeErr.message}, got '${typeof cfg}'`, TypeErr.name);

    /**
     * @property {Object} config - The default configuration applied for every environment.
     * @property {string} [config.name] - The name for the returned logger instance.
     *           By default, it will first try to determine the current process' package
     *           name, if that fails, then it will use the current process' dirname.
     * @property {string} [config.level=info] - The level of debugging that should be used
     *           supported levels are:
     *          `silent`, `fatal`, `error`, `warn`, `info`, `debug`, `trace`. <br>
     *           NOTE: using trace would enable all `debug` messages sent by the modules.
     * @property {boolean} [safe=true] Avoid errors caused by circular-references.
     *
     * @see {@link http://getpino.io/#/docs/API?id=constructor} for additional properties.
     */
    const config = Object.assign({
        safe: true,
        name: process.env.npm_package_name || PATH.basename(process.cwd()),
    }, cfg);

    /**
     * Behaves differently accordint to the environment.
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
     */
    let pino;
    if (process.env.NODE_ENV === 'production')
        pino = Pino(Object.assign({ extreme: true }, config));
    else {
        const pretty = Pino.pretty({ levelFirst: true, forceColor: true });
        pretty.pipe(process.stdout);
        pino = Pino(config, pretty);
    }

    /**
    * Captures all calls to [debug](https://github.com/visionmedia/debug) to improve their
    * performance and avoid having to pass the DEBUG environment variable.
    * NOTE: In order for this to work, this lib should be loaded before any other modules.
    */
    if (!hasDebugBeenEnabled) {
        PinoDebug(pino, { auto: true, map: { '*': 'trace' } });
        hasDebugBeenEnabled = true;
    }

    const pinoError = pino.error.bind(pino);
    pino.error = (msgOrErr, errName = false) => {
        if (process.env.NODE_ENV === 'production')
            return pinoError(msgOrErr, errName || undefined);
        throw Thrower(msgOrErr, errName || 'Error');
    };

    /**
     * @returns {LoggerInstance}
     */
    return pino;
}
