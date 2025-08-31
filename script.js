// 腾讯云COS配置 - 使用公共访问域名
var COS_CONFIG = {
    // 使用公共访问域名，不需要SecretId和SecretKey
    Bucket: 'laofei-1259209256',
    Region: 'ap-nanjing', // 南京地域
    // COS访问域名，使用新存储桶域名
    Domain: 'https://laofei-1259209256.cos.ap-nanjing.myqcloud.com',
    // 备用域名，如果主域名有问题
    BackupDomain: 'https://laofei-1259209256.cos-website.ap-nanjing.myqcloud.com',
    // 添加更多备用域名
    FallbackDomains: [
        'https://laofei-1259209256.cos.ap-nanjing.myqcloud.com',
        'https://laofei-1259209256.cos-website.ap-nanjing.myqcloud.com',
        'https://laofei-1259209256.cos.ap-nanjing.myqcloud.com'
    ]
};

// 移动端图片加载优化配置
var MOBILE_IMAGE_CONFIG = {
    // 移动端图片加载重试次数
    maxRetries: 3,
    // 重试间隔（毫秒）
    retryDelay: 1000,
    // 移动端图片加载超时时间
    timeout: 10000,
    // 是否启用移动端特殊处理
    enableMobileOptimization: true,
    // 移动端图片压缩参数
    mobileImageParams: '?imageView2/2/w/800/format/webp',
    // 备用图片格式
    fallbackFormats: ['webp', 'jpg', 'png']
};

// 图片加载诊断和修复配置
var IMAGE_LOAD_CONFIG = {
    // 启用详细诊断
    enableDiagnostics: true,
    // 启用自动修复
    enableAutoFix: true,
    // 最大重试次数
    maxRetries: 5,
    // 重试间隔（毫秒）
    retryDelay: 2000,
    // 超时时间
    timeout: 15000,
    // 启用备用域名
    enableFallbackDomains: true,
    // 启用图片压缩
    enableImageCompression: true,
    // 压缩参数
    compressionParams: '?imageView2/2/w/800/format/webp',
    // 启用缓存破坏
    enableCacheBusting: true
};

// 当前选中的代次
var currentGeneration = '9';

// 图鉴数据 - 所有代数共用一张图片
var galleryData = {
    image: 'gallery/超特图鉴.png',
    // 备用图片路径，如果主图片不存在则使用这个
    fallbackImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjQwMCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDgiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7lm77niYfliqDovb3lpLHotKU8L3RleHQ+Cjx0ZXh0IHg9IjQwMCIgeT0iMjgwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7lm77niYfliqDovb3lpLHotKU8L3RleHQ+Cjx0ZXh0IHg9IjQwMCIgeT0iMzIwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7lm77niYfliqDovb3lpLHotKU8L3RleHQ+Cjx0ZXh0IHg9IjQwMCIgeT0iMzYwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7lm77niYfliqDovb3lpLHotKU8L3RleHQ+Cjx0ZXh0IHg9IjQwMCIgeT0iNDAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7lm77niYfliqDovb3lpLHotKU8L3RleHQ+Cjx0ZXh0IHg9IjQwMCIgeT0iNDQwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7lm77niYfliqDovb3lpLHotKU8L3RleHQ+Cjx0ZXh0IHg9IjQwMCIgeT0iNDgwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7lm77niYfliqDovb3lpLHotKU8L3RleHQ+Cjx0ZXh0IHg9IjQwMCIgeT0iNTIwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7lm77niYfliqDovb3lpLHotKU8L3RleHQ+Cjx0ZXh0IHg9IjQwMCIgeT0iNTYwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7lm77niYfliqDovb3lpLHotKU8L3RleHQ+Cjwvc3ZnPgo='
    // 移除备用图片设置
};

// 角色数据示例（你可以根据实际情况修改）
var charactersData = {
    '1': [
        {
            id: '1_1',
            name: '小芸',
            generation: '1代超特',
            description: '一代超特角色',
            image: 'characters/1代超特/小芸.png'
        },
        {
            id: '1_2',
            name: '雷龙',
            generation: '1代超特',
            description: '一代超特角色',
            image: 'characters/1代超特/雷龙.png'
        },
        {
            id: '1_3',
            name: '蛇姬',
            generation: '1代超特',
            description: '一代超特角色',
            image: 'characters/1代超特/蛇姬.png'
                }
    ],
    '2': [
        {
            id: '2_1',
            name: '安杰拉',
            generation: '2代超特',
            description: '二代超特角色',
            image: 'characters/2代超特/安杰拉.png',
            gifFolder: 'gifs/2代超特/安杰拉/'
        },
        {
            id: '2_2',
            name: '沃顿',
            generation: '2代超特',
            description: '二代超特角色',
            image: 'characters/2代超特/沃顿.png',
            gifFolder: 'gifs/2代超特/沃顿/'
        },
        {
            id: '2_3',
            name: '莉莉斯',
            generation: '2代超特',
            description: '二代超特角色',
            image: 'characters/2代超特/莉莉斯.png',
            gifFolder: 'gifs/2代超特/莉莉斯/'
        },
        {
            id: '2_4',
            name: '路西法',
            generation: '2代超特',
            description: '二代超特角色',
            image: 'characters/2代超特/路西法.png',
            gifFolder: 'gifs/2代超特/路西法/'
        }
    ],
    '3': [
        {
            id: '3_1',
            name: '凤凰',
            generation: '3代超特',
            description: '三代超特角色',
            image: 'characters/3代超特/凤凰.png',
            gifFolder: 'gifs/3代超特/凤凰/'
        },
        {
            id: '3_2',
            name: '白虎',
            generation: '3代超特',
            description: '三代超特角色',
            image: 'characters/3代超特/白虎.png',
            gifFolder: 'gifs/3代超特/白虎/'
        },
        {
            id: '3_3',
            name: '酒鬼',
            generation: '3代超特',
            description: '三代超特角色',
            image: 'characters/3代超特/酒鬼.png',
            gifFolder: 'gifs/3代超特/酒鬼/'
        },
        {
            id: '3_4',
            name: '麒麟',
            generation: '3代超特',
            description: '三代超特角色',
            image: 'characters/3代超特/麒麟.png',
            gifFolder: 'gifs/3代超特/麒麟/'
        }
    ],
    '3_5': [
        {
            id: '3_5_1',
            name: '悠夏',
            generation: '3.5代超特',
            description: '三点五代超特角色',
            image: 'characters/3.5代超特/悠夏.png',
            gifFolder: 'gifs/3.5代超特/悠夏/'
        },
        {
            id: '3_5_2',
            name: '托姆斯',
            generation: '3.5代超特',
            description: '三点五代超特角色',
            image: 'characters/3.5代超特/托姆斯.png',
            gifFolder: 'gifs/3.5代超特/托姆斯/'
        },
        {
            id: '3_5_3',
            name: '浩然',
            generation: '3.5代超特',
            description: '三点五代超特角色',
            image: 'characters/3.5代超特/浩然.png',
            gifFolder: 'gifs/3.5代超特/浩然/'
        },
        {
            id: '3_5_4',
            name: '芙熙',
            generation: '3.5代超特',
            description: '三点五代超特角色',
            image: 'characters/3.5代超特/芙熙.png',
            gifFolder: 'gifs/3.5代超特/芙熙/'
        }
    ],
    '4': [
        {
            id: '4_1',
            name: '丽雅',
            generation: '4代超特',
            description: '四代超特角色',
            image: 'characters/4代超特/丽雅.png',
            gifFolder: 'gifs/4代超特/丽雅/'
        },
        {
            id: '4_2',
            name: '狐狸',
            generation: '4代超特',
            description: '四代超特角色',
            image: 'characters/4代超特/狐狸.png',
            gifFolder: 'gifs/4代超特/狐狸/'
        },
        {
            id: '4_3',
            name: '玛丽',
            generation: '4代超特',
            description: '四代超特角色',
            image: 'characters/4代超特/玛丽.png',
            gifFolder: 'gifs/4代超特/玛丽/'
        },
        {
            id: '4_4',
            name: '雷鸣',
            generation: '4代超特',
            description: '四代超特角色',
            image: 'characters/4代超特/雷鸣.png',
            gifFolder: 'gifs/4代超特/雷鸣/'
        },
        {
            id: '4_5',
            name: '露美',
            generation: '4代超特',
            description: '四代超特角色',
            image: 'characters/4代超特/露美.png',
            gifFolder: 'gifs/4代超特/露美/'
        }
    ],
    '4_5': [
        {
            id: '4_5_1',
            name: '夏洛梅特',
            generation: '4.5代超特',
            description: '四点五代超特角色',
            image: 'characters/4.5代超特/夏洛梅特.png',
            gifFolder: 'gifs/4.5代超特/夏洛梅特/'
        }
    ],
    '6': [
        {
            id: '6_1',
            name: '光暗',
            generation: '6代超特',
            description: '光暗双属性角色',
            image: 'characters/6代超特/光暗.png',
            gifFolder: 'gifs/6代超特/光暗/'
        },
        {
            id: '6_2',
            name: '冰火',
            generation: '6代超特',
            description: '冰火双属性角色',
            image: 'characters/6代超特/冰火.png',
            gifFolder: 'gifs/6代超特/冰火/'
        },
        {
            id: '6_3',
            name: '钢铁剧毒',
            generation: '6代超特',
            description: '钢铁剧毒双属性角色',
            image: 'characters/6代超特/钢铁剧毒.png',
            gifFolder: 'gifs/6代超特/钢铁剧毒/'
        },
        {
            id: '6_4',
            name: '风雷',
            generation: '6代超特',
            description: '风雷双属性角色',
            image: 'characters/6代超特/风雷.png',
            gifFolder: 'gifs/6代超特/风雷/'
        }
    ],
    '5': [
        {
            id: '5_1',
            name: '艾达',
            generation: '5代超特',
            description: '五代超特角色',
            image: 'characters/5代超特/艾达.png',
            gifFolder: 'gifs/5代超特/艾达/'
        },
        {
            id: '5_2',
            name: '杰罗',
            generation: '5代超特',
            description: '五代超特角色',
            image: 'characters/5代超特/杰罗.png',
            gifFolder: 'gifs/5代超特/杰罗/'
        }
    ],
    '7': [
        {
            id: '7_1',
            name: '玄武',
            generation: '7代超特',
            description: '七代超特角色',
            image: 'characters/7代超特/玄武.png',
            gifFolder: 'gifs/7代超特/玄武/'
        },
        {
            id: '7_2',
            name: '雪舞',
            generation: '7代超特',
            description: '七代超特角色',
            image: 'characters/7代超特/雪舞.png',
            gifFolder: 'gifs/7代超特/雪舞/'
        },
        {
            id: '7_3',
            name: '月儿',
            generation: '7代超特',
            description: '七代超特角色',
            image: 'characters/7代超特/月儿.png',
            gifFolder: 'gifs/7代超特/月儿/'
        }
    ],
    '9': [
        {
            id: '9_1',
            name: '亚琪/亚克',
            generation: '9代超特',
            description: '九代超特角色，共用一套动作',
            image: 'characters/9代超特/亚琪亚克.png',
            actions: [
                { name: '不看人传球', gif: 'gifs/9代超特/亚琪亚克/不看人传球.gif' },
                { name: '大手冒', gif: 'gifs/9代超特/亚琪亚克/大手冒.gif' },
                { name: '地板', gif: 'gifs/9代超特/亚琪亚克/地板.gif' },
                { name: '快速起来', gif: 'gifs/9代超特/亚琪亚克/快速起来.gif' },
                { name: '篮板', gif: 'gifs/9代超特/亚琪亚克/篮板.gif' },
                { name: '抢断', gif: 'gifs/9代超特/亚琪亚克/抢断.gif' },
                { name: '小手冒', gif: 'gifs/9代超特/亚琪亚克/小手冒.gif' },
                { name: '中手冒', gif: 'gifs/9代超特/亚琪亚克/中手冒.gif' },
                { name: 'A分球', gif: 'gifs/9代超特/亚琪亚克/A分球.gif' },
                { name: 'A近扣', gif: 'gifs/9代超特/亚琪亚克/A近扣.gif' },
                { name: 'A近上', gif: 'gifs/9代超特/亚琪亚克/A近上.gif' },
                { name: 'A篮板', gif: 'gifs/9代超特/亚琪亚克/A篮板.gif' },
                { name: 'A三分', gif: 'gifs/9代超特/亚琪亚克/A三分.gif' },
                { name: 'A远扣', gif: 'gifs/9代超特/亚琪亚克/A远扣.gif' },
                { name: 'A远上', gif: 'gifs/9代超特/亚琪亚克/A远上.gif' },
                { name: 'A中投', gif: 'gifs/9代超特/亚琪亚克/A中投.gif' },
                { name: 'B分球', gif: 'gifs/9代超特/亚琪亚克/B分球.gif' },
                { name: 'B近扣', gif: 'gifs/9代超特/亚琪亚克/B近扣.gif' },
                { name: 'B近上', gif: 'gifs/9代超特/亚琪亚克/B近上.gif' },
                { name: 'B篮板', gif: 'gifs/9代超特/亚琪亚克/B篮板.gif' },
                { name: 'B三分', gif: 'gifs/9代超特/亚琪亚克/B三分.gif' },
                { name: 'B远扣', gif: 'gifs/9代超特/亚琪亚克/B远扣.gif' },
                { name: 'B远上', gif: 'gifs/9代超特/亚琪亚克/B远上.gif' },
                { name: 'B中投', gif: 'gifs/9代超特/亚琪亚克/B中投.gif' },
                { name: 'X', gif: 'gifs/9代超特/亚琪亚克/X.gif' }
            ]
        },
        {
            id: '9_2',
            name: '罗卡',
            generation: '9代超特',
            description: '九代超特角色',
            image: 'characters/9代超特/罗卡.png',
            actions: [
                { name: '不看人传球', gif: 'gifs/9代超特/罗卡/不看人传球.gif' },
                { name: '大手冒', gif: 'gifs/9代超特/罗卡/大手冒.gif' },
                { name: '地板', gif: 'gifs/9代超特/罗卡/地板.gif' },
                { name: '小手冒', gif: 'gifs/9代超特/罗卡/小手冒.gif' },
                { name: '中手冒', gif: 'gifs/9代超特/罗卡/中手冒.gif' },
                { name: 'A分球', gif: 'gifs/9代超特/罗卡/A分球.gif' },
                { name: 'A近扣', gif: 'gifs/9代超特/罗卡/A近扣.gif' },
                { name: 'A近上', gif: 'gifs/9代超特/罗卡/A近上.gif' },
                { name: 'A篮板', gif: 'gifs/9代超特/罗卡/A篮板.gif' },
                { name: 'A三分', gif: 'gifs/9代超特/罗卡/A三分.gif' },
                { name: 'A远扣', gif: 'gifs/9代超特/罗卡/A远扣.gif' },
                { name: 'A远上', gif: 'gifs/9代超特/罗卡/A远上.gif' },
                { name: 'A中投', gif: 'gifs/9代超特/罗卡/A中投.gif' },
                { name: 'B分球', gif: 'gifs/9代超特/罗卡/B分球.gif' },
                { name: 'B近扣', gif: 'gifs/9代超特/罗卡/B近扣.gif' },
                { name: 'B近上', gif: 'gifs/9代超特/罗卡/B近上.gif' },
                { name: 'B篮板', gif: 'gifs/9代超特/罗卡/B篮板.gif' },
                { name: 'B三分', gif: 'gifs/9代超特/罗卡/B三分.gif' },
                { name: 'B远扣', gif: 'gifs/9代超特/罗卡/B远扣.gif' },
                { name: 'B远上', gif: 'gifs/9代超特/罗卡/B远上.gif' },
                { name: 'B中投', gif: 'gifs/9代超特/罗卡/B中投.gif' },
                { name: 'X', gif: 'gifs/9代超特/罗卡/X.gif' }
            ]
        }
    ],
    '8': [
        {
            id: '8_1',
            name: '奥丁',
            generation: '8代超特',
            description: '八代超特角色',
            image: 'characters/8代超特/奥丁.png',
            gifFolder: 'gifs/8代超特/奥丁/'
        },
        {
            id: '8_2',
            name: '月神',
            generation: '8代超特',
            description: '八代超特角色',
            image: 'characters/8代超特/月神.png',
            gifFolder: 'gifs/8代超特/月神/'
        },
        {
            id: '8_3',
            name: '哈托尔',
            generation: '8代超特',
            description: '八代超特角色',
            image: 'characters/8代超特/哈托尔.png',
            gifFolder: 'gifs/8代超特/哈托尔/'
        }
    ]
    // 其他代次的角色数据...
};

