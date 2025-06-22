if (!self.define) {
  let e,
    s = {};
  const a = (a, n) => (
    (a = new URL(a + '.js', n).href),
    s[a] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = a), (e.onload = s), document.head.appendChild(e);
        } else (e = a), importScripts(a), s();
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (n, i) => {
    const c =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (s[c]) return;
    let t = {};
    const r = (e) => a(e, c),
      o = { module: { uri: c }, exports: t, require: r };
    s[c] = Promise.all(n.map((e) => o[e] || r(e))).then((e) => (i(...e), t));
  };
}
define(['./workbox-c2c0676f'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/Logo-192.png', revision: '598f3a9f4e70c2fc4376814c1426f389' },
        { url: '/Logo-512.png', revision: '41afb0013831d9cb9889aeb68dc14da5' },
        {
          url: '/_next/static/ZX3Mx2O8mA9ybGT8F0wnA/_buildManifest.js',
          revision: '3110a09759ae2f1024eb9a9b9b3a082e',
        },
        {
          url: '/_next/static/ZX3Mx2O8mA9ybGT8F0wnA/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/_next/static/chunks/1491-277feda017fceb85.js',
          revision: 'ZX3Mx2O8mA9ybGT8F0wnA',
        },
        {
          url: '/_next/static/chunks/2034.16ceb465ae2c1bef.js',
          revision: '16ceb465ae2c1bef',
        },
        {
          url: '/_next/static/chunks/3685-8670c559d39de288.js',
          revision: 'ZX3Mx2O8mA9ybGT8F0wnA',
        },
        {
          url: '/_next/static/chunks/3c932782-8fb5678a2a32b78b.js',
          revision: 'ZX3Mx2O8mA9ybGT8F0wnA',
        },
        {
          url: '/_next/static/chunks/4134-370d75e7f4fb0001.js',
          revision: 'ZX3Mx2O8mA9ybGT8F0wnA',
        },
        {
          url: '/_next/static/chunks/472.2c08b965bd9148e2.js',
          revision: '2c08b965bd9148e2',
        },
        {
          url: '/_next/static/chunks/4bd1b696-14fad572144e426f.js',
          revision: 'ZX3Mx2O8mA9ybGT8F0wnA',
        },
        {
          url: '/_next/static/chunks/5048.7d38dcd30740c2b3.js',
          revision: '7d38dcd30740c2b3',
        },
        {
          url: '/_next/static/chunks/5924.c6b71b06da19e503.js',
          revision: 'c6b71b06da19e503',
        },
        {
          url: '/_next/static/chunks/5929.60e394a43fc926ea.js',
          revision: '60e394a43fc926ea',
        },
        {
          url: '/_next/static/chunks/6327-1462267059c7a8d7.js',
          revision: 'ZX3Mx2O8mA9ybGT8F0wnA',
        },
        {
          url: '/_next/static/chunks/6605-dee42ec0fd8bb1b3.js',
          revision: 'ZX3Mx2O8mA9ybGT8F0wnA',
        },
        {
          url: '/_next/static/chunks/6733-07f7697d427f0dca.js',
          revision: 'ZX3Mx2O8mA9ybGT8F0wnA',
        },
        {
          url: '/_next/static/chunks/6766-3b0f64bd7c985900.js',
          revision: 'ZX3Mx2O8mA9ybGT8F0wnA',
        },
        {
          url: '/_next/static/chunks/6b96935f-77c98e1782bca821.js',
          revision: 'ZX3Mx2O8mA9ybGT8F0wnA',
        },
        {
          url: '/_next/static/chunks/7123-56378a312c3525cd.js',
          revision: 'ZX3Mx2O8mA9ybGT8F0wnA',
        },
        {
          url: '/_next/static/chunks/7244-fa1409d3fedb8a74.js',
          revision: 'ZX3Mx2O8mA9ybGT8F0wnA',
        },
        {
          url: '/_next/static/chunks/7254-dc8030987a45558b.js',
          revision: 'ZX3Mx2O8mA9ybGT8F0wnA',
        },
        {
          url: '/_next/static/chunks/747-d95334c179e5e7c8.js',
          revision: 'ZX3Mx2O8mA9ybGT8F0wnA',
        },
        {
          url: '/_next/static/chunks/8690-99d641a7e13f66bd.js',
          revision: 'ZX3Mx2O8mA9ybGT8F0wnA',
        },
        {
          url: '/_next/static/chunks/8e1d74a4-592456502e1153f7.js',
          revision: 'ZX3Mx2O8mA9ybGT8F0wnA',
        },
        {
          url: '/_next/static/chunks/9101.fcc3c5fdcdba0fec.js',
          revision: 'fcc3c5fdcdba0fec',
        },
        {
          url: '/_next/static/chunks/9135-43d0c8cf37c0909c.js',
          revision: 'ZX3Mx2O8mA9ybGT8F0wnA',
        },
        {
          url: '/_next/static/chunks/9341.a5e04b1003bfe050.js',
          revision: 'a5e04b1003bfe050',
        },
        {
          url: '/_next/static/chunks/9423-2b73ee944a999ff0.js',
          revision: 'ZX3Mx2O8mA9ybGT8F0wnA',
        },
        {
          url: '/_next/static/chunks/aaea2bcf-784289928c061015.js',
          revision: 'ZX3Mx2O8mA9ybGT8F0wnA',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-2ce553868296d8a4.js',
          revision: 'ZX3Mx2O8mA9ybGT8F0wnA',
        },
        {
          url: '/_next/static/chunks/app/artefacts/%5Bid%5D/layout-1b209dcaae6a7ed2.js',
          revision: 'ZX3Mx2O8mA9ybGT8F0wnA',
        },
        {
          url: '/_next/static/chunks/app/artefacts/%5Bid%5D/page-ea3d7514b440f849.js',
          revision: 'ZX3Mx2O8mA9ybGT8F0wnA',
        },
        {
          url: '/_next/static/chunks/app/auth/forgot-password/layout-f7b7b812d27e2518.js',
          revision: 'ZX3Mx2O8mA9ybGT8F0wnA',
        },
        {
          url: '/_next/static/chunks/app/auth/forgot-password/page-0c58f678d1c45a3e.js',
          revision: 'ZX3Mx2O8mA9ybGT8F0wnA',
        },
        {
          url: '/_next/static/chunks/app/auth/login/layout-3662263637a0eb00.js',
          revision: 'ZX3Mx2O8mA9ybGT8F0wnA',
        },
        {
          url: '/_next/static/chunks/app/auth/login/page-fe91c3cfd9257f34.js',
          revision: 'ZX3Mx2O8mA9ybGT8F0wnA',
        },
        {
          url: '/_next/static/chunks/app/auth/signup-confirmation/layout-80b9d98cf764bd21.js',
          revision: 'ZX3Mx2O8mA9ybGT8F0wnA',
        },
        {
          url: '/_next/static/chunks/app/auth/signup-confirmation/page-17bcfcdf5f6f1f7f.js',
          revision: 'ZX3Mx2O8mA9ybGT8F0wnA',
        },
        {
          url: '/_next/static/chunks/app/auth/signup/layout-424cde215c98cd4d.js',
          revision: 'ZX3Mx2O8mA9ybGT8F0wnA',
        },
        {
          url: '/_next/static/chunks/app/auth/signup/page-a908b3aab785a225.js',
          revision: 'ZX3Mx2O8mA9ybGT8F0wnA',
        },
        {
          url: '/_next/static/chunks/app/error-efc9f4fc47a4b3f0.js',
          revision: 'ZX3Mx2O8mA9ybGT8F0wnA',
        },
        {
          url: '/_next/static/chunks/app/layout-6fbd028fa41ab001.js',
          revision: 'ZX3Mx2O8mA9ybGT8F0wnA',
        },
        {
          url: '/_next/static/chunks/app/page-81a00918227ec4c6.js',
          revision: 'ZX3Mx2O8mA9ybGT8F0wnA',
        },
        {
          url: '/_next/static/chunks/app/pages/camera/layout-97890dcd7caf0a6f.js',
          revision: 'ZX3Mx2O8mA9ybGT8F0wnA',
        },
        {
          url: '/_next/static/chunks/app/pages/camera/page-548f401801085814.js',
          revision: 'ZX3Mx2O8mA9ybGT8F0wnA',
        },
        {
          url: '/_next/static/chunks/app/pages/home/layout-f6f1ce28e4c4c36e.js',
          revision: 'ZX3Mx2O8mA9ybGT8F0wnA',
        },
        {
          url: '/_next/static/chunks/app/pages/home/page-e35c0b9eb104e82e.js',
          revision: 'ZX3Mx2O8mA9ybGT8F0wnA',
        },
        {
          url: '/_next/static/chunks/app/pages/leaderboard/layout-b5623988881b15be.js',
          revision: 'ZX3Mx2O8mA9ybGT8F0wnA',
        },
        {
          url: '/_next/static/chunks/app/pages/leaderboard/page-9e056755a383022e.js',
          revision: 'ZX3Mx2O8mA9ybGT8F0wnA',
        },
        {
          url: '/_next/static/chunks/app/pages/profile/layout-4cd8aca1e22241a2.js',
          revision: 'ZX3Mx2O8mA9ybGT8F0wnA',
        },
        {
          url: '/_next/static/chunks/app/pages/profile/page-2f991049e00579ff.js',
          revision: 'ZX3Mx2O8mA9ybGT8F0wnA',
        },
        {
          url: '/_next/static/chunks/app/splash/page-b9f20da83d14c876.js',
          revision: 'ZX3Mx2O8mA9ybGT8F0wnA',
        },
        {
          url: '/_next/static/chunks/b13aaa8a-9820bb3f08ad9e3e.js',
          revision: 'ZX3Mx2O8mA9ybGT8F0wnA',
        },
        {
          url: '/_next/static/chunks/b536a0f1.530648aae63de60a.js',
          revision: '530648aae63de60a',
        },
        {
          url: '/_next/static/chunks/framework-2c2be674e67eda3d.js',
          revision: 'ZX3Mx2O8mA9ybGT8F0wnA',
        },
        {
          url: '/_next/static/chunks/main-9a217d1182fe0e3c.js',
          revision: 'ZX3Mx2O8mA9ybGT8F0wnA',
        },
        {
          url: '/_next/static/chunks/main-app-6a1f83bb47a04705.js',
          revision: 'ZX3Mx2O8mA9ybGT8F0wnA',
        },
        {
          url: '/_next/static/chunks/pages/_app-a61587d9d4172ff4.js',
          revision: 'ZX3Mx2O8mA9ybGT8F0wnA',
        },
        {
          url: '/_next/static/chunks/pages/_error-4568ede3abd07e0e.js',
          revision: 'ZX3Mx2O8mA9ybGT8F0wnA',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-cedcc0270632210e.js',
          revision: 'ZX3Mx2O8mA9ybGT8F0wnA',
        },
        {
          url: '/_next/static/css/7b8c0d52636f29ea.css',
          revision: '7b8c0d52636f29ea',
        },
        {
          url: '/_next/static/css/a70d561fad5d5dba.css',
          revision: 'a70d561fad5d5dba',
        },
        {
          url: '/_next/static/media/046b90749014f852-s.woff2',
          revision: '19bf2a23f7f672153135a9d1918f6f9a',
        },
        {
          url: '/_next/static/media/26a46d62cd723877-s.woff2',
          revision: 'befd9c0fdfa3d8a645d5f95717ed6420',
        },
        {
          url: '/_next/static/media/55c55f0601d81cf3-s.woff2',
          revision: '43828e14271c77b87e3ed582dbff9f74',
        },
        {
          url: '/_next/static/media/581909926a08bbc8-s.woff2',
          revision: 'f0b86e7c24f455280b8df606b89af891',
        },
        {
          url: '/_next/static/media/67110d8fe39c5e84-s.woff2',
          revision: '91c073ec3046c2fc252900a89b6fc5d0',
        },
        {
          url: '/_next/static/media/6aacc40b7795b725-s.woff2',
          revision: '48e07fe2ca9c3bc32d09affb2ace8844',
        },
        {
          url: '/_next/static/media/848b99572ad207f3-s.woff2',
          revision: '31904e07bc2fac21149accd8a82eb1b1',
        },
        {
          url: '/_next/static/media/8e9860b6e62d6359-s.woff2',
          revision: '01ba6c2a184b8cba08b0d57167664d75',
        },
        {
          url: '/_next/static/media/97e0cb1ae144a2a9-s.woff2',
          revision: 'e360c61c5bd8d90639fd4503c829c2dc',
        },
        {
          url: '/_next/static/media/999e639cd9d85971-s.woff2',
          revision: '59533f46ae2b6e4fed5c133c03ea0608',
        },
        {
          url: '/_next/static/media/c97d4358b5ad6f1f-s.p.woff2',
          revision: '748da8fce84b0b6ee83bacd60aed2979',
        },
        {
          url: '/_next/static/media/df0a9ae256c0569c-s.woff2',
          revision: 'd54db44de5ccb18886ece2fda72bdfe0',
        },
        {
          url: '/_next/static/media/e4af272ccee01ff0-s.p.woff2',
          revision: '65850a373e258f1c897a2b3d75eb74de',
        },
        {
          url: '/_next/static/media/e6b5cfd5a74e1cae-s.woff2',
          revision: '8358e3d9b140dd03a59878681e98a5e4',
        },
        {
          url: '/_next/static/media/logo-gold.8ca82869.png',
          revision: '4edfee546d49d555fc177f3c888cda46',
        },
        {
          url: '/_next/static/media/logo.41961be4.svg',
          revision: '7d2ae6809708257c37edde0394e2fd76',
        },
        {
          url: '/assets/background.jpg',
          revision: '21bfa059d8bcdfbe279b17d97ac52b01',
        },
        {
          url: '/assets/bg-login.svg',
          revision: '7f00eb4f4290a41e011d2dab4d636a1c',
        },
        { url: '/assets/bg.svg', revision: 'd5ba05ecfa05d268f0d275e0c3f1028c' },
        {
          url: '/assets/car.glb',
          revision: '5304011139bdb367fe34e2957829dffd',
        },
        {
          url: '/assets/controller.glb',
          revision: '087263880c332999e36cc60c7a455396',
        },
        {
          url: '/assets/devicon_google.svg',
          revision: 'a3da4eac465109504a639b49b9084dbb',
        },
        {
          url: '/assets/helpBtn.png',
          revision: 'd54fa7739a88f0f77d91cf0e76b0c2a9',
        },
        {
          url: '/assets/img-login.svg',
          revision: 'ce1cafa133e32b636eddb8484dc50541',
        },
        {
          url: '/assets/landing.jpeg',
          revision: '834312918a324b8a89fb69a43a89c5d8',
        },
        {
          url: '/assets/landing.jpg',
          revision: 'd77ece59b1a9354cc3fb4db8991e4342',
        },
        {
          url: '/assets/lego_spiderman.glb',
          revision: '966299f47b5e9cdb36cf101af8a68703',
        },
        {
          url: '/assets/logo-gold.png',
          revision: '4edfee546d49d555fc177f3c888cda46',
        },
        {
          url: '/assets/logo-gold.svg',
          revision: '21b5a03bc32cccf408630ca2ae6b41dd',
        },
        {
          url: '/assets/logo.png',
          revision: 'b2e67b0b78c9065aa457b25ed0610b3e',
        },
        {
          url: '/assets/logo.svg',
          revision: '7d2ae6809708257c37edde0394e2fd76',
        },
        {
          url: '/assets/testartefact.png',
          revision: '1a5c43262bb1a26f8f9791481f3f418a',
        },
        {
          url: '/badges/badge1.png',
          revision: '3e5c2929e57a8597062d3033b41b49ba',
        },
        {
          url: '/badges/badge2.png',
          revision: 'e621a74875bf8c7d4cca59b6f163b232',
        },
        {
          url: '/badges/badge3.png',
          revision: 'be601bc8082aa917832b5a7296f0a42e',
        },
        {
          url: '/badges/badge4.png',
          revision: 'be601bc8082aa917832b5a7296f0a42e',
        },
        { url: '/favicon.ico', revision: '49f7dcb46c39f872975a58a0110abe4c' },
        { url: '/manifest.json', revision: 'ded93c85d713cec7403ea7d01ad835c2' },
        {
          url: '/model/metadata.json',
          revision: '1307443724f03a940f315fd480c98b73',
        },
        {
          url: '/model/model.json',
          revision: 'a1e3a81ba9541690c4e1c44abeda9f8b',
        },
        {
          url: '/model/weights.bin',
          revision: '3b6eac7159070a298829d812819f110c',
        },
        { url: '/next.svg', revision: '8e061864f388b47f33a1c3780831193e' },
        { url: '/vercel.svg', revision: '61c6b19abff40ea7acd577be818f3976' },
      ],
      { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({ response: e }) =>
              e && 'opaqueredirect' === e.type
                ? new Response(e.body, {
                    status: 200,
                    statusText: 'OK',
                    headers: e.headers,
                  })
                : e,
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 2592e3 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/static.+\.js$/i,
      new e.CacheFirst({
        cacheName: 'next-static-js-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp4|webm)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 48, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ sameOrigin: e, url: { pathname: s } }) =>
        !(!e || s.startsWith('/api/auth/callback') || !s.startsWith('/api/')),
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ request: e, url: { pathname: s }, sameOrigin: a }) =>
        '1' === e.headers.get('RSC') &&
        '1' === e.headers.get('Next-Router-Prefetch') &&
        a &&
        !s.startsWith('/api/'),
      new e.NetworkFirst({
        cacheName: 'pages-rsc-prefetch',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ request: e, url: { pathname: s }, sameOrigin: a }) =>
        '1' === e.headers.get('RSC') && a && !s.startsWith('/api/'),
      new e.NetworkFirst({
        cacheName: 'pages-rsc',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: { pathname: e }, sameOrigin: s }) => s && !e.startsWith('/api/'),
      new e.NetworkFirst({
        cacheName: 'pages',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ sameOrigin: e }) => !e,
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      'GET'
    );
});
