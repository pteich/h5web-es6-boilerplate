(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _handlebarsBase = require('./handlebars/base');

var base = _interopRequireWildcard(_handlebarsBase);

// Each of these augment the Handlebars object. No need to setup here.
// (This is done to easily share code between commonjs and browse envs)

var _handlebarsSafeString = require('./handlebars/safe-string');

var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);

var _handlebarsException = require('./handlebars/exception');

var _handlebarsException2 = _interopRequireDefault(_handlebarsException);

var _handlebarsUtils = require('./handlebars/utils');

var Utils = _interopRequireWildcard(_handlebarsUtils);

var _handlebarsRuntime = require('./handlebars/runtime');

var runtime = _interopRequireWildcard(_handlebarsRuntime);

var _handlebarsNoConflict = require('./handlebars/no-conflict');

var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);

// For compatibility and usage outside of module systems, make the Handlebars object a namespace
function create() {
  var hb = new base.HandlebarsEnvironment();

  Utils.extend(hb, base);
  hb.SafeString = _handlebarsSafeString2['default'];
  hb.Exception = _handlebarsException2['default'];
  hb.Utils = Utils;
  hb.escapeExpression = Utils.escapeExpression;

  hb.VM = runtime;
  hb.template = function (spec) {
    return runtime.template(spec, hb);
  };

  return hb;
}

var inst = create();
inst.create = create;

_handlebarsNoConflict2['default'](inst);

inst['default'] = inst;

exports['default'] = inst;
module.exports = exports['default'];


},{"./handlebars/base":2,"./handlebars/exception":5,"./handlebars/no-conflict":15,"./handlebars/runtime":16,"./handlebars/safe-string":17,"./handlebars/utils":18}],2:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.HandlebarsEnvironment = HandlebarsEnvironment;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utils = require('./utils');

var _exception = require('./exception');

var _exception2 = _interopRequireDefault(_exception);

var _helpers = require('./helpers');

var _decorators = require('./decorators');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var VERSION = '4.0.10';
exports.VERSION = VERSION;
var COMPILER_REVISION = 7;

exports.COMPILER_REVISION = COMPILER_REVISION;
var REVISION_CHANGES = {
  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
  2: '== 1.0.0-rc.3',
  3: '== 1.0.0-rc.4',
  4: '== 1.x.x',
  5: '== 2.0.0-alpha.x',
  6: '>= 2.0.0-beta.1',
  7: '>= 4.0.0'
};

exports.REVISION_CHANGES = REVISION_CHANGES;
var objectType = '[object Object]';

function HandlebarsEnvironment(helpers, partials, decorators) {
  this.helpers = helpers || {};
  this.partials = partials || {};
  this.decorators = decorators || {};

  _helpers.registerDefaultHelpers(this);
  _decorators.registerDefaultDecorators(this);
}

HandlebarsEnvironment.prototype = {
  constructor: HandlebarsEnvironment,

  logger: _logger2['default'],
  log: _logger2['default'].log,

  registerHelper: function registerHelper(name, fn) {
    if (_utils.toString.call(name) === objectType) {
      if (fn) {
        throw new _exception2['default']('Arg not supported with multiple helpers');
      }
      _utils.extend(this.helpers, name);
    } else {
      this.helpers[name] = fn;
    }
  },
  unregisterHelper: function unregisterHelper(name) {
    delete this.helpers[name];
  },

  registerPartial: function registerPartial(name, partial) {
    if (_utils.toString.call(name) === objectType) {
      _utils.extend(this.partials, name);
    } else {
      if (typeof partial === 'undefined') {
        throw new _exception2['default']('Attempting to register a partial called "' + name + '" as undefined');
      }
      this.partials[name] = partial;
    }
  },
  unregisterPartial: function unregisterPartial(name) {
    delete this.partials[name];
  },

  registerDecorator: function registerDecorator(name, fn) {
    if (_utils.toString.call(name) === objectType) {
      if (fn) {
        throw new _exception2['default']('Arg not supported with multiple decorators');
      }
      _utils.extend(this.decorators, name);
    } else {
      this.decorators[name] = fn;
    }
  },
  unregisterDecorator: function unregisterDecorator(name) {
    delete this.decorators[name];
  }
};

var log = _logger2['default'].log;

exports.log = log;
exports.createFrame = _utils.createFrame;
exports.logger = _logger2['default'];


},{"./decorators":3,"./exception":5,"./helpers":6,"./logger":14,"./utils":18}],3:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.registerDefaultDecorators = registerDefaultDecorators;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _decoratorsInline = require('./decorators/inline');

var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);

function registerDefaultDecorators(instance) {
  _decoratorsInline2['default'](instance);
}


},{"./decorators/inline":4}],4:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _utils = require('../utils');

exports['default'] = function (instance) {
  instance.registerDecorator('inline', function (fn, props, container, options) {
    var ret = fn;
    if (!props.partials) {
      props.partials = {};
      ret = function (context, options) {
        // Create a new partials stack frame prior to exec.
        var original = container.partials;
        container.partials = _utils.extend({}, original, props.partials);
        var ret = fn(context, options);
        container.partials = original;
        return ret;
      };
    }

    props.partials[options.args[0]] = options.fn;

    return ret;
  });
};

module.exports = exports['default'];


},{"../utils":18}],5:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

function Exception(message, node) {
  var loc = node && node.loc,
      line = undefined,
      column = undefined;
  if (loc) {
    line = loc.start.line;
    column = loc.start.column;

    message += ' - ' + line + ':' + column;
  }

  var tmp = Error.prototype.constructor.call(this, message);

  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
  for (var idx = 0; idx < errorProps.length; idx++) {
    this[errorProps[idx]] = tmp[errorProps[idx]];
  }

  /* istanbul ignore else */
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, Exception);
  }

  try {
    if (loc) {
      this.lineNumber = line;

      // Work around issue under safari where we can't directly set the column value
      /* istanbul ignore next */
      if (Object.defineProperty) {
        Object.defineProperty(this, 'column', {
          value: column,
          enumerable: true
        });
      } else {
        this.column = column;
      }
    }
  } catch (nop) {
    /* Ignore if the browser is very particular */
  }
}

Exception.prototype = new Error();

exports['default'] = Exception;
module.exports = exports['default'];


},{}],6:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.registerDefaultHelpers = registerDefaultHelpers;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _helpersBlockHelperMissing = require('./helpers/block-helper-missing');

var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);

var _helpersEach = require('./helpers/each');

var _helpersEach2 = _interopRequireDefault(_helpersEach);

var _helpersHelperMissing = require('./helpers/helper-missing');

var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);

var _helpersIf = require('./helpers/if');

var _helpersIf2 = _interopRequireDefault(_helpersIf);

var _helpersLog = require('./helpers/log');

var _helpersLog2 = _interopRequireDefault(_helpersLog);

var _helpersLookup = require('./helpers/lookup');

var _helpersLookup2 = _interopRequireDefault(_helpersLookup);

var _helpersWith = require('./helpers/with');

var _helpersWith2 = _interopRequireDefault(_helpersWith);

function registerDefaultHelpers(instance) {
  _helpersBlockHelperMissing2['default'](instance);
  _helpersEach2['default'](instance);
  _helpersHelperMissing2['default'](instance);
  _helpersIf2['default'](instance);
  _helpersLog2['default'](instance);
  _helpersLookup2['default'](instance);
  _helpersWith2['default'](instance);
}


},{"./helpers/block-helper-missing":7,"./helpers/each":8,"./helpers/helper-missing":9,"./helpers/if":10,"./helpers/log":11,"./helpers/lookup":12,"./helpers/with":13}],7:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _utils = require('../utils');

exports['default'] = function (instance) {
  instance.registerHelper('blockHelperMissing', function (context, options) {
    var inverse = options.inverse,
        fn = options.fn;

    if (context === true) {
      return fn(this);
    } else if (context === false || context == null) {
      return inverse(this);
    } else if (_utils.isArray(context)) {
      if (context.length > 0) {
        if (options.ids) {
          options.ids = [options.name];
        }

        return instance.helpers.each(context, options);
      } else {
        return inverse(this);
      }
    } else {
      if (options.data && options.ids) {
        var data = _utils.createFrame(options.data);
        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
        options = { data: data };
      }

      return fn(context, options);
    }
  });
};

module.exports = exports['default'];


},{"../utils":18}],8:[function(require,module,exports){
'use strict';

exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utils = require('../utils');

var _exception = require('../exception');

var _exception2 = _interopRequireDefault(_exception);

exports['default'] = function (instance) {
  instance.registerHelper('each', function (context, options) {
    if (!options) {
      throw new _exception2['default']('Must pass iterator to #each');
    }

    var fn = options.fn,
        inverse = options.inverse,
        i = 0,
        ret = '',
        data = undefined,
        contextPath = undefined;

    if (options.data && options.ids) {
      contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
    }

    if (_utils.isFunction(context)) {
      context = context.call(this);
    }

    if (options.data) {
      data = _utils.createFrame(options.data);
    }

    function execIteration(field, index, last) {
      if (data) {
        data.key = field;
        data.index = index;
        data.first = index === 0;
        data.last = !!last;

        if (contextPath) {
          data.contextPath = contextPath + field;
        }
      }

      ret = ret + fn(context[field], {
        data: data,
        blockParams: _utils.blockParams([context[field], field], [contextPath + field, null])
      });
    }

    if (context && typeof context === 'object') {
      if (_utils.isArray(context)) {
        for (var j = context.length; i < j; i++) {
          if (i in context) {
            execIteration(i, i, i === context.length - 1);
          }
        }
      } else {
        var priorKey = undefined;

        for (var key in context) {
          if (context.hasOwnProperty(key)) {
            // We're running the iterations one step out of sync so we can detect
            // the last iteration without have to scan the object twice and create
            // an itermediate keys array.
            if (priorKey !== undefined) {
              execIteration(priorKey, i - 1);
            }
            priorKey = key;
            i++;
          }
        }
        if (priorKey !== undefined) {
          execIteration(priorKey, i - 1, true);
        }
      }
    }

    if (i === 0) {
      ret = inverse(this);
    }

    return ret;
  });
};

module.exports = exports['default'];


},{"../exception":5,"../utils":18}],9:[function(require,module,exports){
'use strict';

exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _exception = require('../exception');

var _exception2 = _interopRequireDefault(_exception);

exports['default'] = function (instance) {
  instance.registerHelper('helperMissing', function () /* [args, ]options */{
    if (arguments.length === 1) {
      // A missing field in a {{foo}} construct.
      return undefined;
    } else {
      // Someone is actually trying to call something, blow up.
      throw new _exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
    }
  });
};

module.exports = exports['default'];


},{"../exception":5}],10:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _utils = require('../utils');

exports['default'] = function (instance) {
  instance.registerHelper('if', function (conditional, options) {
    if (_utils.isFunction(conditional)) {
      conditional = conditional.call(this);
    }

    // Default behavior is to render the positive path if the value is truthy and not empty.
    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
    if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
  });

  instance.registerHelper('unless', function (conditional, options) {
    return instance.helpers['if'].call(this, conditional, { fn: options.inverse, inverse: options.fn, hash: options.hash });
  });
};

module.exports = exports['default'];


},{"../utils":18}],11:[function(require,module,exports){
'use strict';

exports.__esModule = true;

exports['default'] = function (instance) {
  instance.registerHelper('log', function () /* message, options */{
    var args = [undefined],
        options = arguments[arguments.length - 1];
    for (var i = 0; i < arguments.length - 1; i++) {
      args.push(arguments[i]);
    }

    var level = 1;
    if (options.hash.level != null) {
      level = options.hash.level;
    } else if (options.data && options.data.level != null) {
      level = options.data.level;
    }
    args[0] = level;

    instance.log.apply(instance, args);
  });
};

module.exports = exports['default'];


},{}],12:[function(require,module,exports){
'use strict';

exports.__esModule = true;

exports['default'] = function (instance) {
  instance.registerHelper('lookup', function (obj, field) {
    return obj && obj[field];
  });
};

module.exports = exports['default'];


},{}],13:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _utils = require('../utils');

exports['default'] = function (instance) {
  instance.registerHelper('with', function (context, options) {
    if (_utils.isFunction(context)) {
      context = context.call(this);
    }

    var fn = options.fn;

    if (!_utils.isEmpty(context)) {
      var data = options.data;
      if (options.data && options.ids) {
        data = _utils.createFrame(options.data);
        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]);
      }

      return fn(context, {
        data: data,
        blockParams: _utils.blockParams([context], [data && data.contextPath])
      });
    } else {
      return options.inverse(this);
    }
  });
};

module.exports = exports['default'];


},{"../utils":18}],14:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _utils = require('./utils');

var logger = {
  methodMap: ['debug', 'info', 'warn', 'error'],
  level: 'info',

  // Maps a given level value to the `methodMap` indexes above.
  lookupLevel: function lookupLevel(level) {
    if (typeof level === 'string') {
      var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());
      if (levelMap >= 0) {
        level = levelMap;
      } else {
        level = parseInt(level, 10);
      }
    }

    return level;
  },

  // Can be overridden in the host environment
  log: function log(level) {
    level = logger.lookupLevel(level);

    if (typeof console !== 'undefined' && logger.lookupLevel(logger.level) <= level) {
      var method = logger.methodMap[level];
      if (!console[method]) {
        // eslint-disable-line no-console
        method = 'log';
      }

      for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        message[_key - 1] = arguments[_key];
      }

      console[method].apply(console, message); // eslint-disable-line no-console
    }
  }
};

exports['default'] = logger;
module.exports = exports['default'];


},{"./utils":18}],15:[function(require,module,exports){
(function (global){
/* global window */
'use strict';

exports.__esModule = true;

exports['default'] = function (Handlebars) {
  /* istanbul ignore next */
  var root = typeof global !== 'undefined' ? global : window,
      $Handlebars = root.Handlebars;
  /* istanbul ignore next */
  Handlebars.noConflict = function () {
    if (root.Handlebars === Handlebars) {
      root.Handlebars = $Handlebars;
    }
    return Handlebars;
  };
};

module.exports = exports['default'];


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],16:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.checkRevision = checkRevision;
exports.template = template;
exports.wrapProgram = wrapProgram;
exports.resolvePartial = resolvePartial;
exports.invokePartial = invokePartial;
exports.noop = noop;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _utils = require('./utils');

var Utils = _interopRequireWildcard(_utils);

var _exception = require('./exception');

var _exception2 = _interopRequireDefault(_exception);

var _base = require('./base');

function checkRevision(compilerInfo) {
  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
      currentRevision = _base.COMPILER_REVISION;

  if (compilerRevision !== currentRevision) {
    if (compilerRevision < currentRevision) {
      var runtimeVersions = _base.REVISION_CHANGES[currentRevision],
          compilerVersions = _base.REVISION_CHANGES[compilerRevision];
      throw new _exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
    } else {
      // Use the embedded version info since the runtime doesn't know about this revision yet
      throw new _exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
    }
  }
}

function template(templateSpec, env) {
  /* istanbul ignore next */
  if (!env) {
    throw new _exception2['default']('No environment passed to template');
  }
  if (!templateSpec || !templateSpec.main) {
    throw new _exception2['default']('Unknown template object: ' + typeof templateSpec);
  }

  templateSpec.main.decorator = templateSpec.main_d;

  // Note: Using env.VM references rather than local var references throughout this section to allow
  // for external users to override these as psuedo-supported APIs.
  env.VM.checkRevision(templateSpec.compiler);

  function invokePartialWrapper(partial, context, options) {
    if (options.hash) {
      context = Utils.extend({}, context, options.hash);
      if (options.ids) {
        options.ids[0] = true;
      }
    }

    partial = env.VM.resolvePartial.call(this, partial, context, options);
    var result = env.VM.invokePartial.call(this, partial, context, options);

    if (result == null && env.compile) {
      options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
      result = options.partials[options.name](context, options);
    }
    if (result != null) {
      if (options.indent) {
        var lines = result.split('\n');
        for (var i = 0, l = lines.length; i < l; i++) {
          if (!lines[i] && i + 1 === l) {
            break;
          }

          lines[i] = options.indent + lines[i];
        }
        result = lines.join('\n');
      }
      return result;
    } else {
      throw new _exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
    }
  }

  // Just add water
  var container = {
    strict: function strict(obj, name) {
      if (!(name in obj)) {
        throw new _exception2['default']('"' + name + '" not defined in ' + obj);
      }
      return obj[name];
    },
    lookup: function lookup(depths, name) {
      var len = depths.length;
      for (var i = 0; i < len; i++) {
        if (depths[i] && depths[i][name] != null) {
          return depths[i][name];
        }
      }
    },
    lambda: function lambda(current, context) {
      return typeof current === 'function' ? current.call(context) : current;
    },

    escapeExpression: Utils.escapeExpression,
    invokePartial: invokePartialWrapper,

    fn: function fn(i) {
      var ret = templateSpec[i];
      ret.decorator = templateSpec[i + '_d'];
      return ret;
    },

    programs: [],
    program: function program(i, data, declaredBlockParams, blockParams, depths) {
      var programWrapper = this.programs[i],
          fn = this.fn(i);
      if (data || depths || blockParams || declaredBlockParams) {
        programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
      } else if (!programWrapper) {
        programWrapper = this.programs[i] = wrapProgram(this, i, fn);
      }
      return programWrapper;
    },

    data: function data(value, depth) {
      while (value && depth--) {
        value = value._parent;
      }
      return value;
    },
    merge: function merge(param, common) {
      var obj = param || common;

      if (param && common && param !== common) {
        obj = Utils.extend({}, common, param);
      }

      return obj;
    },
    // An empty object to use as replacement for null-contexts
    nullContext: Object.seal({}),

    noop: env.VM.noop,
    compilerInfo: templateSpec.compiler
  };

  function ret(context) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var data = options.data;

    ret._setup(options);
    if (!options.partial && templateSpec.useData) {
      data = initData(context, data);
    }
    var depths = undefined,
        blockParams = templateSpec.useBlockParams ? [] : undefined;
    if (templateSpec.useDepths) {
      if (options.depths) {
        depths = context != options.depths[0] ? [context].concat(options.depths) : options.depths;
      } else {
        depths = [context];
      }
    }

    function main(context /*, options*/) {
      return '' + templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths);
    }
    main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
    return main(context, options);
  }
  ret.isTop = true;

  ret._setup = function (options) {
    if (!options.partial) {
      container.helpers = container.merge(options.helpers, env.helpers);

      if (templateSpec.usePartial) {
        container.partials = container.merge(options.partials, env.partials);
      }
      if (templateSpec.usePartial || templateSpec.useDecorators) {
        container.decorators = container.merge(options.decorators, env.decorators);
      }
    } else {
      container.helpers = options.helpers;
      container.partials = options.partials;
      container.decorators = options.decorators;
    }
  };

  ret._child = function (i, data, blockParams, depths) {
    if (templateSpec.useBlockParams && !blockParams) {
      throw new _exception2['default']('must pass block params');
    }
    if (templateSpec.useDepths && !depths) {
      throw new _exception2['default']('must pass parent depths');
    }

    return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
  };
  return ret;
}

function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
  function prog(context) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var currentDepths = depths;
    if (depths && context != depths[0] && !(context === container.nullContext && depths[0] === null)) {
      currentDepths = [context].concat(depths);
    }

    return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
  }

  prog = executeDecorators(fn, prog, container, depths, data, blockParams);

  prog.program = i;
  prog.depth = depths ? depths.length : 0;
  prog.blockParams = declaredBlockParams || 0;
  return prog;
}

function resolvePartial(partial, context, options) {
  if (!partial) {
    if (options.name === '@partial-block') {
      partial = options.data['partial-block'];
    } else {
      partial = options.partials[options.name];
    }
  } else if (!partial.call && !options.name) {
    // This is a dynamic partial that returned a string
    options.name = partial;
    partial = options.partials[partial];
  }
  return partial;
}

function invokePartial(partial, context, options) {
  // Use the current closure context to save the partial-block if this partial
  var currentPartialBlock = options.data && options.data['partial-block'];
  options.partial = true;
  if (options.ids) {
    options.data.contextPath = options.ids[0] || options.data.contextPath;
  }

  var partialBlock = undefined;
  if (options.fn && options.fn !== noop) {
    (function () {
      options.data = _base.createFrame(options.data);
      // Wrapper function to get access to currentPartialBlock from the closure
      var fn = options.fn;
      partialBlock = options.data['partial-block'] = function partialBlockWrapper(context) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        // Restore the partial-block from the closure for the execution of the block
        // i.e. the part inside the block of the partial call.
        options.data = _base.createFrame(options.data);
        options.data['partial-block'] = currentPartialBlock;
        return fn(context, options);
      };
      if (fn.partials) {
        options.partials = Utils.extend({}, options.partials, fn.partials);
      }
    })();
  }

  if (partial === undefined && partialBlock) {
    partial = partialBlock;
  }

  if (partial === undefined) {
    throw new _exception2['default']('The partial ' + options.name + ' could not be found');
  } else if (partial instanceof Function) {
    return partial(context, options);
  }
}

function noop() {
  return '';
}

function initData(context, data) {
  if (!data || !('root' in data)) {
    data = data ? _base.createFrame(data) : {};
    data.root = context;
  }
  return data;
}

function executeDecorators(fn, prog, container, depths, data, blockParams) {
  if (fn.decorator) {
    var props = {};
    prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
    Utils.extend(prog, props);
  }
  return prog;
}


},{"./base":2,"./exception":5,"./utils":18}],17:[function(require,module,exports){
// Build out our basic SafeString type
'use strict';

exports.__esModule = true;
function SafeString(string) {
  this.string = string;
}

SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
  return '' + this.string;
};

exports['default'] = SafeString;
module.exports = exports['default'];


},{}],18:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.extend = extend;
exports.indexOf = indexOf;
exports.escapeExpression = escapeExpression;
exports.isEmpty = isEmpty;
exports.createFrame = createFrame;
exports.blockParams = blockParams;
exports.appendContextPath = appendContextPath;
var escape = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

var badChars = /[&<>"'`=]/g,
    possible = /[&<>"'`=]/;

function escapeChar(chr) {
  return escape[chr];
}

function extend(obj /* , ...source */) {
  for (var i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
        obj[key] = arguments[i][key];
      }
    }
  }

  return obj;
}

var toString = Object.prototype.toString;

exports.toString = toString;
// Sourced from lodash
// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
/* eslint-disable func-style */
var isFunction = function isFunction(value) {
  return typeof value === 'function';
};
// fallback for older versions of Chrome and Safari
/* istanbul ignore next */
if (isFunction(/x/)) {
  exports.isFunction = isFunction = function (value) {
    return typeof value === 'function' && toString.call(value) === '[object Function]';
  };
}
exports.isFunction = isFunction;

/* eslint-enable func-style */

/* istanbul ignore next */
var isArray = Array.isArray || function (value) {
  return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
};

exports.isArray = isArray;
// Older IE versions do not directly support indexOf so we must implement our own, sadly.

function indexOf(array, value) {
  for (var i = 0, len = array.length; i < len; i++) {
    if (array[i] === value) {
      return i;
    }
  }
  return -1;
}

function escapeExpression(string) {
  if (typeof string !== 'string') {
    // don't escape SafeStrings, since they're already safe
    if (string && string.toHTML) {
      return string.toHTML();
    } else if (string == null) {
      return '';
    } else if (!string) {
      return string + '';
    }

    // Force a string conversion as this will be done by the append regardless and
    // the regex test will do this transparently behind the scenes, causing issues if
    // an object's to string has escaped characters in it.
    string = '' + string;
  }

  if (!possible.test(string)) {
    return string;
  }
  return string.replace(badChars, escapeChar);
}

function isEmpty(value) {
  if (!value && value !== 0) {
    return true;
  } else if (isArray(value) && value.length === 0) {
    return true;
  } else {
    return false;
  }
}

function createFrame(object) {
  var frame = extend({}, object);
  frame._parent = object;
  return frame;
}

function blockParams(params, ids) {
  params.path = ids;
  return params;
}