// 检测微信内置浏览器
function isWeChat() {
    var ua = navigator.userAgent.toLowerCase();
    return ua.indexOf('micromessenger') !== -1;
}

// 检测安卓设备
function isAndroid() {
    var ua = navigator.userAgent.toLowerCase();
    return ua.indexOf('android') !== -1;
}

// 检测安卓微信浏览器
function isAndroidWeChat() {
    return isWeChat() && isAndroid();
}

// 强制刷新页面
function forceRefresh() {
    // 清除所有缓存
    if ('caches' in window) {
        caches.keys().then(function(names) {
            for (let name of names) {
                caches.delete(name);
            }
        });
    }
    
    // 清除localStorage
    localStorage.clear();
    
    // 强制重新加载
                    // window.location.reload(true); // 注释掉自动刷新
}

// 自动强制刷新（如果检测到微信浏览器）
function autoForceRefresh() {
    if (isWeChat()) {
        console.log('检测到微信内置浏览器，检查是否需要刷新');
        // 只在版本不匹配时才刷新
        var storedVersion = localStorage.getItem('fs_version');
        var currentVersion = '202508291605';
        
        if (storedVersion !== currentVersion) {
            console.log('版本不匹配，执行强制刷新');
            setTimeout(function() {
                forceRefresh();
            }, 1000);
        } else {
            console.log('版本匹配，无需刷新');
        }
    }
}

// 版本检查功能已移除，简化代码
function checkVersion() {
    console.log('版本检查功能已移除');
}



// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM加载完成');
    
    // iOS Safari特殊处理
    var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS) {
        console.log('检测到iOS设备');
        
        // 添加iOS专用错误处理
        window.addEventListener('error', function(e) {
            console.error('iOS错误:', e.error);
        });
        
        // 添加资源加载错误处理
        window.addEventListener('load', function() {
            console.log('iOS页面加载完成');
            // 检查关键资源是否加载成功
            var images = document.querySelectorAll('img');
            for (var i = 0; i < images.length; i++) {
                if (!images[i].complete) {
                    console.warn('图片加载失败:', images[i].src);
                }
            }
        });
        
        // 强制清除iOS缓存
        if (window.navigator.standalone) {
            console.log('iOS独立应用模式，清除缓存');
            localStorage.clear();
            sessionStorage.clear();
        }
    }
    
    // 微信浏览器兼容性处理
    if (isWeChat()) {
        console.log('检测到微信内置浏览器，禁用自动刷新功能');
        // 微信浏览器禁用所有自动刷新功能
        
        // 安卓微信浏览器特殊处理
        if (isAndroidWeChat()) {
            console.log('安卓微信浏览器，清除所有缓存数据');
            // 清除所有可能的缓存数据
            localStorage.clear();
            sessionStorage.clear();
            
            // 添加安卓微信专用提示
            var tip = document.createElement('div');
            tip.style.cssText = 'position:fixed;top:10px;right:10px;background:#ff6b6b;color:white;padding:8px 12px;border-radius:4px;font-size:12px;z-index:9999;';
            tip.innerHTML = '安卓微信用户：右上角刷新获取最新版本';
            document.body.appendChild(tip);
            
            // 3秒后自动隐藏提示
            setTimeout(function() {
                if (tip.parentNode) {
                    tip.parentNode.removeChild(tip);
                }
            }, 3000);
        }
        

    }
    
    // 简化初始化，只保留核心功能
    try {
        console.log('开始初始化页面功能');
        
        // 分步初始化，便于调试
        console.log('1. 初始化导航');
        initializeNavigation();
        
        console.log('2. 初始化筛选');
        initializeFilters();
        
        console.log('3. 加载角色');
        loadCharacters(currentGeneration);
        
        console.log('4. 加载图鉴');
        loadGallery(currentGeneration);
        
        // 默认隐藏筛选按钮（因为默认是gallery页面）
        var filterContainer = document.querySelector('.filter-container');
        if (filterContainer) {
            filterContainer.style.display = 'none';
        }
        
        console.log('5. 初始化排名');
        // 初始化职业排名功能
        initializeRanking();
        
        // 移动端图片预加载
        if (isMobile()) {
            console.log('6. 移动端图片预加载');
            preloadMobileImages([
                COS_CONFIG.Domain + '/gallery/超特图鉴.png',
                COS_CONFIG.Domain + '/ranking/C排名.png',
                COS_CONFIG.Domain + '/ranking/PF排名.png',
                COS_CONFIG.Domain + '/ranking/PG排名.png'
            ]);
        }
        
        // 启动图片加载诊断
        console.log('7. 启动图片加载诊断');
        setTimeout(() => {
            diagnoseImageLoading();
        }, 2000);
        
        // 启动COS连接测试
        console.log('8. 启动COS连接测试');
        setTimeout(() => {
            testCOSBucketAccess();
        }, 3000);
        
        console.log('页面功能初始化完成');
        
        // iOS设备特殊检查
        if (isIOS) {
            setTimeout(function() {
                console.log('iOS页面状态检查');
                var contentSections = document.querySelectorAll('.content-section');
                console.log('内容区域数量:', contentSections.length);
                
                for (var i = 0; i < contentSections.length; i++) {
                    console.log('区域', i, ':', contentSections[i].id, '显示状态:', contentSections[i].style.display);
                }
            }, 2000);
        }
    } catch (error) {
        console.error('页面初始化出错:', error);
        // iOS设备显示错误信息
        if (isIOS) {
            alert('页面加载出错: ' + error.message);
        }
    }
});

// 初始化主导航
function initializeNavigation() {
    console.log('初始化导航按钮');
    var navButtons = document.querySelectorAll('.nav-btn');
    console.log('找到导航按钮数量:', navButtons.length);
    
    for (var i = 0; i < navButtons.length; i++) {
        navButtons[i].addEventListener('click', function() {
            console.log('导航按钮被点击:', this.textContent.trim());
            
            // 移除所有活动状态
            for (var j = 0; j < navButtons.length; j++) {
                navButtons[j].classList.remove('active');
            }
            // 添加当前活动状态
            this.classList.add('active');
            
            // 切换内容区域
            var section = this.getAttribute('data-section');
            console.log('切换到的区域:', section);
            
            // 正常切换内容区域
            switchSection(section);
        });
    }
    console.log('导航按钮初始化完成');
}

