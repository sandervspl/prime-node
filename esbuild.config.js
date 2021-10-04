/* eslint-disable @typescript-eslint/no-var-requires */
const { readdirSync } = require('fs');
const { fork } = require('child_process');
const { build } = require('esbuild');
const { notify } = require('node-notifier');

const pkg = require('./package.json');

async function bootstrap() {
  const configFiles = readdirSync('./config');

  await build({
    entryPoints: configFiles.map((filename) => `config/${filename}`),
    platform: 'node',
    bundle: true,
    incremental: true,
    outdir: 'dist/config',
  });

  const { dev, prod } = require('./dist/config/env');
  const { globals } = require('./dist/config/globals');

  let nodeFork;

  await build({
    entryPoints: ['src/main.ts'],
    platform: 'node',
    bundle: true,
    incremental: true,
    outfile: 'dist/main.js',
    define: {
      'process.env.VERSION': JSON.stringify(process.env.npm_package_version),
      'process.env.NAME': JSON.stringify(process.env.npm_package_name),
      ...globals,
    },
    target: 'es2018',
    // We can mark all non-dev dependencies as external as they will be installed on the server
    // with npm install, so all imports in the code still work.
    external: Object.keys(pkg.dependencies),
    watch: dev && {
      onRebuild(err) {
        if (err) {
          console.error('watch build failed:', err);
          process.exit(1);
        }

        console.log('Rebuilding server...');

        nodeFork.kill();
        nodeFork = fork('dist/main.js');

        notify({
          title: process.env.npm_package_name,
          message: 'Rebuild complete',
        });
      },
    },
  });

  if (dev) {
    nodeFork = fork('dist/main.js');
  }

  notify({
    title: process.env.npm_package_name,
    message: 'Build complete',
  });

  if (prod) {
    process.exit();
  }
}

bootstrap();