function appendContextPath(contextPath, id) {
  return (contextPath ? contextPath + '.' : '') + id;
}


},{}],19:[function(require,module,exports){
// Create a simple path alias to allow browserify to resolve
// the runtime on a supported path.
module.exports = require('./dist/cjs/handlebars.runtime')['default'];

},{"./dist/cjs/handlebars.runtime":1}],20:[function(require,module,exports){
'use strict';

var _hello = require('../templates/hello.handlebars');

var _hello2 = _interopRequireDefault(_hello);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Example 2: Compile the template
var hellohtml = (0, _hello2.default)({ name: 'Peter' });

// Example 2: Render the template
// Example 1: Import jQuery
//import "jquery"

// Example 2: Import Handlebars template
document.getElementById('container').innerHTML = hellohtml;

// Example 3: Log to console
console.log('Hello World');

},{"../templates/hello.handlebars":21}],21:[function(require,module,exports){
var templater = require("handlebars/runtime")["default"].template;module.exports = templater({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "Hallo "
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"name","hash":{},"data":data}) : helper)))
    + "!\n";
},"useData":true});
},{"handlebars/runtime":19}]},{},[20])

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvaGFuZGxlYmFycy9saWIvaGFuZGxlYmFycy5ydW50aW1lLmpzIiwibm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvbGliL2hhbmRsZWJhcnMvYmFzZS5qcyIsIm5vZGVfbW9kdWxlcy9oYW5kbGViYXJzL2xpYi9oYW5kbGViYXJzL2RlY29yYXRvcnMuanMiLCJub2RlX21vZHVsZXMvaGFuZGxlYmFycy9saWIvaGFuZGxlYmFycy9kZWNvcmF0b3JzL2lubGluZS5qcyIsIm5vZGVfbW9kdWxlcy9oYW5kbGViYXJzL2xpYi9oYW5kbGViYXJzL2V4Y2VwdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9oYW5kbGViYXJzL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMuanMiLCJub2RlX21vZHVsZXMvaGFuZGxlYmFycy9saWIvaGFuZGxlYmFycy9oZWxwZXJzL2Jsb2NrLWhlbHBlci1taXNzaW5nLmpzIiwibm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvbGliL2hhbmRsZWJhcnMvaGVscGVycy9lYWNoLmpzIiwibm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvbGliL2hhbmRsZWJhcnMvaGVscGVycy9oZWxwZXItbWlzc2luZy5qcyIsIm5vZGVfbW9kdWxlcy9oYW5kbGViYXJzL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvaWYuanMiLCJub2RlX21vZHVsZXMvaGFuZGxlYmFycy9saWIvaGFuZGxlYmFycy9oZWxwZXJzL2xvZy5qcyIsIm5vZGVfbW9kdWxlcy9oYW5kbGViYXJzL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvbG9va3VwLmpzIiwibm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvbGliL2hhbmRsZWJhcnMvaGVscGVycy93aXRoLmpzIiwibm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvbGliL2hhbmRsZWJhcnMvbG9nZ2VyLmpzIiwibm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvZGlzdC9janMvaGFuZGxlYmFycy9ub2RlX21vZHVsZXMvaGFuZGxlYmFycy9saWIvaGFuZGxlYmFycy9uby1jb25mbGljdC5qcyIsIm5vZGVfbW9kdWxlcy9oYW5kbGViYXJzL2xpYi9oYW5kbGViYXJzL3J1bnRpbWUuanMiLCJub2RlX21vZHVsZXMvaGFuZGxlYmFycy9saWIvaGFuZGxlYmFycy9zYWZlLXN0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9oYW5kbGViYXJzL2xpYi9oYW5kbGViYXJzL3V0aWxzLmpzIiwibm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvcnVudGltZS5qcyIsInNyYy9qcy9hcHAuanMiLCJzcmMvdGVtcGxhdGVzL2hlbGxvLmhhbmRsZWJhcnMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs4QkNBc0IsbUJBQW1COztJQUE3QixJQUFJOzs7OztvQ0FJTywwQkFBMEI7Ozs7bUNBQzNCLHdCQUF3Qjs7OzsrQkFDdkIsb0JBQW9COztJQUEvQixLQUFLOztpQ0FDUSxzQkFBc0I7O0lBQW5DLE9BQU87O29DQUVJLDBCQUEwQjs7Ozs7QUFHakQsU0FBUyxNQUFNLEdBQUc7QUFDaEIsTUFBSSxFQUFFLEdBQUcsSUFBSSxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQzs7QUFFMUMsT0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDdkIsSUFBRSxDQUFDLFVBQVUsb0NBQWEsQ0FBQztBQUMzQixJQUFFLENBQUMsU0FBUyxtQ0FBWSxDQUFDO0FBQ3pCLElBQUUsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ2pCLElBQUUsQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7O0FBRTdDLElBQUUsQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDO0FBQ2hCLElBQUUsQ0FBQyxRQUFRLEdBQUcsVUFBUyxJQUFJLEVBQUU7QUFDM0IsV0FBTyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztHQUNuQyxDQUFD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QUcsRUFBRTtBQUN2QyxRQUFNLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztBQUNsQixTQUFPLE1BQU0sQ0FBQztDQUNmOztBQUVNLFNBQVMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLEVBQUUsRUFBRTtBQUNqRCxTQUFPLENBQUMsV0FBVyxHQUFHLFdBQVcsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFBLEdBQUksRUFBRSxDQUFDO0NBQ3BEOzs7O0FDM0dEO0FBQ0E7QUFDQTtBQUNBOzs7O0FDQ0E7Ozs7OztBQUVBO0FBQ0EsSUFBSSxZQUFZLHFCQUFjLEVBQUUsTUFBTSxPQUFSLEVBQWQsQ0FBaEI7O0FBRUE7QUFUQTtBQUNBOztBQUVBO0FBT0EsU0FBUyxjQUFULENBQXdCLFdBQXhCLEVBQXFDLFNBQXJDLEdBQWlELFNBQWpEOztBQUVBO0FBQ0EsUUFBUSxHQUFSLENBQVksYUFBWjs7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgKiBhcyBiYXNlIGZyb20gJy4vaGFuZGxlYmFycy9iYXNlJztcblxuLy8gRWFjaCBvZiB0aGVzZSBhdWdtZW50IHRoZSBIYW5kbGViYXJzIG9iamVjdC4gTm8gbmVlZCB0byBzZXR1cCBoZXJlLlxuLy8gKFRoaXMgaXMgZG9uZSB0byBlYXNpbHkgc2hhcmUgY29kZSBiZXR3ZWVuIGNvbW1vbmpzIGFuZCBicm93c2UgZW52cylcbmltcG9ydCBTYWZlU3RyaW5nIGZyb20gJy4vaGFuZGxlYmFycy9zYWZlLXN0cmluZyc7XG5pbXBvcnQgRXhjZXB0aW9uIGZyb20gJy4vaGFuZGxlYmFycy9leGNlcHRpb24nO1xuaW1wb3J0ICogYXMgVXRpbHMgZnJvbSAnLi9oYW5kbGViYXJzL3V0aWxzJztcbmltcG9ydCAqIGFzIHJ1bnRpbWUgZnJvbSAnLi9oYW5kbGViYXJzL3J1bnRpbWUnO1xuXG5pbXBvcnQgbm9Db25mbGljdCBmcm9tICcuL2hhbmRsZWJhcnMvbm8tY29uZmxpY3QnO1xuXG4vLyBGb3IgY29tcGF0aWJpbGl0eSBhbmQgdXNhZ2Ugb3V0c2lkZSBvZiBtb2R1bGUgc3lzdGVtcywgbWFrZSB0aGUgSGFuZGxlYmFycyBvYmplY3QgYSBuYW1lc3BhY2VcbmZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgbGV0IGhiID0gbmV3IGJhc2UuSGFuZGxlYmFyc0Vudmlyb25tZW50KCk7XG5cbiAgVXRpbHMuZXh0ZW5kKGhiLCBiYXNlKTtcbiAgaGIuU2FmZVN0cmluZyA9IFNhZmVTdHJpbmc7XG4gIGhiLkV4Y2VwdGlvbiA9IEV4Y2VwdGlvbjtcbiAgaGIuVXRpbHMgPSBVdGlscztcbiAgaGIuZXNjYXBlRXhwcmVzc2lvbiA9IFV0aWxzLmVzY2FwZUV4cHJlc3Npb247XG5cbiAgaGIuVk0gPSBydW50aW1lO1xuICBoYi50ZW1wbGF0ZSA9IGZ1bmN0aW9uKHNwZWMpIHtcbiAgICByZXR1cm4gcnVudGltZS50ZW1wbGF0ZShzcGVjLCBoYik7XG4gIH07XG5cbiAgcmV0dXJuIGhiO1xufVxuXG5sZXQgaW5zdCA9IGNyZWF0ZSgpO1xuaW5zdC5jcmVhdGUgPSBjcmVhdGU7XG5cbm5vQ29uZmxpY3QoaW5zdCk7XG5cbmluc3RbJ2RlZmF1bHQnXSA9IGluc3Q7XG5cbmV4cG9ydCBkZWZhdWx0IGluc3Q7XG4iLCJpbXBvcnQge2NyZWF0ZUZyYW1lLCBleHRlbmQsIHRvU3RyaW5nfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCBFeGNlcHRpb24gZnJvbSAnLi9leGNlcHRpb24nO1xuaW1wb3J0IHtyZWdpc3RlckRlZmF1bHRIZWxwZXJzfSBmcm9tICcuL2hlbHBlcnMnO1xuaW1wb3J0IHtyZWdpc3RlckRlZmF1bHREZWNvcmF0b3JzfSBmcm9tICcuL2RlY29yYXRvcnMnO1xuaW1wb3J0IGxvZ2dlciBmcm9tICcuL2xvZ2dlcic7XG5cbmV4cG9ydCBjb25zdCBWRVJTSU9OID0gJzQuMC4xMCc7XG5leHBvcnQgY29uc3QgQ09NUElMRVJfUkVWSVNJT04gPSA3O1xuXG5leHBvcnQgY29uc3QgUkVWSVNJT05fQ0hBTkdFUyA9IHtcbiAgMTogJzw9IDEuMC5yYy4yJywgLy8gMS4wLnJjLjIgaXMgYWN0dWFsbHkgcmV2MiBidXQgZG9lc24ndCByZXBvcnQgaXRcbiAgMjogJz09IDEuMC4wLXJjLjMnLFxuICAzOiAnPT0gMS4wLjAtcmMuNCcsXG4gIDQ6ICc9PSAxLngueCcsXG4gIDU6ICc9PSAyLjAuMC1hbHBoYS54JyxcbiAgNjogJz49IDIuMC4wLWJldGEuMScsXG4gIDc6ICc+PSA0LjAuMCdcbn07XG5cbmNvbnN0IG9iamVjdFR5cGUgPSAnW29iamVjdCBPYmplY3RdJztcblxuZXhwb3J0IGZ1bmN0aW9uIEhhbmRsZWJhcnNFbnZpcm9ubWVudChoZWxwZXJzLCBwYXJ0aWFscywgZGVjb3JhdG9ycykge1xuICB0aGlzLmhlbHBlcnMgPSBoZWxwZXJzIHx8IHt9O1xuICB0aGlzLnBhcnRpYWxzID0gcGFydGlhbHMgfHwge307XG4gIHRoaXMuZGVjb3JhdG9ycyA9IGRlY29yYXRvcnMgfHwge307XG5cbiAgcmVnaXN0ZXJEZWZhdWx0SGVscGVycyh0aGlzKTtcbiAgcmVnaXN0ZXJEZWZhdWx0RGVjb3JhdG9ycyh0aGlzKTtcbn1cblxuSGFuZGxlYmFyc0Vudmlyb25tZW50LnByb3RvdHlwZSA9IHtcbiAgY29uc3RydWN0b3I6IEhhbmRsZWJhcnNFbnZpcm9ubWVudCxcblxuICBsb2dnZXI6IGxvZ2dlcixcbiAgbG9nOiBsb2dnZXIubG9nLFxuXG4gIHJlZ2lzdGVySGVscGVyOiBmdW5jdGlvbihuYW1lLCBmbikge1xuICAgIGlmICh0b1N0cmluZy5jYWxsKG5hbWUpID09PSBvYmplY3RUeXBlKSB7XG4gICAgICBpZiAoZm4pIHsgdGhyb3cgbmV3IEV4Y2VwdGlvbignQXJnIG5vdCBzdXBwb3J0ZWQgd2l0aCBtdWx0aXBsZSBoZWxwZXJzJyk7IH1cbiAgICAgIGV4dGVuZCh0aGlzLmhlbHBlcnMsIG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhlbHBlcnNbbmFtZV0gPSBmbjtcbiAgICB9XG4gIH0sXG4gIHVucmVnaXN0ZXJIZWxwZXI6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBkZWxldGUgdGhpcy5oZWxwZXJzW25hbWVdO1xuICB9LFxuXG4gIHJlZ2lzdGVyUGFydGlhbDogZnVuY3Rpb24obmFtZSwgcGFydGlhbCkge1xuICAgIGlmICh0b1N0cmluZy5jYWxsKG5hbWUpID09PSBvYmplY3RUeXBlKSB7XG4gICAgICBleHRlbmQodGhpcy5wYXJ0aWFscywgbmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0eXBlb2YgcGFydGlhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihgQXR0ZW1wdGluZyB0byByZWdpc3RlciBhIHBhcnRpYWwgY2FsbGVkIFwiJHtuYW1lfVwiIGFzIHVuZGVmaW5lZGApO1xuICAgICAgfVxuICAgICAgdGhpcy5wYXJ0aWFsc1tuYW1lXSA9IHBhcnRpYWw7XG4gICAgfVxuICB9LFxuICB1bnJlZ2lzdGVyUGFydGlhbDogZnVuY3Rpb24obmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLnBhcnRpYWxzW25hbWVdO1xuICB9LFxuXG4gIHJlZ2lzdGVyRGVjb3JhdG9yOiBmdW5jdGlvbihuYW1lLCBmbikge1xuICAgIGlmICh0b1N0cmluZy5jYWxsKG5hbWUpID09PSBvYmplY3RUeXBlKSB7XG4gICAgICBpZiAoZm4pIHsgdGhyb3cgbmV3IEV4Y2VwdGlvbignQXJnIG5vdCBzdXBwb3J0ZWQgd2l0aCBtdWx0aXBsZSBkZWNvcmF0b3JzJyk7IH1cbiAgICAgIGV4dGVuZCh0aGlzLmRlY29yYXRvcnMsIG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRlY29yYXRvcnNbbmFtZV0gPSBmbjtcbiAgICB9XG4gIH0sXG4gIHVucmVnaXN0ZXJEZWNvcmF0b3I6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBkZWxldGUgdGhpcy5kZWNvcmF0b3JzW25hbWVdO1xuICB9XG59O1xuXG5leHBvcnQgbGV0IGxvZyA9IGxvZ2dlci5sb2c7XG5cbmV4cG9ydCB7Y3JlYXRlRnJhbWUsIGxvZ2dlcn07XG4iLCJpbXBvcnQgcmVnaXN0ZXJJbmxpbmUgZnJvbSAnLi9kZWNvcmF0b3JzL2lubGluZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckRlZmF1bHREZWNvcmF0b3JzKGluc3RhbmNlKSB7XG4gIHJlZ2lzdGVySW5saW5lKGluc3RhbmNlKTtcbn1cblxuIiwiaW1wb3J0IHtleHRlbmR9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJEZWNvcmF0b3IoJ2lubGluZScsIGZ1bmN0aW9uKGZuLCBwcm9wcywgY29udGFpbmVyLCBvcHRpb25zKSB7XG4gICAgbGV0IHJldCA9IGZuO1xuICAgIGlmICghcHJvcHMucGFydGlhbHMpIHtcbiAgICAgIHByb3BzLnBhcnRpYWxzID0ge307XG4gICAgICByZXQgPSBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgICAgIC8vIENyZWF0ZSBhIG5ldyBwYXJ0aWFscyBzdGFjayBmcmFtZSBwcmlvciB0byBleGVjLlxuICAgICAgICBsZXQgb3JpZ2luYWwgPSBjb250YWluZXIucGFydGlhbHM7XG4gICAgICAgIGNvbnRhaW5lci5wYXJ0aWFscyA9IGV4dGVuZCh7fSwgb3JpZ2luYWwsIHByb3BzLnBhcnRpYWxzKTtcbiAgICAgICAgbGV0IHJldCA9IGZuKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgICAgICBjb250YWluZXIucGFydGlhbHMgPSBvcmlnaW5hbDtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcHJvcHMucGFydGlhbHNbb3B0aW9ucy5hcmdzWzBdXSA9IG9wdGlvbnMuZm47XG5cbiAgICByZXR1cm4gcmV0O1xuICB9KTtcbn1cbiIsIlxuY29uc3QgZXJyb3JQcm9wcyA9IFsnZGVzY3JpcHRpb24nLCAnZmlsZU5hbWUnLCAnbGluZU51bWJlcicsICdtZXNzYWdlJywgJ25hbWUnLCAnbnVtYmVyJywgJ3N0YWNrJ107XG5cbmZ1bmN0aW9uIEV4Y2VwdGlvbihtZXNzYWdlLCBub2RlKSB7XG4gIGxldCBsb2MgPSBub2RlICYmIG5vZGUubG9jLFxuICAgICAgbGluZSxcbiAgICAgIGNvbHVtbjtcbiAgaWYgKGxvYykge1xuICAgIGxpbmUgPSBsb2Muc3RhcnQubGluZTtcbiAgICBjb2x1bW4gPSBsb2Muc3RhcnQuY29sdW1uO1xuXG4gICAgbWVzc2FnZSArPSAnIC0gJyArIGxpbmUgKyAnOicgKyBjb2x1bW47XG4gIH1cblxuICBsZXQgdG1wID0gRXJyb3IucHJvdG90eXBlLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgbWVzc2FnZSk7XG5cbiAgLy8gVW5mb3J0dW5hdGVseSBlcnJvcnMgYXJlIG5vdCBlbnVtZXJhYmxlIGluIENocm9tZSAoYXQgbGVhc3QpLCBzbyBgZm9yIHByb3AgaW4gdG1wYCBkb2Vzbid0IHdvcmsuXG4gIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IGVycm9yUHJvcHMubGVuZ3RoOyBpZHgrKykge1xuICAgIHRoaXNbZXJyb3JQcm9wc1tpZHhdXSA9IHRtcFtlcnJvclByb3BzW2lkeF1dO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XG4gICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgRXhjZXB0aW9uKTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgaWYgKGxvYykge1xuICAgICAgdGhpcy5saW5lTnVtYmVyID0gbGluZTtcblxuICAgICAgLy8gV29yayBhcm91bmQgaXNzdWUgdW5kZXIgc2FmYXJpIHdoZXJlIHdlIGNhbid0IGRpcmVjdGx5IHNldCB0aGUgY29sdW1uIHZhbHVlXG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2NvbHVtbicsIHtcbiAgICAgICAgICB2YWx1ZTogY29sdW1uLFxuICAgICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbHVtbiA9IGNvbHVtbjtcbiAgICAgIH1cbiAgICB9XG4gIH0gY2F0Y2ggKG5vcCkge1xuICAgIC8qIElnbm9yZSBpZiB0aGUgYnJvd3NlciBpcyB2ZXJ5IHBhcnRpY3VsYXIgKi9cbiAgfVxufVxuXG5FeGNlcHRpb24ucHJvdG90eXBlID0gbmV3IEVycm9yKCk7XG5cbmV4cG9ydCBkZWZhdWx0IEV4Y2VwdGlvbjtcbiIsImltcG9ydCByZWdpc3RlckJsb2NrSGVscGVyTWlzc2luZyBmcm9tICcuL2hlbHBlcnMvYmxvY2staGVscGVyLW1pc3NpbmcnO1xuaW1wb3J0IHJlZ2lzdGVyRWFjaCBmcm9tICcuL2hlbHBlcnMvZWFjaCc7XG5pbXBvcnQgcmVnaXN0ZXJIZWxwZXJNaXNzaW5nIGZyb20gJy4vaGVscGVycy9oZWxwZXItbWlzc2luZyc7XG5pbXBvcnQgcmVnaXN0ZXJJZiBmcm9tICcuL2hlbHBlcnMvaWYnO1xuaW1wb3J0IHJlZ2lzdGVyTG9nIGZyb20gJy4vaGVscGVycy9sb2cnO1xuaW1wb3J0IHJlZ2lzdGVyTG9va3VwIGZyb20gJy4vaGVscGVycy9sb29rdXAnO1xuaW1wb3J0IHJlZ2lzdGVyV2l0aCBmcm9tICcuL2hlbHBlcnMvd2l0aCc7XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckRlZmF1bHRIZWxwZXJzKGluc3RhbmNlKSB7XG4gIHJlZ2lzdGVyQmxvY2tIZWxwZXJNaXNzaW5nKGluc3RhbmNlKTtcbiAgcmVnaXN0ZXJFYWNoKGluc3RhbmNlKTtcbiAgcmVnaXN0ZXJIZWxwZXJNaXNzaW5nKGluc3RhbmNlKTtcbiAgcmVnaXN0ZXJJZihpbnN0YW5jZSk7XG4gIHJlZ2lzdGVyTG9nKGluc3RhbmNlKTtcbiAgcmVnaXN0ZXJMb29rdXAoaW5zdGFuY2UpO1xuICByZWdpc3RlcldpdGgoaW5zdGFuY2UpO1xufVxuIiwiaW1wb3J0IHthcHBlbmRDb250ZXh0UGF0aCwgY3JlYXRlRnJhbWUsIGlzQXJyYXl9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2Jsb2NrSGVscGVyTWlzc2luZycsIGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICBsZXQgaW52ZXJzZSA9IG9wdGlvbnMuaW52ZXJzZSxcbiAgICAgICAgZm4gPSBvcHRpb25zLmZuO1xuXG4gICAgaWYgKGNvbnRleHQgPT09IHRydWUpIHtcbiAgICAgIHJldHVybiBmbih0aGlzKTtcbiAgICB9IGVsc2UgaWYgKGNvbnRleHQgPT09IGZhbHNlIHx8IGNvbnRleHQgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGludmVyc2UodGhpcyk7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KGNvbnRleHQpKSB7XG4gICAgICBpZiAoY29udGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgIGlmIChvcHRpb25zLmlkcykge1xuICAgICAgICAgIG9wdGlvbnMuaWRzID0gW29wdGlvbnMubmFtZV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5zdGFuY2UuaGVscGVycy5lYWNoKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGludmVyc2UodGhpcyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChvcHRpb25zLmRhdGEgJiYgb3B0aW9ucy5pZHMpIHtcbiAgICAgICAgbGV0IGRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgICAgICBkYXRhLmNvbnRleHRQYXRoID0gYXBwZW5kQ29udGV4dFBhdGgob3B0aW9ucy5kYXRhLmNvbnRleHRQYXRoLCBvcHRpb25zLm5hbWUpO1xuICAgICAgICBvcHRpb25zID0ge2RhdGE6IGRhdGF9O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZm4oY29udGV4dCwgb3B0aW9ucyk7XG4gICAgfVxuICB9KTtcbn1cbiIsImltcG9ydCB7YXBwZW5kQ29udGV4dFBhdGgsIGJsb2NrUGFyYW1zLCBjcmVhdGVGcmFtZSwgaXNBcnJheSwgaXNGdW5jdGlvbn0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IEV4Y2VwdGlvbiBmcm9tICcuLi9leGNlcHRpb24nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignZWFjaCcsIGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ011c3QgcGFzcyBpdGVyYXRvciB0byAjZWFjaCcpO1xuICAgIH1cblxuICAgIGxldCBmbiA9IG9wdGlvbnMuZm4sXG4gICAgICAgIGludmVyc2UgPSBvcHRpb25zLmludmVyc2UsXG4gICAgICAgIGkgPSAwLFxuICAgICAgICByZXQgPSAnJyxcbiAgICAgICAgZGF0YSxcbiAgICAgICAgY29udGV4dFBhdGg7XG5cbiAgICBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuaWRzKSB7XG4gICAgICBjb250ZXh0UGF0aCA9IGFwcGVuZENvbnRleHRQYXRoKG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aCwgb3B0aW9ucy5pZHNbMF0pICsgJy4nO1xuICAgIH1cblxuICAgIGlmIChpc0Z1bmN0aW9uKGNvbnRleHQpKSB7IGNvbnRleHQgPSBjb250ZXh0LmNhbGwodGhpcyk7IH1cblxuICAgIGlmIChvcHRpb25zLmRhdGEpIHtcbiAgICAgIGRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4ZWNJdGVyYXRpb24oZmllbGQsIGluZGV4LCBsYXN0KSB7XG4gICAgICBpZiAoZGF0YSkge1xuICAgICAgICBkYXRhLmtleSA9IGZpZWxkO1xuICAgICAgICBkYXRhLmluZGV4ID0gaW5kZXg7XG4gICAgICAgIGRhdGEuZmlyc3QgPSBpbmRleCA9PT0gMDtcbiAgICAgICAgZGF0YS5sYXN0ID0gISFsYXN0O1xuXG4gICAgICAgIGlmIChjb250ZXh0UGF0aCkge1xuICAgICAgICAgIGRhdGEuY29udGV4dFBhdGggPSBjb250ZXh0UGF0aCArIGZpZWxkO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldCA9IHJldCArIGZuKGNvbnRleHRbZmllbGRdLCB7XG4gICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgIGJsb2NrUGFyYW1zOiBibG9ja1BhcmFtcyhbY29udGV4dFtmaWVsZF0sIGZpZWxkXSwgW2NvbnRleHRQYXRoICsgZmllbGQsIG51bGxdKVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGNvbnRleHQgJiYgdHlwZW9mIGNvbnRleHQgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAoaXNBcnJheShjb250ZXh0KSkge1xuICAgICAgICBmb3IgKGxldCBqID0gY29udGV4dC5sZW5ndGg7IGkgPCBqOyBpKyspIHtcbiAgICAgICAgICBpZiAoaSBpbiBjb250ZXh0KSB7XG4gICAgICAgICAgICBleGVjSXRlcmF0aW9uKGksIGksIGkgPT09IGNvbnRleHQubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgcHJpb3JLZXk7XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIGNvbnRleHQpIHtcbiAgICAgICAgICBpZiAoY29udGV4dC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAvLyBXZSdyZSBydW5uaW5nIHRoZSBpdGVyYXRpb25zIG9uZSBzdGVwIG91dCBvZiBzeW5jIHNvIHdlIGNhbiBkZXRlY3RcbiAgICAgICAgICAgIC8vIHRoZSBsYXN0IGl0ZXJhdGlvbiB3aXRob3V0IGhhdmUgdG8gc2NhbiB0aGUgb2JqZWN0IHR3aWNlIGFuZCBjcmVhdGVcbiAgICAgICAgICAgIC8vIGFuIGl0ZXJtZWRpYXRlIGtleXMgYXJyYXkuXG4gICAgICAgICAgICBpZiAocHJpb3JLZXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBleGVjSXRlcmF0aW9uKHByaW9yS2V5LCBpIC0gMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmlvcktleSA9IGtleTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByaW9yS2V5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBleGVjSXRlcmF0aW9uKHByaW9yS2V5LCBpIC0gMSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgcmV0ID0gaW52ZXJzZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmV0O1xuICB9KTtcbn1cbiIsImltcG9ydCBFeGNlcHRpb24gZnJvbSAnLi4vZXhjZXB0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2hlbHBlck1pc3NpbmcnLCBmdW5jdGlvbigvKiBbYXJncywgXW9wdGlvbnMgKi8pIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgLy8gQSBtaXNzaW5nIGZpZWxkIGluIGEge3tmb299fSBjb25zdHJ1Y3QuXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTb21lb25lIGlzIGFjdHVhbGx5IHRyeWluZyB0byBjYWxsIHNvbWV0aGluZywgYmxvdyB1cC5cbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ01pc3NpbmcgaGVscGVyOiBcIicgKyBhcmd1bWVudHNbYXJndW1lbnRzLmxlbmd0aCAtIDFdLm5hbWUgKyAnXCInKTtcbiAgICB9XG4gIH0pO1xufVxuIiwiaW1wb3J0IHtpc0VtcHR5LCBpc0Z1bmN0aW9ufSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdpZicsIGZ1bmN0aW9uKGNvbmRpdGlvbmFsLCBvcHRpb25zKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24oY29uZGl0aW9uYWwpKSB7IGNvbmRpdGlvbmFsID0gY29uZGl0aW9uYWwuY2FsbCh0aGlzKTsgfVxuXG4gICAgLy8gRGVmYXVsdCBiZWhhdmlvciBpcyB0byByZW5kZXIgdGhlIHBvc2l0aXZlIHBhdGggaWYgdGhlIHZhbHVlIGlzIHRydXRoeSBhbmQgbm90IGVtcHR5LlxuICAgIC8vIFRoZSBgaW5jbHVkZVplcm9gIG9wdGlvbiBtYXkgYmUgc2V0IHRvIHRyZWF0IHRoZSBjb25kdGlvbmFsIGFzIHB1cmVseSBub3QgZW1wdHkgYmFzZWQgb24gdGhlXG4gICAgLy8gYmVoYXZpb3Igb2YgaXNFbXB0eS4gRWZmZWN0aXZlbHkgdGhpcyBkZXRlcm1pbmVzIGlmIDAgaXMgaGFuZGxlZCBieSB0aGUgcG9zaXRpdmUgcGF0aCBvciBuZWdhdGl2ZS5cbiAgICBpZiAoKCFvcHRpb25zLmhhc2guaW5jbHVkZVplcm8gJiYgIWNvbmRpdGlvbmFsKSB8fCBpc0VtcHR5KGNvbmRpdGlvbmFsKSkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuaW52ZXJzZSh0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuZm4odGhpcyk7XG4gICAgfVxuICB9KTtcblxuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcigndW5sZXNzJywgZnVuY3Rpb24oY29uZGl0aW9uYWwsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gaW5zdGFuY2UuaGVscGVyc1snaWYnXS5jYWxsKHRoaXMsIGNvbmRpdGlvbmFsLCB7Zm46IG9wdGlvbnMuaW52ZXJzZSwgaW52ZXJzZTogb3B0aW9ucy5mbiwgaGFzaDogb3B0aW9ucy5oYXNofSk7XG4gIH0pO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2xvZycsIGZ1bmN0aW9uKC8qIG1lc3NhZ2UsIG9wdGlvbnMgKi8pIHtcbiAgICBsZXQgYXJncyA9IFt1bmRlZmluZWRdLFxuICAgICAgICBvcHRpb25zID0gYXJndW1lbnRzW2FyZ3VtZW50cy5sZW5ndGggLSAxXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICAgIH1cblxuICAgIGxldCBsZXZlbCA9IDE7XG4gICAgaWYgKG9wdGlvbnMuaGFzaC5sZXZlbCAhPSBudWxsKSB7XG4gICAgICBsZXZlbCA9IG9wdGlvbnMuaGFzaC5sZXZlbDtcbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMuZGF0YSAmJiBvcHRpb25zLmRhdGEubGV2ZWwgIT0gbnVsbCkge1xuICAgICAgbGV2ZWwgPSBvcHRpb25zLmRhdGEubGV2ZWw7XG4gICAgfVxuICAgIGFyZ3NbMF0gPSBsZXZlbDtcblxuICAgIGluc3RhbmNlLmxvZyguLi4gYXJncyk7XG4gIH0pO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2xvb2t1cCcsIGZ1bmN0aW9uKG9iaiwgZmllbGQpIHtcbiAgICByZXR1cm4gb2JqICYmIG9ialtmaWVsZF07XG4gIH0pO1xufVxuIiwiaW1wb3J0IHthcHBlbmRDb250ZXh0UGF0aCwgYmxvY2tQYXJhbXMsIGNyZWF0ZUZyYW1lLCBpc0VtcHR5LCBpc0Z1bmN0aW9ufSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCd3aXRoJywgZnVuY3Rpb24oY29udGV4dCwgb3B0aW9ucykge1xuICAgIGlmIChpc0Z1bmN0aW9uKGNvbnRleHQpKSB7IGNvbnRleHQgPSBjb250ZXh0LmNhbGwodGhpcyk7IH1cblxuICAgIGxldCBmbiA9IG9wdGlvbnMuZm47XG5cbiAgICBpZiAoIWlzRW1wdHkoY29udGV4dCkpIHtcbiAgICAgIGxldCBkYXRhID0gb3B0aW9ucy5kYXRhO1xuICAgICAgaWYgKG9wdGlvbnMuZGF0YSAmJiBvcHRpb25zLmlkcykge1xuICAgICAgICBkYXRhID0gY3JlYXRlRnJhbWUob3B0aW9ucy5kYXRhKTtcbiAgICAgICAgZGF0YS5jb250ZXh0UGF0aCA9IGFwcGVuZENvbnRleHRQYXRoKG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aCwgb3B0aW9ucy5pZHNbMF0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZm4oY29udGV4dCwge1xuICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICBibG9ja1BhcmFtczogYmxvY2tQYXJhbXMoW2NvbnRleHRdLCBbZGF0YSAmJiBkYXRhLmNvbnRleHRQYXRoXSlcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5pbnZlcnNlKHRoaXMpO1xuICAgIH1cbiAgfSk7XG59XG4iLCJpbXBvcnQge2luZGV4T2Z9IGZyb20gJy4vdXRpbHMnO1xuXG5sZXQgbG9nZ2VyID0ge1xuICBtZXRob2RNYXA6IFsnZGVidWcnLCAnaW5mbycsICd3YXJuJywgJ2Vycm9yJ10sXG4gIGxldmVsOiAnaW5mbycsXG5cbiAgLy8gTWFwcyBhIGdpdmVuIGxldmVsIHZhbHVlIHRvIHRoZSBgbWV0aG9kTWFwYCBpbmRleGVzIGFib3ZlLlxuICBsb29rdXBMZXZlbDogZnVuY3Rpb24obGV2ZWwpIHtcbiAgICBpZiAodHlwZW9mIGxldmVsID09PSAnc3RyaW5nJykge1xuICAgICAgbGV0IGxldmVsTWFwID0gaW5kZXhPZihsb2dnZXIubWV0aG9kTWFwLCBsZXZlbC50b0xvd2VyQ2FzZSgpKTtcbiAgICAgIGlmIChsZXZlbE1hcCA+PSAwKSB7XG4gICAgICAgIGxldmVsID0gbGV2ZWxNYXA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXZlbCA9IHBhcnNlSW50KGxldmVsLCAxMCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGxldmVsO1xuICB9LFxuXG4gIC8vIENhbiBiZSBvdmVycmlkZGVuIGluIHRoZSBob3N0IGVudmlyb25tZW50XG4gIGxvZzogZnVuY3Rpb24obGV2ZWwsIC4uLm1lc3NhZ2UpIHtcbiAgICBsZXZlbCA9IGxvZ2dlci5sb29rdXBMZXZlbChsZXZlbCk7XG5cbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmIGxvZ2dlci5sb29rdXBMZXZlbChsb2dnZXIubGV2ZWwpIDw9IGxldmVsKSB7XG4gICAgICBsZXQgbWV0aG9kID0gbG9nZ2VyLm1ldGhvZE1hcFtsZXZlbF07XG4gICAgICBpZiAoIWNvbnNvbGVbbWV0aG9kXSkgeyAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgICAgICBtZXRob2QgPSAnbG9nJztcbiAgICAgIH1cbiAgICAgIGNvbnNvbGVbbWV0aG9kXSguLi5tZXNzYWdlKTsgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBsb2dnZXI7XG4iLCIvKiBnbG9iYWwgd2luZG93ICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihIYW5kbGViYXJzKSB7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGxldCByb290ID0gdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOiB3aW5kb3csXG4gICAgICAkSGFuZGxlYmFycyA9IHJvb3QuSGFuZGxlYmFycztcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgSGFuZGxlYmFycy5ub0NvbmZsaWN0ID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHJvb3QuSGFuZGxlYmFycyA9PT0gSGFuZGxlYmFycykge1xuICAgICAgcm9vdC5IYW5kbGViYXJzID0gJEhhbmRsZWJhcnM7XG4gICAgfVxuICAgIHJldHVybiBIYW5kbGViYXJzO1xuICB9O1xufVxuIiwiaW1wb3J0ICogYXMgVXRpbHMgZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgRXhjZXB0aW9uIGZyb20gJy4vZXhjZXB0aW9uJztcbmltcG9ydCB7IENPTVBJTEVSX1JFVklTSU9OLCBSRVZJU0lPTl9DSEFOR0VTLCBjcmVhdGVGcmFtZSB9IGZyb20gJy4vYmFzZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja1JldmlzaW9uKGNvbXBpbGVySW5mbykge1xuICBjb25zdCBjb21waWxlclJldmlzaW9uID0gY29tcGlsZXJJbmZvICYmIGNvbXBpbGVySW5mb1swXSB8fCAxLFxuICAgICAgICBjdXJyZW50UmV2aXNpb24gPSBDT01QSUxFUl9SRVZJU0lPTjtcblxuICBpZiAoY29tcGlsZXJSZXZpc2lvbiAhPT0gY3VycmVudFJldmlzaW9uKSB7XG4gICAgaWYgKGNvbXBpbGVyUmV2aXNpb24gPCBjdXJyZW50UmV2aXNpb24pIHtcbiAgICAgIGNvbnN0IHJ1bnRpbWVWZXJzaW9ucyA9IFJFVklTSU9OX0NIQU5HRVNbY3VycmVudFJldmlzaW9uXSxcbiAgICAgICAgICAgIGNvbXBpbGVyVmVyc2lvbnMgPSBSRVZJU0lPTl9DSEFOR0VTW2NvbXBpbGVyUmV2aXNpb25dO1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignVGVtcGxhdGUgd2FzIHByZWNvbXBpbGVkIHdpdGggYW4gb2xkZXIgdmVyc2lvbiBvZiBIYW5kbGViYXJzIHRoYW4gdGhlIGN1cnJlbnQgcnVudGltZS4gJyArXG4gICAgICAgICAgICAnUGxlYXNlIHVwZGF0ZSB5b3VyIHByZWNvbXBpbGVyIHRvIGEgbmV3ZXIgdmVyc2lvbiAoJyArIHJ1bnRpbWVWZXJzaW9ucyArICcpIG9yIGRvd25ncmFkZSB5b3VyIHJ1bnRpbWUgdG8gYW4gb2xkZXIgdmVyc2lvbiAoJyArIGNvbXBpbGVyVmVyc2lvbnMgKyAnKS4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVXNlIHRoZSBlbWJlZGRlZCB2ZXJzaW9uIGluZm8gc2luY2UgdGhlIHJ1bnRpbWUgZG9lc24ndCBrbm93IGFib3V0IHRoaXMgcmV2aXNpb24geWV0XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdUZW1wbGF0ZSB3YXMgcHJlY29tcGlsZWQgd2l0aCBhIG5ld2VyIHZlcnNpb24gb2YgSGFuZGxlYmFycyB0aGFuIHRoZSBjdXJyZW50IHJ1bnRpbWUuICcgK1xuICAgICAgICAgICAgJ1BsZWFzZSB1cGRhdGUgeW91ciBydW50aW1lIHRvIGEgbmV3ZXIgdmVyc2lvbiAoJyArIGNvbXBpbGVySW5mb1sxXSArICcpLicpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdGVtcGxhdGUodGVtcGxhdGVTcGVjLCBlbnYpIHtcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgaWYgKCFlbnYpIHtcbiAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdObyBlbnZpcm9ubWVudCBwYXNzZWQgdG8gdGVtcGxhdGUnKTtcbiAgfVxuICBpZiAoIXRlbXBsYXRlU3BlYyB8fCAhdGVtcGxhdGVTcGVjLm1haW4pIHtcbiAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdVbmtub3duIHRlbXBsYXRlIG9iamVjdDogJyArIHR5cGVvZiB0ZW1wbGF0ZVNwZWMpO1xuICB9XG5cbiAgdGVtcGxhdGVTcGVjLm1haW4uZGVjb3JhdG9yID0gdGVtcGxhdGVTcGVjLm1haW5fZDtcblxuICAvLyBOb3RlOiBVc2luZyBlbnYuVk0gcmVmZXJlbmNlcyByYXRoZXIgdGhhbiBsb2NhbCB2YXIgcmVmZXJlbmNlcyB0aHJvdWdob3V0IHRoaXMgc2VjdGlvbiB0byBhbGxvd1xuICAvLyBmb3IgZXh0ZXJuYWwgdXNlcnMgdG8gb3ZlcnJpZGUgdGhlc2UgYXMgcHN1ZWRvLXN1cHBvcnRlZCBBUElzLlxuICBlbnYuVk0uY2hlY2tSZXZpc2lvbih0ZW1wbGF0ZVNwZWMuY29tcGlsZXIpO1xuXG4gIGZ1bmN0aW9uIGludm9rZVBhcnRpYWxXcmFwcGVyKHBhcnRpYWwsIGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgICBjb250ZXh0ID0gVXRpbHMuZXh0ZW5kKHt9LCBjb250ZXh0LCBvcHRpb25zLmhhc2gpO1xuICAgICAgaWYgKG9wdGlvbnMuaWRzKSB7XG4gICAgICAgIG9wdGlvbnMuaWRzWzBdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwYXJ0aWFsID0gZW52LlZNLnJlc29sdmVQYXJ0aWFsLmNhbGwodGhpcywgcGFydGlhbCwgY29udGV4dCwgb3B0aW9ucyk7XG4gICAgbGV0IHJlc3VsdCA9IGVudi5WTS5pbnZva2VQYXJ0aWFsLmNhbGwodGhpcywgcGFydGlhbCwgY29udGV4dCwgb3B0aW9ucyk7XG5cbiAgICBpZiAocmVzdWx0ID09IG51bGwgJiYgZW52LmNvbXBpbGUpIHtcbiAgICAgIG9wdGlvbnMucGFydGlhbHNbb3B0aW9ucy5uYW1lXSA9IGVudi5jb21waWxlKHBhcnRpYWwsIHRlbXBsYXRlU3BlYy5jb21waWxlck9wdGlvbnMsIGVudik7XG4gICAgICByZXN1bHQgPSBvcHRpb25zLnBhcnRpYWxzW29wdGlvbnMubmFtZV0oY29udGV4dCwgb3B0aW9ucyk7XG4gICAgfVxuICAgIGlmIChyZXN1bHQgIT0gbnVsbCkge1xuICAgICAgaWYgKG9wdGlvbnMuaW5kZW50KSB7XG4gICAgICAgIGxldCBsaW5lcyA9IHJlc3VsdC5zcGxpdCgnXFxuJyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gbGluZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgaWYgKCFsaW5lc1tpXSAmJiBpICsgMSA9PT0gbCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGluZXNbaV0gPSBvcHRpb25zLmluZGVudCArIGxpbmVzW2ldO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdCA9IGxpbmVzLmpvaW4oJ1xcbicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignVGhlIHBhcnRpYWwgJyArIG9wdGlvbnMubmFtZSArICcgY291bGQgbm90IGJlIGNvbXBpbGVkIHdoZW4gcnVubmluZyBpbiBydW50aW1lLW9ubHkgbW9kZScpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEp1c3QgYWRkIHdhdGVyXG4gIGxldCBjb250YWluZXIgPSB7XG4gICAgc3RyaWN0OiBmdW5jdGlvbihvYmosIG5hbWUpIHtcbiAgICAgIGlmICghKG5hbWUgaW4gb2JqKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdcIicgKyBuYW1lICsgJ1wiIG5vdCBkZWZpbmVkIGluICcgKyBvYmopO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9ialtuYW1lXTtcbiAgICB9LFxuICAgIGxvb2t1cDogZnVuY3Rpb24oZGVwdGhzLCBuYW1lKSB7XG4gICAgICBjb25zdCBsZW4gPSBkZXB0aHMubGVuZ3RoO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAoZGVwdGhzW2ldICYmIGRlcHRoc1tpXVtuYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIGRlcHRoc1tpXVtuYW1lXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgbGFtYmRhOiBmdW5jdGlvbihjdXJyZW50LCBjb250ZXh0KSB7XG4gICAgICByZXR1cm4gdHlwZW9mIGN1cnJlbnQgPT09ICdmdW5jdGlvbicgPyBjdXJyZW50LmNhbGwoY29udGV4dCkgOiBjdXJyZW50O1xuICAgIH0sXG5cbiAgICBlc2NhcGVFeHByZXNzaW9uOiBVdGlscy5lc2NhcGVFeHByZXNzaW9uLFxuICAgIGludm9rZVBhcnRpYWw6IGludm9rZVBhcnRpYWxXcmFwcGVyLFxuXG4gICAgZm46IGZ1bmN0aW9uKGkpIHtcbiAgICAgIGxldCByZXQgPSB0ZW1wbGF0ZVNwZWNbaV07XG4gICAgICByZXQuZGVjb3JhdG9yID0gdGVtcGxhdGVTcGVjW2kgKyAnX2QnXTtcbiAgICAgIHJldHVybiByZXQ7XG4gICAgfSxcblxuICAgIHByb2dyYW1zOiBbXSxcbiAgICBwcm9ncmFtOiBmdW5jdGlvbihpLCBkYXRhLCBkZWNsYXJlZEJsb2NrUGFyYW1zLCBibG9ja1BhcmFtcywgZGVwdGhzKSB7XG4gICAgICBsZXQgcHJvZ3JhbVdyYXBwZXIgPSB0aGlzLnByb2dyYW1zW2ldLFxuICAgICAgICAgIGZuID0gdGhpcy5mbihpKTtcbiAgICAgIGlmIChkYXRhIHx8IGRlcHRocyB8fCBibG9ja1BhcmFtcyB8fCBkZWNsYXJlZEJsb2NrUGFyYW1zKSB7XG4gICAgICAgIHByb2dyYW1XcmFwcGVyID0gd3JhcFByb2dyYW0odGhpcywgaSwgZm4sIGRhdGEsIGRlY2xhcmVkQmxvY2tQYXJhbXMsIGJsb2NrUGFyYW1zLCBkZXB0aHMpO1xuICAgICAgfSBlbHNlIGlmICghcHJvZ3JhbVdyYXBwZXIpIHtcbiAgICAgICAgcHJvZ3JhbVdyYXBwZXIgPSB0aGlzLnByb2dyYW1zW2ldID0gd3JhcFByb2dyYW0odGhpcywgaSwgZm4pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHByb2dyYW1XcmFwcGVyO1xuICAgIH0sXG5cbiAgICBkYXRhOiBmdW5jdGlvbih2YWx1ZSwgZGVwdGgpIHtcbiAgICAgIHdoaWxlICh2YWx1ZSAmJiBkZXB0aC0tKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUuX3BhcmVudDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9LFxuICAgIG1lcmdlOiBmdW5jdGlvbihwYXJhbSwgY29tbW9uKSB7XG4gICAgICBsZXQgb2JqID0gcGFyYW0gfHwgY29tbW9uO1xuXG4gICAgICBpZiAocGFyYW0gJiYgY29tbW9uICYmIChwYXJhbSAhPT0gY29tbW9uKSkge1xuICAgICAgICBvYmogPSBVdGlscy5leHRlbmQoe30sIGNvbW1vbiwgcGFyYW0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gb2JqO1xuICAgIH0sXG4gICAgLy8gQW4gZW1wdHkgb2JqZWN0IHRvIHVzZSBhcyByZXBsYWNlbWVudCBmb3IgbnVsbC1jb250ZXh0c1xuICAgIG51bGxDb250ZXh0OiBPYmplY3Quc2VhbCh7fSksXG5cbiAgICBub29wOiBlbnYuVk0ubm9vcCxcbiAgICBjb21waWxlckluZm86IHRlbXBsYXRlU3BlYy5jb21waWxlclxuICB9O1xuXG4gIGZ1bmN0aW9uIHJldChjb250ZXh0LCBvcHRpb25zID0ge30pIHtcbiAgICBsZXQgZGF0YSA9IG9wdGlvbnMuZGF0YTtcblxuICAgIHJldC5fc2V0dXAob3B0aW9ucyk7XG4gICAgaWYgKCFvcHRpb25zLnBhcnRpYWwgJiYgdGVtcGxhdGVTcGVjLnVzZURhdGEpIHtcbiAgICAgIGRhdGEgPSBpbml0RGF0YShjb250ZXh0LCBkYXRhKTtcbiAgICB9XG4gICAgbGV0IGRlcHRocyxcbiAgICAgICAgYmxvY2tQYXJhbXMgPSB0ZW1wbGF0ZVNwZWMudXNlQmxvY2tQYXJhbXMgPyBbXSA6IHVuZGVmaW5lZDtcbiAgICBpZiAodGVtcGxhdGVTcGVjLnVzZURlcHRocykge1xuICAgICAgaWYgKG9wdGlvbnMuZGVwdGhzKSB7XG4gICAgICAgIGRlcHRocyA9IGNvbnRleHQgIT0gb3B0aW9ucy5kZXB0aHNbMF0gPyBbY29udGV4dF0uY29uY2F0KG9wdGlvbnMuZGVwdGhzKSA6IG9wdGlvbnMuZGVwdGhzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVwdGhzID0gW2NvbnRleHRdO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1haW4oY29udGV4dC8qLCBvcHRpb25zKi8pIHtcbiAgICAgIHJldHVybiAnJyArIHRlbXBsYXRlU3BlYy5tYWluKGNvbnRhaW5lciwgY29udGV4dCwgY29udGFpbmVyLmhlbHBlcnMsIGNvbnRhaW5lci5wYXJ0aWFscywgZGF0YSwgYmxvY2tQYXJhbXMsIGRlcHRocyk7XG4gICAgfVxuICAgIG1haW4gPSBleGVjdXRlRGVjb3JhdG9ycyh0ZW1wbGF0ZVNwZWMubWFpbiwgbWFpbiwgY29udGFpbmVyLCBvcHRpb25zLmRlcHRocyB8fCBbXSwgZGF0YSwgYmxvY2tQYXJhbXMpO1xuICAgIHJldHVybiBtYWluKGNvbnRleHQsIG9wdGlvbnMpO1xuICB9XG4gIHJldC5pc1RvcCA9IHRydWU7XG5cbiAgcmV0Ll9zZXR1cCA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMucGFydGlhbCkge1xuICAgICAgY29udGFpbmVyLmhlbHBlcnMgPSBjb250YWluZXIubWVyZ2Uob3B0aW9ucy5oZWxwZXJzLCBlbnYuaGVscGVycyk7XG5cbiAgICAgIGlmICh0ZW1wbGF0ZVNwZWMudXNlUGFydGlhbCkge1xuICAgICAgICBjb250YWluZXIucGFydGlhbHMgPSBjb250YWluZXIubWVyZ2Uob3B0aW9ucy5wYXJ0aWFscywgZW52LnBhcnRpYWxzKTtcbiAgICAgIH1cbiAgICAgIGlmICh0ZW1wbGF0ZVNwZWMudXNlUGFydGlhbCB8fCB0ZW1wbGF0ZVNwZWMudXNlRGVjb3JhdG9ycykge1xuICAgICAgICBjb250YWluZXIuZGVjb3JhdG9ycyA9IGNvbnRhaW5lci5tZXJnZShvcHRpb25zLmRlY29yYXRvcnMsIGVudi5kZWNvcmF0b3JzKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29udGFpbmVyLmhlbHBlcnMgPSBvcHRpb25zLmhlbHBlcnM7XG4gICAgICBjb250YWluZXIucGFydGlhbHMgPSBvcHRpb25zLnBhcnRpYWxzO1xuICAgICAgY29udGFpbmVyLmRlY29yYXRvcnMgPSBvcHRpb25zLmRlY29yYXRvcnM7XG4gICAgfVxuICB9O1xuXG4gIHJldC5fY2hpbGQgPSBmdW5jdGlvbihpLCBkYXRhLCBibG9ja1BhcmFtcywgZGVwdGhzKSB7XG4gICAgaWYgKHRlbXBsYXRlU3BlYy51c2VCbG9ja1BhcmFtcyAmJiAhYmxvY2tQYXJhbXMpIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ211c3QgcGFzcyBibG9jayBwYXJhbXMnKTtcbiAgICB9XG4gICAgaWYgKHRlbXBsYXRlU3BlYy51c2VEZXB0aHMgJiYgIWRlcHRocykge1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignbXVzdCBwYXNzIHBhcmVudCBkZXB0aHMnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gd3JhcFByb2dyYW0oY29udGFpbmVyLCBpLCB0ZW1wbGF0ZVNwZWNbaV0sIGRhdGEsIDAsIGJsb2NrUGFyYW1zLCBkZXB0aHMpO1xuICB9O1xuICByZXR1cm4gcmV0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd3JhcFByb2dyYW0oY29udGFpbmVyLCBpLCBmbiwgZGF0YSwgZGVjbGFyZWRCbG9ja1BhcmFtcywgYmxvY2tQYXJhbXMsIGRlcHRocykge1xuICBmdW5jdGlvbiBwcm9nKGNvbnRleHQsIG9wdGlvbnMgPSB7fSkge1xuICAgIGxldCBjdXJyZW50RGVwdGhzID0gZGVwdGhzO1xuICAgIGlmIChkZXB0aHMgJiYgY29udGV4dCAhPSBkZXB0aHNbMF0gJiYgIShjb250ZXh0ID09PSBjb250YWluZXIubnVsbENvbnRleHQgJiYgZGVwdGhzWzBdID09PSBudWxsKSkge1xuICAgICAgY3VycmVudERlcHRocyA9IFtjb250ZXh0XS5jb25jYXQoZGVwdGhzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZm4oY29udGFpbmVyLFxuICAgICAgICBjb250ZXh0LFxuICAgICAgICBjb250YWluZXIuaGVscGVycywgY29udGFpbmVyLnBhcnRpYWxzLFxuICAgICAgICBvcHRpb25zLmRhdGEgfHwgZGF0YSxcbiAgICAgICAgYmxvY2tQYXJhbXMgJiYgW29wdGlvbnMuYmxvY2tQYXJhbXNdLmNvbmNhdChibG9ja1BhcmFtcyksXG4gICAgICAgIGN1cnJlbnREZXB0aHMpO1xuICB9XG5cbiAgcHJvZyA9IGV4ZWN1dGVEZWNvcmF0b3JzKGZuLCBwcm9nLCBjb250YWluZXIsIGRlcHRocywgZGF0YSwgYmxvY2tQYXJhbXMpO1xuXG4gIHByb2cucHJvZ3JhbSA9IGk7XG4gIHByb2cuZGVwdGggPSBkZXB0aHMgPyBkZXB0aHMubGVuZ3RoIDogMDtcbiAgcHJvZy5ibG9ja1BhcmFtcyA9IGRlY2xhcmVkQmxvY2tQYXJhbXMgfHwgMDtcbiAgcmV0dXJuIHByb2c7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlUGFydGlhbChwYXJ0aWFsLCBjb250ZXh0LCBvcHRpb25zKSB7XG4gIGlmICghcGFydGlhbCkge1xuICAgIGlmIChvcHRpb25zLm5hbWUgPT09ICdAcGFydGlhbC1ibG9jaycpIHtcbiAgICAgIHBhcnRpYWwgPSBvcHRpb25zLmRhdGFbJ3BhcnRpYWwtYmxvY2snXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFydGlhbCA9IG9wdGlvbnMucGFydGlhbHNbb3B0aW9ucy5uYW1lXTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoIXBhcnRpYWwuY2FsbCAmJiAhb3B0aW9ucy5uYW1lKSB7XG4gICAgLy8gVGhpcyBpcyBhIGR5bmFtaWMgcGFydGlhbCB0aGF0IHJldHVybmVkIGEgc3RyaW5nXG4gICAgb3B0aW9ucy5uYW1lID0gcGFydGlhbDtcbiAgICBwYXJ0aWFsID0gb3B0aW9ucy5wYXJ0aWFsc1twYXJ0aWFsXTtcbiAgfVxuICByZXR1cm4gcGFydGlhbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGludm9rZVBhcnRpYWwocGFydGlhbCwgY29udGV4dCwgb3B0aW9ucykge1xuICAvLyBVc2UgdGhlIGN1cnJlbnQgY2xvc3VyZSBjb250ZXh0IHRvIHNhdmUgdGhlIHBhcnRpYWwtYmxvY2sgaWYgdGhpcyBwYXJ0aWFsXG4gIGNvbnN0IGN1cnJlbnRQYXJ0aWFsQmxvY2sgPSBvcHRpb25zLmRhdGEgJiYgb3B0aW9ucy5kYXRhWydwYXJ0aWFsLWJsb2NrJ107XG4gIG9wdGlvbnMucGFydGlhbCA9IHRydWU7XG4gIGlmIChvcHRpb25zLmlkcykge1xuICAgIG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aCA9IG9wdGlvbnMuaWRzWzBdIHx8IG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aDtcbiAgfVxuXG4gIGxldCBwYXJ0aWFsQmxvY2s7XG4gIGlmIChvcHRpb25zLmZuICYmIG9wdGlvbnMuZm4gIT09IG5vb3ApIHtcbiAgICBvcHRpb25zLmRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgIC8vIFdyYXBwZXIgZnVuY3Rpb24gdG8gZ2V0IGFjY2VzcyB0byBjdXJyZW50UGFydGlhbEJsb2NrIGZyb20gdGhlIGNsb3N1cmVcbiAgICBsZXQgZm4gPSBvcHRpb25zLmZuO1xuICAgIHBhcnRpYWxCbG9jayA9IG9wdGlvbnMuZGF0YVsncGFydGlhbC1ibG9jayddID0gZnVuY3Rpb24gcGFydGlhbEJsb2NrV3JhcHBlcihjb250ZXh0LCBvcHRpb25zID0ge30pIHtcblxuICAgICAgLy8gUmVzdG9yZSB0aGUgcGFydGlhbC1ibG9jayBmcm9tIHRoZSBjbG9zdXJlIGZvciB0aGUgZXhlY3V0aW9uIG9mIHRoZSBibG9ja1xuICAgICAgLy8gaS5lLiB0aGUgcGFydCBpbnNpZGUgdGhlIGJsb2NrIG9mIHRoZSBwYXJ0aWFsIGNhbGwuXG4gICAgICBvcHRpb25zLmRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgICAgb3B0aW9ucy5kYXRhWydwYXJ0aWFsLWJsb2NrJ10gPSBjdXJyZW50UGFydGlhbEJsb2NrO1xuICAgICAgcmV0dXJuIGZuKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgIH07XG4gICAgaWYgKGZuLnBhcnRpYWxzKSB7XG4gICAgICBvcHRpb25zLnBhcnRpYWxzID0gVXRpbHMuZXh0ZW5kKHt9LCBvcHRpb25zLnBhcnRpYWxzLCBmbi5wYXJ0aWFscyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHBhcnRpYWwgPT09IHVuZGVmaW5lZCAmJiBwYXJ0aWFsQmxvY2spIHtcbiAgICBwYXJ0aWFsID0gcGFydGlhbEJsb2NrO1xuICB9XG5cbiAgaWYgKHBhcnRpYWwgPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ1RoZSBwYXJ0aWFsICcgKyBvcHRpb25zLm5hbWUgKyAnIGNvdWxkIG5vdCBiZSBmb3VuZCcpO1xuICB9IGVsc2UgaWYgKHBhcnRpYWwgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgIHJldHVybiBwYXJ0aWFsKGNvbnRleHQsIG9wdGlvbnMpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub29wKCkgeyByZXR1cm4gJyc7IH1cblxuZnVuY3Rpb24gaW5pdERhdGEoY29udGV4dCwgZGF0YSkge1xuICBpZiAoIWRhdGEgfHwgISgncm9vdCcgaW4gZGF0YSkpIHtcbiAgICBkYXRhID0gZGF0YSA/IGNyZWF0ZUZyYW1lKGRhdGEpIDoge307XG4gICAgZGF0YS5yb290ID0gY29udGV4dDtcbiAgfVxuICByZXR1cm4gZGF0YTtcbn1cblxuZnVuY3Rpb24gZXhlY3V0ZURlY29yYXRvcnMoZm4sIHByb2csIGNvbnRhaW5lciwgZGVwdGhzLCBkYXRhLCBibG9ja1BhcmFtcykge1xuICBpZiAoZm4uZGVjb3JhdG9yKSB7XG4gICAgbGV0IHByb3BzID0ge307XG4gICAgcHJvZyA9IGZuLmRlY29yYXRvcihwcm9nLCBwcm9wcywgY29udGFpbmVyLCBkZXB0aHMgJiYgZGVwdGhzWzBdLCBkYXRhLCBibG9ja1BhcmFtcywgZGVwdGhzKTtcbiAgICBVdGlscy5leHRlbmQocHJvZywgcHJvcHMpO1xuICB9XG4gIHJldHVybiBwcm9nO1xufVxuIiwiLy8gQnVpbGQgb3V0IG91ciBiYXNpYyBTYWZlU3RyaW5nIHR5cGVcbmZ1bmN0aW9uIFNhZmVTdHJpbmcoc3RyaW5nKSB7XG4gIHRoaXMuc3RyaW5nID0gc3RyaW5nO1xufVxuXG5TYWZlU3RyaW5nLnByb3RvdHlwZS50b1N0cmluZyA9IFNhZmVTdHJpbmcucHJvdG90eXBlLnRvSFRNTCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gJycgKyB0aGlzLnN0cmluZztcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNhZmVTdHJpbmc7XG4iLCJjb25zdCBlc2NhcGUgPSB7XG4gICcmJzogJyZhbXA7JyxcbiAgJzwnOiAnJmx0OycsXG4gICc+JzogJyZndDsnLFxuICAnXCInOiAnJnF1b3Q7JyxcbiAgXCInXCI6ICcmI3gyNzsnLFxuICAnYCc6ICcmI3g2MDsnLFxuICAnPSc6ICcmI3gzRDsnXG59O1xuXG5jb25zdCBiYWRDaGFycyA9IC9bJjw+XCInYD1dL2csXG4gICAgICBwb3NzaWJsZSA9IC9bJjw+XCInYD1dLztcblxuZnVuY3Rpb24gZXNjYXBlQ2hhcihjaHIpIHtcbiAgcmV0dXJuIGVzY2FwZVtjaHJdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kKG9iai8qICwgLi4uc291cmNlICovKSB7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgZm9yIChsZXQga2V5IGluIGFyZ3VtZW50c1tpXSkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcmd1bWVudHNbaV0sIGtleSkpIHtcbiAgICAgICAgb2JqW2tleV0gPSBhcmd1bWVudHNbaV1ba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5leHBvcnQgbGV0IHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLy8gU291cmNlZCBmcm9tIGxvZGFzaFxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2Jlc3RpZWpzL2xvZGFzaC9ibG9iL21hc3Rlci9MSUNFTlNFLnR4dFxuLyogZXNsaW50LWRpc2FibGUgZnVuYy1zdHlsZSAqL1xubGV0IGlzRnVuY3Rpb24gPSBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nO1xufTtcbi8vIGZhbGxiYWNrIGZvciBvbGRlciB2ZXJzaW9ucyBvZiBDaHJvbWUgYW5kIFNhZmFyaVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmlmIChpc0Z1bmN0aW9uKC94LykpIHtcbiAgaXNGdW5jdGlvbiA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbiAgfTtcbn1cbmV4cG9ydCB7aXNGdW5jdGlvbn07XG4vKiBlc2xpbnQtZW5hYmxlIGZ1bmMtc3R5bGUgKi9cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmV4cG9ydCBjb25zdCBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpID8gdG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IEFycmF5XScgOiBmYWxzZTtcbn07XG5cbi8vIE9sZGVyIElFIHZlcnNpb25zIGRvIG5vdCBkaXJlY3RseSBzdXBwb3J0IGluZGV4T2Ygc28gd2UgbXVzdCBpbXBsZW1lbnQgb3VyIG93biwgc2FkbHkuXG5leHBvcnQgZnVuY3Rpb24gaW5kZXhPZihhcnJheSwgdmFsdWUpIHtcbiAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGFycmF5W2ldID09PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZXNjYXBlRXhwcmVzc2lvbihzdHJpbmcpIHtcbiAgaWYgKHR5cGVvZiBzdHJpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgLy8gZG9uJ3QgZXNjYXBlIFNhZmVTdHJpbmdzLCBzaW5jZSB0aGV5J3JlIGFscmVhZHkgc2FmZVxuICAgIGlmIChzdHJpbmcgJiYgc3RyaW5nLnRvSFRNTCkge1xuICAgICAgcmV0dXJuIHN0cmluZy50b0hUTUwoKTtcbiAgICB9IGVsc2UgaWYgKHN0cmluZyA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSBlbHNlIGlmICghc3RyaW5nKSB7XG4gICAgICByZXR1cm4gc3RyaW5nICsgJyc7XG4gICAgfVxuXG4gICAgLy8gRm9yY2UgYSBzdHJpbmcgY29udmVyc2lvbiBhcyB0aGlzIHdpbGwgYmUgZG9uZSBieSB0aGUgYXBwZW5kIHJlZ2FyZGxlc3MgYW5kXG4gICAgLy8gdGhlIHJlZ2V4IHRlc3Qgd2lsbCBkbyB0aGlzIHRyYW5zcGFyZW50bHkgYmVoaW5kIHRoZSBzY2VuZXMsIGNhdXNpbmcgaXNzdWVzIGlmXG4gICAgLy8gYW4gb2JqZWN0J3MgdG8gc3RyaW5nIGhhcyBlc2NhcGVkIGNoYXJhY3RlcnMgaW4gaXQuXG4gICAgc3RyaW5nID0gJycgKyBzdHJpbmc7XG4gIH1cblxuICBpZiAoIXBvc3NpYmxlLnRlc3Qoc3RyaW5nKSkgeyByZXR1cm4gc3RyaW5nOyB9XG4gIHJldHVybiBzdHJpbmcucmVwbGFjZShiYWRDaGFycywgZXNjYXBlQ2hhcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5KHZhbHVlKSB7XG4gIGlmICghdmFsdWUgJiYgdmFsdWUgIT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIGlmIChpc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZyYW1lKG9iamVjdCkge1xuICBsZXQgZnJhbWUgPSBleHRlbmQoe30sIG9iamVjdCk7XG4gIGZyYW1lLl9wYXJlbnQgPSBvYmplY3Q7XG4gIHJldHVybiBmcmFtZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJsb2NrUGFyYW1zKHBhcmFtcywgaWRzKSB7XG4gIHBhcmFtcy5wYXRoID0gaWRzO1xuICByZXR1cm4gcGFyYW1zO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXBwZW5kQ29udGV4dFBhdGgoY29udGV4dFBhdGgsIGlkKSB7XG4gIHJldHVybiAoY29udGV4dFBhdGggPyBjb250ZXh0UGF0aCArICcuJyA6ICcnKSArIGlkO1xufVxuIiwiLy8gQ3JlYXRlIGEgc2ltcGxlIHBhdGggYWxpYXMgdG8gYWxsb3cgYnJvd3NlcmlmeSB0byByZXNvbHZlXG4vLyB0aGUgcnVudGltZSBvbiBhIHN1cHBvcnRlZCBwYXRoLlxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Rpc3QvY2pzL2hhbmRsZWJhcnMucnVudGltZScpWydkZWZhdWx0J107XG4iLCIvLyBFeGFtcGxlIDE6IEltcG9ydCBqUXVlcnlcbi8vaW1wb3J0IFwianF1ZXJ5XCJcblxuLy8gRXhhbXBsZSAyOiBJbXBvcnQgSGFuZGxlYmFycyB0ZW1wbGF0ZVxuaW1wb3J0IEhlbGxvVGVtcGxhdGUgZnJvbSBcIi4uL3RlbXBsYXRlcy9oZWxsby5oYW5kbGViYXJzXCJcblxuLy8gRXhhbXBsZSAyOiBDb21waWxlIHRoZSB0ZW1wbGF0ZVxubGV0IGhlbGxvaHRtbCA9IEhlbGxvVGVtcGxhdGUoeyBuYW1lOiAnUGV0ZXInIH0pO1xuXG4vLyBFeGFtcGxlIDI6IFJlbmRlciB0aGUgdGVtcGxhdGVcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKS5pbm5lckhUTUwgPSBoZWxsb2h0bWw7XG5cbi8vIEV4YW1wbGUgMzogTG9nIHRvIGNvbnNvbGVcbmNvbnNvbGUubG9nKCdIZWxsbyBXb3JsZCcpOyIsInZhciB0ZW1wbGF0ZXIgPSByZXF1aXJlKFwiaGFuZGxlYmFycy9ydW50aW1lXCIpW1wiZGVmYXVsdFwiXS50ZW1wbGF0ZTttb2R1bGUuZXhwb3J0cyA9IHRlbXBsYXRlcih7XCJjb21waWxlclwiOls3LFwiPj0gNC4wLjBcIl0sXCJtYWluXCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICB2YXIgaGVscGVyO1xuXG4gIHJldHVybiBcIkhhbGxvIFwiXG4gICAgKyBjb250YWluZXIuZXNjYXBlRXhwcmVzc2lvbigoKGhlbHBlciA9IChoZWxwZXIgPSBoZWxwZXJzLm5hbWUgfHwgKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLm5hbWUgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogaGVscGVycy5oZWxwZXJNaXNzaW5nKSwodHlwZW9mIGhlbHBlciA9PT0gXCJmdW5jdGlvblwiID8gaGVscGVyLmNhbGwoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAgOiAoY29udGFpbmVyLm51bGxDb250ZXh0IHx8IHt9KSx7XCJuYW1lXCI6XCJuYW1lXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIiFcXG5cIjtcbn0sXCJ1c2VEYXRhXCI6dHJ1ZX0pOyJdLCJwcmVFeGlzdGluZ0NvbW1lbnQiOiIvLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbTV2WkdWZmJXOWtkV3hsY3k5aWNtOTNjMlZ5TFhCaFkyc3ZYM0J5Wld4MVpHVXVhbk1pTENKdWIyUmxYMjF2WkhWc1pYTXZhR0Z1Wkd4bFltRnljeTlzYVdJdmFHRnVaR3hsWW1GeWN5NXlkVzUwYVcxbExtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwyaGhibVJzWldKaGNuTXZiR2xpTDJoaGJtUnNaV0poY25NdlltRnpaUzVxY3lJc0ltNXZaR1ZmYlc5a2RXeGxjeTlvWVc1a2JHVmlZWEp6TDJ4cFlpOW9ZVzVrYkdWaVlYSnpMMlJsWTI5eVlYUnZjbk11YW5NaUxDSnViMlJsWDIxdlpIVnNaWE12YUdGdVpHeGxZbUZ5Y3k5c2FXSXZhR0Z1Wkd4bFltRnljeTlrWldOdmNtRjBiM0p6TDJsdWJHbHVaUzVxY3lJc0ltNXZaR1ZmYlc5a2RXeGxjeTlvWVc1a2JHVmlZWEp6TDJ4cFlpOW9ZVzVrYkdWaVlYSnpMMlY0WTJWd2RHbHZiaTVxY3lJc0ltNXZaR1ZmYlc5a2RXeGxjeTlvWVc1a2JHVmlZWEp6TDJ4cFlpOW9ZVzVrYkdWaVlYSnpMMmhsYkhCbGNuTXVhbk1pTENKdWIyUmxYMjF2WkhWc1pYTXZhR0Z1Wkd4bFltRnljeTlzYVdJdmFHRnVaR3hsWW1GeWN5OW9aV3h3WlhKekwySnNiMk5yTFdobGJIQmxjaTF0YVhOemFXNW5MbXB6SWl3aWJtOWtaVjl0YjJSMWJHVnpMMmhoYm1Sc1pXSmhjbk12YkdsaUwyaGhibVJzWldKaGNuTXZhR1ZzY0dWeWN5OWxZV05vTG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJoaGJtUnNaV0poY25NdmJHbGlMMmhoYm1Sc1pXSmhjbk12YUdWc2NHVnljeTlvWld4d1pYSXRiV2x6YzJsdVp5NXFjeUlzSW01dlpHVmZiVzlrZFd4bGN5OW9ZVzVrYkdWaVlYSnpMMnhwWWk5b1lXNWtiR1ZpWVhKekwyaGxiSEJsY25NdmFXWXVhbk1pTENKdWIyUmxYMjF2WkhWc1pYTXZhR0Z1Wkd4bFltRnljeTlzYVdJdmFHRnVaR3hsWW1GeWN5OW9aV3h3WlhKekwyeHZaeTVxY3lJc0ltNXZaR1ZmYlc5a2RXeGxjeTlvWVc1a2JHVmlZWEp6TDJ4cFlpOW9ZVzVrYkdWaVlYSnpMMmhsYkhCbGNuTXZiRzl2YTNWd0xtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwyaGhibVJzWldKaGNuTXZiR2xpTDJoaGJtUnNaV0poY25NdmFHVnNjR1Z5Y3k5M2FYUm9MbXB6SWl3aWJtOWtaVjl0YjJSMWJHVnpMMmhoYm1Sc1pXSmhjbk12YkdsaUwyaGhibVJzWldKaGNuTXZiRzluWjJWeUxtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwyaGhibVJzWldKaGNuTXZaR2x6ZEM5amFuTXZhR0Z1Wkd4bFltRnljeTl1YjJSbFgyMXZaSFZzWlhNdmFHRnVaR3hsWW1GeWN5OXNhV0l2YUdGdVpHeGxZbUZ5Y3k5dWJ5MWpiMjVtYkdsamRDNXFjeUlzSW01dlpHVmZiVzlrZFd4bGN5OW9ZVzVrYkdWaVlYSnpMMnhwWWk5b1lXNWtiR1ZpWVhKekwzSjFiblJwYldVdWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdmFHRnVaR3hsWW1GeWN5OXNhV0l2YUdGdVpHeGxZbUZ5Y3k5ellXWmxMWE4wY21sdVp5NXFjeUlzSW01dlpHVmZiVzlrZFd4bGN5OW9ZVzVrYkdWaVlYSnpMMnhwWWk5b1lXNWtiR1ZpWVhKekwzVjBhV3h6TG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJoaGJtUnNaV0poY25NdmNuVnVkR2x0WlM1cWN5SXNJbk55WXk5cWN5OWhjSEF1YW5NaUxDSnpjbU12ZEdWdGNHeGhkR1Z6TDJobGJHeHZMbWhoYm1Sc1pXSmhjbk1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJa0ZCUVVFN096czdPenM3T3pzN096czRRa05CYzBJc2JVSkJRVzFDT3p0SlFVRTNRaXhKUVVGSk96czdPenR2UTBGSlR5d3dRa0ZCTUVJN096czdiVU5CUXpOQ0xIZENRVUYzUWpzN096c3JRa0ZEZGtJc2IwSkJRVzlDT3p0SlFVRXZRaXhMUVVGTE96dHBRMEZEVVN4elFrRkJjMEk3TzBsQlFXNURMRTlCUVU4N08yOURRVVZKTERCQ1FVRXdRanM3T3pzN1FVRkhha1FzVTBGQlV5eE5RVUZOTEVkQlFVYzdRVUZEYUVJc1RVRkJTU3hGUVVGRkxFZEJRVWNzU1VGQlNTeEpRVUZKTEVOQlFVTXNjVUpCUVhGQ0xFVkJRVVVzUTBGQlF6czdRVUZGTVVNc1QwRkJTeXhEUVVGRExFMUJRVTBzUTBGQlF5eEZRVUZGTEVWQlFVVXNTVUZCU1N4RFFVRkRMRU5CUVVNN1FVRkRka0lzU1VGQlJTeERRVUZETEZWQlFWVXNiME5CUVdFc1EwRkJRenRCUVVNelFpeEpRVUZGTEVOQlFVTXNVMEZCVXl4dFEwRkJXU3hEUVVGRE8wRkJRM3BDTEVsQlFVVXNRMEZCUXl4TFFVRkxMRWRCUVVjc1MwRkJTeXhEUVVGRE8wRkJRMnBDTEVsQlFVVXNRMEZCUXl4blFrRkJaMElzUjBGQlJ5eExRVUZMTEVOQlFVTXNaMEpCUVdkQ0xFTkJRVU03TzBGQlJUZERMRWxCUVVVc1EwRkJReXhGUVVGRkxFZEJRVWNzVDBGQlR5eERRVUZETzBGQlEyaENMRWxCUVVVc1EwRkJReXhSUVVGUkxFZEJRVWNzVlVGQlV5eEpRVUZKTEVWQlFVVTdRVUZETTBJc1YwRkJUeXhQUVVGUExFTkJRVU1zVVVGQlVTeERRVUZETEVsQlFVa3NSVUZCUlN4RlFVRkZMRU5CUVVNc1EwRkJRenRIUVVOdVF5eERRVUZET3p0QlFVVkdMRk5CUVU4c1JVRkJSU3hEUVVGRE8wTkJRMWc3TzBGQlJVUXNTVUZCU1N4SlFVRkpMRWRCUVVjc1RVRkJUU3hGUVVGRkxFTkJRVU03UVVGRGNFSXNTVUZCU1N4RFFVRkRMRTFCUVUwc1IwRkJSeXhOUVVGTkxFTkJRVU03TzBGQlJYSkNMR3REUVVGWExFbEJRVWtzUTBGQlF5eERRVUZET3p0QlFVVnFRaXhKUVVGSkxFTkJRVU1zVTBGQlV5eERRVUZETEVkQlFVY3NTVUZCU1N4RFFVRkRPenR4UWtGRlVpeEpRVUZKT3pzN096czdPenM3T3pzN08zRkNRM0JEZVVJc1UwRkJVenM3ZVVKQlF5OUNMR0ZCUVdFN096czdkVUpCUTBVc1YwRkJWenM3TUVKQlExSXNZMEZCWXpzN2MwSkJRMjVETEZWQlFWVTdPenM3UVVGRmRFSXNTVUZCVFN4UFFVRlBMRWRCUVVjc1VVRkJVU3hEUVVGRE96dEJRVU42UWl4SlFVRk5MR2xDUVVGcFFpeEhRVUZITEVOQlFVTXNRMEZCUXpzN08wRkJSVFZDTEVsQlFVMHNaMEpCUVdkQ0xFZEJRVWM3UVVGRE9VSXNSMEZCUXl4RlFVRkZMR0ZCUVdFN1FVRkRhRUlzUjBGQlF5eEZRVUZGTEdWQlFXVTdRVUZEYkVJc1IwRkJReXhGUVVGRkxHVkJRV1U3UVVGRGJFSXNSMEZCUXl4RlFVRkZMRlZCUVZVN1FVRkRZaXhIUVVGRExFVkJRVVVzYTBKQlFXdENPMEZCUTNKQ0xFZEJRVU1zUlVGQlJTeHBRa0ZCYVVJN1FVRkRjRUlzUjBGQlF5eEZRVUZGTEZWQlFWVTdRMEZEWkN4RFFVRkRPenM3UVVGRlJpeEpRVUZOTEZWQlFWVXNSMEZCUnl4cFFrRkJhVUlzUTBGQlF6czdRVUZGT1VJc1UwRkJVeXh4UWtGQmNVSXNRMEZCUXl4UFFVRlBMRVZCUVVVc1VVRkJVU3hGUVVGRkxGVkJRVlVzUlVGQlJUdEJRVU51UlN4TlFVRkpMRU5CUVVNc1QwRkJUeXhIUVVGSExFOUJRVThzU1VGQlNTeEZRVUZGTEVOQlFVTTdRVUZETjBJc1RVRkJTU3hEUVVGRExGRkJRVkVzUjBGQlJ5eFJRVUZSTEVsQlFVa3NSVUZCUlN4RFFVRkRPMEZCUXk5Q0xFMUJRVWtzUTBGQlF5eFZRVUZWTEVkQlFVY3NWVUZCVlN4SlFVRkpMRVZCUVVVc1EwRkJRenM3UVVGRmJrTXNhME5CUVhWQ0xFbEJRVWtzUTBGQlF5eERRVUZETzBGQlF6ZENMSGREUVVFd1FpeEpRVUZKTEVOQlFVTXNRMEZCUXp0RFFVTnFRenM3UVVGRlJDeHhRa0ZCY1VJc1EwRkJReXhUUVVGVExFZEJRVWM3UVVGRGFFTXNZVUZCVnl4RlFVRkZMSEZDUVVGeFFqczdRVUZGYkVNc1VVRkJUU3h4UWtGQlVUdEJRVU5rTEV0QlFVY3NSVUZCUlN4dlFrRkJUeXhIUVVGSE96dEJRVVZtTEdkQ1FVRmpMRVZCUVVVc2QwSkJRVk1zU1VGQlNTeEZRVUZGTEVWQlFVVXNSVUZCUlR0QlFVTnFReXhSUVVGSkxHZENRVUZUTEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhWUVVGVkxFVkJRVVU3UVVGRGRFTXNWVUZCU1N4RlFVRkZMRVZCUVVVN1FVRkJSU3hqUVVGTkxESkNRVUZqTEhsRFFVRjVReXhEUVVGRExFTkJRVU03VDBGQlJUdEJRVU16UlN4dlFrRkJUeXhKUVVGSkxFTkJRVU1zVDBGQlR5eEZRVUZGTEVsQlFVa3NRMEZCUXl4RFFVRkRPMHRCUXpWQ0xFMUJRVTA3UVVGRFRDeFZRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhIUVVGSExFVkJRVVVzUTBGQlF6dExRVU42UWp0SFFVTkdPMEZCUTBRc2EwSkJRV2RDTEVWQlFVVXNNRUpCUVZNc1NVRkJTU3hGUVVGRk8wRkJReTlDTEZkQlFVOHNTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dEhRVU16UWpzN1FVRkZSQ3hwUWtGQlpTeEZRVUZGTEhsQ1FVRlRMRWxCUVVrc1JVRkJSU3hQUVVGUExFVkJRVVU3UVVGRGRrTXNVVUZCU1N4blFrRkJVeXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NWVUZCVlN4RlFVRkZPMEZCUTNSRExHOUNRVUZQTEVsQlFVa3NRMEZCUXl4UlFVRlJMRVZCUVVVc1NVRkJTU3hEUVVGRExFTkJRVU03UzBGRE4wSXNUVUZCVFR0QlFVTk1MRlZCUVVrc1QwRkJUeXhQUVVGUExFdEJRVXNzVjBGQlZ5eEZRVUZGTzBGQlEyeERMR05CUVUwc2VVVkJRVEJFTEVsQlFVa3NiMEpCUVdsQ0xFTkJRVU03VDBGRGRrWTdRVUZEUkN4VlFVRkpMRU5CUVVNc1VVRkJVU3hEUVVGRExFbEJRVWtzUTBGQlF5eEhRVUZITEU5QlFVOHNRMEZCUXp0TFFVTXZRanRIUVVOR08wRkJRMFFzYlVKQlFXbENMRVZCUVVVc01rSkJRVk1zU1VGQlNTeEZRVUZGTzBGQlEyaERMRmRCUVU4c1NVRkJTU3hEUVVGRExGRkJRVkVzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0SFFVTTFRanM3UVVGRlJDeHRRa0ZCYVVJc1JVRkJSU3d5UWtGQlV5eEpRVUZKTEVWQlFVVXNSVUZCUlN4RlFVRkZPMEZCUTNCRExGRkJRVWtzWjBKQlFWTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExGVkJRVlVzUlVGQlJUdEJRVU4wUXl4VlFVRkpMRVZCUVVVc1JVRkJSVHRCUVVGRkxHTkJRVTBzTWtKQlFXTXNORU5CUVRSRExFTkJRVU1zUTBGQlF6dFBRVUZGTzBGQlF6bEZMRzlDUVVGUExFbEJRVWtzUTBGQlF5eFZRVUZWTEVWQlFVVXNTVUZCU1N4RFFVRkRMRU5CUVVNN1MwRkRMMElzVFVGQlRUdEJRVU5NTEZWQlFVa3NRMEZCUXl4VlFVRlZMRU5CUVVNc1NVRkJTU3hEUVVGRExFZEJRVWNzUlVGQlJTeERRVUZETzB0QlF6VkNPMGRCUTBZN1FVRkRSQ3h4UWtGQmJVSXNSVUZCUlN3MlFrRkJVeXhKUVVGSkxFVkJRVVU3UVVGRGJFTXNWMEZCVHl4SlFVRkpMRU5CUVVNc1ZVRkJWU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzBkQlF6bENPME5CUTBZc1EwRkJRenM3UVVGRlN5eEpRVUZKTEVkQlFVY3NSMEZCUnl4dlFrRkJUeXhIUVVGSExFTkJRVU03T3p0UlFVVndRaXhYUVVGWE8xRkJRVVVzVFVGQlRUczdPenM3T3pzN096czdPMmREUXpkRlFTeHhRa0ZCY1VJN096czdRVUZGZWtNc1UwRkJVeXg1UWtGQmVVSXNRMEZCUXl4UlFVRlJMRVZCUVVVN1FVRkRiRVFzWjBOQlFXVXNVVUZCVVN4RFFVRkRMRU5CUVVNN1EwRkRNVUk3T3pzN096czdPM0ZDUTBwdlFpeFZRVUZWT3p0eFFrRkZhRUlzVlVGQlV5eFJRVUZSTEVWQlFVVTdRVUZEYUVNc1ZVRkJVU3hEUVVGRExHbENRVUZwUWl4RFFVRkRMRkZCUVZFc1JVRkJSU3hWUVVGVExFVkJRVVVzUlVGQlJTeExRVUZMTEVWQlFVVXNVMEZCVXl4RlFVRkZMRTlCUVU4c1JVRkJSVHRCUVVNelJTeFJRVUZKTEVkQlFVY3NSMEZCUnl4RlFVRkZMRU5CUVVNN1FVRkRZaXhSUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEZGQlFWRXNSVUZCUlR0QlFVTnVRaXhYUVVGTExFTkJRVU1zVVVGQlVTeEhRVUZITEVWQlFVVXNRMEZCUXp0QlFVTndRaXhUUVVGSExFZEJRVWNzVlVGQlV5eFBRVUZQTEVWQlFVVXNUMEZCVHl4RlFVRkZPenRCUVVVdlFpeFpRVUZKTEZGQlFWRXNSMEZCUnl4VFFVRlRMRU5CUVVNc1VVRkJVU3hEUVVGRE8wRkJRMnhETEdsQ1FVRlRMRU5CUVVNc1VVRkJVU3hIUVVGSExHTkJRVThzUlVGQlJTeEZRVUZGTEZGQlFWRXNSVUZCUlN4TFFVRkxMRU5CUVVNc1VVRkJVU3hEUVVGRExFTkJRVU03UVVGRE1VUXNXVUZCU1N4SFFVRkhMRWRCUVVjc1JVRkJSU3hEUVVGRExFOUJRVThzUlVGQlJTeFBRVUZQTEVOQlFVTXNRMEZCUXp0QlFVTXZRaXhwUWtGQlV5eERRVUZETEZGQlFWRXNSMEZCUnl4UlFVRlJMRU5CUVVNN1FVRkRPVUlzWlVGQlR5eEhRVUZITEVOQlFVTTdUMEZEV2l4RFFVRkRPMHRCUTBnN08wRkJSVVFzVTBGQlN5eERRVUZETEZGQlFWRXNRMEZCUXl4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVkQlFVY3NUMEZCVHl4RFFVRkRMRVZCUVVVc1EwRkJRenM3UVVGRk4wTXNWMEZCVHl4SFFVRkhMRU5CUVVNN1IwRkRXaXhEUVVGRExFTkJRVU03UTBGRFNqczdPenM3T3pzN096dEJRM0JDUkN4SlFVRk5MRlZCUVZVc1IwRkJSeXhEUVVGRExHRkJRV0VzUlVGQlJTeFZRVUZWTEVWQlFVVXNXVUZCV1N4RlFVRkZMRk5CUVZNc1JVRkJSU3hOUVVGTkxFVkJRVVVzVVVGQlVTeEZRVUZGTEU5QlFVOHNRMEZCUXl4RFFVRkRPenRCUVVWdVJ5eFRRVUZUTEZOQlFWTXNRMEZCUXl4UFFVRlBMRVZCUVVVc1NVRkJTU3hGUVVGRk8wRkJRMmhETEUxQlFVa3NSMEZCUnl4SFFVRkhMRWxCUVVrc1NVRkJTU3hKUVVGSkxFTkJRVU1zUjBGQlJ6dE5RVU4wUWl4SlFVRkpMRmxCUVVFN1RVRkRTaXhOUVVGTkxGbEJRVUVzUTBGQlF6dEJRVU5ZTEUxQlFVa3NSMEZCUnl4RlFVRkZPMEZCUTFBc1VVRkJTU3hIUVVGSExFZEJRVWNzUTBGQlF5eExRVUZMTEVOQlFVTXNTVUZCU1N4RFFVRkRPMEZCUTNSQ0xGVkJRVTBzUjBGQlJ5eEhRVUZITEVOQlFVTXNTMEZCU3l4RFFVRkRMRTFCUVUwc1EwRkJRenM3UVVGRk1VSXNWMEZCVHl4SlFVRkpMRXRCUVVzc1IwRkJSeXhKUVVGSkxFZEJRVWNzUjBGQlJ5eEhRVUZITEUxQlFVMHNRMEZCUXp0SFFVTjRRenM3UVVGRlJDeE5RVUZKTEVkQlFVY3NSMEZCUnl4TFFVRkxMRU5CUVVNc1UwRkJVeXhEUVVGRExGZEJRVmNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RlFVRkZMRTlCUVU4c1EwRkJReXhEUVVGRE96czdRVUZITVVRc1QwRkJTeXhKUVVGSkxFZEJRVWNzUjBGQlJ5eERRVUZETEVWQlFVVXNSMEZCUnl4SFFVRkhMRlZCUVZVc1EwRkJReXhOUVVGTkxFVkJRVVVzUjBGQlJ5eEZRVUZGTEVWQlFVVTdRVUZEYUVRc1VVRkJTU3hEUVVGRExGVkJRVlVzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4SFFVRkhMRWRCUVVjc1EwRkJReXhWUVVGVkxFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXp0SFFVTTVRenM3TzBGQlIwUXNUVUZCU1N4TFFVRkxMRU5CUVVNc2FVSkJRV2xDTEVWQlFVVTdRVUZETTBJc1UwRkJTeXhEUVVGRExHbENRVUZwUWl4RFFVRkRMRWxCUVVrc1JVRkJSU3hUUVVGVExFTkJRVU1zUTBGQlF6dEhRVU14UXpzN1FVRkZSQ3hOUVVGSk8wRkJRMFlzVVVGQlNTeEhRVUZITEVWQlFVVTdRVUZEVUN4VlFVRkpMRU5CUVVNc1ZVRkJWU3hIUVVGSExFbEJRVWtzUTBGQlF6czdPenRCUVVsMlFpeFZRVUZKTEUxQlFVMHNRMEZCUXl4alFVRmpMRVZCUVVVN1FVRkRla0lzWTBGQlRTeERRVUZETEdOQlFXTXNRMEZCUXl4SlFVRkpMRVZCUVVVc1VVRkJVU3hGUVVGRk8wRkJRM0JETEdWQlFVc3NSVUZCUlN4TlFVRk5PMEZCUTJJc2IwSkJRVlVzUlVGQlJTeEpRVUZKTzFOQlEycENMRU5CUVVNc1EwRkJRenRQUVVOS0xFMUJRVTA3UVVGRFRDeFpRVUZKTEVOQlFVTXNUVUZCVFN4SFFVRkhMRTFCUVUwc1EwRkJRenRQUVVOMFFqdExRVU5HTzBkQlEwWXNRMEZCUXl4UFFVRlBMRWRCUVVjc1JVRkJSVHM3UjBGRllqdERRVU5HT3p0QlFVVkVMRk5CUVZNc1EwRkJReXhUUVVGVExFZEJRVWNzU1VGQlNTeExRVUZMTEVWQlFVVXNRMEZCUXpzN2NVSkJSVzVDTEZOQlFWTTdPenM3T3pzN096czdPenM3ZVVORGFFUmxMR2REUVVGblF6czdPenN5UWtGRE9VTXNaMEpCUVdkQ096czdPMjlEUVVOUUxEQkNRVUV3UWpzN096dDVRa0ZEY2tNc1kwRkJZenM3T3pzd1FrRkRZaXhsUVVGbE96czdPelpDUVVOYUxHdENRVUZyUWpzN096c3lRa0ZEY0VJc1owSkJRV2RDT3pzN08wRkJSV3hETEZOQlFWTXNjMEpCUVhOQ0xFTkJRVU1zVVVGQlVTeEZRVUZGTzBGQlF5OURMSGxEUVVFeVFpeFJRVUZSTEVOQlFVTXNRMEZCUXp0QlFVTnlReXd5UWtGQllTeFJRVUZSTEVOQlFVTXNRMEZCUXp0QlFVTjJRaXh2UTBGQmMwSXNVVUZCVVN4RFFVRkRMRU5CUVVNN1FVRkRhRU1zZVVKQlFWY3NVVUZCVVN4RFFVRkRMRU5CUVVNN1FVRkRja0lzTUVKQlFWa3NVVUZCVVN4RFFVRkRMRU5CUVVNN1FVRkRkRUlzTmtKQlFXVXNVVUZCVVN4RFFVRkRMRU5CUVVNN1FVRkRla0lzTWtKQlFXRXNVVUZCVVN4RFFVRkRMRU5CUVVNN1EwRkRlRUk3T3pzN096czdPM0ZDUTJoQ2NVUXNWVUZCVlRzN2NVSkJSV3BFTEZWQlFWTXNVVUZCVVN4RlFVRkZPMEZCUTJoRExGVkJRVkVzUTBGQlF5eGpRVUZqTEVOQlFVTXNiMEpCUVc5Q0xFVkJRVVVzVlVGQlV5eFBRVUZQTEVWQlFVVXNUMEZCVHl4RlFVRkZPMEZCUTNaRkxGRkJRVWtzVDBGQlR5eEhRVUZITEU5QlFVOHNRMEZCUXl4UFFVRlBPMUZCUTNwQ0xFVkJRVVVzUjBGQlJ5eFBRVUZQTEVOQlFVTXNSVUZCUlN4RFFVRkRPenRCUVVWd1FpeFJRVUZKTEU5QlFVOHNTMEZCU3l4SlFVRkpMRVZCUVVVN1FVRkRjRUlzWVVGQlR5eEZRVUZGTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1MwRkRha0lzVFVGQlRTeEpRVUZKTEU5QlFVOHNTMEZCU3l4TFFVRkxMRWxCUVVrc1QwRkJUeXhKUVVGSkxFbEJRVWtzUlVGQlJUdEJRVU12UXl4aFFVRlBMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dExRVU4wUWl4TlFVRk5MRWxCUVVrc1pVRkJVU3hQUVVGUExFTkJRVU1zUlVGQlJUdEJRVU16UWl4VlFVRkpMRTlCUVU4c1EwRkJReXhOUVVGTkxFZEJRVWNzUTBGQlF5eEZRVUZGTzBGQlEzUkNMRmxCUVVrc1QwRkJUeXhEUVVGRExFZEJRVWNzUlVGQlJUdEJRVU5tTEdsQ1FVRlBMRU5CUVVNc1IwRkJSeXhIUVVGSExFTkJRVU1zVDBGQlR5eERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMU5CUXpsQ096dEJRVVZFTEdWQlFVOHNVVUZCVVN4RFFVRkRMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zVDBGQlR5eEZRVUZGTEU5QlFVOHNRMEZCUXl4RFFVRkRPMDlCUTJoRUxFMUJRVTA3UVVGRFRDeGxRVUZQTEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRQUVVOMFFqdExRVU5HTEUxQlFVMDdRVUZEVEN4VlFVRkpMRTlCUVU4c1EwRkJReXhKUVVGSkxFbEJRVWtzVDBGQlR5eERRVUZETEVkQlFVY3NSVUZCUlR0QlFVTXZRaXhaUVVGSkxFbEJRVWtzUjBGQlJ5eHRRa0ZCV1N4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03UVVGRGNrTXNXVUZCU1N4RFFVRkRMRmRCUVZjc1IwRkJSeXg1UWtGQmEwSXNUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhYUVVGWExFVkJRVVVzVDBGQlR5eERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMEZCUXpkRkxHVkJRVThzUjBGQlJ5eEZRVUZETEVsQlFVa3NSVUZCUlN4SlFVRkpMRVZCUVVNc1EwRkJRenRQUVVONFFqczdRVUZGUkN4aFFVRlBMRVZCUVVVc1EwRkJReXhQUVVGUExFVkJRVVVzVDBGQlR5eERRVUZETEVOQlFVTTdTMEZETjBJN1IwRkRSaXhEUVVGRExFTkJRVU03UTBGRFNqczdPenM3T3pzN096czdPenR4UWtNdlFqaEZMRlZCUVZVN08zbENRVU51UlN4alFVRmpPenM3TzNGQ1FVVnlRaXhWUVVGVExGRkJRVkVzUlVGQlJUdEJRVU5vUXl4VlFVRlJMRU5CUVVNc1kwRkJZeXhEUVVGRExFMUJRVTBzUlVGQlJTeFZRVUZUTEU5QlFVOHNSVUZCUlN4UFFVRlBMRVZCUVVVN1FVRkRla1FzVVVGQlNTeERRVUZETEU5QlFVOHNSVUZCUlR0QlFVTmFMRmxCUVUwc01rSkJRV01zTmtKQlFUWkNMRU5CUVVNc1EwRkJRenRMUVVOd1JEczdRVUZGUkN4UlFVRkpMRVZCUVVVc1IwRkJSeXhQUVVGUExFTkJRVU1zUlVGQlJUdFJRVU5tTEU5QlFVOHNSMEZCUnl4UFFVRlBMRU5CUVVNc1QwRkJUenRSUVVONlFpeERRVUZETEVkQlFVY3NRMEZCUXp0UlFVTk1MRWRCUVVjc1IwRkJSeXhGUVVGRk8xRkJRMUlzU1VGQlNTeFpRVUZCTzFGQlEwb3NWMEZCVnl4WlFVRkJMRU5CUVVNN08wRkJSV2hDTEZGQlFVa3NUMEZCVHl4RFFVRkRMRWxCUVVrc1NVRkJTU3hQUVVGUExFTkJRVU1zUjBGQlJ5eEZRVUZGTzBGQlF5OUNMR2xDUVVGWExFZEJRVWNzZVVKQlFXdENMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zVjBGQlZ5eEZRVUZGTEU5QlFVOHNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUjBGQlJ5eEhRVUZITEVOQlFVTTdTMEZEYWtZN08wRkJSVVFzVVVGQlNTeHJRa0ZCVnl4UFFVRlBMRU5CUVVNc1JVRkJSVHRCUVVGRkxHRkJRVThzUjBGQlJ5eFBRVUZQTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8wdEJRVVU3TzBGQlJURkVMRkZCUVVrc1QwRkJUeXhEUVVGRExFbEJRVWtzUlVGQlJUdEJRVU5vUWl4VlFVRkpMRWRCUVVjc2JVSkJRVmtzVDBGQlR5eERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMHRCUTJ4RE96dEJRVVZFTEdGQlFWTXNZVUZCWVN4RFFVRkRMRXRCUVVzc1JVRkJSU3hMUVVGTExFVkJRVVVzU1VGQlNTeEZRVUZGTzBGQlEzcERMRlZCUVVrc1NVRkJTU3hGUVVGRk8wRkJRMUlzV1VGQlNTeERRVUZETEVkQlFVY3NSMEZCUnl4TFFVRkxMRU5CUVVNN1FVRkRha0lzV1VGQlNTeERRVUZETEV0QlFVc3NSMEZCUnl4TFFVRkxMRU5CUVVNN1FVRkRia0lzV1VGQlNTeERRVUZETEV0QlFVc3NSMEZCUnl4TFFVRkxMRXRCUVVzc1EwRkJReXhEUVVGRE8wRkJRM3BDTEZsQlFVa3NRMEZCUXl4SlFVRkpMRWRCUVVjc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF6czdRVUZGYmtJc1dVRkJTU3hYUVVGWExFVkJRVVU3UVVGRFppeGpRVUZKTEVOQlFVTXNWMEZCVnl4SFFVRkhMRmRCUVZjc1IwRkJSeXhMUVVGTExFTkJRVU03VTBGRGVFTTdUMEZEUmpzN1FVRkZSQ3hUUVVGSExFZEJRVWNzUjBGQlJ5eEhRVUZITEVWQlFVVXNRMEZCUXl4UFFVRlBMRU5CUVVNc1MwRkJTeXhEUVVGRExFVkJRVVU3UVVGRE4wSXNXVUZCU1N4RlFVRkZMRWxCUVVrN1FVRkRWaXh0UWtGQlZ5eEZRVUZGTEcxQ1FVRlpMRU5CUVVNc1QwRkJUeXhEUVVGRExFdEJRVXNzUTBGQlF5eEZRVUZGTEV0QlFVc3NRMEZCUXl4RlFVRkZMRU5CUVVNc1YwRkJWeXhIUVVGSExFdEJRVXNzUlVGQlJTeEpRVUZKTEVOQlFVTXNRMEZCUXp0UFFVTXZSU3hEUVVGRExFTkJRVU03UzBGRFNqczdRVUZGUkN4UlFVRkpMRTlCUVU4c1NVRkJTU3hQUVVGUExFOUJRVThzUzBGQlN5eFJRVUZSTEVWQlFVVTdRVUZETVVNc1ZVRkJTU3hsUVVGUkxFOUJRVThzUTBGQlF5eEZRVUZGTzBGQlEzQkNMR0ZCUVVzc1NVRkJTU3hEUVVGRExFZEJRVWNzVDBGQlR5eERRVUZETEUxQlFVMHNSVUZCUlN4RFFVRkRMRWRCUVVjc1EwRkJReXhGUVVGRkxFTkJRVU1zUlVGQlJTeEZRVUZGTzBGQlEzWkRMR05CUVVrc1EwRkJReXhKUVVGSkxFOUJRVThzUlVGQlJUdEJRVU5vUWl4NVFrRkJZU3hEUVVGRExFTkJRVU1zUlVGQlJTeERRVUZETEVWQlFVVXNRMEZCUXl4TFFVRkxMRTlCUVU4c1EwRkJReXhOUVVGTkxFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFVTTdWMEZETDBNN1UwRkRSanRQUVVOR0xFMUJRVTA3UVVGRFRDeFpRVUZKTEZGQlFWRXNXVUZCUVN4RFFVRkRPenRCUVVWaUxHRkJRVXNzU1VGQlNTeEhRVUZITEVsQlFVa3NUMEZCVHl4RlFVRkZPMEZCUTNaQ0xHTkJRVWtzVDBGQlR5eERRVUZETEdOQlFXTXNRMEZCUXl4SFFVRkhMRU5CUVVNc1JVRkJSVHM3T3p0QlFVa3ZRaXhuUWtGQlNTeFJRVUZSTEV0QlFVc3NVMEZCVXl4RlFVRkZPMEZCUXpGQ0xESkNRVUZoTEVOQlFVTXNVVUZCVVN4RlFVRkZMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlF6dGhRVU5vUXp0QlFVTkVMRzlDUVVGUkxFZEJRVWNzUjBGQlJ5eERRVUZETzBGQlEyWXNZVUZCUXl4RlFVRkZMRU5CUVVNN1YwRkRURHRUUVVOR08wRkJRMFFzV1VGQlNTeFJRVUZSTEV0QlFVc3NVMEZCVXl4RlFVRkZPMEZCUXpGQ0xIVkNRVUZoTEVOQlFVTXNVVUZCVVN4RlFVRkZMRU5CUVVNc1IwRkJSeXhEUVVGRExFVkJRVVVzU1VGQlNTeERRVUZETEVOQlFVTTdVMEZEZEVNN1QwRkRSanRMUVVOR096dEJRVVZFTEZGQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1JVRkJSVHRCUVVOWUxGTkJRVWNzUjBGQlJ5eFBRVUZQTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1MwRkRja0k3TzBGQlJVUXNWMEZCVHl4SFFVRkhMRU5CUVVNN1IwRkRXaXhEUVVGRExFTkJRVU03UTBGRFNqczdPenM3T3pzN096czdPenQ1UWtNNVJYRkNMR05CUVdNN096czdjVUpCUlhKQ0xGVkJRVk1zVVVGQlVTeEZRVUZGTzBGQlEyaERMRlZCUVZFc1EwRkJReXhqUVVGakxFTkJRVU1zWlVGQlpTeEZRVUZGTEdsRFFVRm5RenRCUVVOMlJTeFJRVUZKTEZOQlFWTXNRMEZCUXl4TlFVRk5MRXRCUVVzc1EwRkJReXhGUVVGRk96dEJRVVV4UWl4aFFVRlBMRk5CUVZNc1EwRkJRenRMUVVOc1FpeE5RVUZOT3p0QlFVVk1MRmxCUVUwc01rSkJRV01zYlVKQlFXMUNMRWRCUVVjc1UwRkJVeXhEUVVGRExGTkJRVk1zUTBGQlF5eE5RVUZOTEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVNc1NVRkJTU3hIUVVGSExFZEJRVWNzUTBGQlF5eERRVUZETzB0QlEzWkdPMGRCUTBZc1EwRkJReXhEUVVGRE8wTkJRMG83T3pzN096czdPenM3Y1VKRFdtbERMRlZCUVZVN08zRkNRVVUzUWl4VlFVRlRMRkZCUVZFc1JVRkJSVHRCUVVOb1F5eFZRVUZSTEVOQlFVTXNZMEZCWXl4RFFVRkRMRWxCUVVrc1JVRkJSU3hWUVVGVExGZEJRVmNzUlVGQlJTeFBRVUZQTEVWQlFVVTdRVUZETTBRc1VVRkJTU3hyUWtGQlZ5eFhRVUZYTEVOQlFVTXNSVUZCUlR0QlFVRkZMR2xDUVVGWExFZEJRVWNzVjBGQlZ5eERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRMUVVGRk96czdPenRCUVV0MFJTeFJRVUZKTEVGQlFVTXNRMEZCUXl4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRExGZEJRVmNzU1VGQlNTeERRVUZETEZkQlFWY3NTVUZCU3l4bFFVRlJMRmRCUVZjc1EwRkJReXhGUVVGRk8wRkJRM1pGTEdGQlFVOHNUMEZCVHl4RFFVRkRMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dExRVU01UWl4TlFVRk5PMEZCUTB3c1lVRkJUeXhQUVVGUExFTkJRVU1zUlVGQlJTeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMHRCUTNwQ08wZEJRMFlzUTBGQlF5eERRVUZET3p0QlFVVklMRlZCUVZFc1EwRkJReXhqUVVGakxFTkJRVU1zVVVGQlVTeEZRVUZGTEZWQlFWTXNWMEZCVnl4RlFVRkZMRTlCUVU4c1JVRkJSVHRCUVVNdlJDeFhRVUZQTEZGQlFWRXNRMEZCUXl4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zU1VGQlNTeERRVUZETEVsQlFVa3NSVUZCUlN4WFFVRlhMRVZCUVVVc1JVRkJReXhGUVVGRkxFVkJRVVVzVDBGQlR5eERRVUZETEU5QlFVOHNSVUZCUlN4UFFVRlBMRVZCUVVVc1QwRkJUeXhEUVVGRExFVkJRVVVzUlVGQlJTeEpRVUZKTEVWQlFVVXNUMEZCVHl4RFFVRkRMRWxCUVVrc1JVRkJReXhEUVVGRExFTkJRVU03UjBGRGRrZ3NRMEZCUXl4RFFVRkRPME5CUTBvN096czdPenM3T3pzN2NVSkRia0pqTEZWQlFWTXNVVUZCVVN4RlFVRkZPMEZCUTJoRExGVkJRVkVzUTBGQlF5eGpRVUZqTEVOQlFVTXNTMEZCU3l4RlFVRkZMR3REUVVGcFF6dEJRVU01UkN4UlFVRkpMRWxCUVVrc1IwRkJSeXhEUVVGRExGTkJRVk1zUTBGQlF6dFJRVU5zUWl4UFFVRlBMRWRCUVVjc1UwRkJVeXhEUVVGRExGTkJRVk1zUTBGQlF5eE5RVUZOTEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVNN1FVRkRPVU1zVTBGQlN5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMRVZCUVVVc1EwRkJReXhIUVVGSExGTkJRVk1zUTBGQlF5eE5RVUZOTEVkQlFVY3NRMEZCUXl4RlFVRkZMRU5CUVVNc1JVRkJSU3hGUVVGRk8wRkJRemRETEZWQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1UwRkJVeXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdTMEZEZWtJN08wRkJSVVFzVVVGQlNTeExRVUZMTEVkQlFVY3NRMEZCUXl4RFFVRkRPMEZCUTJRc1VVRkJTU3hQUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NTVUZCU1N4SlFVRkpMRVZCUVVVN1FVRkRPVUlzVjBGQlN5eEhRVUZITEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRE8wdEJRelZDTEUxQlFVMHNTVUZCU1N4UFFVRlBMRU5CUVVNc1NVRkJTU3hKUVVGSkxFOUJRVThzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4SlFVRkpMRWxCUVVrc1JVRkJSVHRCUVVOeVJDeFhRVUZMTEVkQlFVY3NUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU03UzBGRE5VSTdRVUZEUkN4UlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGRExFZEJRVWNzUzBGQlN5eERRVUZET3p0QlFVVm9RaXhaUVVGUkxFTkJRVU1zUjBGQlJ5eE5RVUZCTEVOQlFWb3NVVUZCVVN4RlFVRlRMRWxCUVVrc1EwRkJReXhEUVVGRE8wZEJRM2hDTEVOQlFVTXNRMEZCUXp0RFFVTktPenM3T3pzN096czdPM0ZDUTJ4Q1l5eFZRVUZUTEZGQlFWRXNSVUZCUlR0QlFVTm9ReXhWUVVGUkxFTkJRVU1zWTBGQll5eERRVUZETEZGQlFWRXNSVUZCUlN4VlFVRlRMRWRCUVVjc1JVRkJSU3hMUVVGTExFVkJRVVU3UVVGRGNrUXNWMEZCVHl4SFFVRkhMRWxCUVVrc1IwRkJSeXhEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETzBkQlF6RkNMRU5CUVVNc1EwRkJRenREUVVOS096czdPenM3T3pzN08zRkNRMG80UlN4VlFVRlZPenR4UWtGRk1VVXNWVUZCVXl4UlFVRlJMRVZCUVVVN1FVRkRhRU1zVlVGQlVTeERRVUZETEdOQlFXTXNRMEZCUXl4TlFVRk5MRVZCUVVVc1ZVRkJVeXhQUVVGUExFVkJRVVVzVDBGQlR5eEZRVUZGTzBGQlEzcEVMRkZCUVVrc2EwSkJRVmNzVDBGQlR5eERRVUZETEVWQlFVVTdRVUZCUlN4aFFVRlBMRWRCUVVjc1QwRkJUeXhEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0TFFVRkZPenRCUVVVeFJDeFJRVUZKTEVWQlFVVXNSMEZCUnl4UFFVRlBMRU5CUVVNc1JVRkJSU3hEUVVGRE96dEJRVVZ3UWl4UlFVRkpMRU5CUVVNc1pVRkJVU3hQUVVGUExFTkJRVU1zUlVGQlJUdEJRVU55UWl4VlFVRkpMRWxCUVVrc1IwRkJSeXhQUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETzBGQlEzaENMRlZCUVVrc1QwRkJUeXhEUVVGRExFbEJRVWtzU1VGQlNTeFBRVUZQTEVOQlFVTXNSMEZCUnl4RlFVRkZPMEZCUXk5Q0xGbEJRVWtzUjBGQlJ5eHRRa0ZCV1N4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03UVVGRGFrTXNXVUZCU1N4RFFVRkRMRmRCUVZjc1IwRkJSeXg1UWtGQmEwSXNUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhYUVVGWExFVkJRVVVzVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8wOUJRMmhHT3p0QlFVVkVMR0ZCUVU4c1JVRkJSU3hEUVVGRExFOUJRVThzUlVGQlJUdEJRVU5xUWl4WlFVRkpMRVZCUVVVc1NVRkJTVHRCUVVOV0xHMUNRVUZYTEVWQlFVVXNiVUpCUVZrc1EwRkJReXhQUVVGUExFTkJRVU1zUlVGQlJTeERRVUZETEVsQlFVa3NTVUZCU1N4SlFVRkpMRU5CUVVNc1YwRkJWeXhEUVVGRExFTkJRVU03VDBGRGFFVXNRMEZCUXl4RFFVRkRPMHRCUTBvc1RVRkJUVHRCUVVOTUxHRkJRVThzVDBGQlR5eERRVUZETEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRMUVVNNVFqdEhRVU5HTEVOQlFVTXNRMEZCUXp0RFFVTktPenM3T3pzN096czdPM0ZDUTNaQ2NVSXNVMEZCVXpzN1FVRkZMMElzU1VGQlNTeE5RVUZOTEVkQlFVYzdRVUZEV0N4WFFVRlRMRVZCUVVVc1EwRkJReXhQUVVGUExFVkJRVVVzVFVGQlRTeEZRVUZGTEUxQlFVMHNSVUZCUlN4UFFVRlBMRU5CUVVNN1FVRkROME1zVDBGQlN5eEZRVUZGTEUxQlFVMDdPenRCUVVkaUxHRkJRVmNzUlVGQlJTeHhRa0ZCVXl4TFFVRkxMRVZCUVVVN1FVRkRNMElzVVVGQlNTeFBRVUZQTEV0QlFVc3NTMEZCU3l4UlFVRlJMRVZCUVVVN1FVRkROMElzVlVGQlNTeFJRVUZSTEVkQlFVY3NaVUZCVVN4TlFVRk5MRU5CUVVNc1UwRkJVeXhGUVVGRkxFdEJRVXNzUTBGQlF5eFhRVUZYTEVWQlFVVXNRMEZCUXl4RFFVRkRPMEZCUXpsRUxGVkJRVWtzVVVGQlVTeEpRVUZKTEVOQlFVTXNSVUZCUlR0QlFVTnFRaXhoUVVGTExFZEJRVWNzVVVGQlVTeERRVUZETzA5QlEyeENMRTFCUVUwN1FVRkRUQ3hoUVVGTExFZEJRVWNzVVVGQlVTeERRVUZETEV0QlFVc3NSVUZCUlN4RlFVRkZMRU5CUVVNc1EwRkJRenRQUVVNM1FqdExRVU5HT3p0QlFVVkVMRmRCUVU4c1MwRkJTeXhEUVVGRE8wZEJRMlE3T3p0QlFVZEVMRXRCUVVjc1JVRkJSU3hoUVVGVExFdEJRVXNzUlVGQll6dEJRVU12UWl4VFFVRkxMRWRCUVVjc1RVRkJUU3hEUVVGRExGZEJRVmNzUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXpzN1FVRkZiRU1zVVVGQlNTeFBRVUZQTEU5QlFVOHNTMEZCU3l4WFFVRlhMRWxCUVVrc1RVRkJUU3hEUVVGRExGZEJRVmNzUTBGQlF5eE5RVUZOTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWxCUVVrc1MwRkJTeXhGUVVGRk8wRkJReTlGTEZWQlFVa3NUVUZCVFN4SFFVRkhMRTFCUVUwc1EwRkJReXhUUVVGVExFTkJRVU1zUzBGQlN5eERRVUZETEVOQlFVTTdRVUZEY2tNc1ZVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eE5RVUZOTEVOQlFVTXNSVUZCUlRzN1FVRkRjRUlzWTBGQlRTeEhRVUZITEV0QlFVc3NRMEZCUXp0UFFVTm9RanM3ZDBOQlVHMUNMRTlCUVU4N1FVRkJVQ3hsUVVGUE96czdRVUZSTTBJc1lVRkJUeXhEUVVGRExFMUJRVTBzVDBGQlF5eERRVUZtTEU5QlFVOHNSVUZCV1N4UFFVRlBMRU5CUVVNc1EwRkJRenRMUVVNM1FqdEhRVU5HTzBOQlEwWXNRMEZCUXpzN2NVSkJSV0VzVFVGQlRUczdPenM3T3pzN096czdjVUpEYWtOT0xGVkJRVk1zVlVGQlZTeEZRVUZGT3p0QlFVVnNReXhOUVVGSkxFbEJRVWtzUjBGQlJ5eFBRVUZQTEUxQlFVMHNTMEZCU3l4WFFVRlhMRWRCUVVjc1RVRkJUU3hIUVVGSExFMUJRVTA3VFVGRGRFUXNWMEZCVnl4SFFVRkhMRWxCUVVrc1EwRkJReXhWUVVGVkxFTkJRVU03TzBGQlJXeERMRmxCUVZVc1EwRkJReXhWUVVGVkxFZEJRVWNzV1VGQlZ6dEJRVU5xUXl4UlFVRkpMRWxCUVVrc1EwRkJReXhWUVVGVkxFdEJRVXNzVlVGQlZTeEZRVUZGTzBGQlEyeERMRlZCUVVrc1EwRkJReXhWUVVGVkxFZEJRVWNzVjBGQlZ5eERRVUZETzB0QlF5OUNPMEZCUTBRc1YwRkJUeXhWUVVGVkxFTkJRVU03UjBGRGJrSXNRMEZCUXp0RFFVTklPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN08zRkNRMXB6UWl4VFFVRlRPenRKUVVGd1FpeExRVUZMT3p0NVFrRkRTeXhoUVVGaE96czdPMjlDUVVNNFFpeFJRVUZST3p0QlFVVnNSU3hUUVVGVExHRkJRV0VzUTBGQlF5eFpRVUZaTEVWQlFVVTdRVUZETVVNc1RVRkJUU3huUWtGQlowSXNSMEZCUnl4WlFVRlpMRWxCUVVrc1dVRkJXU3hEUVVGRExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTTdUVUZEZGtRc1pVRkJaU3d3UWtGQmIwSXNRMEZCUXpzN1FVRkZNVU1zVFVGQlNTeG5Ra0ZCWjBJc1MwRkJTeXhsUVVGbExFVkJRVVU3UVVGRGVFTXNVVUZCU1N4blFrRkJaMElzUjBGQlJ5eGxRVUZsTEVWQlFVVTdRVUZEZEVNc1ZVRkJUU3hsUVVGbExFZEJRVWNzZFVKQlFXbENMR1ZCUVdVc1EwRkJRenRWUVVOdVJDeG5Ra0ZCWjBJc1IwRkJSeXgxUWtGQmFVSXNaMEpCUVdkQ0xFTkJRVU1zUTBGQlF6dEJRVU0xUkN4WlFVRk5MREpDUVVGakxIbEdRVUY1Uml4SFFVTjJSeXh4UkVGQmNVUXNSMEZCUnl4bFFVRmxMRWRCUVVjc2JVUkJRVzFFTEVkQlFVY3NaMEpCUVdkQ0xFZEJRVWNzU1VGQlNTeERRVUZETEVOQlFVTTdTMEZEYUVzc1RVRkJUVHM3UVVGRlRDeFpRVUZOTERKQ1FVRmpMSGRHUVVGM1JpeEhRVU4wUnl4cFJFRkJhVVFzUjBGQlJ5eFpRVUZaTEVOQlFVTXNRMEZCUXl4RFFVRkRMRWRCUVVjc1NVRkJTU3hEUVVGRExFTkJRVU03UzBGRGJrWTdSMEZEUmp0RFFVTkdPenRCUVVWTkxGTkJRVk1zVVVGQlVTeERRVUZETEZsQlFWa3NSVUZCUlN4SFFVRkhMRVZCUVVVN08wRkJSVEZETEUxQlFVa3NRMEZCUXl4SFFVRkhMRVZCUVVVN1FVRkRVaXhWUVVGTkxESkNRVUZqTEcxRFFVRnRReXhEUVVGRExFTkJRVU03UjBGRE1VUTdRVUZEUkN4TlFVRkpMRU5CUVVNc1dVRkJXU3hKUVVGSkxFTkJRVU1zV1VGQldTeERRVUZETEVsQlFVa3NSVUZCUlR0QlFVTjJReXhWUVVGTkxESkNRVUZqTERKQ1FVRXlRaXhIUVVGSExFOUJRVThzV1VGQldTeERRVUZETEVOQlFVTTdSMEZEZUVVN08wRkJSVVFzWTBGQldTeERRVUZETEVsQlFVa3NRMEZCUXl4VFFVRlRMRWRCUVVjc1dVRkJXU3hEUVVGRExFMUJRVTBzUTBGQlF6czdPenRCUVVsc1JDeExRVUZITEVOQlFVTXNSVUZCUlN4RFFVRkRMR0ZCUVdFc1EwRkJReXhaUVVGWkxFTkJRVU1zVVVGQlVTeERRVUZETEVOQlFVTTdPMEZCUlRWRExGZEJRVk1zYjBKQlFXOUNMRU5CUVVNc1QwRkJUeXhGUVVGRkxFOUJRVThzUlVGQlJTeFBRVUZQTEVWQlFVVTdRVUZEZGtRc1VVRkJTU3hQUVVGUExFTkJRVU1zU1VGQlNTeEZRVUZGTzBGQlEyaENMR0ZCUVU4c1IwRkJSeXhMUVVGTExFTkJRVU1zVFVGQlRTeERRVUZETEVWQlFVVXNSVUZCUlN4UFFVRlBMRVZCUVVVc1QwRkJUeXhEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzBGQlEyeEVMRlZCUVVrc1QwRkJUeXhEUVVGRExFZEJRVWNzUlVGQlJUdEJRVU5tTEdWQlFVOHNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJReXhEUVVGRExFZEJRVWNzU1VGQlNTeERRVUZETzA5QlEzWkNPMHRCUTBZN08wRkJSVVFzVjBGQlR5eEhRVUZITEVkQlFVY3NRMEZCUXl4RlFVRkZMRU5CUVVNc1kwRkJZeXhEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVWQlFVVXNUMEZCVHl4RlFVRkZMRTlCUVU4c1JVRkJSU3hQUVVGUExFTkJRVU1zUTBGQlF6dEJRVU4wUlN4UlFVRkpMRTFCUVUwc1IwRkJSeXhIUVVGSExFTkJRVU1zUlVGQlJTeERRVUZETEdGQlFXRXNRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hGUVVGRkxFOUJRVThzUlVGQlJTeFBRVUZQTEVWQlFVVXNUMEZCVHl4RFFVRkRMRU5CUVVNN08wRkJSWGhGTEZGQlFVa3NUVUZCVFN4SlFVRkpMRWxCUVVrc1NVRkJTU3hIUVVGSExFTkJRVU1zVDBGQlR5eEZRVUZGTzBGQlEycERMR0ZCUVU4c1EwRkJReXhSUVVGUkxFTkJRVU1zVDBGQlR5eERRVUZETEVsQlFVa3NRMEZCUXl4SFFVRkhMRWRCUVVjc1EwRkJReXhQUVVGUExFTkJRVU1zVDBGQlR5eEZRVUZGTEZsQlFWa3NRMEZCUXl4bFFVRmxMRVZCUVVVc1IwRkJSeXhEUVVGRExFTkJRVU03UVVGRGVrWXNXVUZCVFN4SFFVRkhMRTlCUVU4c1EwRkJReXhSUVVGUkxFTkJRVU1zVDBGQlR5eERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRMRTlCUVU4c1JVRkJSU3hQUVVGUExFTkJRVU1zUTBGQlF6dExRVU16UkR0QlFVTkVMRkZCUVVrc1RVRkJUU3hKUVVGSkxFbEJRVWtzUlVGQlJUdEJRVU5zUWl4VlFVRkpMRTlCUVU4c1EwRkJReXhOUVVGTkxFVkJRVVU3UVVGRGJFSXNXVUZCU1N4TFFVRkxMRWRCUVVjc1RVRkJUU3hEUVVGRExFdEJRVXNzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0QlFVTXZRaXhoUVVGTExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNSVUZCUlN4RFFVRkRMRWRCUVVjc1MwRkJTeXhEUVVGRExFMUJRVTBzUlVGQlJTeERRVUZETEVkQlFVY3NRMEZCUXl4RlFVRkZMRU5CUVVNc1JVRkJSU3hGUVVGRk8wRkJRelZETEdOQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNTMEZCU3l4RFFVRkRMRVZCUVVVN1FVRkROVUlzYTBKQlFVMDdWMEZEVURzN1FVRkZSQ3hsUVVGTExFTkJRVU1zUTBGQlF5eERRVUZETEVkQlFVY3NUMEZCVHl4RFFVRkRMRTFCUVUwc1IwRkJSeXhMUVVGTExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdVMEZEZEVNN1FVRkRSQ3hqUVVGTkxFZEJRVWNzUzBGQlN5eERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRQUVVNelFqdEJRVU5FTEdGQlFVOHNUVUZCVFN4RFFVRkRPMHRCUTJZc1RVRkJUVHRCUVVOTUxGbEJRVTBzTWtKQlFXTXNZMEZCWXl4SFFVRkhMRTlCUVU4c1EwRkJReXhKUVVGSkxFZEJRVWNzTUVSQlFUQkVMRU5CUVVNc1EwRkJRenRMUVVOcVNEdEhRVU5HT3pzN1FVRkhSQ3hOUVVGSkxGTkJRVk1zUjBGQlJ6dEJRVU5rTEZWQlFVMHNSVUZCUlN4blFrRkJVeXhIUVVGSExFVkJRVVVzU1VGQlNTeEZRVUZGTzBGQlF6RkNMRlZCUVVrc1JVRkJSU3hKUVVGSkxFbEJRVWtzUjBGQlJ5eERRVUZCTEVGQlFVTXNSVUZCUlR0QlFVTnNRaXhqUVVGTkxESkNRVUZqTEVkQlFVY3NSMEZCUnl4SlFVRkpMRWRCUVVjc2JVSkJRVzFDTEVkQlFVY3NSMEZCUnl4RFFVRkRMRU5CUVVNN1QwRkROMFE3UVVGRFJDeGhRVUZQTEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRMUVVOc1FqdEJRVU5FTEZWQlFVMHNSVUZCUlN4blFrRkJVeXhOUVVGTkxFVkJRVVVzU1VGQlNTeEZRVUZGTzBGQlF6ZENMRlZCUVUwc1IwRkJSeXhIUVVGSExFMUJRVTBzUTBGQlF5eE5RVUZOTEVOQlFVTTdRVUZETVVJc1YwRkJTeXhKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZETEVWQlFVVXNRMEZCUXl4SFFVRkhMRWRCUVVjc1JVRkJSU3hEUVVGRExFVkJRVVVzUlVGQlJUdEJRVU0xUWl4WlFVRkpMRTFCUVUwc1EwRkJReXhEUVVGRExFTkJRVU1zU1VGQlNTeE5RVUZOTEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzU1VGQlNTeEZRVUZGTzBGQlEzaERMR2xDUVVGUExFMUJRVTBzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRUUVVONFFqdFBRVU5HTzB0QlEwWTdRVUZEUkN4VlFVRk5MRVZCUVVVc1owSkJRVk1zVDBGQlR5eEZRVUZGTEU5QlFVOHNSVUZCUlR0QlFVTnFReXhoUVVGUExFOUJRVThzVDBGQlR5eExRVUZMTEZWQlFWVXNSMEZCUnl4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eEhRVUZITEU5QlFVOHNRMEZCUXp0TFFVTjRSVHM3UVVGRlJDeHZRa0ZCWjBJc1JVRkJSU3hMUVVGTExFTkJRVU1zWjBKQlFXZENPMEZCUTNoRExHbENRVUZoTEVWQlFVVXNiMEpCUVc5Q096dEJRVVZ1UXl4TlFVRkZMRVZCUVVVc1dVRkJVeXhEUVVGRExFVkJRVVU3UVVGRFpDeFZRVUZKTEVkQlFVY3NSMEZCUnl4WlFVRlpMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU03UVVGRE1VSXNVMEZCUnl4RFFVRkRMRk5CUVZNc1IwRkJSeXhaUVVGWkxFTkJRVU1zUTBGQlF5eEhRVUZITEVsQlFVa3NRMEZCUXl4RFFVRkRPMEZCUTNaRExHRkJRVThzUjBGQlJ5eERRVUZETzB0QlExbzdPMEZCUlVRc1dVRkJVU3hGUVVGRkxFVkJRVVU3UVVGRFdpeFhRVUZQTEVWQlFVVXNhVUpCUVZNc1EwRkJReXhGUVVGRkxFbEJRVWtzUlVGQlJTeHRRa0ZCYlVJc1JVRkJSU3hYUVVGWExFVkJRVVVzVFVGQlRTeEZRVUZGTzBGQlEyNUZMRlZCUVVrc1kwRkJZeXhIUVVGSExFbEJRVWtzUTBGQlF5eFJRVUZSTEVOQlFVTXNRMEZCUXl4RFFVRkRPMVZCUTJwRExFVkJRVVVzUjBGQlJ5eEpRVUZKTEVOQlFVTXNSVUZCUlN4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRE8wRkJRM0JDTEZWQlFVa3NTVUZCU1N4SlFVRkpMRTFCUVUwc1NVRkJTU3hYUVVGWExFbEJRVWtzYlVKQlFXMUNMRVZCUVVVN1FVRkRlRVFzYzBKQlFXTXNSMEZCUnl4WFFVRlhMRU5CUVVNc1NVRkJTU3hGUVVGRkxFTkJRVU1zUlVGQlJTeEZRVUZGTEVWQlFVVXNTVUZCU1N4RlFVRkZMRzFDUVVGdFFpeEZRVUZGTEZkQlFWY3NSVUZCUlN4TlFVRk5MRU5CUVVNc1EwRkJRenRQUVVNelJpeE5RVUZOTEVsQlFVa3NRMEZCUXl4alFVRmpMRVZCUVVVN1FVRkRNVUlzYzBKQlFXTXNSMEZCUnl4SlFVRkpMRU5CUVVNc1VVRkJVU3hEUVVGRExFTkJRVU1zUTBGQlF5eEhRVUZITEZkQlFWY3NRMEZCUXl4SlFVRkpMRVZCUVVVc1EwRkJReXhGUVVGRkxFVkJRVVVzUTBGQlF5eERRVUZETzA5QlF6bEVPMEZCUTBRc1lVRkJUeXhqUVVGakxFTkJRVU03UzBGRGRrSTdPMEZCUlVRc1VVRkJTU3hGUVVGRkxHTkJRVk1zUzBGQlN5eEZRVUZGTEV0QlFVc3NSVUZCUlR0QlFVTXpRaXhoUVVGUExFdEJRVXNzU1VGQlNTeExRVUZMTEVWQlFVVXNSVUZCUlR0QlFVTjJRaXhoUVVGTExFZEJRVWNzUzBGQlN5eERRVUZETEU5QlFVOHNRMEZCUXp0UFFVTjJRanRCUVVORUxHRkJRVThzUzBGQlN5eERRVUZETzB0QlEyUTdRVUZEUkN4VFFVRkxMRVZCUVVVc1pVRkJVeXhMUVVGTExFVkJRVVVzVFVGQlRTeEZRVUZGTzBGQlF6ZENMRlZCUVVrc1IwRkJSeXhIUVVGSExFdEJRVXNzU1VGQlNTeE5RVUZOTEVOQlFVTTdPMEZCUlRGQ0xGVkJRVWtzUzBGQlN5eEpRVUZKTEUxQlFVMHNTVUZCU3l4TFFVRkxMRXRCUVVzc1RVRkJUU3hCUVVGRExFVkJRVVU3UVVGRGVrTXNWMEZCUnl4SFFVRkhMRXRCUVVzc1EwRkJReXhOUVVGTkxFTkJRVU1zUlVGQlJTeEZRVUZGTEUxQlFVMHNSVUZCUlN4TFFVRkxMRU5CUVVNc1EwRkJRenRQUVVOMlF6czdRVUZGUkN4aFFVRlBMRWRCUVVjc1EwRkJRenRMUVVOYU96dEJRVVZFTEdWQlFWY3NSVUZCUlN4TlFVRk5MRU5CUVVNc1NVRkJTU3hEUVVGRExFVkJRVVVzUTBGQlF6czdRVUZGTlVJc1VVRkJTU3hGUVVGRkxFZEJRVWNzUTBGQlF5eEZRVUZGTEVOQlFVTXNTVUZCU1R0QlFVTnFRaXhuUWtGQldTeEZRVUZGTEZsQlFWa3NRMEZCUXl4UlFVRlJPMGRCUTNCRExFTkJRVU03TzBGQlJVWXNWMEZCVXl4SFFVRkhMRU5CUVVNc1QwRkJUeXhGUVVGblFqdFJRVUZrTEU5QlFVOHNlVVJCUVVjc1JVRkJSVHM3UVVGRGFFTXNVVUZCU1N4SlFVRkpMRWRCUVVjc1QwRkJUeXhEUVVGRExFbEJRVWtzUTBGQlF6czdRVUZGZUVJc1QwRkJSeXhEUVVGRExFMUJRVTBzUTBGQlF5eFBRVUZQTEVOQlFVTXNRMEZCUXp0QlFVTndRaXhSUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEU5QlFVOHNTVUZCU1N4WlFVRlpMRU5CUVVNc1QwRkJUeXhGUVVGRk8wRkJRelZETEZWQlFVa3NSMEZCUnl4UlFVRlJMRU5CUVVNc1QwRkJUeXhGUVVGRkxFbEJRVWtzUTBGQlF5eERRVUZETzB0QlEyaERPMEZCUTBRc1VVRkJTU3hOUVVGTkxGbEJRVUU3VVVGRFRpeFhRVUZYTEVkQlFVY3NXVUZCV1N4RFFVRkRMR05CUVdNc1IwRkJSeXhGUVVGRkxFZEJRVWNzVTBGQlV5eERRVUZETzBGQlF5OUVMRkZCUVVrc1dVRkJXU3hEUVVGRExGTkJRVk1zUlVGQlJUdEJRVU14UWl4VlFVRkpMRTlCUVU4c1EwRkJReXhOUVVGTkxFVkJRVVU3UVVGRGJFSXNZMEZCVFN4SFFVRkhMRTlCUVU4c1NVRkJTU3hQUVVGUExFTkJRVU1zVFVGQlRTeERRVUZETEVOQlFVTXNRMEZCUXl4SFFVRkhMRU5CUVVNc1QwRkJUeXhEUVVGRExFTkJRVU1zVFVGQlRTeERRVUZETEU5QlFVOHNRMEZCUXl4TlFVRk5MRU5CUVVNc1IwRkJSeXhQUVVGUExFTkJRVU1zVFVGQlRTeERRVUZETzA5QlF6TkdMRTFCUVUwN1FVRkRUQ3hqUVVGTkxFZEJRVWNzUTBGQlF5eFBRVUZQTEVOQlFVTXNRMEZCUXp0UFFVTndRanRMUVVOR096dEJRVVZFTEdGQlFWTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1owSkJRV1U3UVVGRGJFTXNZVUZCVHl4RlFVRkZMRWRCUVVjc1dVRkJXU3hEUVVGRExFbEJRVWtzUTBGQlF5eFRRVUZUTEVWQlFVVXNUMEZCVHl4RlFVRkZMRk5CUVZNc1EwRkJReXhQUVVGUExFVkJRVVVzVTBGQlV5eERRVUZETEZGQlFWRXNSVUZCUlN4SlFVRkpMRVZCUVVVc1YwRkJWeXhGUVVGRkxFMUJRVTBzUTBGQlF5eERRVUZETzB0QlEzSklPMEZCUTBRc1VVRkJTU3hIUVVGSExHbENRVUZwUWl4RFFVRkRMRmxCUVZrc1EwRkJReXhKUVVGSkxFVkJRVVVzU1VGQlNTeEZRVUZGTEZOQlFWTXNSVUZCUlN4UFFVRlBMRU5CUVVNc1RVRkJUU3hKUVVGSkxFVkJRVVVzUlVGQlJTeEpRVUZKTEVWQlFVVXNWMEZCVnl4RFFVRkRMRU5CUVVNN1FVRkRkRWNzVjBGQlR5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RlFVRkZMRTlCUVU4c1EwRkJReXhEUVVGRE8wZEJReTlDTzBGQlEwUXNTMEZCUnl4RFFVRkRMRXRCUVVzc1IwRkJSeXhKUVVGSkxFTkJRVU03TzBGQlJXcENMRXRCUVVjc1EwRkJReXhOUVVGTkxFZEJRVWNzVlVGQlV5eFBRVUZQTEVWQlFVVTdRVUZETjBJc1VVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eFBRVUZQTEVWQlFVVTdRVUZEY0VJc1pVRkJVeXhEUVVGRExFOUJRVThzUjBGQlJ5eFRRVUZUTEVOQlFVTXNTMEZCU3l4RFFVRkRMRTlCUVU4c1EwRkJReXhQUVVGUExFVkJRVVVzUjBGQlJ5eERRVUZETEU5QlFVOHNRMEZCUXl4RFFVRkRPenRCUVVWc1JTeFZRVUZKTEZsQlFWa3NRMEZCUXl4VlFVRlZMRVZCUVVVN1FVRkRNMElzYVVKQlFWTXNRMEZCUXl4UlFVRlJMRWRCUVVjc1UwRkJVeXhEUVVGRExFdEJRVXNzUTBGQlF5eFBRVUZQTEVOQlFVTXNVVUZCVVN4RlFVRkZMRWRCUVVjc1EwRkJReXhSUVVGUkxFTkJRVU1zUTBGQlF6dFBRVU4wUlR0QlFVTkVMRlZCUVVrc1dVRkJXU3hEUVVGRExGVkJRVlVzU1VGQlNTeFpRVUZaTEVOQlFVTXNZVUZCWVN4RlFVRkZPMEZCUTNwRUxHbENRVUZUTEVOQlFVTXNWVUZCVlN4SFFVRkhMRk5CUVZNc1EwRkJReXhMUVVGTExFTkJRVU1zVDBGQlR5eERRVUZETEZWQlFWVXNSVUZCUlN4SFFVRkhMRU5CUVVNc1ZVRkJWU3hEUVVGRExFTkJRVU03VDBGRE5VVTdTMEZEUml4TlFVRk5PMEZCUTB3c1pVRkJVeXhEUVVGRExFOUJRVThzUjBGQlJ5eFBRVUZQTEVOQlFVTXNUMEZCVHl4RFFVRkRPMEZCUTNCRExHVkJRVk1zUTBGQlF5eFJRVUZSTEVkQlFVY3NUMEZCVHl4RFFVRkRMRkZCUVZFc1EwRkJRenRCUVVOMFF5eGxRVUZUTEVOQlFVTXNWVUZCVlN4SFFVRkhMRTlCUVU4c1EwRkJReXhWUVVGVkxFTkJRVU03UzBGRE0wTTdSMEZEUml4RFFVRkRPenRCUVVWR0xFdEJRVWNzUTBGQlF5eE5RVUZOTEVkQlFVY3NWVUZCVXl4RFFVRkRMRVZCUVVVc1NVRkJTU3hGUVVGRkxGZEJRVmNzUlVGQlJTeE5RVUZOTEVWQlFVVTdRVUZEYkVRc1VVRkJTU3haUVVGWkxFTkJRVU1zWTBGQll5eEpRVUZKTEVOQlFVTXNWMEZCVnl4RlFVRkZPMEZCUXk5RExGbEJRVTBzTWtKQlFXTXNkMEpCUVhkQ0xFTkJRVU1zUTBGQlF6dExRVU12UXp0QlFVTkVMRkZCUVVrc1dVRkJXU3hEUVVGRExGTkJRVk1zU1VGQlNTeERRVUZETEUxQlFVMHNSVUZCUlR0QlFVTnlReXhaUVVGTkxESkNRVUZqTEhsQ1FVRjVRaXhEUVVGRExFTkJRVU03UzBGRGFFUTdPMEZCUlVRc1YwRkJUeXhYUVVGWExFTkJRVU1zVTBGQlV5eEZRVUZGTEVOQlFVTXNSVUZCUlN4WlFVRlpMRU5CUVVNc1EwRkJReXhEUVVGRExFVkJRVVVzU1VGQlNTeEZRVUZGTEVOQlFVTXNSVUZCUlN4WFFVRlhMRVZCUVVVc1RVRkJUU3hEUVVGRExFTkJRVU03UjBGRGFrWXNRMEZCUXp0QlFVTkdMRk5CUVU4c1IwRkJSeXhEUVVGRE8wTkJRMW83TzBGQlJVMHNVMEZCVXl4WFFVRlhMRU5CUVVNc1UwRkJVeXhGUVVGRkxFTkJRVU1zUlVGQlJTeEZRVUZGTEVWQlFVVXNTVUZCU1N4RlFVRkZMRzFDUVVGdFFpeEZRVUZGTEZkQlFWY3NSVUZCUlN4TlFVRk5MRVZCUVVVN1FVRkROVVlzVjBGQlV5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RlFVRm5RanRSUVVGa0xFOUJRVThzZVVSQlFVY3NSVUZCUlRzN1FVRkRha01zVVVGQlNTeGhRVUZoTEVkQlFVY3NUVUZCVFN4RFFVRkRPMEZCUXpOQ0xGRkJRVWtzVFVGQlRTeEpRVUZKTEU5QlFVOHNTVUZCU1N4TlFVRk5MRU5CUVVNc1EwRkJReXhEUVVGRExFbEJRVWtzUlVGQlJTeFBRVUZQTEV0QlFVc3NVMEZCVXl4RFFVRkRMRmRCUVZjc1NVRkJTU3hOUVVGTkxFTkJRVU1zUTBGQlF5eERRVUZETEV0QlFVc3NTVUZCU1N4RFFVRkJMRUZCUVVNc1JVRkJSVHRCUVVOb1J5eHRRa0ZCWVN4SFFVRkhMRU5CUVVNc1QwRkJUeXhEUVVGRExFTkJRVU1zVFVGQlRTeERRVUZETEUxQlFVMHNRMEZCUXl4RFFVRkRPMHRCUXpGRE96dEJRVVZFTEZkQlFVOHNSVUZCUlN4RFFVRkRMRk5CUVZNc1JVRkRaaXhQUVVGUExFVkJRMUFzVTBGQlV5eERRVUZETEU5QlFVOHNSVUZCUlN4VFFVRlRMRU5CUVVNc1VVRkJVU3hGUVVOeVF5eFBRVUZQTEVOQlFVTXNTVUZCU1N4SlFVRkpMRWxCUVVrc1JVRkRjRUlzVjBGQlZ5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMRmRCUVZjc1EwRkJReXhEUVVGRExFMUJRVTBzUTBGQlF5eFhRVUZYTEVOQlFVTXNSVUZEZUVRc1lVRkJZU3hEUVVGRExFTkJRVU03UjBGRGNFSTdPMEZCUlVRc1RVRkJTU3hIUVVGSExHbENRVUZwUWl4RFFVRkRMRVZCUVVVc1JVRkJSU3hKUVVGSkxFVkJRVVVzVTBGQlV5eEZRVUZGTEUxQlFVMHNSVUZCUlN4SlFVRkpMRVZCUVVVc1YwRkJWeXhEUVVGRExFTkJRVU03TzBGQlJYcEZMRTFCUVVrc1EwRkJReXhQUVVGUExFZEJRVWNzUTBGQlF5eERRVUZETzBGQlEycENMRTFCUVVrc1EwRkJReXhMUVVGTExFZEJRVWNzVFVGQlRTeEhRVUZITEUxQlFVMHNRMEZCUXl4TlFVRk5MRWRCUVVjc1EwRkJReXhEUVVGRE8wRkJRM2hETEUxQlFVa3NRMEZCUXl4WFFVRlhMRWRCUVVjc2JVSkJRVzFDTEVsQlFVa3NRMEZCUXl4RFFVRkRPMEZCUXpWRExGTkJRVThzU1VGQlNTeERRVUZETzBOQlEySTdPMEZCUlUwc1UwRkJVeXhqUVVGakxFTkJRVU1zVDBGQlR5eEZRVUZGTEU5QlFVOHNSVUZCUlN4UFFVRlBMRVZCUVVVN1FVRkRlRVFzVFVGQlNTeERRVUZETEU5QlFVOHNSVUZCUlR0QlFVTmFMRkZCUVVrc1QwRkJUeXhEUVVGRExFbEJRVWtzUzBGQlN5eG5Ra0ZCWjBJc1JVRkJSVHRCUVVOeVF5eGhRVUZQTEVkQlFVY3NUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhsUVVGbExFTkJRVU1zUTBGQlF6dExRVU42UXl4TlFVRk5PMEZCUTB3c1lVRkJUeXhIUVVGSExFOUJRVThzUTBGQlF5eFJRVUZSTEVOQlFVTXNUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8wdEJRekZETzBkQlEwWXNUVUZCVFN4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRExFbEJRVWtzU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4SlFVRkpMRVZCUVVVN08wRkJSWHBETEZkQlFVOHNRMEZCUXl4SlFVRkpMRWRCUVVjc1QwRkJUeXhEUVVGRE8wRkJRM1pDTEZkQlFVOHNSMEZCUnl4UFFVRlBMRU5CUVVNc1VVRkJVU3hEUVVGRExFOUJRVThzUTBGQlF5eERRVUZETzBkQlEzSkRPMEZCUTBRc1UwRkJUeXhQUVVGUExFTkJRVU03UTBGRGFFSTdPMEZCUlUwc1UwRkJVeXhoUVVGaExFTkJRVU1zVDBGQlR5eEZRVUZGTEU5QlFVOHNSVUZCUlN4UFFVRlBMRVZCUVVVN08wRkJSWFpFTEUxQlFVMHNiVUpCUVcxQ0xFZEJRVWNzVDBGQlR5eERRVUZETEVsQlFVa3NTVUZCU1N4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRExHVkJRV1VzUTBGQlF5eERRVUZETzBGQlF6RkZMRk5CUVU4c1EwRkJReXhQUVVGUExFZEJRVWNzU1VGQlNTeERRVUZETzBGQlEzWkNMRTFCUVVrc1QwRkJUeXhEUVVGRExFZEJRVWNzUlVGQlJUdEJRVU5tTEZkQlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNc1YwRkJWeXhIUVVGSExFOUJRVThzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRkRMRWxCUVVrc1QwRkJUeXhEUVVGRExFbEJRVWtzUTBGQlF5eFhRVUZYTEVOQlFVTTdSMEZEZGtVN08wRkJSVVFzVFVGQlNTeFpRVUZaTEZsQlFVRXNRMEZCUXp0QlFVTnFRaXhOUVVGSkxFOUJRVThzUTBGQlF5eEZRVUZGTEVsQlFVa3NUMEZCVHl4RFFVRkRMRVZCUVVVc1MwRkJTeXhKUVVGSkxFVkJRVVU3TzBGQlEzSkRMR0ZCUVU4c1EwRkJReXhKUVVGSkxFZEJRVWNzYTBKQlFWa3NUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE96dEJRVVY2UXl4VlFVRkpMRVZCUVVVc1IwRkJSeXhQUVVGUExFTkJRVU1zUlVGQlJTeERRVUZETzBGQlEzQkNMR3RDUVVGWkxFZEJRVWNzVDBGQlR5eERRVUZETEVsQlFVa3NRMEZCUXl4bFFVRmxMRU5CUVVNc1IwRkJSeXhUUVVGVExHMUNRVUZ0UWl4RFFVRkRMRTlCUVU4c1JVRkJaMEk3V1VGQlpDeFBRVUZQTEhsRVFVRkhMRVZCUVVVN096czdRVUZKTDBZc1pVRkJUeXhEUVVGRExFbEJRVWtzUjBGQlJ5eHJRa0ZCV1N4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03UVVGRGVrTXNaVUZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhsUVVGbExFTkJRVU1zUjBGQlJ5eHRRa0ZCYlVJc1EwRkJRenRCUVVOd1JDeGxRVUZQTEVWQlFVVXNRMEZCUXl4UFFVRlBMRVZCUVVVc1QwRkJUeXhEUVVGRExFTkJRVU03VDBGRE4wSXNRMEZCUXp0QlFVTkdMRlZCUVVrc1JVRkJSU3hEUVVGRExGRkJRVkVzUlVGQlJUdEJRVU5tTEdWQlFVOHNRMEZCUXl4UlFVRlJMRWRCUVVjc1MwRkJTeXhEUVVGRExFMUJRVTBzUTBGQlF5eEZRVUZGTEVWQlFVVXNUMEZCVHl4RFFVRkRMRkZCUVZFc1JVRkJSU3hGUVVGRkxFTkJRVU1zVVVGQlVTeERRVUZETEVOQlFVTTdUMEZEY0VVN08wZEJRMFk3TzBGQlJVUXNUVUZCU1N4UFFVRlBMRXRCUVVzc1UwRkJVeXhKUVVGSkxGbEJRVmtzUlVGQlJUdEJRVU42UXl4WFFVRlBMRWRCUVVjc1dVRkJXU3hEUVVGRE8wZEJRM2hDT3p0QlFVVkVMRTFCUVVrc1QwRkJUeXhMUVVGTExGTkJRVk1zUlVGQlJUdEJRVU42UWl4VlFVRk5MREpDUVVGakxHTkJRV01zUjBGQlJ5eFBRVUZQTEVOQlFVTXNTVUZCU1N4SFFVRkhMSEZDUVVGeFFpeERRVUZETEVOQlFVTTdSMEZETlVVc1RVRkJUU3hKUVVGSkxFOUJRVThzV1VGQldTeFJRVUZSTEVWQlFVVTdRVUZEZEVNc1YwRkJUeXhQUVVGUExFTkJRVU1zVDBGQlR5eEZRVUZGTEU5QlFVOHNRMEZCUXl4RFFVRkRPMGRCUTJ4RE8wTkJRMFk3TzBGQlJVMHNVMEZCVXl4SlFVRkpMRWRCUVVjN1FVRkJSU3hUUVVGUExFVkJRVVVzUTBGQlF6dERRVUZGT3p0QlFVVnlReXhUUVVGVExGRkJRVkVzUTBGQlF5eFBRVUZQTEVWQlFVVXNTVUZCU1N4RlFVRkZPMEZCUXk5Q0xFMUJRVWtzUTBGQlF5eEpRVUZKTEVsQlFVa3NSVUZCUlN4TlFVRk5MRWxCUVVrc1NVRkJTU3hEUVVGQkxFRkJRVU1zUlVGQlJUdEJRVU01UWl4UlFVRkpMRWRCUVVjc1NVRkJTU3hIUVVGSExHdENRVUZaTEVsQlFVa3NRMEZCUXl4SFFVRkhMRVZCUVVVc1EwRkJRenRCUVVOeVF5eFJRVUZKTEVOQlFVTXNTVUZCU1N4SFFVRkhMRTlCUVU4c1EwRkJRenRIUVVOeVFqdEJRVU5FTEZOQlFVOHNTVUZCU1N4RFFVRkRPME5CUTJJN08wRkJSVVFzVTBGQlV5eHBRa0ZCYVVJc1EwRkJReXhGUVVGRkxFVkJRVVVzU1VGQlNTeEZRVUZGTEZOQlFWTXNSVUZCUlN4TlFVRk5MRVZCUVVVc1NVRkJTU3hGUVVGRkxGZEJRVmNzUlVGQlJUdEJRVU42UlN4TlFVRkpMRVZCUVVVc1EwRkJReXhUUVVGVExFVkJRVVU3UVVGRGFFSXNVVUZCU1N4TFFVRkxMRWRCUVVjc1JVRkJSU3hEUVVGRE8wRkJRMllzVVVGQlNTeEhRVUZITEVWQlFVVXNRMEZCUXl4VFFVRlRMRU5CUVVNc1NVRkJTU3hGUVVGRkxFdEJRVXNzUlVGQlJTeFRRVUZUTEVWQlFVVXNUVUZCVFN4SlFVRkpMRTFCUVUwc1EwRkJReXhEUVVGRExFTkJRVU1zUlVGQlJTeEpRVUZKTEVWQlFVVXNWMEZCVnl4RlFVRkZMRTFCUVUwc1EwRkJReXhEUVVGRE8wRkJRelZHTEZOQlFVc3NRMEZCUXl4TlFVRk5MRU5CUVVNc1NVRkJTU3hGUVVGRkxFdEJRVXNzUTBGQlF5eERRVUZETzBkQlF6TkNPMEZCUTBRc1UwRkJUeXhKUVVGSkxFTkJRVU03UTBGRFlqczdPenM3T3pzN1FVTjJVa1FzVTBGQlV5eFZRVUZWTEVOQlFVTXNUVUZCVFN4RlFVRkZPMEZCUXpGQ0xFMUJRVWtzUTBGQlF5eE5RVUZOTEVkQlFVY3NUVUZCVFN4RFFVRkRPME5CUTNSQ096dEJRVVZFTEZWQlFWVXNRMEZCUXl4VFFVRlRMRU5CUVVNc1VVRkJVU3hIUVVGSExGVkJRVlVzUTBGQlF5eFRRVUZUTEVOQlFVTXNUVUZCVFN4SFFVRkhMRmxCUVZjN1FVRkRka1VzVTBGQlR5eEZRVUZGTEVkQlFVY3NTVUZCU1N4RFFVRkRMRTFCUVUwc1EwRkJRenREUVVONlFpeERRVUZET3p0eFFrRkZZU3hWUVVGVk96czdPenM3T3pzN096czdPenM3UVVOVWVrSXNTVUZCVFN4TlFVRk5MRWRCUVVjN1FVRkRZaXhMUVVGSExFVkJRVVVzVDBGQlR6dEJRVU5hTEV0QlFVY3NSVUZCUlN4TlFVRk5PMEZCUTFnc1MwRkJSeXhGUVVGRkxFMUJRVTA3UVVGRFdDeExRVUZITEVWQlFVVXNVVUZCVVR0QlFVTmlMRXRCUVVjc1JVRkJSU3hSUVVGUk8wRkJRMklzUzBGQlJ5eEZRVUZGTEZGQlFWRTdRVUZEWWl4TFFVRkhMRVZCUVVVc1VVRkJVVHREUVVOa0xFTkJRVU03TzBGQlJVWXNTVUZCVFN4UlFVRlJMRWRCUVVjc1dVRkJXVHRKUVVOMlFpeFJRVUZSTEVkQlFVY3NWMEZCVnl4RFFVRkRPenRCUVVVM1FpeFRRVUZUTEZWQlFWVXNRMEZCUXl4SFFVRkhMRVZCUVVVN1FVRkRka0lzVTBGQlR5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNN1EwRkRjRUk3TzBGQlJVMHNVMEZCVXl4TlFVRk5MRU5CUVVNc1IwRkJSeXh2UWtGQmJVSTdRVUZETTBNc1QwRkJTeXhKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZETEVWQlFVVXNRMEZCUXl4SFFVRkhMRk5CUVZNc1EwRkJReXhOUVVGTkxFVkJRVVVzUTBGQlF5eEZRVUZGTEVWQlFVVTdRVUZEZWtNc1UwRkJTeXhKUVVGSkxFZEJRVWNzU1VGQlNTeFRRVUZUTEVOQlFVTXNRMEZCUXl4RFFVRkRMRVZCUVVVN1FVRkROVUlzVlVGQlNTeE5RVUZOTEVOQlFVTXNVMEZCVXl4RFFVRkRMR05CUVdNc1EwRkJReXhKUVVGSkxFTkJRVU1zVTBGQlV5eERRVUZETEVOQlFVTXNRMEZCUXl4RlFVRkZMRWRCUVVjc1EwRkJReXhGUVVGRk8wRkJRek5FTEZkQlFVY3NRMEZCUXl4SFFVRkhMRU5CUVVNc1IwRkJSeXhUUVVGVExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNN1QwRkRPVUk3UzBGRFJqdEhRVU5HT3p0QlFVVkVMRk5CUVU4c1IwRkJSeXhEUVVGRE8wTkJRMW83TzBGQlJVMHNTVUZCU1N4UlFVRlJMRWRCUVVjc1RVRkJUU3hEUVVGRExGTkJRVk1zUTBGQlF5eFJRVUZSTEVOQlFVTTdPenM3T3p0QlFVdG9SQ3hKUVVGSkxGVkJRVlVzUjBGQlJ5eHZRa0ZCVXl4TFFVRkxMRVZCUVVVN1FVRkRMMElzVTBGQlR5eFBRVUZQTEV0QlFVc3NTMEZCU3l4VlFVRlZMRU5CUVVNN1EwRkRjRU1zUTBGQlF6czdPMEZCUjBZc1NVRkJTU3hWUVVGVkxFTkJRVU1zUjBGQlJ5eERRVUZETEVWQlFVVTdRVUZEYmtJc1ZVRkpUU3hWUVVGVkxFZEJTbWhDTEZWQlFWVXNSMEZCUnl4VlFVRlRMRXRCUVVzc1JVRkJSVHRCUVVNelFpeFhRVUZQTEU5QlFVOHNTMEZCU3l4TFFVRkxMRlZCUVZVc1NVRkJTU3hSUVVGUkxFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4TFFVRkxMRzFDUVVGdFFpeERRVUZETzBkQlEzQkdMRU5CUVVNN1EwRkRTRHRSUVVOUExGVkJRVlVzUjBGQlZpeFZRVUZWT3pzN096dEJRVWxZTEVsQlFVMHNUMEZCVHl4SFFVRkhMRXRCUVVzc1EwRkJReXhQUVVGUExFbEJRVWtzVlVGQlV5eExRVUZMTEVWQlFVVTdRVUZEZEVRc1UwRkJUeXhCUVVGRExFdEJRVXNzU1VGQlNTeFBRVUZQTEV0QlFVc3NTMEZCU3l4UlFVRlJMRWRCUVVrc1VVRkJVU3hEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVOQlFVTXNTMEZCU3l4blFrRkJaMElzUjBGQlJ5eExRVUZMTEVOQlFVTTdRMEZEYWtjc1EwRkJRenM3T3pzN1FVRkhTeXhUUVVGVExFOUJRVThzUTBGQlF5eExRVUZMTEVWQlFVVXNTMEZCU3l4RlFVRkZPMEZCUTNCRExFOUJRVXNzU1VGQlNTeERRVUZETEVkQlFVY3NRMEZCUXl4RlFVRkZMRWRCUVVjc1IwRkJSeXhMUVVGTExFTkJRVU1zVFVGQlRTeEZRVUZGTEVOQlFVTXNSMEZCUnl4SFFVRkhMRVZCUVVVc1EwRkJReXhGUVVGRkxFVkJRVVU3UVVGRGFFUXNVVUZCU1N4TFFVRkxMRU5CUVVNc1EwRkJReXhEUVVGRExFdEJRVXNzUzBGQlN5eEZRVUZGTzBGQlEzUkNMR0ZCUVU4c1EwRkJReXhEUVVGRE8wdEJRMVk3UjBGRFJqdEJRVU5FTEZOQlFVOHNRMEZCUXl4RFFVRkRMRU5CUVVNN1EwRkRXRHM3UVVGSFRTeFRRVUZUTEdkQ1FVRm5RaXhEUVVGRExFMUJRVTBzUlVGQlJUdEJRVU4yUXl4TlFVRkpMRTlCUVU4c1RVRkJUU3hMUVVGTExGRkJRVkVzUlVGQlJUczdRVUZGT1VJc1VVRkJTU3hOUVVGTkxFbEJRVWtzVFVGQlRTeERRVUZETEUxQlFVMHNSVUZCUlR0QlFVTXpRaXhoUVVGUExFMUJRVTBzUTBGQlF5eE5RVUZOTEVWQlFVVXNRMEZCUXp0TFFVTjRRaXhOUVVGTkxFbEJRVWtzVFVGQlRTeEpRVUZKTEVsQlFVa3NSVUZCUlR0QlFVTjZRaXhoUVVGUExFVkJRVVVzUTBGQlF6dExRVU5ZTEUxQlFVMHNTVUZCU1N4RFFVRkRMRTFCUVUwc1JVRkJSVHRCUVVOc1FpeGhRVUZQTEUxQlFVMHNSMEZCUnl4RlFVRkZMRU5CUVVNN1MwRkRjRUk3T3pzN08wRkJTMFFzVlVGQlRTeEhRVUZITEVWQlFVVXNSMEZCUnl4TlFVRk5MRU5CUVVNN1IwRkRkRUk3TzBGQlJVUXNUVUZCU1N4RFFVRkRMRkZCUVZFc1EwRkJReXhKUVVGSkxFTkJRVU1zVFVGQlRTeERRVUZETEVWQlFVVTdRVUZCUlN4WFFVRlBMRTFCUVUwc1EwRkJRenRIUVVGRk8wRkJRemxETEZOQlFVOHNUVUZCVFN4RFFVRkRMRTlCUVU4c1EwRkJReXhSUVVGUkxFVkJRVVVzVlVGQlZTeERRVUZETEVOQlFVTTdRMEZETjBNN08wRkJSVTBzVTBGQlV5eFBRVUZQTEVOQlFVTXNTMEZCU3l4RlFVRkZPMEZCUXpkQ0xFMUJRVWtzUTBGQlF5eExRVUZMTEVsQlFVa3NTMEZCU3l4TFFVRkxMRU5CUVVNc1JVRkJSVHRCUVVONlFpeFhRVUZQTEVsQlFVa3NRMEZCUXp0SFFVTmlMRTFCUVUwc1NVRkJTU3hQUVVGUExFTkJRVU1zUzBGQlN5eERRVUZETEVsQlFVa3NTMEZCU3l4RFFVRkRMRTFCUVUwc1MwRkJTeXhEUVVGRExFVkJRVVU3UVVGREwwTXNWMEZCVHl4SlFVRkpMRU5CUVVNN1IwRkRZaXhOUVVGTk8wRkJRMHdzVjBGQlR5eExRVUZMTEVOQlFVTTdSMEZEWkR0RFFVTkdPenRCUVVWTkxGTkJRVk1zVjBGQlZ5eERRVUZETEUxQlFVMHNSVUZCUlR0QlFVTnNReXhOUVVGSkxFdEJRVXNzUjBGQlJ5eE5RVUZOTEVOQlFVTXNSVUZCUlN4RlFVRkZMRTFCUVUwc1EwRkJReXhEUVVGRE8wRkJReTlDTEU5QlFVc3NRMEZCUXl4UFFVRlBMRWRCUVVjc1RVRkJUU3hEUVVGRE8wRkJRM1pDTEZOQlFVOHNTMEZCU3l4RFFVRkRPME5CUTJRN08wRkJSVTBzVTBGQlV5eFhRVUZYTEVOQlFVTXNUVUZCVFN4RlFVRkZMRWRCUVVjc1JVRkJSVHRCUVVOMlF5eFJRVUZOTEVOQlFVTXNTVUZCU1N4SFFVRkhMRWRCUVVjc1EwRkJRenRCUVVOc1FpeFRRVUZQTEUxQlFVMHNRMEZCUXp0RFFVTm1PenRCUVVWTkxGTkJRVk1zYVVKQlFXbENMRU5CUVVNc1YwRkJWeXhGUVVGRkxFVkJRVVVzUlVGQlJUdEJRVU5xUkN4VFFVRlBMRU5CUVVNc1YwRkJWeXhIUVVGSExGZEJRVmNzUjBGQlJ5eEhRVUZITEVkQlFVY3NSVUZCUlN4RFFVRkJMRWRCUVVrc1JVRkJSU3hEUVVGRE8wTkJRM0JFT3pzN08wRkRNMGRFTzBGQlEwRTdRVUZEUVR0QlFVTkJPenM3TzBGRFEwRTdPenM3T3p0QlFVVkJPMEZCUTBFc1NVRkJTU3haUVVGWkxIRkNRVUZqTEVWQlFVVXNUVUZCVFN4UFFVRlNMRVZCUVdRc1EwRkJhRUk3TzBGQlJVRTdRVUZVUVR0QlFVTkJPenRCUVVWQk8wRkJUMEVzVTBGQlV5eGpRVUZVTEVOQlFYZENMRmRCUVhoQ0xFVkJRWEZETEZOQlFYSkRMRWRCUVdsRUxGTkJRV3BFT3p0QlFVVkJPMEZCUTBFc1VVRkJVU3hIUVVGU0xFTkJRVmtzWVVGQldqczdPMEZEWWtFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRWlMQ0ptYVd4bElqb2laMlZ1WlhKaGRHVmtMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSWlobWRXNWpkR2x2YmlCbEtIUXNiaXh5S1h0bWRXNWpkR2x2YmlCektHOHNkU2w3YVdZb0lXNWJiMTBwZTJsbUtDRjBXMjlkS1h0MllYSWdZVDEwZVhCbGIyWWdjbVZ4ZFdseVpUMDlYQ0ptZFc1amRHbHZibHdpSmlaeVpYRjFhWEpsTzJsbUtDRjFKaVpoS1hKbGRIVnliaUJoS0c4c0lUQXBPMmxtS0drcGNtVjBkWEp1SUdrb2J5d2hNQ2s3ZG1GeUlHWTlibVYzSUVWeWNtOXlLRndpUTJGdWJtOTBJR1pwYm1RZ2JXOWtkV3hsSUNkY0lpdHZLMXdpSjF3aUtUdDBhSEp2ZHlCbUxtTnZaR1U5WENKTlQwUlZURVZmVGs5VVgwWlBWVTVFWENJc1puMTJZWElnYkQxdVcyOWRQWHRsZUhCdmNuUnpPbnQ5ZlR0MFcyOWRXekJkTG1OaGJHd29iQzVsZUhCdmNuUnpMR1oxYm1OMGFXOXVLR1VwZTNaaGNpQnVQWFJiYjExYk1WMWJaVjA3Y21WMGRYSnVJSE1vYmo5dU9tVXBmU3hzTEd3dVpYaHdiM0owY3l4bExIUXNiaXh5S1gxeVpYUjFjbTRnYmx0dlhTNWxlSEJ2Y25SemZYWmhjaUJwUFhSNWNHVnZaaUJ5WlhGMWFYSmxQVDFjSW1aMWJtTjBhVzl1WENJbUpuSmxjWFZwY21VN1ptOXlLSFpoY2lCdlBUQTdienh5TG14bGJtZDBhRHR2S3lzcGN5aHlXMjlkS1R0eVpYUjFjbTRnYzMwcElpd2lhVzF3YjNKMElDb2dZWE1nWW1GelpTQm1jbTl0SUNjdUwyaGhibVJzWldKaGNuTXZZbUZ6WlNjN1hHNWNiaTh2SUVWaFkyZ2diMllnZEdobGMyVWdZWFZuYldWdWRDQjBhR1VnU0dGdVpHeGxZbUZ5Y3lCdlltcGxZM1F1SUU1dklHNWxaV1FnZEc4Z2MyVjBkWEFnYUdWeVpTNWNiaTh2SUNoVWFHbHpJR2x6SUdSdmJtVWdkRzhnWldGemFXeDVJSE5vWVhKbElHTnZaR1VnWW1WMGQyVmxiaUJqYjIxdGIyNXFjeUJoYm1RZ1luSnZkM05sSUdWdWRuTXBYRzVwYlhCdmNuUWdVMkZtWlZOMGNtbHVaeUJtY205dElDY3VMMmhoYm1Sc1pXSmhjbk12YzJGbVpTMXpkSEpwYm1jbk8xeHVhVzF3YjNKMElFVjRZMlZ3ZEdsdmJpQm1jbTl0SUNjdUwyaGhibVJzWldKaGNuTXZaWGhqWlhCMGFXOXVKenRjYm1sdGNHOXlkQ0FxSUdGeklGVjBhV3h6SUdaeWIyMGdKeTR2YUdGdVpHeGxZbUZ5Y3k5MWRHbHNjeWM3WEc1cGJYQnZjblFnS2lCaGN5QnlkVzUwYVcxbElHWnliMjBnSnk0dmFHRnVaR3hsWW1GeWN5OXlkVzUwYVcxbEp6dGNibHh1YVcxd2IzSjBJRzV2UTI5dVpteHBZM1FnWm5KdmJTQW5MaTlvWVc1a2JHVmlZWEp6TDI1dkxXTnZibVpzYVdOMEp6dGNibHh1THk4Z1JtOXlJR052YlhCaGRHbGlhV3hwZEhrZ1lXNWtJSFZ6WVdkbElHOTFkSE5wWkdVZ2IyWWdiVzlrZFd4bElITjVjM1JsYlhNc0lHMWhhMlVnZEdobElFaGhibVJzWldKaGNuTWdiMkpxWldOMElHRWdibUZ0WlhOd1lXTmxYRzVtZFc1amRHbHZiaUJqY21WaGRHVW9LU0I3WEc0Z0lHeGxkQ0JvWWlBOUlHNWxkeUJpWVhObExraGhibVJzWldKaGNuTkZiblpwY205dWJXVnVkQ2dwTzF4dVhHNGdJRlYwYVd4ekxtVjRkR1Z1WkNob1lpd2dZbUZ6WlNrN1hHNGdJR2hpTGxOaFptVlRkSEpwYm1jZ1BTQlRZV1psVTNSeWFXNW5PMXh1SUNCb1lpNUZlR05sY0hScGIyNGdQU0JGZUdObGNIUnBiMjQ3WEc0Z0lHaGlMbFYwYVd4eklEMGdWWFJwYkhNN1hHNGdJR2hpTG1WelkyRndaVVY0Y0hKbGMzTnBiMjRnUFNCVmRHbHNjeTVsYzJOaGNHVkZlSEJ5WlhOemFXOXVPMXh1WEc0Z0lHaGlMbFpOSUQwZ2NuVnVkR2x0WlR0Y2JpQWdhR0l1ZEdWdGNHeGhkR1VnUFNCbWRXNWpkR2x2YmloemNHVmpLU0I3WEc0Z0lDQWdjbVYwZFhKdUlISjFiblJwYldVdWRHVnRjR3hoZEdVb2MzQmxZeXdnYUdJcE8xeHVJQ0I5TzF4dVhHNGdJSEpsZEhWeWJpQm9ZanRjYm4xY2JseHViR1YwSUdsdWMzUWdQU0JqY21WaGRHVW9LVHRjYm1sdWMzUXVZM0psWVhSbElEMGdZM0psWVhSbE8xeHVYRzV1YjBOdmJtWnNhV04wS0dsdWMzUXBPMXh1WEc1cGJuTjBXeWRrWldaaGRXeDBKMTBnUFNCcGJuTjBPMXh1WEc1bGVIQnZjblFnWkdWbVlYVnNkQ0JwYm5OME8xeHVJaXdpYVcxd2IzSjBJSHRqY21WaGRHVkdjbUZ0WlN3Z1pYaDBaVzVrTENCMGIxTjBjbWx1WjMwZ1puSnZiU0FuTGk5MWRHbHNjeWM3WEc1cGJYQnZjblFnUlhoalpYQjBhVzl1SUdaeWIyMGdKeTR2WlhoalpYQjBhVzl1Snp0Y2JtbHRjRzl5ZENCN2NtVm5hWE4wWlhKRVpXWmhkV3gwU0dWc2NHVnljMzBnWm5KdmJTQW5MaTlvWld4d1pYSnpKenRjYm1sdGNHOXlkQ0I3Y21WbmFYTjBaWEpFWldaaGRXeDBSR1ZqYjNKaGRHOXljMzBnWm5KdmJTQW5MaTlrWldOdmNtRjBiM0p6Snp0Y2JtbHRjRzl5ZENCc2IyZG5aWElnWm5KdmJTQW5MaTlzYjJkblpYSW5PMXh1WEc1bGVIQnZjblFnWTI5dWMzUWdWa1ZTVTBsUFRpQTlJQ2MwTGpBdU1UQW5PMXh1Wlhod2IzSjBJR052Ym5OMElFTlBUVkJKVEVWU1gxSkZWa2xUU1U5T0lEMGdOenRjYmx4dVpYaHdiM0owSUdOdmJuTjBJRkpGVmtsVFNVOU9YME5JUVU1SFJWTWdQU0I3WEc0Z0lERTZJQ2M4UFNBeExqQXVjbU11TWljc0lDOHZJREV1TUM1eVl5NHlJR2x6SUdGamRIVmhiR3g1SUhKbGRqSWdZblYwSUdSdlpYTnVKM1FnY21Wd2IzSjBJR2wwWEc0Z0lESTZJQ2M5UFNBeExqQXVNQzF5WXk0ekp5eGNiaUFnTXpvZ0p6MDlJREV1TUM0d0xYSmpMalFuTEZ4dUlDQTBPaUFuUFQwZ01TNTRMbmduTEZ4dUlDQTFPaUFuUFQwZ01pNHdMakF0WVd4d2FHRXVlQ2NzWEc0Z0lEWTZJQ2MrUFNBeUxqQXVNQzFpWlhSaExqRW5MRnh1SUNBM09pQW5QajBnTkM0d0xqQW5YRzU5TzF4dVhHNWpiMjV6ZENCdlltcGxZM1JVZVhCbElEMGdKMXR2WW1wbFkzUWdUMkpxWldOMFhTYzdYRzVjYm1WNGNHOXlkQ0JtZFc1amRHbHZiaUJJWVc1a2JHVmlZWEp6Ulc1MmFYSnZibTFsYm5Rb2FHVnNjR1Z5Y3l3Z2NHRnlkR2xoYkhNc0lHUmxZMjl5WVhSdmNuTXBJSHRjYmlBZ2RHaHBjeTVvWld4d1pYSnpJRDBnYUdWc2NHVnljeUI4ZkNCN2ZUdGNiaUFnZEdocGN5NXdZWEowYVdGc2N5QTlJSEJoY25ScFlXeHpJSHg4SUh0OU8xeHVJQ0IwYUdsekxtUmxZMjl5WVhSdmNuTWdQU0JrWldOdmNtRjBiM0p6SUh4OElIdDlPMXh1WEc0Z0lISmxaMmx6ZEdWeVJHVm1ZWFZzZEVobGJIQmxjbk1vZEdocGN5azdYRzRnSUhKbFoybHpkR1Z5UkdWbVlYVnNkRVJsWTI5eVlYUnZjbk1vZEdocGN5azdYRzU5WEc1Y2JraGhibVJzWldKaGNuTkZiblpwY205dWJXVnVkQzV3Y205MGIzUjVjR1VnUFNCN1hHNGdJR052Ym5OMGNuVmpkRzl5T2lCSVlXNWtiR1ZpWVhKelJXNTJhWEp2Ym0xbGJuUXNYRzVjYmlBZ2JHOW5aMlZ5T2lCc2IyZG5aWElzWEc0Z0lHeHZaem9nYkc5bloyVnlMbXh2Wnl4Y2JseHVJQ0J5WldkcGMzUmxja2hsYkhCbGNqb2dablZ1WTNScGIyNG9ibUZ0WlN3Z1ptNHBJSHRjYmlBZ0lDQnBaaUFvZEc5VGRISnBibWN1WTJGc2JDaHVZVzFsS1NBOVBUMGdiMkpxWldOMFZIbHdaU2tnZTF4dUlDQWdJQ0FnYVdZZ0tHWnVLU0I3SUhSb2NtOTNJRzVsZHlCRmVHTmxjSFJwYjI0b0owRnlaeUJ1YjNRZ2MzVndjRzl5ZEdWa0lIZHBkR2dnYlhWc2RHbHdiR1VnYUdWc2NHVnljeWNwT3lCOVhHNGdJQ0FnSUNCbGVIUmxibVFvZEdocGN5NW9aV3h3WlhKekxDQnVZVzFsS1R0Y2JpQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdkR2hwY3k1b1pXeHdaWEp6VzI1aGJXVmRJRDBnWm00N1hHNGdJQ0FnZlZ4dUlDQjlMRnh1SUNCMWJuSmxaMmx6ZEdWeVNHVnNjR1Z5T2lCbWRXNWpkR2x2YmlodVlXMWxLU0I3WEc0Z0lDQWdaR1ZzWlhSbElIUm9hWE11YUdWc2NHVnljMXR1WVcxbFhUdGNiaUFnZlN4Y2JseHVJQ0J5WldkcGMzUmxjbEJoY25ScFlXdzZJR1oxYm1OMGFXOXVLRzVoYldVc0lIQmhjblJwWVd3cElIdGNiaUFnSUNCcFppQW9kRzlUZEhKcGJtY3VZMkZzYkNodVlXMWxLU0E5UFQwZ2IySnFaV04wVkhsd1pTa2dlMXh1SUNBZ0lDQWdaWGgwWlc1a0tIUm9hWE11Y0dGeWRHbGhiSE1zSUc1aGJXVXBPMXh1SUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNCcFppQW9kSGx3Wlc5bUlIQmhjblJwWVd3Z1BUMDlJQ2QxYm1SbFptbHVaV1FuS1NCN1hHNGdJQ0FnSUNBZ0lIUm9jbTkzSUc1bGR5QkZlR05sY0hScGIyNG9ZRUYwZEdWdGNIUnBibWNnZEc4Z2NtVm5hWE4wWlhJZ1lTQndZWEowYVdGc0lHTmhiR3hsWkNCY0lpUjdibUZ0WlgxY0lpQmhjeUIxYm1SbFptbHVaV1JnS1R0Y2JpQWdJQ0FnSUgxY2JpQWdJQ0FnSUhSb2FYTXVjR0Z5ZEdsaGJITmJibUZ0WlYwZ1BTQndZWEowYVdGc08xeHVJQ0FnSUgxY2JpQWdmU3hjYmlBZ2RXNXlaV2RwYzNSbGNsQmhjblJwWVd3NklHWjFibU4wYVc5dUtHNWhiV1VwSUh0Y2JpQWdJQ0JrWld4bGRHVWdkR2hwY3k1d1lYSjBhV0ZzYzF0dVlXMWxYVHRjYmlBZ2ZTeGNibHh1SUNCeVpXZHBjM1JsY2tSbFkyOXlZWFJ2Y2pvZ1puVnVZM1JwYjI0b2JtRnRaU3dnWm00cElIdGNiaUFnSUNCcFppQW9kRzlUZEhKcGJtY3VZMkZzYkNodVlXMWxLU0E5UFQwZ2IySnFaV04wVkhsd1pTa2dlMXh1SUNBZ0lDQWdhV1lnS0dadUtTQjdJSFJvY205M0lHNWxkeUJGZUdObGNIUnBiMjRvSjBGeVp5QnViM1FnYzNWd2NHOXlkR1ZrSUhkcGRHZ2diWFZzZEdsd2JHVWdaR1ZqYjNKaGRHOXljeWNwT3lCOVhHNGdJQ0FnSUNCbGVIUmxibVFvZEdocGN5NWtaV052Y21GMGIzSnpMQ0J1WVcxbEtUdGNiaUFnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnZEdocGN5NWtaV052Y21GMGIzSnpXMjVoYldWZElEMGdabTQ3WEc0Z0lDQWdmVnh1SUNCOUxGeHVJQ0IxYm5KbFoybHpkR1Z5UkdWamIzSmhkRzl5T2lCbWRXNWpkR2x2YmlodVlXMWxLU0I3WEc0Z0lDQWdaR1ZzWlhSbElIUm9hWE11WkdWamIzSmhkRzl5YzF0dVlXMWxYVHRjYmlBZ2ZWeHVmVHRjYmx4dVpYaHdiM0owSUd4bGRDQnNiMmNnUFNCc2IyZG5aWEl1Ykc5bk8xeHVYRzVsZUhCdmNuUWdlMk55WldGMFpVWnlZVzFsTENCc2IyZG5aWEo5TzF4dUlpd2lhVzF3YjNKMElISmxaMmx6ZEdWeVNXNXNhVzVsSUdaeWIyMGdKeTR2WkdWamIzSmhkRzl5Y3k5cGJteHBibVVuTzF4dVhHNWxlSEJ2Y25RZ1puVnVZM1JwYjI0Z2NtVm5hWE4wWlhKRVpXWmhkV3gwUkdWamIzSmhkRzl5Y3locGJuTjBZVzVqWlNrZ2UxeHVJQ0J5WldkcGMzUmxja2x1YkdsdVpTaHBibk4wWVc1alpTazdYRzU5WEc1Y2JpSXNJbWx0Y0c5eWRDQjdaWGgwWlc1a2ZTQm1jbTl0SUNjdUxpOTFkR2xzY3ljN1hHNWNibVY0Y0c5eWRDQmtaV1poZFd4MElHWjFibU4wYVc5dUtHbHVjM1JoYm1ObEtTQjdYRzRnSUdsdWMzUmhibU5sTG5KbFoybHpkR1Z5UkdWamIzSmhkRzl5S0NkcGJteHBibVVuTENCbWRXNWpkR2x2YmlobWJpd2djSEp2Y0hNc0lHTnZiblJoYVc1bGNpd2diM0IwYVc5dWN5a2dlMXh1SUNBZ0lHeGxkQ0J5WlhRZ1BTQm1ianRjYmlBZ0lDQnBaaUFvSVhCeWIzQnpMbkJoY25ScFlXeHpLU0I3WEc0Z0lDQWdJQ0J3Y205d2N5NXdZWEowYVdGc2N5QTlJSHQ5TzF4dUlDQWdJQ0FnY21WMElEMGdablZ1WTNScGIyNG9ZMjl1ZEdWNGRDd2diM0IwYVc5dWN5a2dlMXh1SUNBZ0lDQWdJQ0F2THlCRGNtVmhkR1VnWVNCdVpYY2djR0Z5ZEdsaGJITWdjM1JoWTJzZ1puSmhiV1VnY0hKcGIzSWdkRzhnWlhobFl5NWNiaUFnSUNBZ0lDQWdiR1YwSUc5eWFXZHBibUZzSUQwZ1kyOXVkR0ZwYm1WeUxuQmhjblJwWVd4ek8xeHVJQ0FnSUNBZ0lDQmpiMjUwWVdsdVpYSXVjR0Z5ZEdsaGJITWdQU0JsZUhSbGJtUW9lMzBzSUc5eWFXZHBibUZzTENCd2NtOXdjeTV3WVhKMGFXRnNjeWs3WEc0Z0lDQWdJQ0FnSUd4bGRDQnlaWFFnUFNCbWJpaGpiMjUwWlhoMExDQnZjSFJwYjI1ektUdGNiaUFnSUNBZ0lDQWdZMjl1ZEdGcGJtVnlMbkJoY25ScFlXeHpJRDBnYjNKcFoybHVZV3c3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJ5WlhRN1hHNGdJQ0FnSUNCOU8xeHVJQ0FnSUgxY2JseHVJQ0FnSUhCeWIzQnpMbkJoY25ScFlXeHpXMjl3ZEdsdmJuTXVZWEpuYzFzd1hWMGdQU0J2Y0hScGIyNXpMbVp1TzF4dVhHNGdJQ0FnY21WMGRYSnVJSEpsZER0Y2JpQWdmU2s3WEc1OVhHNGlMQ0pjYm1OdmJuTjBJR1Z5Y205eVVISnZjSE1nUFNCYkoyUmxjMk55YVhCMGFXOXVKeXdnSjJacGJHVk9ZVzFsSnl3Z0oyeHBibVZPZFcxaVpYSW5MQ0FuYldWemMyRm5aU2NzSUNkdVlXMWxKeXdnSjI1MWJXSmxjaWNzSUNkemRHRmpheWRkTzF4dVhHNW1kVzVqZEdsdmJpQkZlR05sY0hScGIyNG9iV1Z6YzJGblpTd2dibTlrWlNrZ2UxeHVJQ0JzWlhRZ2JHOWpJRDBnYm05a1pTQW1KaUJ1YjJSbExteHZZeXhjYmlBZ0lDQWdJR3hwYm1Vc1hHNGdJQ0FnSUNCamIyeDFiVzQ3WEc0Z0lHbG1JQ2hzYjJNcElIdGNiaUFnSUNCc2FXNWxJRDBnYkc5akxuTjBZWEowTG14cGJtVTdYRzRnSUNBZ1kyOXNkVzF1SUQwZ2JHOWpMbk4wWVhKMExtTnZiSFZ0Ymp0Y2JseHVJQ0FnSUcxbGMzTmhaMlVnS3owZ0p5QXRJQ2NnS3lCc2FXNWxJQ3NnSnpvbklDc2dZMjlzZFcxdU8xeHVJQ0I5WEc1Y2JpQWdiR1YwSUhSdGNDQTlJRVZ5Y205eUxuQnliM1J2ZEhsd1pTNWpiMjV6ZEhKMVkzUnZjaTVqWVd4c0tIUm9hWE1zSUcxbGMzTmhaMlVwTzF4dVhHNGdJQzh2SUZWdVptOXlkSFZ1WVhSbGJIa2daWEp5YjNKeklHRnlaU0J1YjNRZ1pXNTFiV1Z5WVdKc1pTQnBiaUJEYUhKdmJXVWdLR0YwSUd4bFlYTjBLU3dnYzI4Z1lHWnZjaUJ3Y205d0lHbHVJSFJ0Y0dBZ1pHOWxjMjRuZENCM2IzSnJMbHh1SUNCbWIzSWdLR3hsZENCcFpIZ2dQU0F3T3lCcFpIZ2dQQ0JsY25KdmNsQnliM0J6TG14bGJtZDBhRHNnYVdSNEt5c3BJSHRjYmlBZ0lDQjBhR2x6VzJWeWNtOXlVSEp2Y0hOYmFXUjRYVjBnUFNCMGJYQmJaWEp5YjNKUWNtOXdjMXRwWkhoZFhUdGNiaUFnZlZ4dVhHNGdJQzhxSUdsemRHRnVZblZzSUdsbmJtOXlaU0JsYkhObElDb3ZYRzRnSUdsbUlDaEZjbkp2Y2k1allYQjBkWEpsVTNSaFkydFVjbUZqWlNrZ2UxeHVJQ0FnSUVWeWNtOXlMbU5oY0hSMWNtVlRkR0ZqYTFSeVlXTmxLSFJvYVhNc0lFVjRZMlZ3ZEdsdmJpazdYRzRnSUgxY2JseHVJQ0IwY25rZ2UxeHVJQ0FnSUdsbUlDaHNiMk1wSUh0Y2JpQWdJQ0FnSUhSb2FYTXViR2x1WlU1MWJXSmxjaUE5SUd4cGJtVTdYRzVjYmlBZ0lDQWdJQzh2SUZkdmNtc2dZWEp2ZFc1a0lHbHpjM1ZsSUhWdVpHVnlJSE5oWm1GeWFTQjNhR1Z5WlNCM1pTQmpZVzRuZENCa2FYSmxZM1JzZVNCelpYUWdkR2hsSUdOdmJIVnRiaUIyWVd4MVpWeHVJQ0FnSUNBZ0x5b2dhWE4wWVc1aWRXd2dhV2R1YjNKbElHNWxlSFFnS2k5Y2JpQWdJQ0FnSUdsbUlDaFBZbXBsWTNRdVpHVm1hVzVsVUhKdmNHVnlkSGtwSUh0Y2JpQWdJQ0FnSUNBZ1QySnFaV04wTG1SbFptbHVaVkJ5YjNCbGNuUjVLSFJvYVhNc0lDZGpiMngxYlc0bkxDQjdYRzRnSUNBZ0lDQWdJQ0FnZG1Gc2RXVTZJR052YkhWdGJpeGNiaUFnSUNBZ0lDQWdJQ0JsYm5WdFpYSmhZbXhsT2lCMGNuVmxYRzRnSUNBZ0lDQWdJSDBwTzF4dUlDQWdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQ0FnZEdocGN5NWpiMngxYlc0Z1BTQmpiMngxYlc0N1hHNGdJQ0FnSUNCOVhHNGdJQ0FnZlZ4dUlDQjlJR05oZEdOb0lDaHViM0FwSUh0Y2JpQWdJQ0F2S2lCSloyNXZjbVVnYVdZZ2RHaGxJR0p5YjNkelpYSWdhWE1nZG1WeWVTQndZWEowYVdOMWJHRnlJQ292WEc0Z0lIMWNibjFjYmx4dVJYaGpaWEIwYVc5dUxuQnliM1J2ZEhsd1pTQTlJRzVsZHlCRmNuSnZjaWdwTzF4dVhHNWxlSEJ2Y25RZ1pHVm1ZWFZzZENCRmVHTmxjSFJwYjI0N1hHNGlMQ0pwYlhCdmNuUWdjbVZuYVhOMFpYSkNiRzlqYTBobGJIQmxjazFwYzNOcGJtY2dabkp2YlNBbkxpOW9aV3h3WlhKekwySnNiMk5yTFdobGJIQmxjaTF0YVhOemFXNW5KenRjYm1sdGNHOXlkQ0J5WldkcGMzUmxja1ZoWTJnZ1puSnZiU0FuTGk5b1pXeHdaWEp6TDJWaFkyZ25PMXh1YVcxd2IzSjBJSEpsWjJsemRHVnlTR1ZzY0dWeVRXbHpjMmx1WnlCbWNtOXRJQ2N1TDJobGJIQmxjbk12YUdWc2NHVnlMVzFwYzNOcGJtY25PMXh1YVcxd2IzSjBJSEpsWjJsemRHVnlTV1lnWm5KdmJTQW5MaTlvWld4d1pYSnpMMmxtSnp0Y2JtbHRjRzl5ZENCeVpXZHBjM1JsY2t4dlp5Qm1jbTl0SUNjdUwyaGxiSEJsY25NdmJHOW5KenRjYm1sdGNHOXlkQ0J5WldkcGMzUmxja3h2YjJ0MWNDQm1jbTl0SUNjdUwyaGxiSEJsY25NdmJHOXZhM1Z3Snp0Y2JtbHRjRzl5ZENCeVpXZHBjM1JsY2xkcGRHZ2dabkp2YlNBbkxpOW9aV3h3WlhKekwzZHBkR2duTzF4dVhHNWxlSEJ2Y25RZ1puVnVZM1JwYjI0Z2NtVm5hWE4wWlhKRVpXWmhkV3gwU0dWc2NHVnljeWhwYm5OMFlXNWpaU2tnZTF4dUlDQnlaV2RwYzNSbGNrSnNiMk5yU0dWc2NHVnlUV2x6YzJsdVp5aHBibk4wWVc1alpTazdYRzRnSUhKbFoybHpkR1Z5UldGamFDaHBibk4wWVc1alpTazdYRzRnSUhKbFoybHpkR1Z5U0dWc2NHVnlUV2x6YzJsdVp5aHBibk4wWVc1alpTazdYRzRnSUhKbFoybHpkR1Z5U1dZb2FXNXpkR0Z1WTJVcE8xeHVJQ0J5WldkcGMzUmxja3h2WnlocGJuTjBZVzVqWlNrN1hHNGdJSEpsWjJsemRHVnlURzl2YTNWd0tHbHVjM1JoYm1ObEtUdGNiaUFnY21WbmFYTjBaWEpYYVhSb0tHbHVjM1JoYm1ObEtUdGNibjFjYmlJc0ltbHRjRzl5ZENCN1lYQndaVzVrUTI5dWRHVjRkRkJoZEdnc0lHTnlaV0YwWlVaeVlXMWxMQ0JwYzBGeWNtRjVmU0JtY205dElDY3VMaTkxZEdsc2N5YzdYRzVjYm1WNGNHOXlkQ0JrWldaaGRXeDBJR1oxYm1OMGFXOXVLR2x1YzNSaGJtTmxLU0I3WEc0Z0lHbHVjM1JoYm1ObExuSmxaMmx6ZEdWeVNHVnNjR1Z5S0NkaWJHOWphMGhsYkhCbGNrMXBjM05wYm1jbkxDQm1kVzVqZEdsdmJpaGpiMjUwWlhoMExDQnZjSFJwYjI1ektTQjdYRzRnSUNBZ2JHVjBJR2x1ZG1WeWMyVWdQU0J2Y0hScGIyNXpMbWx1ZG1WeWMyVXNYRzRnSUNBZ0lDQWdJR1p1SUQwZ2IzQjBhVzl1Y3k1bWJqdGNibHh1SUNBZ0lHbG1JQ2hqYjI1MFpYaDBJRDA5UFNCMGNuVmxLU0I3WEc0Z0lDQWdJQ0J5WlhSMWNtNGdabTRvZEdocGN5azdYRzRnSUNBZ2ZTQmxiSE5sSUdsbUlDaGpiMjUwWlhoMElEMDlQU0JtWVd4elpTQjhmQ0JqYjI1MFpYaDBJRDA5SUc1MWJHd3BJSHRjYmlBZ0lDQWdJSEpsZEhWeWJpQnBiblpsY25ObEtIUm9hWE1wTzF4dUlDQWdJSDBnWld4elpTQnBaaUFvYVhOQmNuSmhlU2hqYjI1MFpYaDBLU2tnZTF4dUlDQWdJQ0FnYVdZZ0tHTnZiblJsZUhRdWJHVnVaM1JvSUQ0Z01Da2dlMXh1SUNBZ0lDQWdJQ0JwWmlBb2IzQjBhVzl1Y3k1cFpITXBJSHRjYmlBZ0lDQWdJQ0FnSUNCdmNIUnBiMjV6TG1sa2N5QTlJRnR2Y0hScGIyNXpMbTVoYldWZE8xeHVJQ0FnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJR2x1YzNSaGJtTmxMbWhsYkhCbGNuTXVaV0ZqYUNoamIyNTBaWGgwTENCdmNIUnBiMjV6S1R0Y2JpQWdJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJwYm5abGNuTmxLSFJvYVhNcE8xeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0JwWmlBb2IzQjBhVzl1Y3k1a1lYUmhJQ1ltSUc5d2RHbHZibk11YVdSektTQjdYRzRnSUNBZ0lDQWdJR3hsZENCa1lYUmhJRDBnWTNKbFlYUmxSbkpoYldVb2IzQjBhVzl1Y3k1a1lYUmhLVHRjYmlBZ0lDQWdJQ0FnWkdGMFlTNWpiMjUwWlhoMFVHRjBhQ0E5SUdGd2NHVnVaRU52Ym5SbGVIUlFZWFJvS0c5d2RHbHZibk11WkdGMFlTNWpiMjUwWlhoMFVHRjBhQ3dnYjNCMGFXOXVjeTV1WVcxbEtUdGNiaUFnSUNBZ0lDQWdiM0IwYVc5dWN5QTlJSHRrWVhSaE9pQmtZWFJoZlR0Y2JpQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ2NtVjBkWEp1SUdadUtHTnZiblJsZUhRc0lHOXdkR2x2Ym5NcE8xeHVJQ0FnSUgxY2JpQWdmU2s3WEc1OVhHNGlMQ0pwYlhCdmNuUWdlMkZ3Y0dWdVpFTnZiblJsZUhSUVlYUm9MQ0JpYkc5amExQmhjbUZ0Y3l3Z1kzSmxZWFJsUm5KaGJXVXNJR2x6UVhKeVlYa3NJR2x6Um5WdVkzUnBiMjU5SUdaeWIyMGdKeTR1TDNWMGFXeHpKenRjYm1sdGNHOXlkQ0JGZUdObGNIUnBiMjRnWm5KdmJTQW5MaTR2WlhoalpYQjBhVzl1Snp0Y2JseHVaWGh3YjNKMElHUmxabUYxYkhRZ1puVnVZM1JwYjI0b2FXNXpkR0Z1WTJVcElIdGNiaUFnYVc1emRHRnVZMlV1Y21WbmFYTjBaWEpJWld4d1pYSW9KMlZoWTJnbkxDQm1kVzVqZEdsdmJpaGpiMjUwWlhoMExDQnZjSFJwYjI1ektTQjdYRzRnSUNBZ2FXWWdLQ0Z2Y0hScGIyNXpLU0I3WEc0Z0lDQWdJQ0IwYUhKdmR5QnVaWGNnUlhoalpYQjBhVzl1S0NkTmRYTjBJSEJoYzNNZ2FYUmxjbUYwYjNJZ2RHOGdJMlZoWTJnbktUdGNiaUFnSUNCOVhHNWNiaUFnSUNCc1pYUWdabTRnUFNCdmNIUnBiMjV6TG1adUxGeHVJQ0FnSUNBZ0lDQnBiblpsY25ObElEMGdiM0IwYVc5dWN5NXBiblpsY25ObExGeHVJQ0FnSUNBZ0lDQnBJRDBnTUN4Y2JpQWdJQ0FnSUNBZ2NtVjBJRDBnSnljc1hHNGdJQ0FnSUNBZ0lHUmhkR0VzWEc0Z0lDQWdJQ0FnSUdOdmJuUmxlSFJRWVhSb08xeHVYRzRnSUNBZ2FXWWdLRzl3ZEdsdmJuTXVaR0YwWVNBbUppQnZjSFJwYjI1ekxtbGtjeWtnZTF4dUlDQWdJQ0FnWTI5dWRHVjRkRkJoZEdnZ1BTQmhjSEJsYm1SRGIyNTBaWGgwVUdGMGFDaHZjSFJwYjI1ekxtUmhkR0V1WTI5dWRHVjRkRkJoZEdnc0lHOXdkR2x2Ym5NdWFXUnpXekJkS1NBcklDY3VKenRjYmlBZ0lDQjlYRzVjYmlBZ0lDQnBaaUFvYVhOR2RXNWpkR2x2YmloamIyNTBaWGgwS1NrZ2V5QmpiMjUwWlhoMElEMGdZMjl1ZEdWNGRDNWpZV3hzS0hSb2FYTXBPeUI5WEc1Y2JpQWdJQ0JwWmlBb2IzQjBhVzl1Y3k1a1lYUmhLU0I3WEc0Z0lDQWdJQ0JrWVhSaElEMGdZM0psWVhSbFJuSmhiV1VvYjNCMGFXOXVjeTVrWVhSaEtUdGNiaUFnSUNCOVhHNWNiaUFnSUNCbWRXNWpkR2x2YmlCbGVHVmpTWFJsY21GMGFXOXVLR1pwWld4a0xDQnBibVJsZUN3Z2JHRnpkQ2tnZTF4dUlDQWdJQ0FnYVdZZ0tHUmhkR0VwSUh0Y2JpQWdJQ0FnSUNBZ1pHRjBZUzVyWlhrZ1BTQm1hV1ZzWkR0Y2JpQWdJQ0FnSUNBZ1pHRjBZUzVwYm1SbGVDQTlJR2x1WkdWNE8xeHVJQ0FnSUNBZ0lDQmtZWFJoTG1acGNuTjBJRDBnYVc1a1pYZ2dQVDA5SURBN1hHNGdJQ0FnSUNBZ0lHUmhkR0V1YkdGemRDQTlJQ0VoYkdGemREdGNibHh1SUNBZ0lDQWdJQ0JwWmlBb1kyOXVkR1Y0ZEZCaGRHZ3BJSHRjYmlBZ0lDQWdJQ0FnSUNCa1lYUmhMbU52Ym5SbGVIUlFZWFJvSUQwZ1kyOXVkR1Y0ZEZCaGRHZ2dLeUJtYVdWc1pEdGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0J5WlhRZ1BTQnlaWFFnS3lCbWJpaGpiMjUwWlhoMFcyWnBaV3hrWFN3Z2UxeHVJQ0FnSUNBZ0lDQmtZWFJoT2lCa1lYUmhMRnh1SUNBZ0lDQWdJQ0JpYkc5amExQmhjbUZ0Y3pvZ1lteHZZMnRRWVhKaGJYTW9XMk52Ym5SbGVIUmJabWxsYkdSZExDQm1hV1ZzWkYwc0lGdGpiMjUwWlhoMFVHRjBhQ0FySUdacFpXeGtMQ0J1ZFd4c1hTbGNiaUFnSUNBZ0lIMHBPMXh1SUNBZ0lIMWNibHh1SUNBZ0lHbG1JQ2hqYjI1MFpYaDBJQ1ltSUhSNWNHVnZaaUJqYjI1MFpYaDBJRDA5UFNBbmIySnFaV04wSnlrZ2UxeHVJQ0FnSUNBZ2FXWWdLR2x6UVhKeVlYa29ZMjl1ZEdWNGRDa3BJSHRjYmlBZ0lDQWdJQ0FnWm05eUlDaHNaWFFnYWlBOUlHTnZiblJsZUhRdWJHVnVaM1JvT3lCcElEd2dhanNnYVNzcktTQjdYRzRnSUNBZ0lDQWdJQ0FnYVdZZ0tHa2dhVzRnWTI5dWRHVjRkQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdaWGhsWTBsMFpYSmhkR2x2YmlocExDQnBMQ0JwSUQwOVBTQmpiMjUwWlhoMExteGxibWQwYUNBdElERXBPMXh1SUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0FnSUNBZ2JHVjBJSEJ5YVc5eVMyVjVPMXh1WEc0Z0lDQWdJQ0FnSUdadmNpQW9iR1YwSUd0bGVTQnBiaUJqYjI1MFpYaDBLU0I3WEc0Z0lDQWdJQ0FnSUNBZ2FXWWdLR052Ym5SbGVIUXVhR0Z6VDNkdVVISnZjR1Z5ZEhrb2EyVjVLU2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdMeThnVjJVbmNtVWdjblZ1Ym1sdVp5QjBhR1VnYVhSbGNtRjBhVzl1Y3lCdmJtVWdjM1JsY0NCdmRYUWdiMllnYzNsdVl5QnpieUIzWlNCallXNGdaR1YwWldOMFhHNGdJQ0FnSUNBZ0lDQWdJQ0F2THlCMGFHVWdiR0Z6ZENCcGRHVnlZWFJwYjI0Z2QybDBhRzkxZENCb1lYWmxJSFJ2SUhOallXNGdkR2hsSUc5aWFtVmpkQ0IwZDJsalpTQmhibVFnWTNKbFlYUmxYRzRnSUNBZ0lDQWdJQ0FnSUNBdkx5QmhiaUJwZEdWeWJXVmthV0YwWlNCclpYbHpJR0Z5Y21GNUxseHVJQ0FnSUNBZ0lDQWdJQ0FnYVdZZ0tIQnlhVzl5UzJWNUlDRTlQU0IxYm1SbFptbHVaV1FwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnWlhobFkwbDBaWEpoZEdsdmJpaHdjbWx2Y2t0bGVTd2dhU0F0SURFcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBZ0lDQWdjSEpwYjNKTFpYa2dQU0JyWlhrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JwS3lzN1hHNGdJQ0FnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUdsbUlDaHdjbWx2Y2t0bGVTQWhQVDBnZFc1a1pXWnBibVZrS1NCN1hHNGdJQ0FnSUNBZ0lDQWdaWGhsWTBsMFpYSmhkR2x2Ymlod2NtbHZja3RsZVN3Z2FTQXRJREVzSUhSeWRXVXBPMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdmVnh1WEc0Z0lDQWdhV1lnS0drZ1BUMDlJREFwSUh0Y2JpQWdJQ0FnSUhKbGRDQTlJR2x1ZG1WeWMyVW9kR2hwY3lrN1hHNGdJQ0FnZlZ4dVhHNGdJQ0FnY21WMGRYSnVJSEpsZER0Y2JpQWdmU2s3WEc1OVhHNGlMQ0pwYlhCdmNuUWdSWGhqWlhCMGFXOXVJR1p5YjIwZ0p5NHVMMlY0WTJWd2RHbHZiaWM3WEc1Y2JtVjRjRzl5ZENCa1pXWmhkV3gwSUdaMWJtTjBhVzl1S0dsdWMzUmhibU5sS1NCN1hHNGdJR2x1YzNSaGJtTmxMbkpsWjJsemRHVnlTR1ZzY0dWeUtDZG9aV3h3WlhKTmFYTnphVzVuSnl3Z1puVnVZM1JwYjI0b0x5b2dXMkZ5WjNNc0lGMXZjSFJwYjI1eklDb3ZLU0I3WEc0Z0lDQWdhV1lnS0dGeVozVnRaVzUwY3k1c1pXNW5kR2dnUFQwOUlERXBJSHRjYmlBZ0lDQWdJQzh2SUVFZ2JXbHpjMmx1WnlCbWFXVnNaQ0JwYmlCaElIdDdabTl2ZlgwZ1kyOXVjM1J5ZFdOMExseHVJQ0FnSUNBZ2NtVjBkWEp1SUhWdVpHVm1hVzVsWkR0Y2JpQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdMeThnVTI5dFpXOXVaU0JwY3lCaFkzUjFZV3hzZVNCMGNubHBibWNnZEc4Z1kyRnNiQ0J6YjIxbGRHaHBibWNzSUdKc2IzY2dkWEF1WEc0Z0lDQWdJQ0IwYUhKdmR5QnVaWGNnUlhoalpYQjBhVzl1S0NkTmFYTnphVzVuSUdobGJIQmxjam9nWENJbklDc2dZWEpuZFcxbGJuUnpXMkZ5WjNWdFpXNTBjeTVzWlc1bmRHZ2dMU0F4WFM1dVlXMWxJQ3NnSjF3aUp5azdYRzRnSUNBZ2ZWeHVJQ0I5S1R0Y2JuMWNiaUlzSW1sdGNHOXlkQ0I3YVhORmJYQjBlU3dnYVhOR2RXNWpkR2x2Ym4wZ1puSnZiU0FuTGk0dmRYUnBiSE1uTzF4dVhHNWxlSEJ2Y25RZ1pHVm1ZWFZzZENCbWRXNWpkR2x2YmlocGJuTjBZVzVqWlNrZ2UxeHVJQ0JwYm5OMFlXNWpaUzV5WldkcGMzUmxja2hsYkhCbGNpZ25hV1luTENCbWRXNWpkR2x2YmloamIyNWthWFJwYjI1aGJDd2diM0IwYVc5dWN5a2dlMXh1SUNBZ0lHbG1JQ2hwYzBaMWJtTjBhVzl1S0dOdmJtUnBkR2x2Ym1Gc0tTa2dleUJqYjI1a2FYUnBiMjVoYkNBOUlHTnZibVJwZEdsdmJtRnNMbU5oYkd3b2RHaHBjeWs3SUgxY2JseHVJQ0FnSUM4dklFUmxabUYxYkhRZ1ltVm9ZWFpwYjNJZ2FYTWdkRzhnY21WdVpHVnlJSFJvWlNCd2IzTnBkR2wyWlNCd1lYUm9JR2xtSUhSb1pTQjJZV3gxWlNCcGN5QjBjblYwYUhrZ1lXNWtJRzV2ZENCbGJYQjBlUzVjYmlBZ0lDQXZMeUJVYUdVZ1lHbHVZMngxWkdWYVpYSnZZQ0J2Y0hScGIyNGdiV0Y1SUdKbElITmxkQ0IwYnlCMGNtVmhkQ0IwYUdVZ1kyOXVaSFJwYjI1aGJDQmhjeUJ3ZFhKbGJIa2dibTkwSUdWdGNIUjVJR0poYzJWa0lHOXVJSFJvWlZ4dUlDQWdJQzh2SUdKbGFHRjJhVzl5SUc5bUlHbHpSVzF3ZEhrdUlFVm1abVZqZEdsMlpXeDVJSFJvYVhNZ1pHVjBaWEp0YVc1bGN5QnBaaUF3SUdseklHaGhibVJzWldRZ1lua2dkR2hsSUhCdmMybDBhWFpsSUhCaGRHZ2diM0lnYm1WbllYUnBkbVV1WEc0Z0lDQWdhV1lnS0NnaGIzQjBhVzl1Y3k1b1lYTm9MbWx1WTJ4MVpHVmFaWEp2SUNZbUlDRmpiMjVrYVhScGIyNWhiQ2tnZkh3Z2FYTkZiWEIwZVNoamIyNWthWFJwYjI1aGJDa3BJSHRjYmlBZ0lDQWdJSEpsZEhWeWJpQnZjSFJwYjI1ekxtbHVkbVZ5YzJVb2RHaHBjeWs3WEc0Z0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lISmxkSFZ5YmlCdmNIUnBiMjV6TG1adUtIUm9hWE1wTzF4dUlDQWdJSDFjYmlBZ2ZTazdYRzVjYmlBZ2FXNXpkR0Z1WTJVdWNtVm5hWE4wWlhKSVpXeHdaWElvSjNWdWJHVnpjeWNzSUdaMWJtTjBhVzl1S0dOdmJtUnBkR2x2Ym1Gc0xDQnZjSFJwYjI1ektTQjdYRzRnSUNBZ2NtVjBkWEp1SUdsdWMzUmhibU5sTG1obGJIQmxjbk5iSjJsbUoxMHVZMkZzYkNoMGFHbHpMQ0JqYjI1a2FYUnBiMjVoYkN3Z2UyWnVPaUJ2Y0hScGIyNXpMbWx1ZG1WeWMyVXNJR2x1ZG1WeWMyVTZJRzl3ZEdsdmJuTXVabTRzSUdoaGMyZzZJRzl3ZEdsdmJuTXVhR0Z6YUgwcE8xeHVJQ0I5S1R0Y2JuMWNiaUlzSW1WNGNHOXlkQ0JrWldaaGRXeDBJR1oxYm1OMGFXOXVLR2x1YzNSaGJtTmxLU0I3WEc0Z0lHbHVjM1JoYm1ObExuSmxaMmx6ZEdWeVNHVnNjR1Z5S0Nkc2IyY25MQ0JtZFc1amRHbHZiaWd2S2lCdFpYTnpZV2RsTENCdmNIUnBiMjV6SUNvdktTQjdYRzRnSUNBZ2JHVjBJR0Z5WjNNZ1BTQmJkVzVrWldacGJtVmtYU3hjYmlBZ0lDQWdJQ0FnYjNCMGFXOXVjeUE5SUdGeVozVnRaVzUwYzF0aGNtZDFiV1Z1ZEhNdWJHVnVaM1JvSUMwZ01WMDdYRzRnSUNBZ1ptOXlJQ2hzWlhRZ2FTQTlJREE3SUdrZ1BDQmhjbWQxYldWdWRITXViR1Z1WjNSb0lDMGdNVHNnYVNzcktTQjdYRzRnSUNBZ0lDQmhjbWR6TG5CMWMyZ29ZWEpuZFcxbGJuUnpXMmxkS1R0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0JzWlhRZ2JHVjJaV3dnUFNBeE8xeHVJQ0FnSUdsbUlDaHZjSFJwYjI1ekxtaGhjMmd1YkdWMlpXd2dJVDBnYm5Wc2JDa2dlMXh1SUNBZ0lDQWdiR1YyWld3Z1BTQnZjSFJwYjI1ekxtaGhjMmd1YkdWMlpXdzdYRzRnSUNBZ2ZTQmxiSE5sSUdsbUlDaHZjSFJwYjI1ekxtUmhkR0VnSmlZZ2IzQjBhVzl1Y3k1a1lYUmhMbXhsZG1Wc0lDRTlJRzUxYkd3cElIdGNiaUFnSUNBZ0lHeGxkbVZzSUQwZ2IzQjBhVzl1Y3k1a1lYUmhMbXhsZG1Wc08xeHVJQ0FnSUgxY2JpQWdJQ0JoY21keld6QmRJRDBnYkdWMlpXdzdYRzVjYmlBZ0lDQnBibk4wWVc1alpTNXNiMmNvTGk0dUlHRnlaM01wTzF4dUlDQjlLVHRjYm4xY2JpSXNJbVY0Y0c5eWRDQmtaV1poZFd4MElHWjFibU4wYVc5dUtHbHVjM1JoYm1ObEtTQjdYRzRnSUdsdWMzUmhibU5sTG5KbFoybHpkR1Z5U0dWc2NHVnlLQ2RzYjI5cmRYQW5MQ0JtZFc1amRHbHZiaWh2WW1vc0lHWnBaV3hrS1NCN1hHNGdJQ0FnY21WMGRYSnVJRzlpYWlBbUppQnZZbXBiWm1sbGJHUmRPMXh1SUNCOUtUdGNibjFjYmlJc0ltbHRjRzl5ZENCN1lYQndaVzVrUTI5dWRHVjRkRkJoZEdnc0lHSnNiMk5yVUdGeVlXMXpMQ0JqY21WaGRHVkdjbUZ0WlN3Z2FYTkZiWEIwZVN3Z2FYTkdkVzVqZEdsdmJuMGdabkp2YlNBbkxpNHZkWFJwYkhNbk8xeHVYRzVsZUhCdmNuUWdaR1ZtWVhWc2RDQm1kVzVqZEdsdmJpaHBibk4wWVc1alpTa2dlMXh1SUNCcGJuTjBZVzVqWlM1eVpXZHBjM1JsY2tobGJIQmxjaWduZDJsMGFDY3NJR1oxYm1OMGFXOXVLR052Ym5SbGVIUXNJRzl3ZEdsdmJuTXBJSHRjYmlBZ0lDQnBaaUFvYVhOR2RXNWpkR2x2YmloamIyNTBaWGgwS1NrZ2V5QmpiMjUwWlhoMElEMGdZMjl1ZEdWNGRDNWpZV3hzS0hSb2FYTXBPeUI5WEc1Y2JpQWdJQ0JzWlhRZ1ptNGdQU0J2Y0hScGIyNXpMbVp1TzF4dVhHNGdJQ0FnYVdZZ0tDRnBjMFZ0Y0hSNUtHTnZiblJsZUhRcEtTQjdYRzRnSUNBZ0lDQnNaWFFnWkdGMFlTQTlJRzl3ZEdsdmJuTXVaR0YwWVR0Y2JpQWdJQ0FnSUdsbUlDaHZjSFJwYjI1ekxtUmhkR0VnSmlZZ2IzQjBhVzl1Y3k1cFpITXBJSHRjYmlBZ0lDQWdJQ0FnWkdGMFlTQTlJR055WldGMFpVWnlZVzFsS0c5d2RHbHZibk11WkdGMFlTazdYRzRnSUNBZ0lDQWdJR1JoZEdFdVkyOXVkR1Y0ZEZCaGRHZ2dQU0JoY0hCbGJtUkRiMjUwWlhoMFVHRjBhQ2h2Y0hScGIyNXpMbVJoZEdFdVkyOXVkR1Y0ZEZCaGRHZ3NJRzl3ZEdsdmJuTXVhV1J6V3pCZEtUdGNiaUFnSUNBZ0lIMWNibHh1SUNBZ0lDQWdjbVYwZFhKdUlHWnVLR052Ym5SbGVIUXNJSHRjYmlBZ0lDQWdJQ0FnWkdGMFlUb2daR0YwWVN4Y2JpQWdJQ0FnSUNBZ1lteHZZMnRRWVhKaGJYTTZJR0pzYjJOclVHRnlZVzF6S0Z0amIyNTBaWGgwWFN3Z1cyUmhkR0VnSmlZZ1pHRjBZUzVqYjI1MFpYaDBVR0YwYUYwcFhHNGdJQ0FnSUNCOUtUdGNiaUFnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnY21WMGRYSnVJRzl3ZEdsdmJuTXVhVzUyWlhKelpTaDBhR2x6S1R0Y2JpQWdJQ0I5WEc0Z0lIMHBPMXh1ZlZ4dUlpd2lhVzF3YjNKMElIdHBibVJsZUU5bWZTQm1jbTl0SUNjdUwzVjBhV3h6Snp0Y2JseHViR1YwSUd4dloyZGxjaUE5SUh0Y2JpQWdiV1YwYUc5a1RXRndPaUJiSjJSbFluVm5KeXdnSjJsdVptOG5MQ0FuZDJGeWJpY3NJQ2RsY25KdmNpZGRMRnh1SUNCc1pYWmxiRG9nSjJsdVptOG5MRnh1WEc0Z0lDOHZJRTFoY0hNZ1lTQm5hWFpsYmlCc1pYWmxiQ0IyWVd4MVpTQjBieUIwYUdVZ1lHMWxkR2h2WkUxaGNHQWdhVzVrWlhobGN5QmhZbTkyWlM1Y2JpQWdiRzl2YTNWd1RHVjJaV3c2SUdaMWJtTjBhVzl1S0d4bGRtVnNLU0I3WEc0Z0lDQWdhV1lnS0hSNWNHVnZaaUJzWlhabGJDQTlQVDBnSjNOMGNtbHVaeWNwSUh0Y2JpQWdJQ0FnSUd4bGRDQnNaWFpsYkUxaGNDQTlJR2x1WkdWNFQyWW9iRzluWjJWeUxtMWxkR2h2WkUxaGNDd2diR1YyWld3dWRHOU1iM2RsY2tOaGMyVW9LU2s3WEc0Z0lDQWdJQ0JwWmlBb2JHVjJaV3hOWVhBZ1BqMGdNQ2tnZTF4dUlDQWdJQ0FnSUNCc1pYWmxiQ0E5SUd4bGRtVnNUV0Z3TzF4dUlDQWdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQ0FnYkdWMlpXd2dQU0J3WVhKelpVbHVkQ2hzWlhabGJDd2dNVEFwTzF4dUlDQWdJQ0FnZlZ4dUlDQWdJSDFjYmx4dUlDQWdJSEpsZEhWeWJpQnNaWFpsYkR0Y2JpQWdmU3hjYmx4dUlDQXZMeUJEWVc0Z1ltVWdiM1psY25KcFpHUmxiaUJwYmlCMGFHVWdhRzl6ZENCbGJuWnBjbTl1YldWdWRGeHVJQ0JzYjJjNklHWjFibU4wYVc5dUtHeGxkbVZzTENBdUxpNXRaWE56WVdkbEtTQjdYRzRnSUNBZ2JHVjJaV3dnUFNCc2IyZG5aWEl1Ykc5dmEzVndUR1YyWld3b2JHVjJaV3dwTzF4dVhHNGdJQ0FnYVdZZ0tIUjVjR1Z2WmlCamIyNXpiMnhsSUNFOVBTQW5kVzVrWldacGJtVmtKeUFtSmlCc2IyZG5aWEl1Ykc5dmEzVndUR1YyWld3b2JHOW5aMlZ5TG14bGRtVnNLU0E4UFNCc1pYWmxiQ2tnZTF4dUlDQWdJQ0FnYkdWMElHMWxkR2h2WkNBOUlHeHZaMmRsY2k1dFpYUm9iMlJOWVhCYmJHVjJaV3hkTzF4dUlDQWdJQ0FnYVdZZ0tDRmpiMjV6YjJ4bFcyMWxkR2h2WkYwcElIc2dJQ0F2THlCbGMyeHBiblF0WkdsellXSnNaUzFzYVc1bElHNXZMV052Ym5OdmJHVmNiaUFnSUNBZ0lDQWdiV1YwYUc5a0lEMGdKMnh2WnljN1hHNGdJQ0FnSUNCOVhHNGdJQ0FnSUNCamIyNXpiMnhsVzIxbGRHaHZaRjBvTGk0dWJXVnpjMkZuWlNrN0lDQWdJQzh2SUdWemJHbHVkQzFrYVhOaFlteGxMV3hwYm1VZ2JtOHRZMjl1YzI5c1pWeHVJQ0FnSUgxY2JpQWdmVnh1ZlR0Y2JseHVaWGh3YjNKMElHUmxabUYxYkhRZ2JHOW5aMlZ5TzF4dUlpd2lMeW9nWjJ4dlltRnNJSGRwYm1SdmR5QXFMMXh1Wlhod2IzSjBJR1JsWm1GMWJIUWdablZ1WTNScGIyNG9TR0Z1Wkd4bFltRnljeWtnZTF4dUlDQXZLaUJwYzNSaGJtSjFiQ0JwWjI1dmNtVWdibVY0ZENBcUwxeHVJQ0JzWlhRZ2NtOXZkQ0E5SUhSNWNHVnZaaUJuYkc5aVlXd2dJVDA5SUNkMWJtUmxabWx1WldRbklEOGdaMnh2WW1Gc0lEb2dkMmx1Wkc5M0xGeHVJQ0FnSUNBZ0pFaGhibVJzWldKaGNuTWdQU0J5YjI5MExraGhibVJzWldKaGNuTTdYRzRnSUM4cUlHbHpkR0Z1WW5Wc0lHbG5ibTl5WlNCdVpYaDBJQ292WEc0Z0lFaGhibVJzWldKaGNuTXVibTlEYjI1bWJHbGpkQ0E5SUdaMWJtTjBhVzl1S0NrZ2UxeHVJQ0FnSUdsbUlDaHliMjkwTGtoaGJtUnNaV0poY25NZ1BUMDlJRWhoYm1Sc1pXSmhjbk1wSUh0Y2JpQWdJQ0FnSUhKdmIzUXVTR0Z1Wkd4bFltRnljeUE5SUNSSVlXNWtiR1ZpWVhKek8xeHVJQ0FnSUgxY2JpQWdJQ0J5WlhSMWNtNGdTR0Z1Wkd4bFltRnljenRjYmlBZ2ZUdGNibjFjYmlJc0ltbHRjRzl5ZENBcUlHRnpJRlYwYVd4eklHWnliMjBnSnk0dmRYUnBiSE1uTzF4dWFXMXdiM0owSUVWNFkyVndkR2x2YmlCbWNtOXRJQ2N1TDJWNFkyVndkR2x2YmljN1hHNXBiWEJ2Y25RZ2V5QkRUMDFRU1V4RlVsOVNSVlpKVTBsUFRpd2dVa1ZXU1ZOSlQwNWZRMGhCVGtkRlV5d2dZM0psWVhSbFJuSmhiV1VnZlNCbWNtOXRJQ2N1TDJKaGMyVW5PMXh1WEc1bGVIQnZjblFnWm5WdVkzUnBiMjRnWTJobFkydFNaWFpwYzJsdmJpaGpiMjF3YVd4bGNrbHVabThwSUh0Y2JpQWdZMjl1YzNRZ1kyOXRjR2xzWlhKU1pYWnBjMmx2YmlBOUlHTnZiWEJwYkdWeVNXNW1ieUFtSmlCamIyMXdhV3hsY2tsdVptOWJNRjBnZkh3Z01TeGNiaUFnSUNBZ0lDQWdZM1Z5Y21WdWRGSmxkbWx6YVc5dUlEMGdRMDlOVUVsTVJWSmZVa1ZXU1ZOSlQwNDdYRzVjYmlBZ2FXWWdLR052YlhCcGJHVnlVbVYyYVhOcGIyNGdJVDA5SUdOMWNuSmxiblJTWlhacGMybHZiaWtnZTF4dUlDQWdJR2xtSUNoamIyMXdhV3hsY2xKbGRtbHphVzl1SUR3Z1kzVnljbVZ1ZEZKbGRtbHphVzl1S1NCN1hHNGdJQ0FnSUNCamIyNXpkQ0J5ZFc1MGFXMWxWbVZ5YzJsdmJuTWdQU0JTUlZaSlUwbFBUbDlEU0VGT1IwVlRXMk4xY25KbGJuUlNaWFpwYzJsdmJsMHNYRzRnSUNBZ0lDQWdJQ0FnSUNCamIyMXdhV3hsY2xabGNuTnBiMjV6SUQwZ1VrVldTVk5KVDA1ZlEwaEJUa2RGVTF0amIyMXdhV3hsY2xKbGRtbHphVzl1WFR0Y2JpQWdJQ0FnSUhSb2NtOTNJRzVsZHlCRmVHTmxjSFJwYjI0b0oxUmxiWEJzWVhSbElIZGhjeUJ3Y21WamIyMXdhV3hsWkNCM2FYUm9JR0Z1SUc5c1pHVnlJSFpsY25OcGIyNGdiMllnU0dGdVpHeGxZbUZ5Y3lCMGFHRnVJSFJvWlNCamRYSnlaVzUwSUhKMWJuUnBiV1V1SUNjZ0sxeHVJQ0FnSUNBZ0lDQWdJQ0FnSjFCc1pXRnpaU0IxY0dSaGRHVWdlVzkxY2lCd2NtVmpiMjF3YVd4bGNpQjBieUJoSUc1bGQyVnlJSFpsY25OcGIyNGdLQ2NnS3lCeWRXNTBhVzFsVm1WeWMybHZibk1nS3lBbktTQnZjaUJrYjNkdVozSmhaR1VnZVc5MWNpQnlkVzUwYVcxbElIUnZJR0Z1SUc5c1pHVnlJSFpsY25OcGIyNGdLQ2NnS3lCamIyMXdhV3hsY2xabGNuTnBiMjV6SUNzZ0p5a3VKeWs3WEc0Z0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lDOHZJRlZ6WlNCMGFHVWdaVzFpWldSa1pXUWdkbVZ5YzJsdmJpQnBibVp2SUhOcGJtTmxJSFJvWlNCeWRXNTBhVzFsSUdSdlpYTnVKM1FnYTI1dmR5QmhZbTkxZENCMGFHbHpJSEpsZG1semFXOXVJSGxsZEZ4dUlDQWdJQ0FnZEdoeWIzY2dibVYzSUVWNFkyVndkR2x2YmlnblZHVnRjR3hoZEdVZ2QyRnpJSEJ5WldOdmJYQnBiR1ZrSUhkcGRHZ2dZU0J1WlhkbGNpQjJaWEp6YVc5dUlHOW1JRWhoYm1Sc1pXSmhjbk1nZEdoaGJpQjBhR1VnWTNWeWNtVnVkQ0J5ZFc1MGFXMWxMaUFuSUN0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ2RRYkdWaGMyVWdkWEJrWVhSbElIbHZkWElnY25WdWRHbHRaU0IwYnlCaElHNWxkMlZ5SUhabGNuTnBiMjRnS0NjZ0t5QmpiMjF3YVd4bGNrbHVabTliTVYwZ0t5QW5LUzRuS1R0Y2JpQWdJQ0I5WEc0Z0lIMWNibjFjYmx4dVpYaHdiM0owSUdaMWJtTjBhVzl1SUhSbGJYQnNZWFJsS0hSbGJYQnNZWFJsVTNCbFl5d2daVzUyS1NCN1hHNGdJQzhxSUdsemRHRnVZblZzSUdsbmJtOXlaU0J1WlhoMElDb3ZYRzRnSUdsbUlDZ2haVzUyS1NCN1hHNGdJQ0FnZEdoeWIzY2dibVYzSUVWNFkyVndkR2x2YmlnblRtOGdaVzUyYVhKdmJtMWxiblFnY0dGemMyVmtJSFJ2SUhSbGJYQnNZWFJsSnlrN1hHNGdJSDFjYmlBZ2FXWWdLQ0YwWlcxd2JHRjBaVk53WldNZ2ZId2dJWFJsYlhCc1lYUmxVM0JsWXk1dFlXbHVLU0I3WEc0Z0lDQWdkR2h5YjNjZ2JtVjNJRVY0WTJWd2RHbHZiaWduVlc1cmJtOTNiaUIwWlcxd2JHRjBaU0J2WW1wbFkzUTZJQ2NnS3lCMGVYQmxiMllnZEdWdGNHeGhkR1ZUY0dWaktUdGNiaUFnZlZ4dVhHNGdJSFJsYlhCc1lYUmxVM0JsWXk1dFlXbHVMbVJsWTI5eVlYUnZjaUE5SUhSbGJYQnNZWFJsVTNCbFl5NXRZV2x1WDJRN1hHNWNiaUFnTHk4Z1RtOTBaVG9nVlhOcGJtY2daVzUyTGxaTklISmxabVZ5Wlc1alpYTWdjbUYwYUdWeUlIUm9ZVzRnYkc5allXd2dkbUZ5SUhKbFptVnlaVzVqWlhNZ2RHaHliM1ZuYUc5MWRDQjBhR2x6SUhObFkzUnBiMjRnZEc4Z1lXeHNiM2RjYmlBZ0x5OGdabTl5SUdWNGRHVnlibUZzSUhWelpYSnpJSFJ2SUc5MlpYSnlhV1JsSUhSb1pYTmxJR0Z6SUhCemRXVmtieTF6ZFhCd2IzSjBaV1FnUVZCSmN5NWNiaUFnWlc1MkxsWk5MbU5vWldOclVtVjJhWE5wYjI0b2RHVnRjR3hoZEdWVGNHVmpMbU52YlhCcGJHVnlLVHRjYmx4dUlDQm1kVzVqZEdsdmJpQnBiblp2YTJWUVlYSjBhV0ZzVjNKaGNIQmxjaWh3WVhKMGFXRnNMQ0JqYjI1MFpYaDBMQ0J2Y0hScGIyNXpLU0I3WEc0Z0lDQWdhV1lnS0c5d2RHbHZibk11YUdGemFDa2dlMXh1SUNBZ0lDQWdZMjl1ZEdWNGRDQTlJRlYwYVd4ekxtVjRkR1Z1WkNoN2ZTd2dZMjl1ZEdWNGRDd2diM0IwYVc5dWN5NW9ZWE5vS1R0Y2JpQWdJQ0FnSUdsbUlDaHZjSFJwYjI1ekxtbGtjeWtnZTF4dUlDQWdJQ0FnSUNCdmNIUnBiMjV6TG1sa2Mxc3dYU0E5SUhSeWRXVTdYRzRnSUNBZ0lDQjlYRzRnSUNBZ2ZWeHVYRzRnSUNBZ2NHRnlkR2xoYkNBOUlHVnVkaTVXVFM1eVpYTnZiSFpsVUdGeWRHbGhiQzVqWVd4c0tIUm9hWE1zSUhCaGNuUnBZV3dzSUdOdmJuUmxlSFFzSUc5d2RHbHZibk1wTzF4dUlDQWdJR3hsZENCeVpYTjFiSFFnUFNCbGJuWXVWazB1YVc1MmIydGxVR0Z5ZEdsaGJDNWpZV3hzS0hSb2FYTXNJSEJoY25ScFlXd3NJR052Ym5SbGVIUXNJRzl3ZEdsdmJuTXBPMXh1WEc0Z0lDQWdhV1lnS0hKbGMzVnNkQ0E5UFNCdWRXeHNJQ1ltSUdWdWRpNWpiMjF3YVd4bEtTQjdYRzRnSUNBZ0lDQnZjSFJwYjI1ekxuQmhjblJwWVd4elcyOXdkR2x2Ym5NdWJtRnRaVjBnUFNCbGJuWXVZMjl0Y0dsc1pTaHdZWEowYVdGc0xDQjBaVzF3YkdGMFpWTndaV011WTI5dGNHbHNaWEpQY0hScGIyNXpMQ0JsYm5ZcE8xeHVJQ0FnSUNBZ2NtVnpkV3gwSUQwZ2IzQjBhVzl1Y3k1d1lYSjBhV0ZzYzF0dmNIUnBiMjV6TG01aGJXVmRLR052Ym5SbGVIUXNJRzl3ZEdsdmJuTXBPMXh1SUNBZ0lIMWNiaUFnSUNCcFppQW9jbVZ6ZFd4MElDRTlJRzUxYkd3cElIdGNiaUFnSUNBZ0lHbG1JQ2h2Y0hScGIyNXpMbWx1WkdWdWRDa2dlMXh1SUNBZ0lDQWdJQ0JzWlhRZ2JHbHVaWE1nUFNCeVpYTjFiSFF1YzNCc2FYUW9KMXhjYmljcE8xeHVJQ0FnSUNBZ0lDQm1iM0lnS0d4bGRDQnBJRDBnTUN3Z2JDQTlJR3hwYm1WekxteGxibWQwYURzZ2FTQThJR3c3SUdrckt5a2dlMXh1SUNBZ0lDQWdJQ0FnSUdsbUlDZ2hiR2x1WlhOYmFWMGdKaVlnYVNBcklERWdQVDA5SUd3cElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUdKeVpXRnJPMXh1SUNBZ0lDQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ0lDQWdJR3hwYm1WelcybGRJRDBnYjNCMGFXOXVjeTVwYm1SbGJuUWdLeUJzYVc1bGMxdHBYVHRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNCeVpYTjFiSFFnUFNCc2FXNWxjeTVxYjJsdUtDZGNYRzRuS1R0Y2JpQWdJQ0FnSUgxY2JpQWdJQ0FnSUhKbGRIVnliaUJ5WlhOMWJIUTdYRzRnSUNBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0FnSUhSb2NtOTNJRzVsZHlCRmVHTmxjSFJwYjI0b0oxUm9aU0J3WVhKMGFXRnNJQ2NnS3lCdmNIUnBiMjV6TG01aGJXVWdLeUFuSUdOdmRXeGtJRzV2ZENCaVpTQmpiMjF3YVd4bFpDQjNhR1Z1SUhKMWJtNXBibWNnYVc0Z2NuVnVkR2x0WlMxdmJteDVJRzF2WkdVbktUdGNiaUFnSUNCOVhHNGdJSDFjYmx4dUlDQXZMeUJLZFhOMElHRmtaQ0IzWVhSbGNseHVJQ0JzWlhRZ1kyOXVkR0ZwYm1WeUlEMGdlMXh1SUNBZ0lITjBjbWxqZERvZ1puVnVZM1JwYjI0b2IySnFMQ0J1WVcxbEtTQjdYRzRnSUNBZ0lDQnBaaUFvSVNodVlXMWxJR2x1SUc5aWFpa3BJSHRjYmlBZ0lDQWdJQ0FnZEdoeWIzY2dibVYzSUVWNFkyVndkR2x2YmlnblhDSW5JQ3NnYm1GdFpTQXJJQ2RjSWlCdWIzUWdaR1ZtYVc1bFpDQnBiaUFuSUNzZ2IySnFLVHRjYmlBZ0lDQWdJSDFjYmlBZ0lDQWdJSEpsZEhWeWJpQnZZbXBiYm1GdFpWMDdYRzRnSUNBZ2ZTeGNiaUFnSUNCc2IyOXJkWEE2SUdaMWJtTjBhVzl1S0dSbGNIUm9jeXdnYm1GdFpTa2dlMXh1SUNBZ0lDQWdZMjl1YzNRZ2JHVnVJRDBnWkdWd2RHaHpMbXhsYm1kMGFEdGNiaUFnSUNBZ0lHWnZjaUFvYkdWMElHa2dQU0F3T3lCcElEd2diR1Z1T3lCcEt5c3BJSHRjYmlBZ0lDQWdJQ0FnYVdZZ0tHUmxjSFJvYzF0cFhTQW1KaUJrWlhCMGFITmJhVjFiYm1GdFpWMGdJVDBnYm5Wc2JDa2dlMXh1SUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJrWlhCMGFITmJhVjFiYm1GdFpWMDdYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJSDFjYmlBZ0lDQjlMRnh1SUNBZ0lHeGhiV0prWVRvZ1puVnVZM1JwYjI0b1kzVnljbVZ1ZEN3Z1kyOXVkR1Y0ZENrZ2UxeHVJQ0FnSUNBZ2NtVjBkWEp1SUhSNWNHVnZaaUJqZFhKeVpXNTBJRDA5UFNBblpuVnVZM1JwYjI0bklEOGdZM1Z5Y21WdWRDNWpZV3hzS0dOdmJuUmxlSFFwSURvZ1kzVnljbVZ1ZER0Y2JpQWdJQ0I5TEZ4dVhHNGdJQ0FnWlhOallYQmxSWGh3Y21WemMybHZiam9nVlhScGJITXVaWE5qWVhCbFJYaHdjbVZ6YzJsdmJpeGNiaUFnSUNCcGJuWnZhMlZRWVhKMGFXRnNPaUJwYm5admEyVlFZWEowYVdGc1YzSmhjSEJsY2l4Y2JseHVJQ0FnSUdadU9pQm1kVzVqZEdsdmJpaHBLU0I3WEc0Z0lDQWdJQ0JzWlhRZ2NtVjBJRDBnZEdWdGNHeGhkR1ZUY0dWalcybGRPMXh1SUNBZ0lDQWdjbVYwTG1SbFkyOXlZWFJ2Y2lBOUlIUmxiWEJzWVhSbFUzQmxZMXRwSUNzZ0oxOWtKMTA3WEc0Z0lDQWdJQ0J5WlhSMWNtNGdjbVYwTzF4dUlDQWdJSDBzWEc1Y2JpQWdJQ0J3Y205bmNtRnRjem9nVzEwc1hHNGdJQ0FnY0hKdlozSmhiVG9nWm5WdVkzUnBiMjRvYVN3Z1pHRjBZU3dnWkdWamJHRnlaV1JDYkc5amExQmhjbUZ0Y3l3Z1lteHZZMnRRWVhKaGJYTXNJR1JsY0hSb2N5a2dlMXh1SUNBZ0lDQWdiR1YwSUhCeWIyZHlZVzFYY21Gd2NHVnlJRDBnZEdocGN5NXdjbTluY21GdGMxdHBYU3hjYmlBZ0lDQWdJQ0FnSUNCbWJpQTlJSFJvYVhNdVptNG9hU2s3WEc0Z0lDQWdJQ0JwWmlBb1pHRjBZU0I4ZkNCa1pYQjBhSE1nZkh3Z1lteHZZMnRRWVhKaGJYTWdmSHdnWkdWamJHRnlaV1JDYkc5amExQmhjbUZ0Y3lrZ2UxeHVJQ0FnSUNBZ0lDQndjbTluY21GdFYzSmhjSEJsY2lBOUlIZHlZWEJRY205bmNtRnRLSFJvYVhNc0lHa3NJR1p1TENCa1lYUmhMQ0JrWldOc1lYSmxaRUpzYjJOclVHRnlZVzF6TENCaWJHOWphMUJoY21GdGN5d2daR1Z3ZEdoektUdGNiaUFnSUNBZ0lIMGdaV3h6WlNCcFppQW9JWEJ5YjJkeVlXMVhjbUZ3Y0dWeUtTQjdYRzRnSUNBZ0lDQWdJSEJ5YjJkeVlXMVhjbUZ3Y0dWeUlEMGdkR2hwY3k1d2NtOW5jbUZ0YzF0cFhTQTlJSGR5WVhCUWNtOW5jbUZ0S0hSb2FYTXNJR2tzSUdadUtUdGNiaUFnSUNBZ0lIMWNiaUFnSUNBZ0lISmxkSFZ5YmlCd2NtOW5jbUZ0VjNKaGNIQmxjanRjYmlBZ0lDQjlMRnh1WEc0Z0lDQWdaR0YwWVRvZ1puVnVZM1JwYjI0b2RtRnNkV1VzSUdSbGNIUm9LU0I3WEc0Z0lDQWdJQ0IzYUdsc1pTQW9kbUZzZFdVZ0ppWWdaR1Z3ZEdndExTa2dlMXh1SUNBZ0lDQWdJQ0IyWVd4MVpTQTlJSFpoYkhWbExsOXdZWEpsYm5RN1hHNGdJQ0FnSUNCOVhHNGdJQ0FnSUNCeVpYUjFjbTRnZG1Gc2RXVTdYRzRnSUNBZ2ZTeGNiaUFnSUNCdFpYSm5aVG9nWm5WdVkzUnBiMjRvY0dGeVlXMHNJR052YlcxdmJpa2dlMXh1SUNBZ0lDQWdiR1YwSUc5aWFpQTlJSEJoY21GdElIeDhJR052YlcxdmJqdGNibHh1SUNBZ0lDQWdhV1lnS0hCaGNtRnRJQ1ltSUdOdmJXMXZiaUFtSmlBb2NHRnlZVzBnSVQwOUlHTnZiVzF2YmlrcElIdGNiaUFnSUNBZ0lDQWdiMkpxSUQwZ1ZYUnBiSE11WlhoMFpXNWtLSHQ5TENCamIyMXRiMjRzSUhCaGNtRnRLVHRjYmlBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnY21WMGRYSnVJRzlpYWp0Y2JpQWdJQ0I5TEZ4dUlDQWdJQzh2SUVGdUlHVnRjSFI1SUc5aWFtVmpkQ0IwYnlCMWMyVWdZWE1nY21Wd2JHRmpaVzFsYm5RZ1ptOXlJRzUxYkd3dFkyOXVkR1Y0ZEhOY2JpQWdJQ0J1ZFd4c1EyOXVkR1Y0ZERvZ1QySnFaV04wTG5ObFlXd29lMzBwTEZ4dVhHNGdJQ0FnYm05dmNEb2daVzUyTGxaTkxtNXZiM0FzWEc0Z0lDQWdZMjl0Y0dsc1pYSkpibVp2T2lCMFpXMXdiR0YwWlZOd1pXTXVZMjl0Y0dsc1pYSmNiaUFnZlR0Y2JseHVJQ0JtZFc1amRHbHZiaUJ5WlhRb1kyOXVkR1Y0ZEN3Z2IzQjBhVzl1Y3lBOUlIdDlLU0I3WEc0Z0lDQWdiR1YwSUdSaGRHRWdQU0J2Y0hScGIyNXpMbVJoZEdFN1hHNWNiaUFnSUNCeVpYUXVYM05sZEhWd0tHOXdkR2x2Ym5NcE8xeHVJQ0FnSUdsbUlDZ2hiM0IwYVc5dWN5NXdZWEowYVdGc0lDWW1JSFJsYlhCc1lYUmxVM0JsWXk1MWMyVkVZWFJoS1NCN1hHNGdJQ0FnSUNCa1lYUmhJRDBnYVc1cGRFUmhkR0VvWTI5dWRHVjRkQ3dnWkdGMFlTazdYRzRnSUNBZ2ZWeHVJQ0FnSUd4bGRDQmtaWEIwYUhNc1hHNGdJQ0FnSUNBZ0lHSnNiMk5yVUdGeVlXMXpJRDBnZEdWdGNHeGhkR1ZUY0dWakxuVnpaVUpzYjJOclVHRnlZVzF6SUQ4Z1cxMGdPaUIxYm1SbFptbHVaV1E3WEc0Z0lDQWdhV1lnS0hSbGJYQnNZWFJsVTNCbFl5NTFjMlZFWlhCMGFITXBJSHRjYmlBZ0lDQWdJR2xtSUNodmNIUnBiMjV6TG1SbGNIUm9jeWtnZTF4dUlDQWdJQ0FnSUNCa1pYQjBhSE1nUFNCamIyNTBaWGgwSUNFOUlHOXdkR2x2Ym5NdVpHVndkR2h6V3pCZElEOGdXMk52Ym5SbGVIUmRMbU52Ym1OaGRDaHZjSFJwYjI1ekxtUmxjSFJvY3lrZ09pQnZjSFJwYjI1ekxtUmxjSFJvY3p0Y2JpQWdJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0FnSUdSbGNIUm9jeUE5SUZ0amIyNTBaWGgwWFR0Y2JpQWdJQ0FnSUgxY2JpQWdJQ0I5WEc1Y2JpQWdJQ0JtZFc1amRHbHZiaUJ0WVdsdUtHTnZiblJsZUhRdktpd2diM0IwYVc5dWN5b3ZLU0I3WEc0Z0lDQWdJQ0J5WlhSMWNtNGdKeWNnS3lCMFpXMXdiR0YwWlZOd1pXTXViV0ZwYmloamIyNTBZV2x1WlhJc0lHTnZiblJsZUhRc0lHTnZiblJoYVc1bGNpNW9aV3h3WlhKekxDQmpiMjUwWVdsdVpYSXVjR0Z5ZEdsaGJITXNJR1JoZEdFc0lHSnNiMk5yVUdGeVlXMXpMQ0JrWlhCMGFITXBPMXh1SUNBZ0lIMWNiaUFnSUNCdFlXbHVJRDBnWlhobFkzVjBaVVJsWTI5eVlYUnZjbk1vZEdWdGNHeGhkR1ZUY0dWakxtMWhhVzRzSUcxaGFXNHNJR052Ym5SaGFXNWxjaXdnYjNCMGFXOXVjeTVrWlhCMGFITWdmSHdnVzEwc0lHUmhkR0VzSUdKc2IyTnJVR0Z5WVcxektUdGNiaUFnSUNCeVpYUjFjbTRnYldGcGJpaGpiMjUwWlhoMExDQnZjSFJwYjI1ektUdGNiaUFnZlZ4dUlDQnlaWFF1YVhOVWIzQWdQU0IwY25WbE8xeHVYRzRnSUhKbGRDNWZjMlYwZFhBZ1BTQm1kVzVqZEdsdmJpaHZjSFJwYjI1ektTQjdYRzRnSUNBZ2FXWWdLQ0Z2Y0hScGIyNXpMbkJoY25ScFlXd3BJSHRjYmlBZ0lDQWdJR052Ym5SaGFXNWxjaTVvWld4d1pYSnpJRDBnWTI5dWRHRnBibVZ5TG0xbGNtZGxLRzl3ZEdsdmJuTXVhR1ZzY0dWeWN5d2daVzUyTG1obGJIQmxjbk1wTzF4dVhHNGdJQ0FnSUNCcFppQW9kR1Z0Y0d4aGRHVlRjR1ZqTG5WelpWQmhjblJwWVd3cElIdGNiaUFnSUNBZ0lDQWdZMjl1ZEdGcGJtVnlMbkJoY25ScFlXeHpJRDBnWTI5dWRHRnBibVZ5TG0xbGNtZGxLRzl3ZEdsdmJuTXVjR0Z5ZEdsaGJITXNJR1Z1ZGk1d1lYSjBhV0ZzY3lrN1hHNGdJQ0FnSUNCOVhHNGdJQ0FnSUNCcFppQW9kR1Z0Y0d4aGRHVlRjR1ZqTG5WelpWQmhjblJwWVd3Z2ZId2dkR1Z0Y0d4aGRHVlRjR1ZqTG5WelpVUmxZMjl5WVhSdmNuTXBJSHRjYmlBZ0lDQWdJQ0FnWTI5dWRHRnBibVZ5TG1SbFkyOXlZWFJ2Y25NZ1BTQmpiMjUwWVdsdVpYSXViV1Z5WjJVb2IzQjBhVzl1Y3k1a1pXTnZjbUYwYjNKekxDQmxibll1WkdWamIzSmhkRzl5Y3lrN1hHNGdJQ0FnSUNCOVhHNGdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJR052Ym5SaGFXNWxjaTVvWld4d1pYSnpJRDBnYjNCMGFXOXVjeTVvWld4d1pYSnpPMXh1SUNBZ0lDQWdZMjl1ZEdGcGJtVnlMbkJoY25ScFlXeHpJRDBnYjNCMGFXOXVjeTV3WVhKMGFXRnNjenRjYmlBZ0lDQWdJR052Ym5SaGFXNWxjaTVrWldOdmNtRjBiM0p6SUQwZ2IzQjBhVzl1Y3k1a1pXTnZjbUYwYjNKek8xeHVJQ0FnSUgxY2JpQWdmVHRjYmx4dUlDQnlaWFF1WDJOb2FXeGtJRDBnWm5WdVkzUnBiMjRvYVN3Z1pHRjBZU3dnWW14dlkydFFZWEpoYlhNc0lHUmxjSFJvY3lrZ2UxeHVJQ0FnSUdsbUlDaDBaVzF3YkdGMFpWTndaV011ZFhObFFteHZZMnRRWVhKaGJYTWdKaVlnSVdKc2IyTnJVR0Z5WVcxektTQjdYRzRnSUNBZ0lDQjBhSEp2ZHlCdVpYY2dSWGhqWlhCMGFXOXVLQ2R0ZFhOMElIQmhjM01nWW14dlkyc2djR0Z5WVcxekp5azdYRzRnSUNBZ2ZWeHVJQ0FnSUdsbUlDaDBaVzF3YkdGMFpWTndaV011ZFhObFJHVndkR2h6SUNZbUlDRmtaWEIwYUhNcElIdGNiaUFnSUNBZ0lIUm9jbTkzSUc1bGR5QkZlR05sY0hScGIyNG9KMjExYzNRZ2NHRnpjeUJ3WVhKbGJuUWdaR1Z3ZEdoekp5azdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ2NtVjBkWEp1SUhkeVlYQlFjbTluY21GdEtHTnZiblJoYVc1bGNpd2dhU3dnZEdWdGNHeGhkR1ZUY0dWalcybGRMQ0JrWVhSaExDQXdMQ0JpYkc5amExQmhjbUZ0Y3l3Z1pHVndkR2h6S1R0Y2JpQWdmVHRjYmlBZ2NtVjBkWEp1SUhKbGREdGNibjFjYmx4dVpYaHdiM0owSUdaMWJtTjBhVzl1SUhkeVlYQlFjbTluY21GdEtHTnZiblJoYVc1bGNpd2dhU3dnWm00c0lHUmhkR0VzSUdSbFkyeGhjbVZrUW14dlkydFFZWEpoYlhNc0lHSnNiMk5yVUdGeVlXMXpMQ0JrWlhCMGFITXBJSHRjYmlBZ1puVnVZM1JwYjI0Z2NISnZaeWhqYjI1MFpYaDBMQ0J2Y0hScGIyNXpJRDBnZTMwcElIdGNiaUFnSUNCc1pYUWdZM1Z5Y21WdWRFUmxjSFJvY3lBOUlHUmxjSFJvY3p0Y2JpQWdJQ0JwWmlBb1pHVndkR2h6SUNZbUlHTnZiblJsZUhRZ0lUMGdaR1Z3ZEdoeld6QmRJQ1ltSUNFb1kyOXVkR1Y0ZENBOVBUMGdZMjl1ZEdGcGJtVnlMbTUxYkd4RGIyNTBaWGgwSUNZbUlHUmxjSFJvYzFzd1hTQTlQVDBnYm5Wc2JDa3BJSHRjYmlBZ0lDQWdJR04xY25KbGJuUkVaWEIwYUhNZ1BTQmJZMjl1ZEdWNGRGMHVZMjl1WTJGMEtHUmxjSFJvY3lrN1hHNGdJQ0FnZlZ4dVhHNGdJQ0FnY21WMGRYSnVJR1p1S0dOdmJuUmhhVzVsY2l4Y2JpQWdJQ0FnSUNBZ1kyOXVkR1Y0ZEN4Y2JpQWdJQ0FnSUNBZ1kyOXVkR0ZwYm1WeUxtaGxiSEJsY25Nc0lHTnZiblJoYVc1bGNpNXdZWEowYVdGc2N5eGNiaUFnSUNBZ0lDQWdiM0IwYVc5dWN5NWtZWFJoSUh4OElHUmhkR0VzWEc0Z0lDQWdJQ0FnSUdKc2IyTnJVR0Z5WVcxeklDWW1JRnR2Y0hScGIyNXpMbUpzYjJOclVHRnlZVzF6WFM1amIyNWpZWFFvWW14dlkydFFZWEpoYlhNcExGeHVJQ0FnSUNBZ0lDQmpkWEp5Wlc1MFJHVndkR2h6S1R0Y2JpQWdmVnh1WEc0Z0lIQnliMmNnUFNCbGVHVmpkWFJsUkdWamIzSmhkRzl5Y3lobWJpd2djSEp2Wnl3Z1kyOXVkR0ZwYm1WeUxDQmtaWEIwYUhNc0lHUmhkR0VzSUdKc2IyTnJVR0Z5WVcxektUdGNibHh1SUNCd2NtOW5MbkJ5YjJkeVlXMGdQU0JwTzF4dUlDQndjbTluTG1SbGNIUm9JRDBnWkdWd2RHaHpJRDhnWkdWd2RHaHpMbXhsYm1kMGFDQTZJREE3WEc0Z0lIQnliMmN1WW14dlkydFFZWEpoYlhNZ1BTQmtaV05zWVhKbFpFSnNiMk5yVUdGeVlXMXpJSHg4SURBN1hHNGdJSEpsZEhWeWJpQndjbTluTzF4dWZWeHVYRzVsZUhCdmNuUWdablZ1WTNScGIyNGdjbVZ6YjJ4MlpWQmhjblJwWVd3b2NHRnlkR2xoYkN3Z1kyOXVkR1Y0ZEN3Z2IzQjBhVzl1Y3lrZ2UxeHVJQ0JwWmlBb0lYQmhjblJwWVd3cElIdGNiaUFnSUNCcFppQW9iM0IwYVc5dWN5NXVZVzFsSUQwOVBTQW5RSEJoY25ScFlXd3RZbXh2WTJzbktTQjdYRzRnSUNBZ0lDQndZWEowYVdGc0lEMGdiM0IwYVc5dWN5NWtZWFJoV3lkd1lYSjBhV0ZzTFdKc2IyTnJKMTA3WEc0Z0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lIQmhjblJwWVd3Z1BTQnZjSFJwYjI1ekxuQmhjblJwWVd4elcyOXdkR2x2Ym5NdWJtRnRaVjA3WEc0Z0lDQWdmVnh1SUNCOUlHVnNjMlVnYVdZZ0tDRndZWEowYVdGc0xtTmhiR3dnSmlZZ0lXOXdkR2x2Ym5NdWJtRnRaU2tnZTF4dUlDQWdJQzh2SUZSb2FYTWdhWE1nWVNCa2VXNWhiV2xqSUhCaGNuUnBZV3dnZEdoaGRDQnlaWFIxY201bFpDQmhJSE4wY21sdVoxeHVJQ0FnSUc5d2RHbHZibk11Ym1GdFpTQTlJSEJoY25ScFlXdzdYRzRnSUNBZ2NHRnlkR2xoYkNBOUlHOXdkR2x2Ym5NdWNHRnlkR2xoYkhOYmNHRnlkR2xoYkYwN1hHNGdJSDFjYmlBZ2NtVjBkWEp1SUhCaGNuUnBZV3c3WEc1OVhHNWNibVY0Y0c5eWRDQm1kVzVqZEdsdmJpQnBiblp2YTJWUVlYSjBhV0ZzS0hCaGNuUnBZV3dzSUdOdmJuUmxlSFFzSUc5d2RHbHZibk1wSUh0Y2JpQWdMeThnVlhObElIUm9aU0JqZFhKeVpXNTBJR05zYjNOMWNtVWdZMjl1ZEdWNGRDQjBieUJ6WVhabElIUm9aU0J3WVhKMGFXRnNMV0pzYjJOcklHbG1JSFJvYVhNZ2NHRnlkR2xoYkZ4dUlDQmpiMjV6ZENCamRYSnlaVzUwVUdGeWRHbGhiRUpzYjJOcklEMGdiM0IwYVc5dWN5NWtZWFJoSUNZbUlHOXdkR2x2Ym5NdVpHRjBZVnNuY0dGeWRHbGhiQzFpYkc5amF5ZGRPMXh1SUNCdmNIUnBiMjV6TG5CaGNuUnBZV3dnUFNCMGNuVmxPMXh1SUNCcFppQW9iM0IwYVc5dWN5NXBaSE1wSUh0Y2JpQWdJQ0J2Y0hScGIyNXpMbVJoZEdFdVkyOXVkR1Y0ZEZCaGRHZ2dQU0J2Y0hScGIyNXpMbWxrYzFzd1hTQjhmQ0J2Y0hScGIyNXpMbVJoZEdFdVkyOXVkR1Y0ZEZCaGRHZzdYRzRnSUgxY2JseHVJQ0JzWlhRZ2NHRnlkR2xoYkVKc2IyTnJPMXh1SUNCcFppQW9iM0IwYVc5dWN5NW1iaUFtSmlCdmNIUnBiMjV6TG1adUlDRTlQU0J1YjI5d0tTQjdYRzRnSUNBZ2IzQjBhVzl1Y3k1a1lYUmhJRDBnWTNKbFlYUmxSbkpoYldVb2IzQjBhVzl1Y3k1a1lYUmhLVHRjYmlBZ0lDQXZMeUJYY21Gd2NHVnlJR1oxYm1OMGFXOXVJSFJ2SUdkbGRDQmhZMk5sYzNNZ2RHOGdZM1Z5Y21WdWRGQmhjblJwWVd4Q2JHOWpheUJtY205dElIUm9aU0JqYkc5emRYSmxYRzRnSUNBZ2JHVjBJR1p1SUQwZ2IzQjBhVzl1Y3k1bWJqdGNiaUFnSUNCd1lYSjBhV0ZzUW14dlkyc2dQU0J2Y0hScGIyNXpMbVJoZEdGYkozQmhjblJwWVd3dFlteHZZMnNuWFNBOUlHWjFibU4wYVc5dUlIQmhjblJwWVd4Q2JHOWphMWR5WVhCd1pYSW9ZMjl1ZEdWNGRDd2diM0IwYVc5dWN5QTlJSHQ5S1NCN1hHNWNiaUFnSUNBZ0lDOHZJRkpsYzNSdmNtVWdkR2hsSUhCaGNuUnBZV3d0WW14dlkyc2dabkp2YlNCMGFHVWdZMnh2YzNWeVpTQm1iM0lnZEdobElHVjRaV04xZEdsdmJpQnZaaUIwYUdVZ1lteHZZMnRjYmlBZ0lDQWdJQzh2SUdrdVpTNGdkR2hsSUhCaGNuUWdhVzV6YVdSbElIUm9aU0JpYkc5amF5QnZaaUIwYUdVZ2NHRnlkR2xoYkNCallXeHNMbHh1SUNBZ0lDQWdiM0IwYVc5dWN5NWtZWFJoSUQwZ1kzSmxZWFJsUm5KaGJXVW9iM0IwYVc5dWN5NWtZWFJoS1R0Y2JpQWdJQ0FnSUc5d2RHbHZibk11WkdGMFlWc25jR0Z5ZEdsaGJDMWliRzlqYXlkZElEMGdZM1Z5Y21WdWRGQmhjblJwWVd4Q2JHOWphenRjYmlBZ0lDQWdJSEpsZEhWeWJpQm1iaWhqYjI1MFpYaDBMQ0J2Y0hScGIyNXpLVHRjYmlBZ0lDQjlPMXh1SUNBZ0lHbG1JQ2htYmk1d1lYSjBhV0ZzY3lrZ2UxeHVJQ0FnSUNBZ2IzQjBhVzl1Y3k1d1lYSjBhV0ZzY3lBOUlGVjBhV3h6TG1WNGRHVnVaQ2g3ZlN3Z2IzQjBhVzl1Y3k1d1lYSjBhV0ZzY3l3Z1ptNHVjR0Z5ZEdsaGJITXBPMXh1SUNBZ0lIMWNiaUFnZlZ4dVhHNGdJR2xtSUNod1lYSjBhV0ZzSUQwOVBTQjFibVJsWm1sdVpXUWdKaVlnY0dGeWRHbGhiRUpzYjJOcktTQjdYRzRnSUNBZ2NHRnlkR2xoYkNBOUlIQmhjblJwWVd4Q2JHOWphenRjYmlBZ2ZWeHVYRzRnSUdsbUlDaHdZWEowYVdGc0lEMDlQU0IxYm1SbFptbHVaV1FwSUh0Y2JpQWdJQ0IwYUhKdmR5QnVaWGNnUlhoalpYQjBhVzl1S0NkVWFHVWdjR0Z5ZEdsaGJDQW5JQ3NnYjNCMGFXOXVjeTV1WVcxbElDc2dKeUJqYjNWc1pDQnViM1FnWW1VZ1ptOTFibVFuS1R0Y2JpQWdmU0JsYkhObElHbG1JQ2h3WVhKMGFXRnNJR2x1YzNSaGJtTmxiMllnUm5WdVkzUnBiMjRwSUh0Y2JpQWdJQ0J5WlhSMWNtNGdjR0Z5ZEdsaGJDaGpiMjUwWlhoMExDQnZjSFJwYjI1ektUdGNiaUFnZlZ4dWZWeHVYRzVsZUhCdmNuUWdablZ1WTNScGIyNGdibTl2Y0NncElIc2djbVYwZFhKdUlDY25PeUI5WEc1Y2JtWjFibU4wYVc5dUlHbHVhWFJFWVhSaEtHTnZiblJsZUhRc0lHUmhkR0VwSUh0Y2JpQWdhV1lnS0NGa1lYUmhJSHg4SUNFb0ozSnZiM1FuSUdsdUlHUmhkR0VwS1NCN1hHNGdJQ0FnWkdGMFlTQTlJR1JoZEdFZ1B5QmpjbVZoZEdWR2NtRnRaU2hrWVhSaEtTQTZJSHQ5TzF4dUlDQWdJR1JoZEdFdWNtOXZkQ0E5SUdOdmJuUmxlSFE3WEc0Z0lIMWNiaUFnY21WMGRYSnVJR1JoZEdFN1hHNTlYRzVjYm1aMWJtTjBhVzl1SUdWNFpXTjFkR1ZFWldOdmNtRjBiM0p6S0dadUxDQndjbTluTENCamIyNTBZV2x1WlhJc0lHUmxjSFJvY3l3Z1pHRjBZU3dnWW14dlkydFFZWEpoYlhNcElIdGNiaUFnYVdZZ0tHWnVMbVJsWTI5eVlYUnZjaWtnZTF4dUlDQWdJR3hsZENCd2NtOXdjeUE5SUh0OU8xeHVJQ0FnSUhCeWIyY2dQU0JtYmk1a1pXTnZjbUYwYjNJb2NISnZaeXdnY0hKdmNITXNJR052Ym5SaGFXNWxjaXdnWkdWd2RHaHpJQ1ltSUdSbGNIUm9jMXN3WFN3Z1pHRjBZU3dnWW14dlkydFFZWEpoYlhNc0lHUmxjSFJvY3lrN1hHNGdJQ0FnVlhScGJITXVaWGgwWlc1a0tIQnliMmNzSUhCeWIzQnpLVHRjYmlBZ2ZWeHVJQ0J5WlhSMWNtNGdjSEp2Wnp0Y2JuMWNiaUlzSWk4dklFSjFhV3hrSUc5MWRDQnZkWElnWW1GemFXTWdVMkZtWlZOMGNtbHVaeUIwZVhCbFhHNW1kVzVqZEdsdmJpQlRZV1psVTNSeWFXNW5LSE4wY21sdVp5a2dlMXh1SUNCMGFHbHpMbk4wY21sdVp5QTlJSE4wY21sdVp6dGNibjFjYmx4dVUyRm1aVk4wY21sdVp5NXdjbTkwYjNSNWNHVXVkRzlUZEhKcGJtY2dQU0JUWVdabFUzUnlhVzVuTG5CeWIzUnZkSGx3WlM1MGIwaFVUVXdnUFNCbWRXNWpkR2x2YmlncElIdGNiaUFnY21WMGRYSnVJQ2NuSUNzZ2RHaHBjeTV6ZEhKcGJtYzdYRzU5TzF4dVhHNWxlSEJ2Y25RZ1pHVm1ZWFZzZENCVFlXWmxVM1J5YVc1bk8xeHVJaXdpWTI5dWMzUWdaWE5qWVhCbElEMGdlMXh1SUNBbkppYzZJQ2NtWVcxd095Y3NYRzRnSUNjOEp6b2dKeVpzZERzbkxGeHVJQ0FuUGljNklDY21aM1E3Snl4Y2JpQWdKMXdpSnpvZ0p5WnhkVzkwT3ljc1hHNGdJRndpSjF3aU9pQW5KaU40TWpjN0p5eGNiaUFnSjJBbk9pQW5KaU40TmpBN0p5eGNiaUFnSnowbk9pQW5KaU40TTBRN0oxeHVmVHRjYmx4dVkyOXVjM1FnWW1Ga1EyaGhjbk1nUFNBdld5WThQbHdpSjJBOVhTOW5MRnh1SUNBZ0lDQWdjRzl6YzJsaWJHVWdQU0F2V3lZOFBsd2lKMkE5WFM4N1hHNWNibVoxYm1OMGFXOXVJR1Z6WTJGd1pVTm9ZWElvWTJoeUtTQjdYRzRnSUhKbGRIVnliaUJsYzJOaGNHVmJZMmh5WFR0Y2JuMWNibHh1Wlhod2IzSjBJR1oxYm1OMGFXOXVJR1Y0ZEdWdVpDaHZZbW92S2lBc0lDNHVMbk52ZFhKalpTQXFMeWtnZTF4dUlDQm1iM0lnS0d4bGRDQnBJRDBnTVRzZ2FTQThJR0Z5WjNWdFpXNTBjeTVzWlc1bmRHZzdJR2tyS3lrZ2UxeHVJQ0FnSUdadmNpQW9iR1YwSUd0bGVTQnBiaUJoY21kMWJXVnVkSE5iYVYwcElIdGNiaUFnSUNBZ0lHbG1JQ2hQWW1wbFkzUXVjSEp2ZEc5MGVYQmxMbWhoYzA5M2JsQnliM0JsY25SNUxtTmhiR3dvWVhKbmRXMWxiblJ6VzJsZExDQnJaWGtwS1NCN1hHNGdJQ0FnSUNBZ0lHOWlhbHRyWlhsZElEMGdZWEpuZFcxbGJuUnpXMmxkVzJ0bGVWMDdYRzRnSUNBZ0lDQjlYRzRnSUNBZ2ZWeHVJQ0I5WEc1Y2JpQWdjbVYwZFhKdUlHOWlhanRjYm4xY2JseHVaWGh3YjNKMElHeGxkQ0IwYjFOMGNtbHVaeUE5SUU5aWFtVmpkQzV3Y205MGIzUjVjR1V1ZEc5VGRISnBibWM3WEc1Y2JpOHZJRk52ZFhKalpXUWdabkp2YlNCc2IyUmhjMmhjYmk4dklHaDBkSEJ6T2k4dloybDBhSFZpTG1OdmJTOWlaWE4wYVdWcWN5OXNiMlJoYzJndllteHZZaTl0WVhOMFpYSXZURWxEUlU1VFJTNTBlSFJjYmk4cUlHVnpiR2x1ZEMxa2FYTmhZbXhsSUdaMWJtTXRjM1I1YkdVZ0tpOWNibXhsZENCcGMwWjFibU4wYVc5dUlEMGdablZ1WTNScGIyNG9kbUZzZFdVcElIdGNiaUFnY21WMGRYSnVJSFI1Y0dWdlppQjJZV3gxWlNBOVBUMGdKMloxYm1OMGFXOXVKenRjYm4wN1hHNHZMeUJtWVd4c1ltRmpheUJtYjNJZ2IyeGtaWElnZG1WeWMybHZibk1nYjJZZ1EyaHliMjFsSUdGdVpDQlRZV1poY21sY2JpOHFJR2x6ZEdGdVluVnNJR2xuYm05eVpTQnVaWGgwSUNvdlhHNXBaaUFvYVhOR2RXNWpkR2x2YmlndmVDOHBLU0I3WEc0Z0lHbHpSblZ1WTNScGIyNGdQU0JtZFc1amRHbHZiaWgyWVd4MVpTa2dlMXh1SUNBZ0lISmxkSFZ5YmlCMGVYQmxiMllnZG1Gc2RXVWdQVDA5SUNkbWRXNWpkR2x2YmljZ0ppWWdkRzlUZEhKcGJtY3VZMkZzYkNoMllXeDFaU2tnUFQwOUlDZGJiMkpxWldOMElFWjFibU4wYVc5dVhTYzdYRzRnSUgwN1hHNTlYRzVsZUhCdmNuUWdlMmx6Um5WdVkzUnBiMjU5TzF4dUx5b2daWE5zYVc1MExXVnVZV0pzWlNCbWRXNWpMWE4wZVd4bElDb3ZYRzVjYmk4cUlHbHpkR0Z1WW5Wc0lHbG5ibTl5WlNCdVpYaDBJQ292WEc1bGVIQnZjblFnWTI5dWMzUWdhWE5CY25KaGVTQTlJRUZ5Y21GNUxtbHpRWEp5WVhrZ2ZId2dablZ1WTNScGIyNG9kbUZzZFdVcElIdGNiaUFnY21WMGRYSnVJQ2gyWVd4MVpTQW1KaUIwZVhCbGIyWWdkbUZzZFdVZ1BUMDlJQ2R2WW1wbFkzUW5LU0EvSUhSdlUzUnlhVzVuTG1OaGJHd29kbUZzZFdVcElEMDlQU0FuVzI5aWFtVmpkQ0JCY25KaGVWMG5JRG9nWm1Gc2MyVTdYRzU5TzF4dVhHNHZMeUJQYkdSbGNpQkpSU0IyWlhKemFXOXVjeUJrYnlCdWIzUWdaR2x5WldOMGJIa2djM1Z3Y0c5eWRDQnBibVJsZUU5bUlITnZJSGRsSUcxMWMzUWdhVzF3YkdWdFpXNTBJRzkxY2lCdmQyNHNJSE5oWkd4NUxseHVaWGh3YjNKMElHWjFibU4wYVc5dUlHbHVaR1Y0VDJZb1lYSnlZWGtzSUhaaGJIVmxLU0I3WEc0Z0lHWnZjaUFvYkdWMElHa2dQU0F3TENCc1pXNGdQU0JoY25KaGVTNXNaVzVuZEdnN0lHa2dQQ0JzWlc0N0lHa3JLeWtnZTF4dUlDQWdJR2xtSUNoaGNuSmhlVnRwWFNBOVBUMGdkbUZzZFdVcElIdGNiaUFnSUNBZ0lISmxkSFZ5YmlCcE8xeHVJQ0FnSUgxY2JpQWdmVnh1SUNCeVpYUjFjbTRnTFRFN1hHNTlYRzVjYmx4dVpYaHdiM0owSUdaMWJtTjBhVzl1SUdWelkyRndaVVY0Y0hKbGMzTnBiMjRvYzNSeWFXNW5LU0I3WEc0Z0lHbG1JQ2gwZVhCbGIyWWdjM1J5YVc1bklDRTlQU0FuYzNSeWFXNW5KeWtnZTF4dUlDQWdJQzh2SUdSdmJpZDBJR1Z6WTJGd1pTQlRZV1psVTNSeWFXNW5jeXdnYzJsdVkyVWdkR2hsZVNkeVpTQmhiSEpsWVdSNUlITmhabVZjYmlBZ0lDQnBaaUFvYzNSeWFXNW5JQ1ltSUhOMGNtbHVaeTUwYjBoVVRVd3BJSHRjYmlBZ0lDQWdJSEpsZEhWeWJpQnpkSEpwYm1jdWRHOUlWRTFNS0NrN1hHNGdJQ0FnZlNCbGJITmxJR2xtSUNoemRISnBibWNnUFQwZ2JuVnNiQ2tnZTF4dUlDQWdJQ0FnY21WMGRYSnVJQ2NuTzF4dUlDQWdJSDBnWld4elpTQnBaaUFvSVhOMGNtbHVaeWtnZTF4dUlDQWdJQ0FnY21WMGRYSnVJSE4wY21sdVp5QXJJQ2NuTzF4dUlDQWdJSDFjYmx4dUlDQWdJQzh2SUVadmNtTmxJR0VnYzNSeWFXNW5JR052Ym5abGNuTnBiMjRnWVhNZ2RHaHBjeUIzYVd4c0lHSmxJR1J2Ym1VZ1lua2dkR2hsSUdGd2NHVnVaQ0J5WldkaGNtUnNaWE56SUdGdVpGeHVJQ0FnSUM4dklIUm9aU0J5WldkbGVDQjBaWE4wSUhkcGJHd2daRzhnZEdocGN5QjBjbUZ1YzNCaGNtVnVkR3g1SUdKbGFHbHVaQ0IwYUdVZ2MyTmxibVZ6TENCallYVnphVzVuSUdsemMzVmxjeUJwWmx4dUlDQWdJQzh2SUdGdUlHOWlhbVZqZENkeklIUnZJSE4wY21sdVp5Qm9ZWE1nWlhOallYQmxaQ0JqYUdGeVlXTjBaWEp6SUdsdUlHbDBMbHh1SUNBZ0lITjBjbWx1WnlBOUlDY25JQ3NnYzNSeWFXNW5PMXh1SUNCOVhHNWNiaUFnYVdZZ0tDRndiM056YVdKc1pTNTBaWE4wS0hOMGNtbHVaeWtwSUhzZ2NtVjBkWEp1SUhOMGNtbHVaenNnZlZ4dUlDQnlaWFIxY200Z2MzUnlhVzVuTG5KbGNHeGhZMlVvWW1Ga1EyaGhjbk1zSUdWelkyRndaVU5vWVhJcE8xeHVmVnh1WEc1bGVIQnZjblFnWm5WdVkzUnBiMjRnYVhORmJYQjBlU2gyWVd4MVpTa2dlMXh1SUNCcFppQW9JWFpoYkhWbElDWW1JSFpoYkhWbElDRTlQU0F3S1NCN1hHNGdJQ0FnY21WMGRYSnVJSFJ5ZFdVN1hHNGdJSDBnWld4elpTQnBaaUFvYVhOQmNuSmhlU2gyWVd4MVpTa2dKaVlnZG1Gc2RXVXViR1Z1WjNSb0lEMDlQU0F3S1NCN1hHNGdJQ0FnY21WMGRYSnVJSFJ5ZFdVN1hHNGdJSDBnWld4elpTQjdYRzRnSUNBZ2NtVjBkWEp1SUdaaGJITmxPMXh1SUNCOVhHNTlYRzVjYm1WNGNHOXlkQ0JtZFc1amRHbHZiaUJqY21WaGRHVkdjbUZ0WlNodlltcGxZM1FwSUh0Y2JpQWdiR1YwSUdaeVlXMWxJRDBnWlhoMFpXNWtLSHQ5TENCdlltcGxZM1FwTzF4dUlDQm1jbUZ0WlM1ZmNHRnlaVzUwSUQwZ2IySnFaV04wTzF4dUlDQnlaWFIxY200Z1puSmhiV1U3WEc1OVhHNWNibVY0Y0c5eWRDQm1kVzVqZEdsdmJpQmliRzlqYTFCaGNtRnRjeWh3WVhKaGJYTXNJR2xrY3lrZ2UxeHVJQ0J3WVhKaGJYTXVjR0YwYUNBOUlHbGtjenRjYmlBZ2NtVjBkWEp1SUhCaGNtRnRjenRjYm4xY2JseHVaWGh3YjNKMElHWjFibU4wYVc5dUlHRndjR1Z1WkVOdmJuUmxlSFJRWVhSb0tHTnZiblJsZUhSUVlYUm9MQ0JwWkNrZ2UxeHVJQ0J5WlhSMWNtNGdLR052Ym5SbGVIUlFZWFJvSUQ4Z1kyOXVkR1Y0ZEZCaGRHZ2dLeUFuTGljZ09pQW5KeWtnS3lCcFpEdGNibjFjYmlJc0lpOHZJRU55WldGMFpTQmhJSE5wYlhCc1pTQndZWFJvSUdGc2FXRnpJSFJ2SUdGc2JHOTNJR0p5YjNkelpYSnBabmtnZEc4Z2NtVnpiMngyWlZ4dUx5OGdkR2hsSUhKMWJuUnBiV1VnYjI0Z1lTQnpkWEJ3YjNKMFpXUWdjR0YwYUM1Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ2NtVnhkV2x5WlNnbkxpOWthWE4wTDJOcWN5OW9ZVzVrYkdWaVlYSnpMbkoxYm5ScGJXVW5LVnNuWkdWbVlYVnNkQ2RkTzF4dUlpd2lMeThnUlhoaGJYQnNaU0F4T2lCSmJYQnZjblFnYWxGMVpYSjVYRzR2TDJsdGNHOXlkQ0JjSW1weGRXVnllVndpWEc1Y2JpOHZJRVY0WVcxd2JHVWdNam9nU1cxd2IzSjBJRWhoYm1Sc1pXSmhjbk1nZEdWdGNHeGhkR1ZjYm1sdGNHOXlkQ0JJWld4c2IxUmxiWEJzWVhSbElHWnliMjBnWENJdUxpOTBaVzF3YkdGMFpYTXZhR1ZzYkc4dWFHRnVaR3hsWW1GeWMxd2lYRzVjYmk4dklFVjRZVzF3YkdVZ01qb2dRMjl0Y0dsc1pTQjBhR1VnZEdWdGNHeGhkR1ZjYm14bGRDQm9aV3hzYjJoMGJXd2dQU0JJWld4c2IxUmxiWEJzWVhSbEtIc2dibUZ0WlRvZ0oxQmxkR1Z5SnlCOUtUdGNibHh1THk4Z1JYaGhiWEJzWlNBeU9pQlNaVzVrWlhJZ2RHaGxJSFJsYlhCc1lYUmxYRzVrYjJOMWJXVnVkQzVuWlhSRmJHVnRaVzUwUW5sSlpDZ25ZMjl1ZEdGcGJtVnlKeWt1YVc1dVpYSklWRTFNSUQwZ2FHVnNiRzlvZEcxc08xeHVYRzR2THlCRmVHRnRjR3hsSURNNklFeHZaeUIwYnlCamIyNXpiMnhsWEc1amIyNXpiMnhsTG14dlp5Z25TR1ZzYkc4Z1YyOXliR1FuS1RzaUxDSjJZWElnZEdWdGNHeGhkR1Z5SUQwZ2NtVnhkV2x5WlNoY0ltaGhibVJzWldKaGNuTXZjblZ1ZEdsdFpWd2lLVnRjSW1SbFptRjFiSFJjSWwwdWRHVnRjR3hoZEdVN2JXOWtkV3hsTG1WNGNHOXlkSE1nUFNCMFpXMXdiR0YwWlhJb2Uxd2lZMjl0Y0dsc1pYSmNJanBiTnl4Y0lqNDlJRFF1TUM0d1hDSmRMRndpYldGcGJsd2lPbVoxYm1OMGFXOXVLR052Ym5SaGFXNWxjaXhrWlhCMGFEQXNhR1ZzY0dWeWN5eHdZWEowYVdGc2N5eGtZWFJoS1NCN1hHNGdJQ0FnZG1GeUlHaGxiSEJsY2p0Y2JseHVJQ0J5WlhSMWNtNGdYQ0pJWVd4c2J5QmNJbHh1SUNBZ0lDc2dZMjl1ZEdGcGJtVnlMbVZ6WTJGd1pVVjRjSEpsYzNOcGIyNG9LQ2hvWld4d1pYSWdQU0FvYUdWc2NHVnlJRDBnYUdWc2NHVnljeTV1WVcxbElIeDhJQ2hrWlhCMGFEQWdJVDBnYm5Wc2JDQS9JR1JsY0hSb01DNXVZVzFsSURvZ1pHVndkR2d3S1NrZ0lUMGdiblZzYkNBL0lHaGxiSEJsY2lBNklHaGxiSEJsY25NdWFHVnNjR1Z5VFdsemMybHVaeWtzS0hSNWNHVnZaaUJvWld4d1pYSWdQVDA5SUZ3aVpuVnVZM1JwYjI1Y0lpQS9JR2hsYkhCbGNpNWpZV3hzS0dSbGNIUm9NQ0FoUFNCdWRXeHNJRDhnWkdWd2RHZ3dJRG9nS0dOdmJuUmhhVzVsY2k1dWRXeHNRMjl1ZEdWNGRDQjhmQ0I3ZlNrc2Uxd2libUZ0WlZ3aU9sd2libUZ0WlZ3aUxGd2lhR0Z6YUZ3aU9udDlMRndpWkdGMFlWd2lPbVJoZEdGOUtTQTZJR2hsYkhCbGNpa3BLVnh1SUNBZ0lDc2dYQ0loWEZ4dVhDSTdYRzU5TEZ3aWRYTmxSR0YwWVZ3aU9uUnlkV1Y5S1RzaVhYMD0ifQ==
