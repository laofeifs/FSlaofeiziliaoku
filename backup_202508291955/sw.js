const CACHE_NAME = "fs-database-cache-v202508291955";
const urlsToCache = [
  '/',
  '/index.html?v=202508291625',
  '/styles.css?v=202508291625',
  '/script.js?v=202508291625',
  '/version.txt'
];

// 安装时缓存资源
self.addEventListener('install', event => {
  console.log('Service Worker 安装中...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('缓存资源:', urlsToCache);
      return cache.addAll(urlsToCache);
    })
  );
});

// 激活时清理旧缓存
self.addEventListener('activate', event => {
  console.log('Service Worker 激活中...');
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) {
          console.log('删除旧缓存:', key);
          return caches.delete(key);
        }
      }));
    })
  );
});

// 请求拦截：网络优先，缓存兜底
self.addEventListener('fetch', event => {
  // 对于version.txt文件，总是从网络获取最新版本
  if (event.request.url.includes('version.txt')) {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(event.request);
      })
    );
    return;
  }
  
  // 对于script.js文件，总是从网络获取最新版本
  if (event.request.url.includes('script.js')) {
    event.respondWith(
      fetch(event.request).then(response => {
        // 如果网络请求成功，更新缓存
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      }).catch(() => {
        // 网络失败时使用缓存
        return caches.match(event.request);
      })
    );
    return;
  }
  
  // 对于其他文件，网络优先
  event.respondWith(
    fetch(event.request).then(response => {
      // 如果网络请求成功，更新缓存
      if (response.status === 200) {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseClone);
        });
      }
      return response;
    }).catch(() => {
      // 网络失败时使用缓存
      return caches.match(event.request);
    })
  );
});

// 监听消息
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