// 初始化筛选按钮
function initializeFilters() {
    var filterButtons = document.querySelectorAll('.filter-btn');
    
    for (var i = 0; i < filterButtons.length; i++) {
        filterButtons[i].addEventListener('click', function() {
            // 移除所有活动状态
            for (var j = 0; j < filterButtons.length; j++) {
                filterButtons[j].classList.remove('active');
            }
            // 添加当前活动状态
            this.classList.add('active');
            
            // 更新当前代次并加载角色
            currentGeneration = this.getAttribute('data-generation');
            loadCharacters(currentGeneration);
            loadGallery(currentGeneration);
        });
    }
}

// 切换内容区域
function switchSection(sectionName) {
    console.log('切换内容区域:', sectionName);
    
    // 隐藏所有内容区域
    const sections = document.querySelectorAll('.content-section');
    console.log('找到内容区域数量:', sections.length);
    sections.forEach(section => {
        section.classList.remove('active');
        console.log('隐藏区域:', section.id);
    });
    
    // 显示选中的内容区域
    const targetSection = document.getElementById(sectionName + '-section');
    console.log('目标区域ID:', sectionName + '-section');
    console.log('找到目标区域:', targetSection);
    
    if (targetSection) {
        targetSection.classList.add('active');
        console.log('激活区域:', targetSection.id);
    } else {
        console.error('找不到目标区域:', sectionName + '-section');
    }
    
    // 控制筛选按钮的显示/隐藏
    const filterContainer = document.querySelector('.filter-container');
    if (sectionName === 'characters') {
        // 只在"超特动作"页面显示筛选按钮
        if (filterContainer) {
            filterContainer.style.display = 'block';
            console.log('显示筛选按钮');
        }
    } else {
        // 其他页面隐藏筛选按钮
        if (filterContainer) {
            filterContainer.style.display = 'none';
            console.log('隐藏筛选按钮');
        }
    }
}

// 加载角色数据
function loadCharacters(generation) {
    console.log('开始加载角色数据，代次:', generation);
    
    const charactersGrid = document.getElementById('characters-grid');
    if (!charactersGrid) {
        console.error('找不到角色网格容器');
        return;
    }
    
    // 清空现有内容
    charactersGrid.innerHTML = '';
    
    // 获取当前代次的角色数据
    const characters = charactersData[generation] || [];
    console.log('找到角色数量:', characters.length);
    
    if (characters.length === 0) {
        console.warn('没有找到', generation, '代角色数据');
        charactersGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #6b7280;">
                <p>暂无${generation}代超特角色数据</p>
                <p>请稍后更新...</p>
            </div>
        `;
        return;
    }
    
    // 创建角色卡片
    characters.forEach(character => {
        console.log('处理角色:', character.name, 'ID:', character.id);
        const characterCard = createCharacterCard(character);
        charactersGrid.appendChild(characterCard);
    });
    
    console.log('角色加载完成，代次:', generation);
}

// 创建角色卡片
function createCharacterCard(character) {
    console.log('创建角色卡片:', character.name, '图片路径:', character.image);
    
    const card = document.createElement('div');
    card.className = 'character-card';
    
    // 构建动作按钮HTML
    let actionsHtml = '';
    if (character.actions && character.actions.length > 0) {
        // 9代超特使用预设动作列表
        actionsHtml = `
            <div class="character-actions">
                <h4>动作技能</h4>
                <div class="action-buttons">
                    ${character.actions.map(action => `
                        <button class="action-btn" data-gif="${COS_CONFIG.Domain}/${action.gif}">
                            <i class="fas fa-play"></i>
                            <span>${action.name}</span>
                        </button>
                    `).join('')}
                </div>
                <div class="action-preview">
                    <div class="gif-container" id="gif-${character.id}">
                        <p>点击上方动作按钮查看GIF</p>
                    </div>
                </div>
            </div>
        `;
    } else if (character.gifFolder) {
        // 其他代次使用动态读取GIF文件
        actionsHtml = `
            <div class="character-actions">
                <h4>动作技能</h4>
                <div class="action-buttons" id="actions-${character.id}">
                    <p>正在加载动作...</p>
                </div>
                <div class="action-preview">
                    <div class="gif-container" id="gif-${character.id}">
                        <p>点击上方动作按钮查看GIF</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    card.innerHTML = `
        <div class="character-header">
            <div class="character-image">
                <div id="img-container-${character.id}" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #f3f4f6; border-radius: 50%;">
                    <span style="color: #9ca3af; font-size: 0.9rem;">加载中...</span>
                </div>
            </div>
            <div class="character-info">
                <h3 class="character-name">${character.name}</h3>
                <p class="character-generation">${character.generation}</p>
            </div>
        </div>
        <div class="character-actions-container">
            ${actionsHtml}
        </div>
    `;
    
    // 使用增强的图片加载功能 - 为所有角色统一使用
    if (character.image) {
        const imgContainer = card.querySelector('#img-container-' + character.id);
        const img = createEnhancedImage(character.image, character.name);
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        img.style.borderRadius = '50%';
        
        // 替换加载提示
        imgContainer.innerHTML = '';
        imgContainer.appendChild(img);
    }
    
    // 添加动作按钮事件监听
    if (character.actions && character.actions.length > 0) {
        // 9代超特使用预设动作列表
        var actionButtons = card.querySelectorAll('.action-btn');
        var gifContainer = card.querySelector('#gif-' + character.id);
        
        for (var i = 0; i < actionButtons.length; i++) {
            (function(button) {
                button.onclick = function(e) {
                    e.preventDefault(); // 阻止默认行为
                    e.stopPropagation(); // 阻止事件冒泡
                    
                    // 移除所有按钮的激活状态
                    for (var j = 0; j < actionButtons.length; j++) {
                        actionButtons[j].classList.remove('active');
                    }
                    // 添加当前按钮的激活状态
                    this.classList.add('active');
                    
                    // 显示对应的GIF - 使用移动端兼容的GIF加载函数
                    var gifUrl = this.getAttribute('data-gif');
                    var actionName = this.querySelector('span').textContent;
                    
                    console.log('🎯 点击动作按钮:', actionName);
                    console.log('🔗 GIF URL:', gifUrl);
                    console.log('📱 设备信息:', navigator.userAgent);
                    
                    // 清空容器并显示加载提示
                    gifContainer.innerHTML = '<div style="text-align: center; padding: 20px; color: #9ca3af;">加载GIF中...</div>';
                    
                    // 确保GIF容器可见 - 移动端优化
                    gifContainer.style.display = 'block';
                    gifContainer.style.position = 'relative';
                    gifContainer.style.zIndex = '9999'; // 提高层级
                    gifContainer.style.background = '#ffffff';
                    gifContainer.style.border = '1px solid #e5e7eb';
                    gifContainer.style.borderRadius = '8px';
                    gifContainer.style.padding = '10px';
                    gifContainer.style.margin = '10px 0';
                    gifContainer.style.width = '100%';
                    gifContainer.style.maxWidth = '100%';
                    gifContainer.style.overflow = 'visible';
                    
                    // 移动端特殊处理
                    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                        console.log('📱 检测到移动设备，应用移动端优化');
                        gifContainer.style.webkitTransform = 'translateZ(0)'; // 启用硬件加速
                        gifContainer.style.transform = 'translateZ(0)';
                        gifContainer.style.webkitBackfaceVisibility = 'hidden';
                        gifContainer.style.backfaceVisibility = 'hidden';
                    }
                    
                    // 创建图片元素 - 移动端兼容
                    const img = new Image();
                    img.className = 'action-gif';
                    img.style.maxWidth = '100%';
                    img.style.width = 'auto';
                    img.style.height = 'auto';
                    img.style.display = 'block';
                    img.style.margin = '0 auto';
                    img.style.zIndex = '10000'; // 最高层级
                    img.style.position = 'relative';
                    img.style.verticalAlign = 'top';
                    img.alt = actionName;
                    
                    // 移动端图片优化
                    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                        img.style.webkitTransform = 'translateZ(0)';
                        img.style.transform = 'translateZ(0)';
                        img.style.webkitBackfaceVisibility = 'hidden';
                        img.style.backfaceVisibility = 'hidden';
                        img.style.imageRendering = 'auto';
                        img.style.webkitImageRendering = 'auto';
                    }
                    
                    // 加载成功处理
                    img.onload = function() {
                        console.log('✅ GIF加载成功:', gifUrl);
                        console.log('📏 尺寸:', img.naturalWidth, 'x', img.naturalHeight);
                        console.log('📱 设备:', navigator.userAgent);
                        
                        // 替换加载提示
                        gifContainer.innerHTML = '';
                        gifContainer.appendChild(img);
                        gifContainer.innerHTML += '<p class="action-name" style="text-align: center; margin-top: 10px; font-weight: bold; color: #374151; font-size: 14px;">' + actionName + '</p>';
                        
                        // 移动端强制重绘
                        if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                            // 触发重绘
                            gifContainer.style.display = 'none';
                            gifContainer.offsetHeight;
                            gifContainer.style.display = 'block';
                            
                            // 延迟再次触发，确保显示
                            setTimeout(() => {
                                gifContainer.style.opacity = '0.99';
                                setTimeout(() => {
                                    gifContainer.style.opacity = '1';
                                }, 10);
                            }, 100);
                        }
                    };
                    
                    // 加载失败处理
                    img.onerror = function() {
                        console.log('❌ GIF加载失败:', gifUrl);
                        console.log('📱 设备:', navigator.userAgent);
                        
                        // 尝试备用方案
                        if (!gifUrl.includes('?')) {
                            console.log('🔄 尝试添加时间戳重试...');
                            img.src = gifUrl + '?t=' + Date.now();
                            return;
                        }
                        
                        gifContainer.innerHTML = '<div style="text-align: center; padding: 20px; color: #dc3545; background: #f8d7da; border: 1px solid #f5c6cb; border-radius: 4px; font-size: 14px;">GIF加载失败<br>设备: ' + navigator.userAgent.substring(0, 50) + '...</div>';
                    };
                    
                    // 设置图片源
                    img.src = gifUrl;
                };
            })(actionButtons[i]);
        }
    } else if (character.gifFolder) {
        // 其他代次动态加载GIF文件
        loadGifFiles(character.gifFolder, character.id, card);
    }
    
    return card;
}

// 加载图鉴数据
function loadGallery(generation) {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return;
    
    // 清空现有内容
    galleryGrid.innerHTML = '';
    
    // 创建图鉴卡片
    const galleryCard = createGalleryCard();
    galleryGrid.appendChild(galleryCard);
}

// 创建图鉴卡片
function createGalleryCard() {
    console.log('创建图鉴卡片');
    console.log('图鉴图片路径:', galleryData.image);
    
    const card = document.createElement('div');
    card.className = 'gallery-card-full';
    
    // 构建图片URL（使用腾讯云COS）
    const imageUrl = galleryData.image ? `${COS_CONFIG.Domain}/${galleryData.image}` : '';
    console.log('图鉴图片URL:', imageUrl);
    
    // 添加时间戳避免缓存问题
    const imageUrlWithTimestamp = imageUrl ? `${imageUrl}?t=${Date.now()}` : '';
    console.log('带时间戳的图鉴图片URL:', imageUrlWithTimestamp);
    
    card.innerHTML = `
        <div class="gallery-image-full">
            <div id="gallery-img-container" style="width: 100%; display: flex; align-items: center; justify-content: center; background: #f3f4f6; min-height: 200px;">
                <span style="color: #9ca3af; font-size: 1rem;">加载中...</span>
            </div>
        </div>
        <div class="gallery-info">
            <h3 class="gallery-name">超特图鉴</h3>
            <p class="gallery-generation">所有代数角色一览</p>
        </div>
    `;
    
    // 使用增强的图片加载功能
    if (galleryData.image) {
        const imgContainer = card.querySelector('#gallery-img-container');
        const img = createEnhancedImage(galleryData.image, '超特图鉴');
        img.style.width = '100%';
        img.style.height = 'auto';
        img.style.objectFit = 'contain';
        
        // 替换加载提示
        imgContainer.innerHTML = '';
        imgContainer.appendChild(img);
    }
    
    return card;
}

