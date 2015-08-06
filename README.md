# Boilerplate for HTML5 ES6 Web Apps

Yet another boilerplate for HTML5 web apps. This time using ES6 (ECMAScript 6) everywhere as well as SASS.

This boilerplate comes with these pre-installed and ready to use features:

- Gulp (ES6 style gulpfile)
- SASS
- Bourbon (ligthweight mixin library for SASS, [http://bourbon.io/](http://bourbon.io/))
- SASS-MQ (media queries in an elegant way, [https://github.com/sass-mq/sass-mq](https://github.com/sass-mq/sass-mq))
- ES6 via Babel transpiler (use all those shiny new ES6 Features now, [https://babeljs.io/](https://babeljs.io/))
- Browserify (used together with babelify for module loading the new ES6 way via import,export in your JS files)

## Structure

All source files belong to the src folder. The page itself is served off the ```public``` folder.

Gulp tasks deploy your compiled and packed styles (one ```styles.css```) and scripts (```scripts.js```) to this public folder either uncompressed with sourcemaps as default or compressed and without sourcemaps for production (use ```--production``` argument to gulp tasks).


## Installation

All dependecies are installed as npm packages.

```
npm install
```

## Gulp Tasks

coming soon

## Add Modules and Libraries

To add my dependencies I use npm - even for browser-only libraries, as npm is a great package manager and there is no need to use something like Bower. If your preferred library is not available as npm package or has no package.json you can use [napa](https://www.npmjs.com/package/napa) to install such packages from Git.

But your are free to add Bower or jspm or another JS package manager to this boilerplate. 

  
