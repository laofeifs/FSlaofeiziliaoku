// Service Worker for 老非FS资料库
const CACHE_NAME = 'laofei-fs-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// 需要缓存的静态资源
const STATIC_FILES = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/version.txt',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// 需要缓存的COS资源
const COS_RESOURCES = [
    'https://laofei-1259209256.cos.ap-nanjing.myqcloud.com/gallery/超特图鉴.png',
    'https://laofei-1259209256.cos.ap-nanjing.myqcloud.com/ranking/C排名.png',
    'https://laofei-1259209256.cos.ap-nanjing.myqcloud.com/ranking/PF排名.png',
    'https://laofei-1259209256.cos.ap-nanjing.myqcloud.com/ranking/PG排名.png'
];

// 安装事件 - 缓存静态资源
self.addEventListener('install', (event) => {
    console.log('Service Worker installing...');
    event.waitUntil(
        Promise.all([
            // 缓存静态文件
            caches.open(STATIC_CACHE).then((cache) => {
                console.log('Caching static files');
                return cache.addAll(STATIC_FILES);
            }),
            // 缓存COS资源
            caches.open(DYNAMIC_CACHE).then((cache) => {
                console.log('Caching COS resources');
                return cache.addAll(COS_RESOURCES);
            })
        ]).then(() => {
            console.log('Service Worker installed successfully');
            // 立即激活
            return self.skipWaiting();
        }).catch((error) => {
            console.error('Service Worker installation failed:', error);
        })
    );
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', (event) => {
    console.log('Service Worker activating...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    // 删除旧版本的缓存
                    if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('Service Worker activated');
            // 立即控制所有页面
            return self.clients.claim();
        })
    );
});

// 拦截请求 - 缓存策略
self.addEventListener('fetch', (event) => {
    const request = event.request;
    const url = new URL(request.url);
    
    // 跳过非GET请求
    if (request.method !== 'GET') {
        return;
    }
    
    // 跳过chrome-extension等特殊协议
    if (request.url.startsWith('chrome-extension://') || 
        request.url.startsWith('chrome://') ||
        request.url.includes('chrome-extension')) {
        return;
    }
    
    // 静态资源缓存策略
    if (STATIC_FILES.includes(request.url) || 
        request.url.includes('styles.css') || 
        request.url.includes('script.js') ||
        request.url.includes('version.txt')) {
        
        event.respondWith(
            caches.open(STATIC_CACHE).then((cache) => {
                return cache.match(request).then((response) => {
                    // 如果有缓存，先返回缓存，然后更新
                    if (response) {
                        // 异步更新缓存
                        fetch(request).then((fetchResponse) => {
                            if (fetchResponse.status === 200) {
                                cache.put(request, fetchResponse.clone());
                            }
                        }).catch(() => {
                            // 网络请求失败，继续使用缓存
                        });
                        return response;
                    }
                    
                    // 没有缓存，从网络获取
                    return fetch(request).then((fetchResponse) => {
                        if (fetchResponse.status === 200) {
                            cache.put(request, fetchResponse.clone());
                        }
                        return fetchResponse;
                    });
                });
            })
        );
        return;
    }
    
    // COS资源缓存策略
    if (request.url.includes('laofei-1259209256.cos.ap-nanjing.myqcloud.com')) {
        event.respondWith(
            caches.open(DYNAMIC_CACHE).then((cache) => {
                return cache.match(request).then((response) => {
                    // 如果有缓存，先返回缓存
                    if (response) {
                        // 异步检查更新
                        fetch(request).then((fetchResponse) => {
                            if (fetchResponse.status === 200) {
                                // 检查内容是否有变化
                                fetchResponse.text().then((newText) => {
                                    response.text().then((oldText) => {
                                        if (newText !== oldText) {
                                            cache.put(request, fetchResponse);
                                        }
                                    });
                                });
                            }
                        }).catch(() => {
                            // 网络请求失败，继续使用缓存
                        });
                        return response;
                    }
                    
                    // 没有缓存，从网络获取
                    return fetch(request).then((fetchResponse) => {
                        if (fetchResponse.status === 200) {
                            cache.put(request, fetchResponse.clone());
                        }
                        return fetchResponse;
                    });
                });
            })
        );
        return;
    }
    
    // 其他请求 - 网络优先策略
    event.respondWith(
        fetch(request).then((response) => {
            // 如果网络请求成功，缓存响应
            if (response.status === 200) {
                const responseClone = response.clone();
                caches.open(DYNAMIC_CACHE).then((cache) => {
                    cache.put(request, responseClone);
                });
            }
            return response;
        }).catch(() => {
            // 网络请求失败，尝试从缓存获取
            return caches.match(request).then((response) => {
                return response || new Response('Network error', { status: 503 });
            });
        })
    );
});

// 消息处理 - 用于与主页面通信
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    return caches.delete(cacheName);
                })
            );
        }).then(() => {
            event.ports[0].postMessage({ type: 'CACHE_CLEARED' });
        });
    }
});

// 错误处理
self.addEventListener('error', (event) => {
    console.error('Service Worker error:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
    console.error('Service Worker unhandled rejection:', event.reason);
});