// 图片加载成功处理
function handleImageLoad(img, characterName) {
    console.log(`✅ ${characterName} 图片加载成功`);
    console.log(`图片URL: ${img.src}`);
    console.log(`图片尺寸: ${img.naturalWidth} x ${img.naturalHeight}`);
}

// 图片加载失败处理
function handleImageError(img, characterName) {
    console.log('❌ ' + characterName + ' 图片加载失败');
    console.log('失败URL: ' + img.src);
    console.log('错误详情: 可能是文件不存在或网络问题');
    
    // 详细的错误诊断
    var errorInfo = {
        characterName: characterName,
        failedUrl: img.src,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        isWeChat: /MicroMessenger/i.test(navigator.userAgent),
        isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent),
        isAndroid: /Android/.test(navigator.userAgent),
        networkOnline: navigator.onLine,
        cosDomain: COS_CONFIG.Domain
    };
    
    console.log('详细错误信息:', errorInfo);
    
    // 检查是否是COS域名问题
    if (img.src.indexOf(COS_CONFIG.Domain) === -1) {
        console.error('❌ 图片URL不是COS域名，可能是配置问题');
        console.error('当前图片URL:', img.src);
        console.error('期望的COS域名:', COS_CONFIG.Domain);
        console.error('URL是否包含COS域名:', img.src.indexOf(COS_CONFIG.Domain));
    }
    
    // 检查网络连接
    if (!navigator.onLine) {
        console.error('❌ 网络连接已断开');
    }
    
    // iOS设备特殊处理
    var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS) {
        console.log('iOS设备图片加载失败，尝试重新加载');
        // iOS设备尝试重新加载图片
        setTimeout(function() {
            if (img.src.indexOf('?t=') === -1) {
                var retryUrl = img.src + '?t=' + new Date().getTime();
                console.log('iOS重试URL:', retryUrl);
                img.src = retryUrl;
            }
        }, 1000);
    }
    
    // 移除COS诊断提示
    
    // 设置默认图片
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7mnKzlm748L3RleHQ+Cjx0ZXh0IHg9IjEwMCIgeT0iMTIwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7lm77niYfliqDovb3lpLHotKU8L3RleHQ+Cjwvc3ZnPgo=';
    img.alt = characterName + ' (图片加载失败)';
}

// 图鉴图片错误处理（简化版）
function handleGalleryImageError(img, characterName) {
    console.log('❌ ' + characterName + ' 图鉴图片加载失败');
    console.log('失败URL: ' + img.src);
    
    // 尝试切换域名
    if (img.src.indexOf(COS_CONFIG.Domain) !== -1 && COS_CONFIG.BackupDomain) {
        console.log('尝试切换到备用域名');
        const backupUrl = img.src.replace(COS_CONFIG.Domain, COS_CONFIG.BackupDomain);
        console.log('备用URL:', backupUrl);
        img.src = backupUrl;
        return;
    }
    
    // 使用默认错误处理
    handleImageError(img, characterName);
}

// 移除COS诊断相关函数

// 移除COS配置测试函数

// 禁用下拉刷新
function preventPullToRefresh() {
    // 阻止触摸事件
    let startY = 0;
    let currentY = 0;
    
    document.addEventListener('touchstart', function(e) {
        startY = e.touches[0].pageY;
    }, { passive: false });
    
    document.addEventListener('touchmove', function(e) {
        currentY = e.touches[0].pageY;
        
        // 如果是在页面顶部下拉，阻止默认行为
        if (window.scrollY === 0 && currentY > startY) {
            e.preventDefault();
        }
    }, { passive: false });
    
    // 移除阻止页面刷新的代码
    // window.addEventListener('beforeunload', function(e) {
    //     e.preventDefault();
    //     e.returnValue = '';
    // });
    
    // 禁用右键菜单
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });
}



// 移除COS帮助信息函数

// 从腾讯云COS获取文件列表（示例函数）
async function getCOSFileList(prefix = '') {
    try {
        // 这里需要根据你的COS配置来实现文件列表获取
        // 可以使用COS SDK或者直接访问COS的API
        console.log('获取COS文件列表:', prefix);
        
        // 示例：返回模拟的文件列表
        return [
            'characters/1gen/character1.jpg',
            'characters/2gen/character2.jpg',
            'characters/5gen/character5.jpg'
        ];
    } catch (error) {
        console.error('获取COS文件列表失败:', error);
        return [];
    }
}

