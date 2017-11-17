# [@gik/tools-logger](http://gik.mx) *0.0.9*
> A wrapper around Pino logger, with some extra features. Part of our [tools suite](https://github.com/gikmx/tools).

##### Contributors
- [Héctor Menéndez](mailto:hector@gik.mx) []()

##### Supported platforms
- darwin
- linux

#### <a name="table-of-contents"></a> Table of contents
- **[logger](#logger)** A wrapper around [pino](http://getpino.io).
- **[Types](#Types)** ``
  - **[ParamTypeError](#Types.ParamTypeError)** `typedef` Thrown when invalid parameters are sent to the constructor.


# <a name="logger"></a> logger

A wrapper around [pino](http://getpino.io).
> - [Standalone version](https://github.com/gikmx/tools-logger).
> - [Report a Bug](https://github.com/gikmx/tools-logger/issues).

###### Behaviour
- When the environment is *non-production* it will output prettier logs.

- Unless `cfg.nothrow` is set to true, All calls to `error` will use
  [@gik/tools-thrower](http://githib.com/gikmx/tools-thrower)
  halting the execution when the environment is *non-production* (ie: development)
  however, when in production it will always fallback to Pino's default logger.

- When `cfg.extreme` is set to true and the environment is set as *production*
  it will load [extreme-mode](http://getpino.io/#/docs/extreme)
  adding an even faster approach to logging. (make sure to read the documentation
  about the caveats)

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
supported levels are, check out <a href="#logger.Instance">logger.Instance</a> for more info. <b>Default <code>info</code></b></td>
    </tr><tr>
        <td style="white-space: nowrap;">
            <code>[cfg.nothrow]</code>
        </td>
        <td style="white-space: nowrap;">
                <a href="#boolean">boolean</a>
        </td>
        <td>Whether <code>log.error</code> should always log
instead of throwing in all environments.</td>
    </tr><tr>
        <td style="white-space: nowrap;">
            <code>[cfg.extreme]</code>
        </td>
        <td style="white-space: nowrap;">
                <a href="#boolean">boolean</a>
        </td>
        <td>Whether Pino should initialize Extreme mode
when in production environment.</p>
<p>you can also set the level using the LEVEL environment variable.
<code>~$ LEVEL=info node /path/to/your/file.js</code>.</td>
    </tr>
</table>


###### Returns
 [`Types.Instance`](#Types.Instance) <span style="font-weight:normal"> - A function that you can use for logging.</span>
###### Throws
- `Types.ParamTypeError` - When parameters are not valid.


<small>**[▲ Top](#table-of-contents)**</small>

---

# <a name="Types"></a> Types

###### Members

- [ParamTypeError](#Types.ParamTypeError)

<small>**[▲ Top](#table-of-contents)**</small>

---

## <a name="Types.ParamTypeError"></a> ParamTypeError
> static  typedef of [`Types`](#Types)


Thrown when invalid parameters are sent to the constructor.



<small>**[▲ Top](#Types)**</small>

---

