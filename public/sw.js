if (!self.define) {
  let e,
    s = {};
  const a = (a, i) => (
    (a = new URL(a + '.js', i).href),
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
  self.define = (i, n) => {
    const c =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (s[c]) return;
    let t = {};
    const r = (e) => a(e, c),
      d = { module: { uri: c }, exports: t, require: r };
    s[c] = Promise.all(i.map((e) => d[e] || r(e))).then((e) => (n(...e), t));
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
          revision: 'c6db609cfcc0421f0595eccc3a07c6fc',
        },
        {
          url: '/_next/static/chunks/1078-b8ae5451764feff6.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/1087-e707b6b5fc11f477.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/1157-1a4d26c97678b870.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/1265-2ea4873acf47c528.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/1491-a325ab0248f9da2f.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/1684-fecd3a49e06b9b70.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/3262-147a517060e07dd5.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/3497-e51d098048511426.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/3c932782-8fb5678a2a32b78b.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/4134-94149759468e1da8.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/4bd1b696-d96d8ddbf26f93fc.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
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
          url: '/_next/static/chunks/6504-6efc0bd3b7ff17e5.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/6570-de3740726a55c9f1.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/6766-27fe116a98092d3d.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/6874-87f223e32ecfdf65.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/6b96935f-77c98e1782bca821.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/7254-cee03ab04e8a0dee.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/7906-9907a28dcca99c28.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/827-0e9addbb4b13b697.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/8648-5ebc1c377e418b08.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/8e1d74a4-592456502e1153f7.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/9135-b8ae20698ec409e0.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/aaea2bcf-784289928c061015.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-03944a3963528664.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/app/auth/login/layout-460cdb3868fd9643.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/app/auth/login/page-a06ac1770df219ab.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/app/auth/signup-confirmation/layout-ac03676a9f376361.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/app/auth/signup-confirmation/page-03a2b977cd37ce4b.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/app/auth/signup/layout-4978b8fc1aef7c3b.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/app/auth/signup/page-8695012f1edfcda9.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/app/error-9ebbd1406f3ea62e.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/app/example/artefacts/%5Bid%5D/page-683808bfe805bbe2.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/app/example/artefacts/page-24eac0827e064b6b.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/app/example/avatars/page-26b63555f32cc7a5.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/app/example/layout-61606d02592337d4.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/app/example/leaderboard/page-7992848ae5a04ad4.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/app/example/questions/page-cd90e262e021da82.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/app/example/user/page-655b13f0609a59f6.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/app/layout-64567cea9c0499d5.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/app/page-321a02221b16bfe1.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/app/pages/camera/layout-98e116e0b9ca8150.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/app/pages/camera/page-3bdbd730d00cafe5.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/app/pages/home/layout-d12a8b20f717bfa3.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/app/pages/home/page-45902d49f5faee3d.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/app/pages/leaderboard/layout-7dff4314d86bc312.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/app/pages/leaderboard/page-e09ac4e17cb7374d.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/app/pages/profile/layout-d59b84eb958d295c.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/app/pages/profile/page-6ca21284686011ff.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/app/splash/page-2f8083f753f054dc.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/b13aaa8a-9820bb3f08ad9e3e.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/b536a0f1.530648aae63de60a.js',
          revision: '530648aae63de60a',
        },
        {
          url: '/_next/static/chunks/framework-2c2be674e67eda3d.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/main-699289f6f051f4d1.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/main-app-25203bb048ba357d.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/pages/_app-5d1abe03d322390c.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/pages/_error-3b2a1d523de49635.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-dbce84a46530711f.js',
          revision: 'dsGGjUIQU6kBMhhmykqrJ',
        },
        {
          url: '/_next/static/css/e7d35dc5b9c09aba.css',
          revision: 'e7d35dc5b9c09aba',
        },
        {
          url: '/_next/static/css/f4e82906f0258bac.css',
          revision: 'f4e82906f0258bac',
        },
        {
          url: '/_next/static/dsGGjUIQU6kBMhhmykqrJ/_buildManifest.js',
          revision: 'c27958c14e38dd8e63231543f7a128f3',
        },
        {
          url: '/_next/static/dsGGjUIQU6kBMhhmykqrJ/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
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
          url: '/_next/static/media/logo.ffe6d416.svg',
          revision: 'cc7b574575399f94b2125a8664de732b',
        },
        { url: '/android.png', revision: 'f3f62505de0766a4e362c7cb5df84bfb' },
        { url: '/apple.png', revision: '9357892adb4e37ba5b5f7e64e923b05d' },
        {
          url: '/assets/background.jpg',
          revision: '21bfa059d8bcdfbe279b17d97ac52b01',
        },
        {
          url: '/assets/bg-login.svg',
          revision: '62bf5fd28de34dd3059da20c84b5348f',
        },
        { url: '/assets/bg.svg', revision: 'ed731ee08ece6015edc17766fd641267' },
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
          revision: '388f4f3f7291f48c722ad83063ca8af1',
        },
        {
          url: '/assets/helpBtn.png',
          revision: 'd54fa7739a88f0f77d91cf0e76b0c2a9',
        },
        {
          url: '/assets/img-login.svg',
          revision: 'd33eb5f308b32e75303eea1404dedcab',
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
          revision: '411cc6a97fefcb8eec774ea8ffc20d49',
        },
        {
          url: '/assets/logo.png',
          revision: 'b2e67b0b78c9065aa457b25ed0610b3e',
        },
        {
          url: '/assets/logo.svg',
          revision: 'cc7b574575399f94b2125a8664de732b',
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
              state: i,
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