// 上传文件到COS（示例函数）
async function uploadToCOS(file, path) {
    try {
        // 这里需要根据你的COS配置来实现文件上传
        console.log('上传文件到COS:', path);
        
        // 示例：模拟上传成功
        return {
            success: true,
            url: `${COS_CONFIG.Domain}/${path}`
        };
    } catch (error) {
        console.error('上传文件失败:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// 工具函数：格式化文件大小
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// 工具函数：获取文件扩展名
function getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
}

// 工具函数：验证文件类型
function isValidFileType(file, allowedTypes = ['jpg', 'jpeg', 'png', 'gif', 'mp4', 'webm']) {
    const extension = getFileExtension(file.name).toLowerCase();
    return allowedTypes.includes(extension);
}

// 动态加载GIF文件
function loadGifFiles(folder, characterId, card) {
    console.log('开始加载GIF文件:', characterId, '文件夹:', folder);
    
    // 确保文件夹路径正确（移除末尾斜杠，避免重复）
    var cleanFolder = folder.replace(/\/$/, '');
    
    // 根据角色ID确定使用哪个GIF文件列表
    var commonGifFiles = [];
    
    // 2代、3代、3.5代、4代、4.5代超特通用GIF文件
    if (characterId.includes('2_') || characterId.includes('3_') || characterId.includes('4_')) {
        commonGifFiles = [
            'X.gif',
            '三分.gif',
            '中手冒.gif',
            '中投.gif',
            '大手冒.gif',
            '小手冒.gif',
            '抢断.gif',
            '篮板.gif',
            '近上.gif',
            '近扣.gif',
            '远上.gif',
            '远扣.gif'
        ];
    } else if (characterId.includes('5_')) {
        if (characterId === '5_1') {
            // 艾达的GIF文件
            commonGifFiles = [
                'X.gif',
                '三分.gif',
                '中手冒.gif',
                '中投.gif',
                '大手冒.gif',
                '小手冒.gif',
                '抢断.gif',
                '篮板.gif',
                '近上.gif',
                '近扣.gif',
                '远上.gif',
                '远扣.gif'
            ];
        } else if (characterId === '5_2') {
            // 杰罗的GIF文件
            commonGifFiles = [
                'X.gif',
                '中手.gif',
                '中投.gif',
                '分球.gif',
                '地板.gif',
                '大手冒.gif',
                '小手冒.gif',
                '快速跑传.gif',
                '投篮.gif',
                '灌篮盖帽.gif',
                '篮板.gif',
                '近上.gif',
                '近扣.gif',
                '远上.gif',
                '远扣.gif'
            ];
        }
    } else if (characterId.includes('6_')) {
        // 根据具体角色ID确定使用哪个双角色的GIF文件
        if (characterId === '6_1') {
            // 光暗双角色
            commonGifFiles = [
                '光X.gif',
                '光三分.gif',
                '光中手.gif',
                '光中投.gif',
                '光分球.gif',
                '光地板.gif',
                '光大手.gif',
                '光小手.gif',
                '光篮板.gif',
                '光近上.gif',
                '光近扣.gif',
                '光远上.gif',
                '光远扣.gif',
                '暗X.gif',
                '暗三分.gif',
                '暗中手.gif',
                '暗中投.gif',
                '暗分球.gif',
                '暗地板.gif',
                '暗大手.gif',
                '暗小手冒.gif',
                '暗篮板.gif',
                '暗近上.gif',
                '暗近扣.gif',
                '暗远上.gif',
                '暗远扣.gif'
            ];
        } else if (characterId === '6_2') {
            // 冰火双角色
            commonGifFiles = [
                '水X.gif',
                '水三分.gif',
                '水中投.gif',
                '水分球.gif',
                '水地板.gif',
                '水大手冒.gif',
                '水小手冒.gif',
                '水篮板.gif',
                '水近上.gif',
                '水近扣.gif',
                '水远上.gif',
                '水远扣.gif',
                '火X.gif',
                '火三分.gif',
                '火中投.gif',
                '火分球.gif',
                '火地板.gif',
                '火大手冒.gif',
                '火小手冒.gif',
                '火篮板.gif',
                '火近上.gif',
                '火近扣.gif',
                '火远上.gif',
                '火远扣.gif'
            ];
        } else if (characterId === '6_3') {
            // 钢铁剧毒双角色
            commonGifFiles = [
                '剧毒X.gif',
                '剧毒三分.gif',
                '剧毒中投.gif',
                '剧毒分球.gif',
                '剧毒地板.gif',
                '剧毒大手冒.gif',
                '剧毒小手冒.gif',
                '剧毒小手哦冒.gif',
                '剧毒篮板.gif',
                '剧毒近上.gif',
                '剧毒近扣.gif',
                '剧毒远上.gif',
                '剧毒远扣.gif',
                '毒液中投.gif',
                '钢铁X.gif',
                '钢铁XX.gif',
                '钢铁三分.gif',
                '钢铁中投.gif',
                '钢铁分球.gif',
                '钢铁地板.gif',
                '钢铁大手冒.gif',
                '钢铁小手冒.gif',
                '钢铁篮板.gif',
                '钢铁近上.gif',
                '钢铁近扣.gif',
                '钢铁远上.gif',
                '钢铁远扣.gif'
            ];
        } else if (characterId === '6_4') {
            // 风雷双角色
            commonGifFiles = [
                '雷X.gif',
                '雷三分.gif',
                '雷中投.gif',
                '雷分球.gif',
                '雷地板.gif',
                '雷大手冒.gif',
                '雷小手冒.gif',
                '雷篮板.gif',
                '雷近上.gif',
                '雷近扣.gif',
                '雷远上.gif',
                '雷远扣.gif',
                '风X.gif',
                '风三分.gif',
                '风中投.gif',
                '风分球.gif',
                '风地板.gif',
                '风大手冒.gif',
                '风小手冒.gif',
                '风篮板.gif',
                '风近上.gif',
                '风近扣.gif',
                '风远上.gif',
                '风远扣.gif'
            ];
        }
    } else {
        // 其他代数的通用GIF文件
        commonGifFiles = [
            'X.gif',
            '不看人传球.gif',
            '中手冒.gif',
            '分球.gif',
            '地板.gif',
            '大手冒.gif',
            '小手冒.gif',
            '抢断.gif',
            '篮板.gif',
            '间接进攻手.gif',
            '阳三分.gif',
            '阳中投.gif',
            '阳近上.gif',
            '阳近扣.gif',
            '阳远上.gif',
            '阳远扣.gif',
            '阴三分.gif',
            '阴中投.gif',
            '阴近上.gif',
            '阴近扣.gif',
            '阴远上.gif',
            '阴远扣.gif',
            '快速起来.gif',
            'A分球.gif',
            'A近扣.gif',
            'A近上.gif',
            'A篮板.gif',
            'A三分.gif',
            'A远扣.gif',
            'A远上.gif',
            'A中投.gif',
            'B分球.gif',
            'B近扣.gif',
            'B近上.gif',
            'B篮板.gif',
            'B三分.gif',
            'B远扣.gif',
            'B远上.gif',
            'B中投.gif'
        ];
    }
    
    console.log('GIF文件列表:', commonGifFiles);
    
    var actionButtonsContainer = card.querySelector('#actions-' + characterId);
    var gifContainer = card.querySelector('#gif-' + characterId);
    
    if (!actionButtonsContainer || !gifContainer) {
        console.error('找不到容器元素:', characterId);
        return;
    }
    
    // 动态检测GIF文件是否存在
    var buttonsHtml = '';
    var validGifFiles = [];
    var checkedCount = 0;
    
    // 检查每个GIF文件是否存在
    function checkGifFile(file, index) {
        // 正确构建URL路径
        var gifUrl = COS_CONFIG.Domain + '/' + cleanFolder + '/' + file;
        console.log('检查GIF文件:', gifUrl);
        
        var img = new Image();
        
        img.onload = function() {
            console.log('✅ GIF文件存在:', file);
            // 文件存在，添加到按钮列表
            validGifFiles.push(file);
            checkedCount++;
            if (checkedCount === commonGifFiles.length) {
                // 所有文件检查完成，创建按钮
                createButtons();
            }
        };
        
        img.onerror = function() {
            console.log('❌ GIF文件不存在:', file);
            // 文件不存在，跳过
            checkedCount++;
            if (checkedCount === commonGifFiles.length) {
                // 所有文件检查完成，创建按钮
                createButtons();
            }
        };
        
        img.src = gifUrl;
    }
    
    // 创建按钮的函数
    function createButtons() {
        console.log('创建按钮，有效文件数量:', validGifFiles.length);
        
        if (validGifFiles.length === 0) {
            actionButtonsContainer.innerHTML = '<p style="color: #999; text-align: center; padding: 20px;">未找到动作文件</p>';
            return;
        }
        
        validGifFiles.forEach(function(file) {
            var actionName = file.replace('.gif', '');
            var gifUrl = COS_CONFIG.Domain + '/' + cleanFolder + '/' + file;
            
            buttonsHtml += `
                <button class="action-btn" data-gif="${gifUrl}">
                    <i class="fas fa-play"></i>
                    <span>${actionName}</span>
                </button>
            `;
        });
        
        actionButtonsContainer.innerHTML = buttonsHtml;
        addButtonEvents();
    }
    
    // 开始检查文件
    commonGifFiles.forEach(function(file, index) {
        checkGifFile(file, index);
    });
    
    // 添加按钮事件监听的函数
    function addButtonEvents() {
        var actionButtons = actionButtonsContainer.querySelectorAll('.action-btn');
        for (var i = 0; i < actionButtons.length; i++) {
            (function(button) {
                button.onclick = function(e) {
                    e.preventDefault(); // 阻止默认行为
                    e.stopPropagation(); // 阻止事件冒泡
                    
                    // 移除所有按钮的激活状态
                    for (var j = 0; j < actionButtons.length; j++) {
                        actionButtons[j].classList.remove('active');
                    }
                    // 添加当前按钮的激活状态
                    this.classList.add('active');
                    
                    // 显示对应的GIF - 使用移动端兼容的GIF加载函数
                    var gifUrl = this.getAttribute('data-gif');
                    var actionName = this.querySelector('span').textContent;
                    
                    console.log('🎯 点击动作按钮:', actionName);
                    console.log('🔗 GIF URL:', gifUrl);
                    console.log('📱 设备信息:', navigator.userAgent);
                    
                    // 清空容器并显示加载提示
                    gifContainer.innerHTML = '<div style="text-align: center; padding: 20px; color: #9ca3af;">加载GIF中...</div>';
                    
                    // 确保GIF容器可见 - 移动端优化
                    gifContainer.style.display = 'block';
                    gifContainer.style.position = 'relative';
                    gifContainer.style.zIndex = '9999'; // 提高层级
                    gifContainer.style.background = '#ffffff';
                    gifContainer.style.border = '1px solid #e5e7eb';
                    gifContainer.style.borderRadius = '8px';
                    gifContainer.style.padding = '10px';
                    gifContainer.style.margin = '10px 0';
                    gifContainer.style.width = '100%';
                    gifContainer.style.maxWidth = '100%';
                    gifContainer.style.overflow = 'visible';
                    
                    // 移动端特殊处理
                    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                        console.log('📱 检测到移动设备，应用移动端优化');
                        gifContainer.style.webkitTransform = 'translateZ(0)'; // 启用硬件加速
                        gifContainer.style.transform = 'translateZ(0)';
                        gifContainer.style.webkitBackfaceVisibility = 'hidden';
                        gifContainer.style.backfaceVisibility = 'hidden';
                    }
                    
                    // 创建图片元素 - 移动端兼容
                    const img = new Image();
                    img.className = 'action-gif';
                    img.style.maxWidth = '100%';
                    img.style.width = 'auto';
                    img.style.height = 'auto';
                    img.style.display = 'block';
                    img.style.margin = '0 auto';
                    img.style.zIndex = '10000'; // 最高层级
                    img.style.position = 'relative';
                    img.style.verticalAlign = 'top';
                    img.alt = actionName;
                    
                    // 移动端图片优化
                    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                        img.style.webkitTransform = 'translateZ(0)';
                        img.style.transform = 'translateZ(0)';
                        img.style.webkitBackfaceVisibility = 'hidden';
                        img.style.backfaceVisibility = 'hidden';
                        img.style.imageRendering = 'auto';
                        img.style.webkitImageRendering = 'auto';
                    }
                    
                    // 加载成功处理
                    img.onload = function() {
                        console.log('✅ GIF加载成功:', gifUrl);
                        console.log('📏 尺寸:', img.naturalWidth, 'x', img.naturalHeight);
                        console.log('📱 设备:', navigator.userAgent);
                        
                        // 替换加载提示
                        gifContainer.innerHTML = '';
                        gifContainer.appendChild(img);
                        gifContainer.innerHTML += '<p class="action-name" style="text-align: center; margin-top: 10px; font-weight: bold; color: #374151; font-size: 14px;">' + actionName + '</p>';
                        
                        // 移动端强制重绘
                        if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                            // 触发重绘
                            gifContainer.style.display = 'none';
                            gifContainer.offsetHeight;
                            gifContainer.style.display = 'block';
                            
                            // 延迟再次触发，确保显示
                            setTimeout(() => {
                                gifContainer.style.opacity = '0.99';
                                setTimeout(() => {
                                    gifContainer.style.opacity = '1';
                                }, 10);
                            }, 100);
                        }
                    };
                    
                    // 加载失败处理
                    img.onerror = function() {
                        console.log('❌ GIF加载失败:', gifUrl);
                        console.log('📱 设备:', navigator.userAgent);
                        
                        // 尝试备用方案
                        if (!gifUrl.includes('?')) {
                            console.log('🔄 尝试添加时间戳重试...');
                            img.src = gifUrl + '?t=' + Date.now();
                            return;
                        }
                        
                        gifContainer.innerHTML = '<div style="text-align: center; padding: 20px; color: #dc3545; background: #f8d7da; border: 1px solid #f5c6cb; border-radius: 4px; font-size: 14px;">GIF加载失败<br>设备: ' + navigator.userAgent.substring(0, 50) + '...</div>';
                    };
                    
                    // 设置图片源
                    img.src = gifUrl;
                };
            })(actionButtons[i]);
        }
    }
}

// 初始化职业排名功能
function initializeRanking() {
    // 设置职业排名图片路径（添加时间戳防止缓存）
    const timestamp = new Date().getTime();
    const rankingImages = {
        'c': `${COS_CONFIG.Domain}/ranking/C排名.png?v=${timestamp}`,
        'pf': `${COS_CONFIG.Domain}/ranking/PF排名.png?v=${timestamp}`,
        'pg': `${COS_CONFIG.Domain}/ranking/PG排名.png?v=${timestamp}`
    };
    
    // 加载图片 - 使用强大的图片加载功能
    Object.keys(rankingImages).forEach(rankingType => {
        const imgElement = document.getElementById(`${rankingType}-ranking-image`);
        if (imgElement) {
            // 使用增强的图片加载功能
            const img = createEnhancedImage(`ranking/${rankingType.toUpperCase()}排名.png`, `${rankingType.toUpperCase()}排名`);
            img.style.width = '100%';
            img.style.height = 'auto';
            
            // 替换原有图片
            imgElement.parentNode.replaceChild(img, imgElement);
            img.id = `${rankingType}-ranking-image`;
        }
    });
    
    // 添加标签切换事件
    const rankingTabs = document.querySelectorAll('.ranking-tab');
    rankingTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 移除所有active状态
            rankingTabs.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.ranking-item').forEach(item => item.classList.remove('active'));
            
            // 添加当前active状态
            this.classList.add('active');
            const rankingType = this.getAttribute('data-ranking');
            const targetItem = document.getElementById(`${rankingType}-ranking`);
            if (targetItem) {
                targetItem.classList.add('active');
            }
        });
    });
}

// 显示全屏图片
function showFullscreenImage(src, alt) {
    const overlay = document.getElementById('fullscreen-overlay');
    const fullscreenImg = document.getElementById('fullscreen-image');
    
    if (overlay && fullscreenImg) {
        fullscreenImg.src = src;
        fullscreenImg.alt = alt;
        overlay.style.display = 'flex';
        
        // 禁止页面滚动
        document.body.style.overflow = 'hidden';
        
        // 添加历史记录，支持返回按钮
        history.pushState({fullscreen: true}, '');
        
        // 移动端特殊处理
        if (window.innerWidth <= 768) {
            // 强制竖屏显示
            overlay.style.flexDirection = 'column';
            fullscreenImg.style.width = '100%';
            fullscreenImg.style.height = '100%';
            fullscreenImg.style.objectFit = 'contain';
        }
        
        // 苹果手机特殊处理
        if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
            // 添加更多触摸事件
            overlay.style.webkitUserSelect = 'none';
            overlay.style.userSelect = 'none';
        }
    }
}



// 关闭全屏显示
function closeFullscreen() {
    const overlay = document.getElementById('fullscreen-overlay');
    if (overlay) {
        overlay.style.display = 'none';
        // 恢复页面滚动
        document.body.style.overflow = 'auto';
        
        // 移除历史记录
        if (history.state && history.state.fullscreen) {
            history.back();
        }
    }
}

// 打开课程链接
function openCourse(url) {
    // 检测是否在微信浏览器中
    if (/MicroMessenger/i.test(navigator.userAgent)) {
        // 微信浏览器中，尝试使用微信内置浏览器打开
        window.location.href = url;
    } else {
        // 其他浏览器，直接打开
        window.open(url, '_blank');
    }
}

// 复制微信号
function copyWechat() {
    const wechatNumber = document.getElementById('wechat-number').textContent;
    
    // 尝试使用现代浏览器的 Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(wechatNumber).then(() => {
            showCopySuccess();
        }).catch(() => {
            fallbackCopyTextToClipboard(wechatNumber);
        });
    } else {
        // 降级方案
        fallbackCopyTextToClipboard(wechatNumber);
    }
}

// 降级复制方案
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopySuccess();
        } else {
            showCopyError();
        }
    } catch (err) {
        showCopyError();
    }
    
    document.body.removeChild(textArea);
}

// 显示复制成功提示
function showCopySuccess() {
    const copyBtn = document.querySelector('.copy-btn');
    const originalText = copyBtn.innerHTML;
    
    copyBtn.innerHTML = '<i class="fas fa-check"></i><span>已复制</span>';
    copyBtn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
    
    setTimeout(() => {
        copyBtn.innerHTML = originalText;
        copyBtn.style.background = 'linear-gradient(135deg, #3b82f6, #1d4ed8)';
    }, 2000);
}

