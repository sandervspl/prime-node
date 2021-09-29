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

  const { dev } = require('./dist/config/env');
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

  nodeFork = fork('dist/main.js');

  notify({
    title: process.env.npm_package_name,
    message: 'Build complete',
  });
}

bootstrap();
