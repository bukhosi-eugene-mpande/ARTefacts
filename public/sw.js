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
define(['./workbox-4754cb34'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/Logo-192.png', revision: '598f3a9f4e70c2fc4376814c1426f389' },
        { url: '/Logo-489.png', revision: 'bea0d7947707ffe9fa1ad96b25d94d3c' },
        { url: '/Logo-512.png', revision: '41afb0013831d9cb9889aeb68dc14da5' },
        {
          url: '/_next/app-build-manifest.json',
          revision: '8ebf0d857da1925a04b49510cec5351b',
        },
        {
          url: '/_next/static/Jnq9BFLWrzHqBa3odbIpm/_buildManifest.js',
          revision: '6701f0245b1e7ae8911d264b2d631f6d',
        },
        {
          url: '/_next/static/Jnq9BFLWrzHqBa3odbIpm/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/_next/static/chunks/1078-b8ae5451764feff6.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/1157-06baf5c69878ccc4.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/1491-a325ab0248f9da2f.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/1512-4e68a71336dcbbc9.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/1530-0c29678d092d817d.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/1670-98b66b1ad5ef32f9.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/1684-fecd3a49e06b9b70.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/3497-e51d098048511426.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/3c932782-8fb5678a2a32b78b.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/4134-370d75e7f4fb0001.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/472.2c08b965bd9148e2.js',
          revision: '2c08b965bd9148e2',
        },
        {
          url: '/_next/static/chunks/4bd1b696-d96d8ddbf26f93fc.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/5048.7d38dcd30740c2b3.js',
          revision: '7d38dcd30740c2b3',
        },
        {
          url: '/_next/static/chunks/5125-c77641c6568e097c.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/5623-f09cf3df3572c013.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
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
          url: '/_next/static/chunks/6504-6efc0bd3b7ff17e5.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/6675-aafe922ff3edcc9d.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/6766-27fe116a98092d3d.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/6874-87f223e32ecfdf65.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/6b96935f-77c98e1782bca821.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/8509-a471cd0205641779.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/8752.22e13e167b2032a9.js',
          revision: '22e13e167b2032a9',
        },
        {
          url: '/_next/static/chunks/8e1d74a4-592456502e1153f7.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/9135-f2bfed0ccb4649e1.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/929-de5dfb816766a86b.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/9341.a5e04b1003bfe050.js',
          revision: 'a5e04b1003bfe050',
        },
        {
          url: '/_next/static/chunks/9608-ed2f405a7df0e761.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/aaea2bcf-784289928c061015.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-03944a3963528664.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/app/auth/login/layout-881631044be0dec2.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/app/auth/login/page-d98fb4b0c6262c10.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/app/auth/signup-confirmation/layout-305745405dc01637.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/app/auth/signup-confirmation/page-f20ea79c5a856151.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/app/auth/signup/layout-55dd03aefea61dad.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/app/auth/signup/page-069e57e8811e2697.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/app/error-ee71cc80ba500d42.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/app/example/artefacts/%5Bid%5D/page-ab182395e288b666.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/app/example/artefacts/page-0bd621215d182f03.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/app/example/avatars/page-5ad548f03e4a4b29.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/app/example/layout-61606d02592337d4.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/app/example/leaderboard/page-37874fea7ddba813.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/app/example/questions/page-60ff41f4204749b9.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/app/example/user/page-02f6bfe6cbf97f0e.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/app/layout-8bb3c60f20c34532.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/app/page-4bd2051b8743b929.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/app/pages/camera/layout-a479704594edf4d5.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/app/pages/camera/page-5fb784fa15b50697.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/app/pages/home/layout-f7c87a26ca350b2f.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/app/pages/home/page-75553d672b3da310.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/app/pages/leaderboard/layout-bd58f98ffb235860.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/app/pages/leaderboard/page-2238f37f383343ef.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/app/pages/profile/layout-ab0183bc11bce6d1.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/app/pages/profile/page-925fdef3c310f703.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/app/splash/page-e9c921a48f2b57a4.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/b13aaa8a-9820bb3f08ad9e3e.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/b536a0f1.530648aae63de60a.js',
          revision: '530648aae63de60a',
        },
        {
          url: '/_next/static/chunks/framework-2c2be674e67eda3d.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/main-app-2ee23d3095e97f7b.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/main-e852172bcdf2f6e2.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/pages/_app-a61587d9d4172ff4.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/pages/_error-4568ede3abd07e0e.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-cfe130fc091b8769.js',
          revision: 'Jnq9BFLWrzHqBa3odbIpm',
        },
        {
          url: '/_next/static/css/7f375b24638f3956.css',
          revision: '7f375b24638f3956',
        },
        {
          url: '/_next/static/css/e7d35dc5b9c09aba.css',
          revision: 'e7d35dc5b9c09aba',
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
          url: '/_next/static/media/6d93bde91c0c2823-s.woff2',
          revision: '621a07228c8ccbfd647918f1021b4868',
        },
        {
          url: '/_next/static/media/848b99572ad207f3-s.woff2',
          revision: '31904e07bc2fac21149accd8a82eb1b1',
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
          url: '/_next/static/media/a34f9d1faa5f3315-s.p.woff2',
          revision: 'd4fe31e6a2aebc06b8d6e558c9141119',
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
        { url: '/android.png', revision: 'f3f62505de0766a4e362c7cb5df84bfb' },
        { url: '/apple.png', revision: '9357892adb4e37ba5b5f7e64e923b05d' },
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
        { url: '/manifest.json', revision: 'fba0a9f84f4146650a22238c7c27016f' },
        {
          url: '/model/metadata.json',
          revision: '6276b7e7f1b28a908c35fc7d11eeb8da',
        },
        {
          url: '/model/model.json',
          revision: '19c28e37989000239c2f542e73d482c2',
        },
        {
          url: '/model/weights.bin',
          revision: '3b6eac7159070a298829d812819f110c',
        },
        { url: '/next.svg', revision: '8e061864f388b47f33a1c3780831193e' },
        { url: '/vercel.svg', revision: '61c6b19abff40ea7acd577be818f3976' },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: a,
              state: n,
            }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: 'OK',
                    headers: s.headers,
                  })
                : s,
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
      /\.(?:mp4)$/i,
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
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
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
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith('/api/auth/') && !!s.startsWith('/api/');
      },
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
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
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