// 显示复制失败提示
function showCopyError() {
    alert('复制失败，请手动复制微信号：laofei90186');
}

// 打开店铺
function openStore() {
    const storeUrl = 'https://k.youshop10.com/6HZaEV6N';
    
    // 检测是否在微信浏览器中
    if (/MicroMessenger/i.test(navigator.userAgent)) {
        // 微信浏览器中，尝试使用微信内置浏览器打开
        window.location.href = storeUrl;
    } else {
        // 其他浏览器，直接打开
        window.open(storeUrl, '_blank');
    }
}



// 添加全屏显示的事件监听
document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('fullscreen-overlay');
    if (overlay) {
        // 点击背景关闭全屏
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closeFullscreen();
            }
        });
        
        // 触摸事件关闭全屏（移动端）
        overlay.addEventListener('touchstart', function(e) {
            if (e.target === overlay) {
                e.preventDefault();
                closeFullscreen();
            }
        });
        
        // 添加更多触摸事件处理，兼容苹果手机
        overlay.addEventListener('touchend', function(e) {
            if (e.target === overlay) {
                e.preventDefault();
                closeFullscreen();
            }
        });
        
        // 添加双击关闭功能
        overlay.addEventListener('dblclick', function(e) {
            if (e.target === overlay) {
                closeFullscreen();
            }
        });
        
        // ESC键关闭全屏
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeFullscreen();
            }
        });
        
        // 添加返回按钮监听（移动端）
        window.addEventListener('popstate', function() {
            closeFullscreen();
        });
    }
});

// 导出函数供外部使用
window.FSDataLibrary = {
    loadCharacters,
    uploadToCOS,
    getCOSFileList,
    loadGifFiles,
    COS_CONFIG
};

// 运行图片加载测试
function runImageLoadTest() {
    const output = document.getElementById('image-test-output');
    if (!output) return;
    
    output.innerHTML = '<p>正在测试图片加载...</p>';
    
    const testImages = [
        {
            name: '超特图鉴',
            url: 'https://laofei-1259209256.cos.ap-nanjing.myqcloud.com/gallery/超特图鉴.png'
        },
        {
            name: 'C排名',
            url: 'https://laofei-1259209256.cos.ap-nanjing.myqcloud.com/ranking/C排名.png'
        },
        {
            name: '亚琪亚克角色',
            url: 'https://laofei-1259209256.cos.ap-nanjing.myqcloud.com/characters/9代超特/亚琪亚克.png'
        }
    ];
    
    let results = [];
    
    testImages.forEach((image, index) => {
        const img = new Image();
        const startTime = Date.now();
        
        img.onload = function() {
            const loadTime = Date.now() - startTime;
            results.push({
                name: image.name,
                success: true,
                time: loadTime,
                url: image.url
            });
            
            updateTestResults(results, output);
        };
        
        img.onerror = function() {
            results.push({
                name: image.name,
                success: false,
                time: 0,
                url: image.url
            });
            
            updateTestResults(results, output);
        };
        
        // 添加时间戳避免缓存
        img.src = image.url + '?test=' + Date.now();
    });
}

// 更新测试结果
function updateTestResults(results, output) {
    if (results.length === 0) return;
    
    let html = '<h4>测试结果:</h4>';
    let successCount = 0;
    let totalTime = 0;
    
    results.forEach(result => {
        if (result.success) {
            successCount++;
            totalTime += result.time;
            html += `<p style="color: green;">✅ ${result.name}: 成功 (${result.time}ms)</p>`;
        } else {
            html += `<p style="color: red;">❌ ${result.name}: 失败</p>`;
        }
    });
    
    html += `<p><strong>总计: ${successCount}/${results.length} 成功</strong>`;
    if (successCount > 0) {
        html += ` | 平均加载时间: ${Math.round(totalTime / successCount)}ms`;
    }
    
    output.innerHTML = html;
}

// 显示移动端诊断
function showMobileDiagnostic() {
    // 隐藏所有内容区域
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.remove('active'));
    
    // 显示诊断区域
    const diagnosticSection = document.getElementById('mobile-diagnostic-section');
    if (diagnosticSection) {
        diagnosticSection.classList.add('active');
        diagnosticSection.style.display = 'block';
        
        // 更新设备信息
        updateDeviceInfo();
        
        // 测试网络连接
        testNetworkConnection();
    }
}

// 更新设备信息
function updateDeviceInfo() {
    const deviceInfo = document.getElementById('device-info');
    if (!deviceInfo) return;
    
    const info = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        cookieEnabled: navigator.cookieEnabled,
        onLine: navigator.onLine,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        pixelRatio: window.devicePixelRatio || 1,
        isWeChat: /MicroMessenger/i.test(navigator.userAgent),
        isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent),
        isAndroid: /Android/.test(navigator.userAgent),
        isMobile: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent)
    };
    
    let html = '';
    for (const [key, value] of Object.entries(info)) {
        html += `<div><strong>${key}:</strong> ${value}</div>`;
    }
    
    deviceInfo.innerHTML = html;
}

// 测试网络连接
function testNetworkConnection() {
    const networkTest = document.getElementById('network-test');
    if (!networkTest) return;
    
    networkTest.innerHTML = '<p>正在测试网络连接...</p>';
    
    // 测试基本网络连接
    const testUrl = 'https://laofei-1259209256.cos.ap-nanjing.myqcloud.com/gallery/超特图鉴.png';
    const img = new Image();
    const startTime = Date.now();
    
    img.onload = function() {
        const loadTime = Date.now() - startTime;
        networkTest.innerHTML = `
            <p style="color: green;">✅ 网络连接正常</p>
            <p>COS域名访问: 成功</p>
            <p>响应时间: ${loadTime}ms</p>
            <p>图片尺寸: ${img.naturalWidth} x ${img.naturalHeight}</p>
        `;
    };
    
    img.onerror = function() {
        networkTest.innerHTML = `
            <p style="color: red;">❌ 网络连接异常</p>
            <p>COS域名访问: 失败</p>
            <p>可能原因:</p>
            <ul>
                <li>网络连接问题</li>
                <li>CORS跨域限制</li>
                <li>COS存储桶配置问题</li>
                <li>移动端浏览器限制</li>
            </ul>
        `;
    };
    
    img.src = testUrl + '?network-test=' + Date.now();
}

// 导出函数供外部使用
window.FSDataLibrary = {
    loadCharacters,
    uploadToCOS,
    getCOSFileList,
    loadGifFiles,
    COS_CONFIG,
    testMobileImageLoading,
    showMobileDiagnostic,
    runImageLoadTest
};

// 图片加载诊断和修复函数
function createRobustImage(src, alt, options = {}) {
    const img = new Image();
    const retryCount = options.retryCount || 0;
    const maxRetries = options.maxRetries || IMAGE_LOAD_CONFIG.maxRetries;
    const currentDomainIndex = options.domainIndex || 0;
    
    // 构建图片URL
    let imageUrl = src;
    
    // 如果是相对路径，添加域名
    if (!src.startsWith('http')) {
        const domains = IMAGE_LOAD_CONFIG.enableFallbackDomains ? 
            COS_CONFIG.FallbackDomains : [COS_CONFIG.Domain];
        
        if (currentDomainIndex < domains.length) {
            imageUrl = domains[currentDomainIndex] + '/' + src;
        } else {
            imageUrl = COS_CONFIG.Domain + '/' + src;
        }
    }
    
    // 添加压缩参数
    if (IMAGE_LOAD_CONFIG.enableImageCompression && 
        imageUrl.includes('cos.ap-nanjing.myqcloud.com') && 
        !imageUrl.includes('imageView2')) {
        imageUrl += IMAGE_LOAD_CONFIG.compressionParams;
    }
    
    // 添加缓存破坏参数
    if (IMAGE_LOAD_CONFIG.enableCacheBusting) {
        const separator = imageUrl.includes('?') ? '&' : '?';
        imageUrl += separator + 'v=' + Date.now() + '&r=' + Math.random();
    }
    
    // 设置图片属性
    img.alt = alt || '';
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    
    // 添加加载状态
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
    
    // 诊断信息
    if (IMAGE_LOAD_CONFIG.enableDiagnostics) {
        console.log('🔄 尝试加载图片:', imageUrl);
        console.log('📊 重试次数:', retryCount, '域名索引:', currentDomainIndex);
    }
    
    // 加载成功处理
    img.onload = function() {
        console.log('✅ 图片加载成功:', imageUrl);
        img.style.opacity = '1';
        
        // 触发成功事件
        const event = new CustomEvent('imageLoadSuccess', {
            detail: { src: imageUrl, img: img, originalSrc: src }
        });
        document.dispatchEvent(event);
    };
    
    // 加载失败处理
    img.onerror = function() {
        console.log('❌ 图片加载失败:', imageUrl);
        
        // 尝试使用备用域名
        if (IMAGE_LOAD_CONFIG.enableFallbackDomains && 
            currentDomainIndex < COS_CONFIG.FallbackDomains.length - 1) {
            
            console.log('🔄 尝试备用域名...');
            setTimeout(() => {
                createRobustImage(src, alt, {
                    retryCount: retryCount,
                    maxRetries: maxRetries,
                    domainIndex: currentDomainIndex + 1
                });
            }, IMAGE_LOAD_CONFIG.retryDelay);
            return;
        }
        
        // 尝试重试
        if (retryCount < maxRetries) {
            console.log('🔄 重试加载图片...');
            setTimeout(() => {
                createRobustImage(src, alt, {
                    retryCount: retryCount + 1,
                    maxRetries: maxRetries
                });
            }, IMAGE_LOAD_CONFIG.retryDelay);
            return;
        }
        
        // 所有尝试都失败，显示错误占位符
        console.log('❌ 图片加载最终失败:', src);
        img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7mnKzlm748L3RleHQ+Cjx0ZXh0IHg9IjEwMCIgeT0iMTIwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7lm77niYfliqDovb3lpLHotKU8L3RleHQ+Cjwvc3ZnPgo=';
        img.style.opacity = '1';
        
        // 触发失败事件
        const event = new CustomEvent('imageLoadError', {
            detail: { src: imageUrl, img: img, originalSrc: src }
        });
        document.dispatchEvent(event);
    };
    
    // 设置超时处理
    const timeout = setTimeout(() => {
        if (!img.complete) {
            console.log('⏰ 图片加载超时:', imageUrl);
            img.onerror();
        }
    }, IMAGE_LOAD_CONFIG.timeout);
    
    // 清除超时
    const originalOnload = img.onload;
    img.onload = function() {
        clearTimeout(timeout);
        if (originalOnload) {
            originalOnload.call(this);
        }
    };
    
    // 设置图片源
    img.src = imageUrl;
    
    return img;
}

// 批量图片加载诊断
function diagnoseImageLoading() {
    console.log('🔍 开始图片加载诊断...');
    
    const testImages = [
        'gallery/超特图鉴.png',
        'ranking/C排名.png',
        'characters/9代超特/亚琪亚克.png',
        'gifs/9代超特/亚琪亚克/A三分.gif'
    ];
    
    let results = {
        success: 0,
        failed: 0,
        details: []
    };
    
    testImages.forEach((imagePath, index) => {
        const img = createRobustImage(imagePath, 'test-' + index);
        
        img.addEventListener('load', function() {
            results.success++;
            results.details.push({
                path: imagePath,
                status: 'success',
                url: img.src
            });
            console.log(`✅ 测试图片${index + 1}加载成功:`, imagePath);
        });
        
        img.addEventListener('error', function() {
            results.failed++;
            results.details.push({
                path: imagePath,
                status: 'failed',
                url: img.src
            });
            console.log(`❌ 测试图片${index + 1}加载失败:`, imagePath);
        });
    });
    
    // 5秒后输出诊断结果
    setTimeout(() => {
        console.log('📊 图片加载诊断结果:', results);
        console.log(`总计: ${results.success + results.failed}张图片`);
        console.log(`成功: ${results.success}张`);
        console.log(`失败: ${results.failed}张`);
        
        // 显示诊断结果
        if (typeof addDebugInfo === 'function') {
            addDebugInfo(`图片诊断完成: 成功${results.success}张, 失败${results.failed}张`);
        }
    }, 5000);
    
    return results;
}

