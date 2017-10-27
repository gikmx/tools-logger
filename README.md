# [@gik/tools-logger](https://github.com/gikmx/tools) *0.0.5*
> A wrapper around Pino, with a GIK twist.

##### Contributors
- [Héctor Menéndez](mailto:hector@gik.mx) []()

##### Supported platforms

#### <a name="table-of-contents"></a> Table of contents
- **[logger](#logger)** A wrapper around [pino](http://getpino.io).
  - **[Types](#logger.Types)**
    - **[Instance](#logger.Types.Instance)** `typedef` An instance of the logger (see [Pino](http://getpino.io))
    - **[ParamTypeError](#logger.Types.ParamTypeError)** `typedef` Thrown when invalid parameters are sent to the constructor.


# <a name="logger"></a> logger

A wrapper around [pino](http://getpino.io).

###### Behaviour
- When the environment is *non-production* it will output prettier logs.
- All calls to `error` will use
  [@gik/tools-thrower](http://githib.com/gikmx/tools-thrower)
  halting the execution when the environment is *non-production* (ie: development)
  however, when in production, it will fallback to Pino's default logger.
- When the environment is set as *production* it will load
  [extreme-mode](http://getpino.io/#/docs/extreme)
  adding an even faster approach to logging. (make sure to read the documentation
  about the caveats)
- In all environments captures all calls to [debug](https://github.com/visionmedia/debug)
  to improve their performance and avoid having to pass the `DEBUG` environment variable.

###### Notes
- In order to wrap around `DEBUG` calls, you must load this before any other modules.
- Using `trace` level will enable all `debug` messages sent by the modules.

###### Parameters
<table>
    <tr>
        <td style="white-space: nowrap;">
            <code>cfg</code>
        </td>
        <td style="white-space: nowrap;">
                <a href="#Object">Object</a>
        </td>
        <td>The default configuration applied for every environment.
<a href="http://getpino.io/#/docs/API?id=constructor">additional params</a></td>
    </tr><tr>
        <td style="white-space: nowrap;">
            <code>[cfg.name]</code>
        </td>
        <td style="white-space: nowrap;">
                <a href="#string">string</a>
        </td>
        <td>The name for the returned logger instance.
By default, it will first try to determine the current process&#39; package
name, if that fails, then it will use the current process&#39; dirname.</td>
    </tr><tr>
        <td style="white-space: nowrap;">
            <code>[cfg.level]</code>
        </td>
        <td style="white-space: nowrap;">
                <a href="#string">string</a>
        </td>
        <td>The level of debugging that should be used
supported levels are, check out <a href="#logger.Instance">logger.Instance</a> for more info.</p>
<p>you can also set the level using the LEVEL environment variable.
<code>~$ LEVEL=info node /path/to/your/file.js</code>. <b>Default <code>info</code></b></td>
    </tr>
</table>


###### Returns
 [`logger.Types.Instance`](#logger.Types.Instance) <span style="font-weight:normal"> - A function that you can use for logging.</span>
###### Throws
- `logger.Types.ParamTypeError` - When parameters are not valid.

###### Members

- [Types](#logger.Types)

<small>**[▲ Top](#table-of-contents)**</small>

---

## <a name="logger.Types"></a> Types

###### Members

- [Instance](#logger.Types.Instance)
- [ParamTypeError](#logger.Types.ParamTypeError)

<small>**[▲ Top](#logger)**</small>

---

### <a name="logger.Types.Instance"></a> Instance
> static  typedef of [`logger.Types`](#logger.Types)


An instance of the logger (see [Pino](http://getpino.io))

###### Properties
<table>
    <tr>
        <td style="white-space: nowrap;">
            <code>error</code>
        </td>
        <td style="white-space: nowrap;">
                <a href="#function">function</a>
        </td>
        <td>Throws an error on development, logs an error on production</td>
    </tr><tr>
        <td style="white-space: nowrap;">
            <code>warn</code>
        </td>
        <td style="white-space: nowrap;">
                <a href="#function">function</a>
        </td>
        <td>Logs a warning.</td>
    </tr><tr>
        <td style="white-space: nowrap;">
            <code>info</code>
        </td>
        <td style="white-space: nowrap;">
                <a href="#function">function</a>
        </td>
        <td>Logs information.</td>
    </tr><tr>
        <td style="white-space: nowrap;">
            <code>debug</code>
        </td>
        <td style="white-space: nowrap;">
                <a href="#function">function</a>
        </td>
        <td>Logs debug information.</td>
    </tr><tr>
        <td style="white-space: nowrap;">
            <code>trace</code>
        </td>
        <td style="white-space: nowrap;">
                <a href="#function">function</a>
        </td>
        <td>Logs all the information and shows packages&#39; logs.</td>
    </tr>
</table>



<small>**[▲ Top](#logger.Types)**</small>

---

### <a name="logger.Types.ParamTypeError"></a> ParamTypeError
> static  typedef of [`logger.Types`](#logger.Types)


Thrown when invalid parameters are sent to the constructor.



<small>**[▲ Top](#logger.Types)**</small>

---

