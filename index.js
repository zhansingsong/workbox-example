// Inside of build.js:
const {generateSW} = require('workbox-build');
const {join} = require('path');
const { execSync } = require('child_process');

execSync('rm -rf build')
const swDest = 'build/sw.js';
generateSW({
  swDest,
  globDirectory: process.cwd(),
  mode: 'development',
  skipWaiting: true,
  cacheId: 'singsong',
  offlineGoogleAnalytics:true,
  navigationPreload: true,
  sourcemap: false,
  modifyURLPrefix: {
    // 从URL中删除'/ dist'前缀
    'ignore': 'ignore-a'
  },
  manifestTransforms: [
    // 删除某些URL的基本转换
    (originalManifest) => {
      console.log(originalManifest, 'vvv')
      const manifest = originalManifest.filter(
        (entry) => entry.url !== '/other-page');
      // 可选，设置警告消息。
      const warnings = ['singsong']; 
      return {manifest, warnings};
    }
  ],
  templatedURLs: {
    // '/app-shell': [
    //   'dev/templates/app-shell.hbs',
    //   'dev/**/*.css',
    //   ],
    '/other-page': 'my-version-info--a',
  },
  navigateFallback: '/fallback',
  navigateFallbackDenylist: [/^\/_/, /admin/],
  navigateFallbackAllowlist: [/^\/_/, /admin/],
  runtimeCaching: [{
    // Match any request that ends with .png, .jpg, .jpeg or .svg.
    urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

    // Apply a cache-first strategy.
    handler: 'CacheFirst',
    options: {
      // Use a custom cache name.
      cacheName: 'images',

      // Only cache 10 images.
      expiration: {
        maxEntries: 10,
      },
    },
  }],
  // Other configuration options...
}).then(({count, size}) => {
  console.log(`Generated ${swDest}, which will precache ${count} files, totaling ${size} bytes.`);
});