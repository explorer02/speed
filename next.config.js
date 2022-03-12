/* eslint-disable no-param-reassign */
/** @type {impor t('next').NextConfig} */

// const Uglify = require('uglifyjs-webpack-plugin');

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: 'true',
// });

// module.exports = withBundleAnalyzer({
//   reactStrictMode: true,
//   swcMinify: true,
//   webpack: (c) => {
//     c.plugins = c.plugins.filter((plugin) => plugin.constructor.name !== 'UglifyJsPlugin');

//     c.optimization.minimize = true;
//     c.optimization.minimizer.push(
//       new Uglify({
//         uglifyOptions: {
//           warnings: false,
//           parse: {},
//           compress: {},
//           mangle: true, // Note `mangle.properties` is `false` by default.
//           output: null,
//           toplevel: false,
//           nameCache: null,
//           ie8: false,
//           keep_fnames: false,
//         },
//       }),
//     );

//     c.plugins.push(
//       new Uglify({
//         parallel: true,
//         uglifyOptions: {
//           warnings: false,
//           parse: {},
//           compress: {},
//           mangle: true, // Note `mangle.properties` is `false` by default.
//           output: null,
//           toplevel: false,
//           nameCache: null,
//           ie8: false,
//           keep_fnames: false,
//         },
//       }),
//     );

//     return c;
//   },
// });

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
};
