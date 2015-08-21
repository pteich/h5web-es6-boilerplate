# Boilerplate for HTML5 ES6 (ES2015) Web Apps

Yet another boilerplate for HTML5 web apps. This time using ES6 (ECMAScript 6, ES2015) everywhere as well as SASS to superpower your styles and Gulp as your beloved task runner. It uses Browserify to bundle your Javascript dependencies so all you have to do is to import them as ES6-style module imports.
I use this as a starting point for my web apps. Maybe you find it useful too.

## Features

This boilerplate comes with these pre-installed and ready to use features:

- Gulp with ES6 (ES2015) style gulpfile ([http://gulpjs.com/](http://gulpjs.com/))
- SASS ([http://sass-lang.com/](http://sass-lang.com/))
- Bourbon (ligthweight mixin library for SASS, [http://bourbon.io/](http://bourbon.io/))
- SASS-MQ (media queries in an elegant way, [https://github.com/sass-mq/sass-mq](https://github.com/sass-mq/sass-mq))
- ES6 (ES2015) via Babel transpiler (use all those shiny new [ES6 Features](http://es6-features.org/) now, [https://babeljs.io/](https://babeljs.io/))
- Browserify (used together with babelify for module loading the new ES6 way via import/export in your JS files)
- Browser-Sync (for synchronised browser testing [http://www.browsersync.io/](http://www.browsersync.io/))
- Code minification for CSS and JS for production releases (add `--production` argument to gulp task)
- browserify-shim integration to load unsupported libraries ([browserify-shim-recipes](https://github.com/thlorenz/browserify-shim/wiki/browserify-shim-recipes))
- import and use [Handlebars](http://handlebarsjs.com) templates in your JS files, they will be compiled and bundled via Browserify

## ES6 / ES2015

No reason to wait anymore, use ES6 and all its [shiny nice features](http://es6-features.org/) now! Classes, fat arrow functions, generators, promises and the new modules system can be used now using the great **Babel** transpiler that makes them available for ES5 that is supported in all modern browsers.


## Structure

All source files belong to the src folder. The page itself is served off the `public` folder.

Gulp tasks deploy your compiled and packed styles (one `styles.css`) and scripts (`app.js`) to this public folder either uncompressed with sourcemaps as default or compressed and without sourcemaps for production (use `--production` argument to gulp tasks).


## Installation

You need NodeJS and npm allready installed on your system. If you need help have a look at [https://nodejs.org/](https://nodejs.org/)

Clone this repo and install als dependencies with this command:

```
npm install
```

After that execute `gulp serve`, point your browser to http://localhost:3000 and start adding and editing files in `src`.

## Gulp Tasks

* `gulp serve` - starts Browsersync and serves your app for testing in different browsers (default: http://localhost:3000, Browsersync-UI at http://localhost:3001), after changes on SCSS files and JS files in `src` or HTML files in `public` the page is automatically refreshed
* `gulp styles` - compiles your SASS files and copies the result CSS file to `public/css`
* `gulp scripts` - transpiles your ES6 scriptfiles in `src/js`, creates a package with all imported files as `app.js` in `public/js`

Add `--production` to any gulp task to activate production mode. In production mode all code will be minified and no sourcemaps are written.

## Add Modules and Libraries

To add my dependencies I use npm - even for browser-only libraries, as npm is a great package manager and there is no need to use something like Bower. If your preferred library is not available as npm package or has no package.json you can use [napa](https://www.npmjs.com/package/napa) to install such packages from Git or add them manual to ```src/vendor```.

But your are free to add Bower or jspm or another JS package manager to this boilerplate.

## Javascript modules import

WIP coming soon

**WIP!**
TODO:
- initial structure and dependencies [✓]
- add Bourbon and sass-mq [✓]
- default sass files [✓]
- SASS styles gulp task [✓]
- default HTML file [✓]
- default javascript file [✓]
- JS transpile browserify gulp task [✓]
- Handlebars support [✓]
- Browserify support for legacy libraries [✓]
- browser-sync gulp task [✓]
- add JS linting [ ]
- add unit test runner [ ]
- add code coverage reporting tasks [ ]
- ...  