// 简单图片测试函数
function testImageAccess() {
    console.log('🔍 开始测试COS图片访问...');
    
    const testImages = [
        'gallery/超特图鉴.png',
        'characters/9代超特/亚琪亚克.png',
        'gifs/9代超特/亚琪亚克/A三分.gif'
    ];
    
    testImages.forEach((imagePath, index) => {
        const testUrl = COS_CONFIG.Domain + '/' + imagePath;
        console.log(`测试图片${index + 1}: ${testUrl}`);
        
        const img = new Image();
        img.onload = function() {
            console.log(`✅ 图片${index + 1}访问成功: ${imagePath}`);
        };
        img.onerror = function() {
            console.log(`❌ 图片${index + 1}访问失败: ${imagePath}`);
            console.log(`失败URL: ${testUrl}`);
        };
        img.src = testUrl;
    });
}

// 在页面加载完成后自动测试
window.addEventListener('load', function() {
    setTimeout(() => {
        testImageAccess();
    }, 1000);
});

// 详细诊断COS访问权限
function diagnoseCOSAccess() {
    console.log('🔍 开始详细诊断COS访问权限...');
    
    // 测试不同类型的文件
    const testFiles = [
        { type: '图片', path: 'gallery/超特图鉴.png', expected: '图鉴图片' },
        { type: '角色图片', path: 'characters/9代超特/亚琪亚克.png', expected: '角色头像' },
        { type: 'GIF文件', path: 'gifs/9代超特/亚琪亚克/A三分.gif', expected: '动作GIF' },
        { type: '排名图片', path: 'ranking/C排名.png', expected: '排名图片' }
    ];
    
    let results = {
        success: 0,
        failed: 0,
        details: []
    };
    
    testFiles.forEach((file, index) => {
        const testUrl = COS_CONFIG.Domain + '/' + file.path;
        console.log(`\n📁 测试${file.type}: ${file.path}`);
        console.log(`🔗 完整URL: ${testUrl}`);
        
        const img = new Image();
        img.onload = function() {
            console.log(`✅ ${file.type}访问成功: ${file.path}`);
            console.log(`📏 图片尺寸: ${img.naturalWidth} x ${img.naturalHeight}`);
            results.success++;
            results.details.push({
                type: file.type,
                path: file.path,
                status: 'success',
                url: testUrl,
                size: `${img.naturalWidth} x ${img.naturalHeight}`
            });
        };
        img.onerror = function() {
            console.log(`❌ ${file.type}访问失败: ${file.path}`);
            console.log(`🚫 可能原因: 文件不存在、权限不足、路径错误`);
            results.failed++;
            results.details.push({
                type: file.type,
                path: file.path,
                status: 'failed',
                url: testUrl,
                error: '访问被拒绝或文件不存在'
            });
        };
        img.src = testUrl;
    });
    
    // 3秒后输出详细结果
    setTimeout(() => {
        console.log('\n📊 详细诊断结果:');
        console.log(`总计: ${results.success + results.failed}个文件`);
        console.log(`成功: ${results.success}个`);
        console.log(`失败: ${results.failed}个`);
        
        console.log('\n📋 详细结果:');
        results.details.forEach(detail => {
            const status = detail.status === 'success' ? '✅' : '❌';
            console.log(`${status} ${detail.type}: ${detail.path}`);
            if (detail.status === 'success' && detail.size) {
                console.log(`   尺寸: ${detail.size}`);
            }
            if (detail.status === 'failed') {
                console.log(`   错误: ${detail.error}`);
            }
        });
        
        // 分析问题
        if (results.failed > 0) {
            console.log('\n🔍 问题分析:');
            if (results.details.some(d => d.type === 'GIF文件' && d.status === 'success') &&
                results.details.some(d => d.type === '图片' && d.status === 'failed')) {
                console.log('🎯 可能原因: COS存储桶权限配置问题');
                console.log('   - GIF文件可以访问');
                console.log('   - 图片文件无法访问');
                console.log('   - 建议检查COS存储桶的访问权限设置');
            }
        }
    }, 3000);
    
    return results;
}

// 直接测试COS存储桶访问
function testCOSBucketAccess() {
    console.log('🔍 直接测试COS存储桶访问...');
    
    // 测试不同的访问方式
    const testUrls = [
        // 直接访问存储桶根目录
        'https://laofei-1259209256.cos.ap-nanjing.myqcloud.com/',
        // 测试图鉴图片
        'https://laofei-1259209256.cos.ap-nanjing.myqcloud.com/gallery/超特图鉴.png',
        // 测试角色图片
        'https://laofei-1259209256.cos.ap-nanjing.myqcloud.com/characters/9代超特/亚琪亚克.png',
        // 测试GIF文件
        'https://laofei-1259209256.cos.ap-nanjing.myqcloud.com/gifs/9代超特/亚琪亚克/A三分.gif'
    ];
    
    testUrls.forEach((url, index) => {
        console.log(`\n🔗 测试URL ${index + 1}: ${url}`);
        
        // 使用fetch测试访问
        fetch(url, { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    console.log(`✅ URL ${index + 1} 可以访问 (状态: ${response.status})`);
                } else {
                    console.log(`❌ URL ${index + 1} 访问失败 (状态: ${response.status})`);
                }
            })
            .catch(error => {
                console.log(`❌ URL ${index + 1} 网络错误: ${error.message}`);
            });
    });
}

// 全面测试COS连接
function comprehensiveCOSTest() {
    console.log('🔍 开始全面测试COS连接...');
    
    // 测试不同的域名和路径组合
    const testCases = [
        {
            name: '主域名根目录',
            url: 'https://laofei-1259209256.cos.ap-nanjing.myqcloud.com/',
            expected: '应该返回403或列出文件'
        },
        {
            name: '备用域名根目录',
            url: 'https://laofei-1259209256.cos-website.ap-nanjing.myqcloud.com/',
            expected: '应该返回403或列出文件'
        },
        {
            name: '图鉴图片直接访问',
            url: 'https://laofei-1259209256.cos.ap-nanjing.myqcloud.com/gallery/超特图鉴.png',
            expected: '应该返回200和图片数据'
        },
        {
            name: '角色图片直接访问',
            url: 'https://laofei-1259209256.cos.ap-nanjing.myqcloud.com/characters/9代超特/亚琪亚克.png',
            expected: '应该返回200和图片数据'
        },
        {
            name: 'GIF文件直接访问',
            url: 'https://laofei-1259209256.cos.ap-nanjing.myqcloud.com/gifs/9代超特/亚琪亚克/A三分.gif',
            expected: '应该返回200和GIF数据'
        },
        {
            name: '带时间戳的图片访问',
            url: 'https://laofei-1259209256.cos.ap-nanjing.myqcloud.com/gallery/超特图鉴.png?t=' + Date.now(),
            expected: '应该返回200和图片数据'
        }
    ];
    
    testCases.forEach((testCase, index) => {
        console.log(`\n🧪 测试${index + 1}: ${testCase.name}`);
        console.log(`🔗 URL: ${testCase.url}`);
        console.log(`📋 预期: ${testCase.expected}`);
        
        // 使用fetch测试
        fetch(testCase.url, { 
            method: 'HEAD',
            mode: 'cors'
        })
        .then(response => {
            console.log(`📊 响应状态: ${response.status} ${response.statusText}`);
            console.log(`📋 响应头:`, response.headers);
            
            if (response.ok) {
                console.log(`✅ 测试${index + 1}成功`);
            } else if (response.status === 403) {
                console.log(`⚠️ 测试${index + 1}: 权限不足 (403) - 需要检查COS权限设置`);
            } else if (response.status === 404) {
                console.log(`❌ 测试${index + 1}: 文件不存在 (404) - 需要检查文件路径`);
            } else {
                console.log(`❌ 测试${index + 1}: 访问失败 (${response.status})`);
            }
        })
        .catch(error => {
            console.log(`❌ 测试${index + 1}: 网络错误 - ${error.message}`);
            if (error.message.includes('CORS')) {
                console.log(`🔍 这是CORS跨域问题，需要在COS中配置CORS规则`);
            }
        });
    });
}

// 增强的图片加载函数 - 尝试多种访问方式
function createEnhancedImage(src, alt, options = {}) {
    console.log('🔄 尝试加载图片:', src);
    
    const img = new Image();
    img.alt = alt || '';
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    
    // 尝试多种访问方式
    const accessMethods = [
        // 方法1：直接访问
        COS_CONFIG.Domain + '/' + src,
        // 方法2：添加时间戳
        COS_CONFIG.Domain + '/' + src + '?t=' + Date.now(),
        // 方法3：使用备用域名
        COS_CONFIG.BackupDomain + '/' + src,
        // 方法4：添加压缩参数（不使用WebP）
        COS_CONFIG.Domain + '/' + src + '?imageView2/2/w/800',
        // 方法5：添加随机参数
        COS_CONFIG.Domain + '/' + src + '?v=' + Math.random()
    ];
    
    let currentMethod = 0;
    
    function tryNextMethod() {
        if (currentMethod >= accessMethods.length) {
            console.log('❌ 所有访问方式都失败:', src);
            // 显示错误占位符
            img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7mnKzlm748L3RleHQ+Cjx0ZXh0IHg9IjEwMCIgeT0iMTIwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7lm77niYfliqDovb3lpLHotKU8L3RleHQ+Cjwvc3ZnPgo=';
            return;
        }
        
        const testUrl = accessMethods[currentMethod];
        console.log(`🔧 尝试方法${currentMethod + 1}: ${testUrl}`);
        
        img.onload = function() {
            console.log(`✅ 方法${currentMethod + 1}成功: ${testUrl}`);
            console.log(`📏 图片尺寸: ${img.naturalWidth} x ${img.naturalHeight}`);
        };
        
        img.onerror = function() {
            console.log(`❌ 方法${currentMethod + 1}失败: ${testUrl}`);
            currentMethod++;
            setTimeout(tryNextMethod, 500); // 500ms后尝试下一种方法
        };
        
        img.src = testUrl;
    }
    
    // 开始尝试
    tryNextMethod();
    
    return img;
}

