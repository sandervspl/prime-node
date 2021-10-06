<p align="center">
  <img src="https://github.com/react-prime/react-prime/blob/master/src/static/images/prime-logo.png" alt="prime-logo" width="250px" />
</p>

# Prime Node
[![Build Status](https://travis-ci.org/react-prime/prime-node.svg?branch=master)](https://travis-ci.org/react-prime/prime-node)
[![dependencies Status](https://david-dm.org/react-prime/prime-node/status.svg)](https://david-dm.org/react-prime/prime-node)
[![devDependencies Status](https://david-dm.org/react-prime/prime-node/dev-status.svg)](https://david-dm.org/react-prime/prime-node?type=dev)
[![GitHub release](https://img.shields.io/github/release/react-prime/prime-node.svg)](https://github.com/react-prime/prime-node)

---

## Quick start
Use [create-react-prime](https://www.npmjs.com/package/create-react-prime) for easy install.
```
npx create-react-prime my-app
cd my-app
npm start
```

## Features
* [TypeScript](https://www.typescriptlang.org/)
* [esbuild](https://esbuild.github.io/) for bundling
* [ESLint](http://eslint.org) to maintain a consistent code style
* Refer to `package.json` for more details

## NPM Scripts
* Start develop server: `$ npm run start`
* Create production build: `$ npm run build`
* Start server: `$ npm run server`
* Run ESLint: `$ npm run lint`

## Deployment
Make sure all modules are installed:
`$ npm install`

Create a build for production, this will add a `/dist` folder to the root with all bundles.
`$ npm run build`

Run the server file to start server:
`$ npm run server`

For production we recommend to use [PM2](http://pm2.keymetrics.io/) to run the server with advanced process management.

## Development Workflow
🚧 