// 专门的GIF加载函数 - 处理COS中的GIF文件
function createGifImage(src, alt) {
    console.log('🔄 尝试加载GIF文件:', src);
    
    const img = new Image();
    img.alt = alt || '';
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    
    // 尝试多种访问方式
    const accessMethods = [
        // 方法1：直接访问GIF文件
        COS_CONFIG.Domain + '/' + src,
        // 方法2：添加时间戳避免缓存
        COS_CONFIG.Domain + '/' + src + '?t=' + Date.now(),
        // 方法3：使用备用域名
        COS_CONFIG.BackupDomain + '/' + src,
        // 方法4：添加随机参数
        COS_CONFIG.Domain + '/' + src + '?v=' + Math.random(),
        // 方法5：强制GIF格式
        COS_CONFIG.Domain + '/' + src + '?imageView2/2/w/800/format/gif'
    ];
    
    let currentMethod = 0;
    
    function tryNextMethod() {
        if (currentMethod >= accessMethods.length) {
            console.log('❌ 所有GIF访问方式都失败:', src);
            // 显示错误占位符
            img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7mnKzlm748L3RleHQ+Cjx0ZXh0IHg9IjEwMCIgeT0iMTIwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7lm77niYfliqDovb3lpLHotKU8L3RleHQ+Cjwvc3ZnPgo=';
            return;
        }
        
        const testUrl = accessMethods[currentMethod];
        console.log(`🔧 尝试GIF方法${currentMethod + 1}: ${testUrl}`);
        
        // 清除之前的事件监听器
        img.onload = null;
        img.onerror = null;
        
        img.onload = function() {
            console.log(`✅ GIF方法${currentMethod + 1}成功: ${testUrl}`);
            console.log(`📏 GIF尺寸: ${img.naturalWidth} x ${img.naturalHeight}`);
            console.log(`📄 文件类型: GIF`);
        };
        
        img.onerror = function() {
            console.log(`❌ GIF方法${currentMethod + 1}失败: ${testUrl}`);
            currentMethod++;
            setTimeout(tryNextMethod, 500); // 500ms后尝试下一种方法
        };
        
        img.src = testUrl;
    }
    
    // 开始尝试
    tryNextMethod();
    
    return img;
}

// GIF测试函数 - 测试单个GIF文件加载
function testSingleGif() {
    console.log('🧪 开始测试单个GIF文件加载');
    
    // 测试一个简单的GIF文件
    const testGifUrl = 'gifs/9代超特/亚琪亚克/A三分.gif';
    
    console.log('🔗 测试GIF URL:', COS_CONFIG.Domain + '/' + testGifUrl);
    
    const img = new Image();
    img.style.width = '200px';
    img.style.height = '200px';
    img.style.border = '2px solid red';
    
    img.onload = function() {
        console.log('✅ 测试GIF加载成功！');
        console.log('📏 尺寸:', img.naturalWidth, 'x', img.naturalHeight);
        console.log('🔗 URL:', img.src);
        
        // 显示在页面上
        const testContainer = document.createElement('div');
        testContainer.style.position = 'fixed';
        testContainer.style.top = '10px';
        testContainer.style.right = '10px';
        testContainer.style.zIndex = '9999';
        testContainer.style.background = 'white';
        testContainer.style.padding = '10px';
        testContainer.style.border = '2px solid blue';
        testContainer.innerHTML = '<h3>GIF测试结果 - 成功</h3>';
        testContainer.appendChild(img);
        
        document.body.appendChild(testContainer);
        
        // 5秒后自动移除
        setTimeout(() => {
            if (testContainer.parentNode) {
                testContainer.parentNode.removeChild(testContainer);
            }
        }, 5000);
    };
    
    img.onerror = function() {
        console.log('❌ 测试GIF加载失败！');
        console.log('🔗 尝试的URL:', img.src);
        
        // 显示错误信息
        const testContainer = document.createElement('div');
        testContainer.style.position = 'fixed';
        testContainer.style.top = '10px';
        testContainer.style.right = '10px';
        testContainer.style.zIndex = '9999';
        testContainer.style.background = 'red';
        testContainer.style.color = 'white';
        testContainer.style.padding = '10px';
        testContainer.style.border = '2px solid red';
        testContainer.innerHTML = '<h3>GIF测试结果 - 失败</h3><p>URL: ' + img.src + '</p>';
        
        document.body.appendChild(testContainer);
        
        // 5秒后自动移除
        setTimeout(() => {
            if (testContainer.parentNode) {
                testContainer.parentNode.removeChild(testContainer);
            }
        }, 5000);
    };
    
    // 直接使用COS域名
    img.src = COS_CONFIG.Domain + '/' + testGifUrl;
}

// 简单的GIF加载函数 - 直接加载GIF文件
function loadGifDirectly(gifUrl, actionName, container) {
    console.log('🔄 直接加载GIF:', gifUrl);
    
    // 清空容器并显示加载提示
    container.innerHTML = '<div style="text-align: center; padding: 20px; color: #9ca3af;">加载GIF中...</div>';
    
    const img = new Image();
    img.className = 'action-gif';
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    img.alt = actionName;
    
    img.onload = function() {
        console.log('✅ GIF加载成功:', gifUrl);
        console.log('📏 尺寸:', img.naturalWidth, 'x', img.naturalHeight);
        
        // 替换加载提示
        container.innerHTML = '';
        container.appendChild(img);
        container.innerHTML += '<p class="action-name">' + actionName + '</p>';
    };
    
    img.onerror = function() {
        console.log('❌ GIF加载失败:', gifUrl);
        container.innerHTML = '<div style="text-align: center; padding: 20px; color: #dc3545;">GIF加载失败</div>';
    };
    
    // 直接使用完整URL
    img.src = gifUrl;
}

// 移动端兼容性检测和修复函数
function checkMobileCompatibility() {
    console.log('🔍 检测移动端兼容性...');
    
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);
    const isWeChat = /MicroMessenger/i.test(navigator.userAgent);
    const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
    
    // 检测iOS版本
    let iosVersion = null;
    if (isIOS) {
        const match = navigator.userAgent.match(/OS (\d+)_(\d+)_?(\d+)?/);
        if (match) {
            iosVersion = {
                major: parseInt(match[1]),
                minor: parseInt(match[2]),
                patch: match[3] ? parseInt(match[3]) : 0
            };
        }
    }
    
    console.log('📱 设备信息:', {
        isMobile: isMobile,
        isIOS: isIOS,
        isAndroid: isAndroid,
        isWeChat: isWeChat,
        isSafari: isSafari,
        iosVersion: iosVersion,
        userAgent: navigator.userAgent
    });
    
    // 应用移动端特殊处理
    if (isMobile) {
        // iOS 18.2 特殊处理
        if (isIOS && iosVersion && iosVersion.major >= 18) {
            console.log('🍎 检测到iOS 18+，应用特殊处理');
            
            // 强制清理缓存
            if ('caches' in window) {
                caches.keys().then(names => {
                    names.forEach(name => {
                        caches.delete(name);
                        console.log('🗑️ 清理缓存:', name);
                    });
                });
            }
            
            // iOS 18.2 特殊CSS
            const style = document.createElement('style');
            style.textContent = `
                .gif-container {
                    z-index: 999999 !important;
                    position: relative !important;
                    background: #ffffff !important;
                    -webkit-transform: translateZ(0) !important;
                    transform: translateZ(0) !important;
                    -webkit-backface-visibility: hidden !important;
                    backface-visibility: hidden !important;
                    will-change: transform !important;
                    -webkit-perspective: 1000px !important;
                    perspective: 1000px !important;
                }
                .action-gif {
                    z-index: 1000000 !important;
                    position: relative !important;
                    -webkit-transform: translateZ(0) !important;
                    transform: translateZ(0) !important;
                    -webkit-backface-visibility: hidden !important;
                    backface-visibility: hidden !important;
                    will-change: transform !important;
                    -webkit-perspective: 1000px !important;
                    perspective: 1000px !important;
                    image-rendering: -webkit-optimize-contrast !important;
                    image-rendering: crisp-edges !important;
                }
            `;
            document.head.appendChild(style);
        }
        
        // 修复iOS Safari的GIF显示问题
        if (isIOS) {
            console.log('🍎 检测到iOS设备，应用iOS特殊处理');
            document.body.style.webkitTransform = 'translateZ(0)';
            document.body.style.transform = 'translateZ(0)';
            
            // iOS Safari 特殊处理
            if (isSafari) {
                console.log('🌐 检测到iOS Safari，应用Safari特殊处理');
                const style = document.createElement('style');
                style.textContent = `
                    .gif-container, .action-gif {
                        -webkit-transform: translateZ(0) !important;
                        transform: translateZ(0) !important;
                        -webkit-backface-visibility: hidden !important;
                        backface-visibility: hidden !important;
                        will-change: transform !important;
                        -webkit-perspective: 1000px !important;
                        perspective: 1000px !important;
                    }
                `;
                document.head.appendChild(style);
            }
        }
        
        // 修复Android Chrome的GIF显示问题
        if (isAndroid) {
            console.log('🤖 检测到Android设备，应用Android特殊处理');
            // 强制启用硬件加速
            const style = document.createElement('style');
            style.textContent = `
                .gif-container, .action-gif {
                    -webkit-transform: translateZ(0) !important;
                    transform: translateZ(0) !important;
                    -webkit-backface-visibility: hidden !important;
                    backface-visibility: hidden !important;
                    will-change: transform !important;
                }
            `;
            document.head.appendChild(style);
        }
        
        // 修复微信浏览器的GIF显示问题
        if (isWeChat) {
            console.log('💬 检测到微信浏览器，应用微信特殊处理');
            // 微信浏览器特殊处理
            const style = document.createElement('style');
            style.textContent = `
                .gif-container {
                    z-index: 999999 !important;
                    position: relative !important;
                    background: #ffffff !important;
                    -webkit-transform: translateZ(0) !important;
                    transform: translateZ(0) !important;
                    -webkit-backface-visibility: hidden !important;
                    backface-visibility: hidden !important;
                    will-change: transform !important;
                }
                .action-gif {
                    z-index: 1000000 !important;
                    position: relative !important;
                    -webkit-transform: translateZ(0) !important;
                    transform: translateZ(0) !important;
                    -webkit-backface-visibility: hidden !important;
                    backface-visibility: hidden !important;
                    will-change: transform !important;
                    image-rendering: -webkit-optimize-contrast !important;
                    image-rendering: crisp-edges !important;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    return { isMobile, isIOS, isAndroid, isWeChat, isSafari, iosVersion };
}

// 页面加载时检测兼容性
document.addEventListener('DOMContentLoaded', function() {
    const compatibility = checkMobileCompatibility();
    
    // iOS 18.2 强制刷新处理
    if (compatibility.isIOS && compatibility.iosVersion && compatibility.iosVersion.major >= 18) {
        console.log('🍎 iOS 18+ 检测到，应用强制刷新处理');
        
        // 检查是否需要强制刷新
        const lastRefresh = sessionStorage.getItem('ios18_last_refresh');
        const currentTime = Date.now();
        
        if (!lastRefresh || (currentTime - parseInt(lastRefresh)) > 300000) { // 5分钟
            console.log('🔄 iOS 18+ 强制刷新页面');
            sessionStorage.setItem('ios18_last_refresh', currentTime.toString());
            
            // 清理所有缓存
            if ('caches' in window) {
                caches.keys().then(names => {
                    names.forEach(name => {
                        caches.delete(name);
                        console.log('🗑️ 清理缓存:', name);
                    });
                });
            }
            
            // 强制刷新（仅在必要时）
            if (window.location.search.includes('force_refresh')) {
                window.location.reload(true);
            }
        }
    }
});

// 打开活动链接
function openEvent(url) {
    console.log('🎯 打开活动链接:', url);
    
    // 检测是否在微信浏览器中
    const isWeChat = /MicroMessenger/i.test(navigator.userAgent);
    
    if (isWeChat) {
        console.log('💬 在微信浏览器中，直接打开链接');
        // 在微信中直接打开
        window.location.href = url;
    } else {
        console.log('🌐 在普通浏览器中，尝试打开链接');
        // 在普通浏览器中尝试打开
        try {
            // 尝试在新窗口打开
            const newWindow = window.open(url, '_blank');
            if (!newWindow) {
                // 如果弹窗被阻止，则直接跳转
                window.location.href = url;
            }
        } catch (error) {
            console.log('❌ 打开链接失败:', error);
            // 降级处理：直接跳转
            window.location.href = url;
        }
    }
}


