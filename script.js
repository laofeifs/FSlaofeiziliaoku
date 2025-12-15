// 腾讯云COS配置
var COS_CONFIG = {
    // 这里需要你填入你的腾讯云COS配置信息
    SecretId: 'YOUR_SECRET_ID',
    SecretKey: 'YOUR_SECRET_KEY',
    Bucket: 'laofei-1259209256',
    Region: 'ap-nanjing', // 南京地域
    
    // COS访问域名（已改为CDN域名，避免直连COS产生流量费用）
    Domain: 'https://cdn.laofeifs.com',
    // CDN访问域名（推荐使用，减少流量费用）
    CDNDomain: 'https://cdn.laofeifs.com',
    // 当前版本号，用于缓存控制
    Version: '202510038902'
};

// 当前选中的代次
var currentGeneration = '9';

// 图片URL构建函数（优先使用CDN域名，减少流量费用）
function buildImageUrl(imagePath) {
    return COS_CONFIG.CDNDomain + '/' + imagePath;
}

// 检查CDN是否可用
function checkCDNAvailability() {
    return new Promise((resolve) => {
        const testImg = new Image();
        testImg.onload = () => resolve(true);
        testImg.onerror = () => resolve(false);
        testImg.src = COS_CONFIG.CDNDomain + '/gallery/超特图鉴.png?v=' + Date.now();
        // 5秒超时
        setTimeout(() => resolve(false), 5000);
    });
}

// 备用图片URL构建函数（已移除，仅使用CDN）
// function buildImageUrlBackup(imagePath) {
//     return COS_CONFIG.Domain + '/' + imagePath;
// }

// 带版本号的URL构建函数（用于缓存控制）
function buildImageUrlWithVersion(imagePath) {
    return COS_CONFIG.CDNDomain + '/' + imagePath + '?v=' + COS_CONFIG.Version;
}

// 图鉴数据 - 所有代数共用一张图片
var galleryData = {
    image: 'gallery/超特图鉴.png',
    // 备用图片路径，如果主图片不存在则使用这个
    fallbackImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjQwMCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDgiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7lm77niYfliqDovb3lpLHotKU8L3RleHQ+Cjx0ZXh0IHg9IjQwMCIgeT0iMjgwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7lm77niYfliqDovb3lpLHotKU8L3RleHQ+Cjx0ZXh0IHg9IjQwMCIgeT0iMzIwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7lm77niYfliqDovb3lpLHotKU8L3RleHQ+Cjx0ZXh0IHg9IjQwMCIgeT0iMzYwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7lm77niYfliqDovb3lpLHotKU8L3RleHQ+Cjx0ZXh0IHg9IjQwMCIgeT0iNDAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7lm77niYfliqDovb3lpLHotKU8L3RleHQ+Cjx0ZXh0IHg9IjQwMCIgeT0iNDQwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7lm77niYfliqDovb3lpLHotKU8L3RleHQ+Cjx0ZXh0IHg9IjQwMCIgeT0iNDgwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7lm77niYfliqDovb3lpLHotKU8L3RleHQ+Cjx0ZXh0IHg9IjQwMCIgeT0iNTIwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7lm77niYfliqDovb3lpLHotKU8L3RleHQ+Cjx0ZXh0IHg9IjQwMCIgeT0iNTYwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7lm77niYfliqDovb3lpLHotKU8L3RleHQ+Cjwvc3ZnPgo=',
    // 移除备用图片设置
};

// 角色数据示例（你可以根据实际情况修改）
var charactersData = {
    "1": [
        {
            "id": "1_1",
            "name": "小芸",
            "generation": "1代超特",
            "description": "1代超特角色",
            "image": "characters/1代超特/小芸.png",
            "gifFolder": "gifs/1代超特/小芸/"
        },
        {
            "id": "1_2",
            "name": "蛇姬",
            "generation": "1代超特",
            "description": "1代超特角色",
            "image": "characters/1代超特/蛇姬.png",
            "gifFolder": "gifs/1代超特/蛇姬/"
        }
    ],
    "2": [
        {
            "id": "2_1",
            "name": "安杰拉",
            "generation": "2代超特",
            "description": "2代超特角色",
            "image": "characters/2代超特/安杰拉.png",
            "gifFolder": "gifs/2代超特/安杰拉/"
        },
        {
            "id": "2_2",
            "name": "沃顿",
            "generation": "2代超特",
            "description": "2代超特角色",
            "image": "characters/2代超特/沃顿.png",
            "gifFolder": "gifs/2代超特/沃顿/"
        },
        {
            "id": "2_3",
            "name": "莉莉斯",
            "generation": "2代超特",
            "description": "2代超特角色",
            "image": "characters/2代超特/莉莉斯.png",
            "gifFolder": "gifs/2代超特/莉莉斯/"
        },
        {
            "id": "2_4",
            "name": "路西法",
            "generation": "2代超特",
            "description": "2代超特角色",
            "image": "characters/2代超特/路西法.png",
            "gifFolder": "gifs/2代超特/路西法/"
        }
    ],
    "3": [
        {
            "id": "3_1",
            "name": "凤凰",
            "generation": "3代超特",
            "description": "3代超特角色",
            "image": "characters/3代超特/凤凰.png",
            "gifFolder": "gifs/3代超特/凤凰/"
        },
        {
            "id": "3_2",
            "name": "白虎",
            "generation": "3代超特",
            "description": "3代超特角色",
            "image": "characters/3代超特/白虎.png",
            "gifFolder": "gifs/3代超特/白虎/"
        },
        {
            "id": "3_3",
            "name": "酒鬼",
            "generation": "3代超特",
            "description": "3代超特角色",
            "image": "characters/3代超特/酒鬼.png",
            "gifFolder": "gifs/3代超特/酒鬼/"
        },
        {
            "id": "3_4",
            "name": "麒麟",
            "generation": "3代超特",
            "description": "3代超特角色",
            "image": "characters/3代超特/麒麟.png",
            "gifFolder": "gifs/3代超特/麒麟/"
        }
    ],
    "4": [
        {
            "id": "4_1",
            "name": "丽雅",
            "generation": "4代超特",
            "description": "4代超特角色",
            "image": "characters/4代超特/丽雅.png",
            "actions": [
                {"name": "分球", "gif": "gifs/4代超特/丽雅/分球.gif"},
                {"name": "大手冒", "gif": "gifs/4代超特/丽雅/大手冒.gif"},
                {"name": "小手冒", "gif": "gifs/4代超特/丽雅/小手冒.gif"},
                {"name": "投篮", "gif": "gifs/4代超特/丽雅/投篮.gif"},
                {"name": "篮板", "gif": "gifs/4代超特/丽雅/篮板.gif"},
                {"name": "近上", "gif": "gifs/4代超特/丽雅/近上.gif"},
                {"name": "近扣", "gif": "gifs/4代超特/丽雅/近扣.gif"},
                {"name": "远上", "gif": "gifs/4代超特/丽雅/远上.gif"},
                {"name": "远扣", "gif": "gifs/4代超特/丽雅/远扣.gif"}
            ]
        },
        {
            "id": "4_2",
            "name": "狐狸",
            "generation": "4代超特",
            "description": "4代超特角色",
            "image": "characters/4代超特/狐狸.png",
            "actions": [
                {"name": "地板", "gif": "gifs/4代超特/狐狸/地板.gif"},
                {"name": "大手冒", "gif": "gifs/4代超特/狐狸/大手冒.gif"},
                {"name": "小手冒", "gif": "gifs/4代超特/狐狸/小手冒.gif"},
                {"name": "投篮", "gif": "gifs/4代超特/狐狸/投篮.gif"},
                {"name": "篮板", "gif": "gifs/4代超特/狐狸/篮板.gif"},
                {"name": "走路", "gif": "gifs/4代超特/狐狸/走路.gif"},
                {"name": "近上", "gif": "gifs/4代超特/狐狸/近上.gif"},
                {"name": "近扣", "gif": "gifs/4代超特/狐狸/近扣.gif"},
                {"name": "远上", "gif": "gifs/4代超特/狐狸/远上.gif"},
                {"name": "远扣", "gif": "gifs/4代超特/狐狸/远扣.gif"},
                {"name": "鬼魅拦截", "gif": "gifs/4代超特/狐狸/鬼魅拦截.gif"}
            ]
        },
        {
            "id": "4_3",
            "name": "玛丽",
            "generation": "4代超特",
            "description": "4代超特角色",
            "image": "characters/4代超特/玛丽.png",
            "actions": [
                {"name": "地板", "gif": "gifs/4代超特/玛丽/地板.gif"},
                {"name": "大手冒", "gif": "gifs/4代超特/玛丽/大手冒.gif"},
                {"name": "小手冒", "gif": "gifs/4代超特/玛丽/小手冒.gif"},
                {"name": "投篮", "gif": "gifs/4代超特/玛丽/投篮.gif"},
                {"name": "篮板", "gif": "gifs/4代超特/玛丽/篮板.gif"},
                {"name": "近上", "gif": "gifs/4代超特/玛丽/近上.gif"},
                {"name": "近扣", "gif": "gifs/4代超特/玛丽/近扣.gif"},
                {"name": "远上", "gif": "gifs/4代超特/玛丽/远上.gif"},
                {"name": "远扣", "gif": "gifs/4代超特/玛丽/远扣.gif"},
                {"name": "鬼魅拦截", "gif": "gifs/4代超特/玛丽/鬼魅拦截.gif"}
            ]
        },
        {
            "id": "4_4",
            "name": "雷鸣",
            "generation": "4代超特",
            "description": "4代超特角色",
            "image": "characters/4代超特/雷鸣.png",
            "actions": [
                {"name": "大手冒", "gif": "gifs/4代超特/雷鸣/大手冒.gif"},
                {"name": "小手冒", "gif": "gifs/4代超特/雷鸣/小手冒.gif"},
                {"name": "投篮", "gif": "gifs/4代超特/雷鸣/投篮.gif"},
                {"name": "篮板", "gif": "gifs/4代超特/雷鸣/篮板.gif"},
                {"name": "补扣", "gif": "gifs/4代超特/雷鸣/补扣.gif"},
                {"name": "近上", "gif": "gifs/4代超特/雷鸣/近上.gif"},
                {"name": "近扣", "gif": "gifs/4代超特/雷鸣/近扣.gif"},
                {"name": "远上", "gif": "gifs/4代超特/雷鸣/远上.gif"},
                {"name": "远扣", "gif": "gifs/4代超特/雷鸣/远扣.gif"},
                {"name": "鬼力拦截", "gif": "gifs/4代超特/雷鸣/鬼力拦截.gif"}
            ]
        },
        {
            "id": "4_5",
            "name": "露美",
            "generation": "4代超特",
            "description": "4代超特角色",
            "image": "characters/4代超特/露美.png",
            "actions": [
                {"name": "地板", "gif": "gifs/4代超特/露美/地板.gif"},
                {"name": "大手冒", "gif": "gifs/4代超特/露美/大手冒.gif"},
                {"name": "小手冒", "gif": "gifs/4代超特/露美/小手冒.gif"},
                {"name": "投篮", "gif": "gifs/4代超特/露美/投篮.gif"},
                {"name": "拦截", "gif": "gifs/4代超特/露美/拦截.gif"},
                {"name": "篮板", "gif": "gifs/4代超特/露美/篮板.gif"},
                {"name": "近上", "gif": "gifs/4代超特/露美/近上.gif"},
                {"name": "近扣", "gif": "gifs/4代超特/露美/近扣.gif"},
                {"name": "远上", "gif": "gifs/4代超特/露美/远上.gif"},
                {"name": "远扣", "gif": "gifs/4代超特/露美/远扣.gif"}
            ]
        }
    ],
    "5": [
        {
            "id": "5_1",
            "name": "艾达",
            "generation": "5代超特",
            "description": "5代超特角色",
            "image": "characters/5代超特/艾达.png",
            "actions": [
                {"name": "X", "gif": "gifs/5代超特/艾达/X.gif"},
                {"name": "三分", "gif": "gifs/5代超特/艾达/三分.gif"},
                {"name": "中手冒", "gif": "gifs/5代超特/艾达/中手冒.gif"},
                {"name": "中投", "gif": "gifs/5代超特/艾达/中投.gif"},
                {"name": "大手冒", "gif": "gifs/5代超特/艾达/大手冒.gif"},
                {"name": "小手冒", "gif": "gifs/5代超特/艾达/小手冒.gif"},
                {"name": "抢断", "gif": "gifs/5代超特/艾达/抢断.gif"},
                {"name": "篮板", "gif": "gifs/5代超特/艾达/篮板.gif"},
                {"name": "近上", "gif": "gifs/5代超特/艾达/近上.gif"},
                {"name": "近扣", "gif": "gifs/5代超特/艾达/近扣.gif"},
                {"name": "远上", "gif": "gifs/5代超特/艾达/远上.gif"},
                {"name": "远扣", "gif": "gifs/5代超特/艾达/远扣.gif"}
            ]
        },
        {
            "id": "5_2",
            "name": "杰罗",
            "generation": "5代超特",
            "description": "5代超特角色",
            "image": "characters/5代超特/杰罗.png",
            "actions": [
                {"name": "X", "gif": "gifs/5代超特/杰罗/X.gif"},
                {"name": "中手", "gif": "gifs/5代超特/杰罗/中手.gif"},
                {"name": "中投", "gif": "gifs/5代超特/杰罗/中投.gif"},
                {"name": "分球", "gif": "gifs/5代超特/杰罗/分球.gif"},
                {"name": "地板", "gif": "gifs/5代超特/杰罗/地板.gif"},
                {"name": "大手冒", "gif": "gifs/5代超特/杰罗/大手冒.gif"},
                {"name": "小手冒", "gif": "gifs/5代超特/杰罗/小手冒.gif"},
                {"name": "快速跑传", "gif": "gifs/5代超特/杰罗/快速跑传.gif"},
                {"name": "投篮", "gif": "gifs/5代超特/杰罗/投篮.gif"},
                {"name": "灌篮盖帽", "gif": "gifs/5代超特/杰罗/灌篮盖帽.gif"},
                {"name": "篮板", "gif": "gifs/5代超特/杰罗/篮板.gif"},
                {"name": "近上", "gif": "gifs/5代超特/杰罗/近上.gif"},
                {"name": "近扣", "gif": "gifs/5代超特/杰罗/近扣.gif"},
                {"name": "远上", "gif": "gifs/5代超特/杰罗/远上.gif"},
                {"name": "远扣", "gif": "gifs/5代超特/杰罗/远扣.gif"}
            ]
        }
    ],
    "6": [
        {
            "id": "6_1",
            "name": "光暗",
            "generation": "6代超特",
            "description": "6代超特角色",
            "image": "characters/6代超特/光暗.png",
            "actions": [
                {"name": "光X", "gif": "gifs/6代超特/光暗/光X.gif"},
                {"name": "光三分", "gif": "gifs/6代超特/光暗/光三分.gif"},
                {"name": "光中手", "gif": "gifs/6代超特/光暗/光中手.gif"},
                {"name": "光中投", "gif": "gifs/6代超特/光暗/光中投.gif"},
                {"name": "光分球", "gif": "gifs/6代超特/光暗/光分球.gif"},
                {"name": "光地板", "gif": "gifs/6代超特/光暗/光地板.gif"},
                {"name": "光大手", "gif": "gifs/6代超特/光暗/光大手.gif"},
                {"name": "光小手", "gif": "gifs/6代超特/光暗/光小手.gif"},
                {"name": "光篮板", "gif": "gifs/6代超特/光暗/光篮板.gif"},
                {"name": "光近上", "gif": "gifs/6代超特/光暗/光近上.gif"},
                {"name": "光近扣", "gif": "gifs/6代超特/光暗/光近扣.gif"},
                {"name": "光远上", "gif": "gifs/6代超特/光暗/光远上.gif"},
                {"name": "光远扣", "gif": "gifs/6代超特/光暗/光远扣.gif"},
                {"name": "暗X", "gif": "gifs/6代超特/光暗/暗X.gif"},
                {"name": "暗三分", "gif": "gifs/6代超特/光暗/暗三分.gif"},
                {"name": "暗中手", "gif": "gifs/6代超特/光暗/暗中手.gif"},
                {"name": "暗分球", "gif": "gifs/6代超特/光暗/暗分球.gif"},
                {"name": "暗地板", "gif": "gifs/6代超特/光暗/暗地板.gif"},
                {"name": "暗大手", "gif": "gifs/6代超特/光暗/暗大手.gif"},
                {"name": "暗小手冒", "gif": "gifs/6代超特/光暗/暗小手冒.gif"},
                {"name": "暗篮板", "gif": "gifs/6代超特/光暗/暗篮板.gif"},
                {"name": "暗近上", "gif": "gifs/6代超特/光暗/暗近上.gif"},
                {"name": "暗近扣", "gif": "gifs/6代超特/光暗/暗近扣.gif"},
                {"name": "暗远上", "gif": "gifs/6代超特/光暗/暗远上.gif"},
                {"name": "暗远扣", "gif": "gifs/6代超特/光暗/暗远扣.gif"}
            ]
        },
        {
            "id": "6_2",
            "name": "冰火",
            "generation": "6代超特",
            "description": "6代超特角色",
            "image": "characters/6代超特/冰火.png",
            "actions": [
                {"name": "水X", "gif": "gifs/6代超特/冰火/水X.gif"},
                {"name": "水三分", "gif": "gifs/6代超特/冰火/水三分.gif"},
                {"name": "水中投", "gif": "gifs/6代超特/冰火/水中投.gif"},
                {"name": "水分球", "gif": "gifs/6代超特/冰火/水分球.gif"},
                {"name": "水地板", "gif": "gifs/6代超特/冰火/水地板.gif"},
                {"name": "水大手冒", "gif": "gifs/6代超特/冰火/水大手冒.gif"},
                {"name": "水小手冒", "gif": "gifs/6代超特/冰火/水小手冒.gif"},
                {"name": "水篮板", "gif": "gifs/6代超特/冰火/水篮板.gif"},
                {"name": "水近上", "gif": "gifs/6代超特/冰火/水近上.gif"},
                {"name": "水近扣", "gif": "gifs/6代超特/冰火/水近扣.gif"},
                {"name": "水远上", "gif": "gifs/6代超特/冰火/水远上.gif"},
                {"name": "水远扣", "gif": "gifs/6代超特/冰火/水远扣.gif"},
                {"name": "火X", "gif": "gifs/6代超特/冰火/火X.gif"},
                {"name": "火三分", "gif": "gifs/6代超特/冰火/火三分.gif"},
                {"name": "火中投", "gif": "gifs/6代超特/冰火/火中投.gif"},
                {"name": "火分球", "gif": "gifs/6代超特/冰火/火分球.gif"},
                {"name": "火地板", "gif": "gifs/6代超特/冰火/火地板.gif"},
                {"name": "火大手冒", "gif": "gifs/6代超特/冰火/火大手冒.gif"},
                {"name": "火小手冒", "gif": "gifs/6代超特/冰火/火小手冒.gif"},
                {"name": "火篮板", "gif": "gifs/6代超特/冰火/火篮板.gif"},
                {"name": "火近上", "gif": "gifs/6代超特/冰火/火近上.gif"},
                {"name": "火近扣", "gif": "gifs/6代超特/冰火/火近扣.gif"},
                {"name": "火远上", "gif": "gifs/6代超特/冰火/火远上.gif"},
                {"name": "火远扣", "gif": "gifs/6代超特/冰火/火远扣.gif"}
            ]
        },
        {
            "id": "6_3",
            "name": "钢铁剧毒",
            "generation": "6代超特",
            "description": "6代超特角色",
            "image": "characters/6代超特/钢铁剧毒.png",
            "actions": [
                {"name": "剧毒X", "gif": "gifs/6代超特/钢铁剧毒/剧毒X.gif"},
                {"name": "剧毒三分", "gif": "gifs/6代超特/钢铁剧毒/剧毒三分.gif"},
                {"name": "剧毒中投", "gif": "gifs/6代超特/钢铁剧毒/剧毒中投.gif"},
                {"name": "剧毒分球", "gif": "gifs/6代超特/钢铁剧毒/剧毒分球.gif"},
                {"name": "剧毒地板", "gif": "gifs/6代超特/钢铁剧毒/剧毒地板.gif"},
                {"name": "剧毒大手冒", "gif": "gifs/6代超特/钢铁剧毒/剧毒大手冒.gif"},
                {"name": "剧毒小手冒", "gif": "gifs/6代超特/钢铁剧毒/剧毒小手冒.gif"},
                {"name": "剧毒篮板", "gif": "gifs/6代超特/钢铁剧毒/剧毒篮板.gif"},
                {"name": "剧毒近上", "gif": "gifs/6代超特/钢铁剧毒/剧毒近上.gif"},
                {"name": "剧毒近扣", "gif": "gifs/6代超特/钢铁剧毒/剧毒近扣.gif"},
                {"name": "剧毒远上", "gif": "gifs/6代超特/钢铁剧毒/剧毒远上.gif"},
                {"name": "剧毒远扣", "gif": "gifs/6代超特/钢铁剧毒/剧毒远扣.gif"},
                {"name": "毒液中投", "gif": "gifs/6代超特/钢铁剧毒/毒液中投.gif"},
                {"name": "钢铁X", "gif": "gifs/6代超特/钢铁剧毒/钢铁X.gif"},
                {"name": "钢铁XX", "gif": "gifs/6代超特/钢铁剧毒/钢铁XX.gif"},
                {"name": "钢铁三分", "gif": "gifs/6代超特/钢铁剧毒/钢铁三分.gif"},
                {"name": "钢铁中投", "gif": "gifs/6代超特/钢铁剧毒/钢铁中投.gif"},
                {"name": "钢铁分球", "gif": "gifs/6代超特/钢铁剧毒/钢铁分球.gif"},
                {"name": "钢铁地板", "gif": "gifs/6代超特/钢铁剧毒/钢铁地板.gif"},
                {"name": "钢铁大手冒", "gif": "gifs/6代超特/钢铁剧毒/钢铁大手冒.gif"},
                {"name": "钢铁小手冒", "gif": "gifs/6代超特/钢铁剧毒/钢铁小手冒.gif"},
                {"name": "钢铁篮板", "gif": "gifs/6代超特/钢铁剧毒/钢铁篮板.gif"},
                {"name": "钢铁近上", "gif": "gifs/6代超特/钢铁剧毒/钢铁近上.gif"},
                {"name": "钢铁近扣", "gif": "gifs/6代超特/钢铁剧毒/钢铁近扣.gif"},
                {"name": "钢铁远上", "gif": "gifs/6代超特/钢铁剧毒/钢铁远上.gif"},
                {"name": "钢铁远扣", "gif": "gifs/6代超特/钢铁剧毒/钢铁远扣.gif"}
            ]
        },
        {
            "id": "6_4",
            "name": "风雷",
            "generation": "6代超特",
            "description": "6代超特角色",
            "image": "characters/6代超特/风雷.png",
            "actions": [
                {"name": "雷X", "gif": "gifs/6代超特/风雷/雷X.gif"},
                {"name": "雷三分", "gif": "gifs/6代超特/风雷/雷三分.gif"},
                {"name": "雷中投", "gif": "gifs/6代超特/风雷/雷中投.gif"},
                {"name": "雷分球", "gif": "gifs/6代超特/风雷/雷分球.gif"},
                {"name": "雷地板", "gif": "gifs/6代超特/风雷/雷地板.gif"},
                {"name": "雷大手冒", "gif": "gifs/6代超特/风雷/雷大手冒.gif"},
                {"name": "雷小手冒", "gif": "gifs/6代超特/风雷/雷小手冒.gif"},
                {"name": "雷篮板", "gif": "gifs/6代超特/风雷/雷篮板.gif"},
                {"name": "雷近上", "gif": "gifs/6代超特/风雷/雷近上.gif"},
                {"name": "雷近扣", "gif": "gifs/6代超特/风雷/雷近扣.gif"},
                {"name": "雷远上", "gif": "gifs/6代超特/风雷/雷远上.gif"},
                {"name": "雷远扣", "gif": "gifs/6代超特/风雷/雷远扣.gif"},
                {"name": "风X", "gif": "gifs/6代超特/风雷/风X.gif"},
                {"name": "风三分", "gif": "gifs/6代超特/风雷/风三分.gif"},
                {"name": "风中投", "gif": "gifs/6代超特/风雷/风中投.gif"},
                {"name": "风分球", "gif": "gifs/6代超特/风雷/风分球.gif"},
                {"name": "风地板", "gif": "gifs/6代超特/风雷/风地板.gif"},
                {"name": "风大手冒", "gif": "gifs/6代超特/风雷/风大手冒.gif"},
                {"name": "风小手冒", "gif": "gifs/6代超特/风雷/风小手冒.gif"},
                {"name": "风篮板", "gif": "gifs/6代超特/风雷/风篮板.gif"},
                {"name": "风近上", "gif": "gifs/6代超特/风雷/风近上.gif"},
                {"name": "风近扣", "gif": "gifs/6代超特/风雷/风近扣.gif"},
                {"name": "风远上", "gif": "gifs/6代超特/风雷/风远上.gif"},
                {"name": "风远扣", "gif": "gifs/6代超特/风雷/风远扣.gif"}
            ]
        }
    ],
    "7": [
        {
            "id": "7_1",
            "name": "玄武",
            "generation": "7代超特",
            "description": "7代超特角色",
            "image": "characters/7代超特/玄武.png",
            "actions": [
                {"name": "X", "gif": "gifs/7代超特/玄武/X.gif"},
                {"name": "中手冒", "gif": "gifs/7代超特/玄武/中手冒.gif"},
                {"name": "分球", "gif": "gifs/7代超特/玄武/分球.gif"},
                {"name": "地板", "gif": "gifs/7代超特/玄武/地板.gif"},
                {"name": "大手冒", "gif": "gifs/7代超特/玄武/大手冒.gif"},
                {"name": "小手冒", "gif": "gifs/7代超特/玄武/小手冒.gif"},
                {"name": "篮板", "gif": "gifs/7代超特/玄武/篮板.gif"},
                {"name": "阳三分", "gif": "gifs/7代超特/玄武/阳三分.gif"},
                {"name": "阳中投", "gif": "gifs/7代超特/玄武/阳中投.gif"},
                {"name": "阳近上", "gif": "gifs/7代超特/玄武/阳近上.gif"},
                {"name": "阳近扣", "gif": "gifs/7代超特/玄武/阳近扣.gif"},
                {"name": "阳远上", "gif": "gifs/7代超特/玄武/阳远上.gif"},
                {"name": "阳远扣", "gif": "gifs/7代超特/玄武/阳远扣.gif"},
                {"name": "阴三分", "gif": "gifs/7代超特/玄武/阴三分.gif"},
                {"name": "阴中投", "gif": "gifs/7代超特/玄武/阴中投.gif"},
                {"name": "阴近上", "gif": "gifs/7代超特/玄武/阴近上.gif"},
                {"name": "阴近扣", "gif": "gifs/7代超特/玄武/阴近扣.gif"},
                {"name": "阴远上", "gif": "gifs/7代超特/玄武/阴远上.gif"},
                {"name": "阴远扣", "gif": "gifs/7代超特/玄武/阴远扣.gif"}
            ]
        },
        {
            "id": "7_2",
            "name": "雪舞",
            "generation": "7代超特",
            "description": "7代超特角色",
            "image": "characters/7代超特/雪舞.png",
            "actions": [
                {"name": "X", "gif": "gifs/7代超特/雪舞/X.gif"},
                {"name": "中手", "gif": "gifs/7代超特/雪舞/中手.gif"},
                {"name": "中手冒", "gif": "gifs/7代超特/雪舞/中手冒.gif"},
                {"name": "分球", "gif": "gifs/7代超特/雪舞/分球.gif"},
                {"name": "地板", "gif": "gifs/7代超特/雪舞/地板.gif"},
                {"name": "大手冒", "gif": "gifs/7代超特/雪舞/大手冒.gif"},
                {"name": "小手冒", "gif": "gifs/7代超特/雪舞/小手冒.gif"},
                {"name": "篮板", "gif": "gifs/7代超特/雪舞/篮板.gif"},
                {"name": "阳三分", "gif": "gifs/7代超特/雪舞/阳三分.gif"},
                {"name": "阳中投", "gif": "gifs/7代超特/雪舞/阳中投.gif"},
                {"name": "阳近上", "gif": "gifs/7代超特/雪舞/阳近上.gif"},
                {"name": "阳近扣", "gif": "gifs/7代超特/雪舞/阳近扣.gif"},
                {"name": "阳远上", "gif": "gifs/7代超特/雪舞/阳远上.gif"},
                {"name": "阳远扣", "gif": "gifs/7代超特/雪舞/阳远扣.gif"},
                {"name": "阴三分", "gif": "gifs/7代超特/雪舞/阴三分.gif"},
                {"name": "阴中投", "gif": "gifs/7代超特/雪舞/阴中投.gif"},
                {"name": "阴近上", "gif": "gifs/7代超特/雪舞/阴近上.gif"},
                {"name": "阴近扣", "gif": "gifs/7代超特/雪舞/阴近扣.gif"},
                {"name": "阴远上", "gif": "gifs/7代超特/雪舞/阴远上.gif"},
                {"name": "阴远扣", "gif": "gifs/7代超特/雪舞/阴远扣.gif"}
            ]
        },
        {
            "id": "7_3",
            "name": "月儿",
            "generation": "7代超特",
            "description": "7代超特角色",
            "image": "characters/7代超特/月儿.png",
            "actions": [
                {"name": "X", "gif": "gifs/7代超特/月儿/X.gif"},
                {"name": "中手", "gif": "gifs/7代超特/月儿/中手.gif"},
                {"name": "分球", "gif": "gifs/7代超特/月儿/分球.gif"},
                {"name": "地板", "gif": "gifs/7代超特/月儿/地板.gif"},
                {"name": "大手冒", "gif": "gifs/7代超特/月儿/大手冒.gif"},
                {"name": "小手冒", "gif": "gifs/7代超特/月儿/小手冒.gif"},
                {"name": "篮板", "gif": "gifs/7代超特/月儿/篮板.gif"},
                {"name": "阳三分", "gif": "gifs/7代超特/月儿/阳三分.gif"},
                {"name": "阳中投", "gif": "gifs/7代超特/月儿/阳中投.gif"},
                {"name": "阳近上", "gif": "gifs/7代超特/月儿/阳近上.gif"},
                {"name": "阳近扣", "gif": "gifs/7代超特/月儿/阳近扣.gif"},
                {"name": "阳远上", "gif": "gifs/7代超特/月儿/阳远上.gif"},
                {"name": "阳远扣", "gif": "gifs/7代超特/月儿/阳远扣.gif"},
                {"name": "阴三分", "gif": "gifs/7代超特/月儿/阴三分.gif"},
                {"name": "阴中投", "gif": "gifs/7代超特/月儿/阴中投.gif"},
                {"name": "阴近上", "gif": "gifs/7代超特/月儿/阴近上.gif"},
                {"name": "阴近扣", "gif": "gifs/7代超特/月儿/阴近扣.gif"},
                {"name": "阴远上", "gif": "gifs/7代超特/月儿/阴远上.gif"},
                {"name": "阴远扣", "gif": "gifs/7代超特/月儿/阴远扣.gif"}
            ]
        }
    ],
    "8": [
        {
            "id": "8_1",
            "name": "奥丁",
            "generation": "8代超特",
            "description": "8代超特角色",
            "image": "characters/8代超特/奥丁.png",
            "actions": [
                {"name": "X", "gif": "gifs/8代超特/奥丁/X.gif"},
                {"name": "不看人传球", "gif": "gifs/8代超特/奥丁/不看人传球.gif"},
                {"name": "中手冒", "gif": "gifs/8代超特/奥丁/中手冒.gif"},
                {"name": "分球", "gif": "gifs/8代超特/奥丁/分球.gif"},
                {"name": "地板", "gif": "gifs/8代超特/奥丁/地板.gif"},
                {"name": "大手冒", "gif": "gifs/8代超特/奥丁/大手冒.gif"},
                {"name": "小手冒", "gif": "gifs/8代超特/奥丁/小手冒.gif"},
                {"name": "抢断", "gif": "gifs/8代超特/奥丁/抢断.gif"},
                {"name": "篮板", "gif": "gifs/8代超特/奥丁/篮板.gif"},
                {"name": "间接进攻手", "gif": "gifs/8代超特/奥丁/间接进攻手.gif"},
                {"name": "阳三分", "gif": "gifs/8代超特/奥丁/阳三分.gif"},
                {"name": "阳中投", "gif": "gifs/8代超特/奥丁/阳中投.gif"},
                {"name": "阳近上", "gif": "gifs/8代超特/奥丁/阳近上.gif"},
                {"name": "阳近扣", "gif": "gifs/8代超特/奥丁/阳近扣.gif"},
                {"name": "阳远上", "gif": "gifs/8代超特/奥丁/阳远上.gif"},
                {"name": "阳远扣", "gif": "gifs/8代超特/奥丁/阳远扣.gif"},
                {"name": "阴三分", "gif": "gifs/8代超特/奥丁/阴三分.gif"},
                {"name": "阴中投", "gif": "gifs/8代超特/奥丁/阴中投.gif"},
                {"name": "阴近上", "gif": "gifs/8代超特/奥丁/阴近上.gif"},
                {"name": "阴近扣", "gif": "gifs/8代超特/奥丁/阴近扣.gif"},
                {"name": "阴远上", "gif": "gifs/8代超特/奥丁/阴远上.gif"},
                {"name": "阴远扣", "gif": "gifs/8代超特/奥丁/阴远扣.gif"}
            ]
        },
        {
            "id": "8_2",
            "name": "月神",
            "generation": "8代超特",
            "description": "8代超特角色",
            "image": "characters/8代超特/月神.png",
            "actions": [
                {"name": "X", "gif": "gifs/8代超特/月神/X.gif"},
                {"name": "三分", "gif": "gifs/8代超特/月神/三分.gif"},
                {"name": "三分阳", "gif": "gifs/8代超特/月神/三分阳.gif"},
                {"name": "不看人传球", "gif": "gifs/8代超特/月神/不看人传球.gif"},
                {"name": "中手冒", "gif": "gifs/8代超特/月神/中手冒.gif"},
                {"name": "分球", "gif": "gifs/8代超特/月神/分球.gif"},
                {"name": "地板", "gif": "gifs/8代超特/月神/地板.gif"},
                {"name": "大手冒", "gif": "gifs/8代超特/月神/大手冒.gif"},
                {"name": "小手冒", "gif": "gifs/8代超特/月神/小手冒.gif"},
                {"name": "抢断", "gif": "gifs/8代超特/月神/抢断.gif"},
                {"name": "篮板", "gif": "gifs/8代超特/月神/篮板.gif"},
                {"name": "间接进攻手", "gif": "gifs/8代超特/月神/间接进攻手.gif"},
                {"name": "阳三分", "gif": "gifs/8代超特/月神/阳三分.gif"},
                {"name": "阳中投", "gif": "gifs/8代超特/月神/阳中投.gif"},
                {"name": "阳近上", "gif": "gifs/8代超特/月神/阳近上.gif"},
                {"name": "阳近扣", "gif": "gifs/8代超特/月神/阳近扣.gif"},
                {"name": "阳远上", "gif": "gifs/8代超特/月神/阳远上.gif"},
                {"name": "阳远扣", "gif": "gifs/8代超特/月神/阳远扣.gif"},
                {"name": "阴三分", "gif": "gifs/8代超特/月神/阴三分.gif"},
                {"name": "阴中投", "gif": "gifs/8代超特/月神/阴中投.gif"},
                {"name": "阴近上", "gif": "gifs/8代超特/月神/阴近上.gif"},
                {"name": "阴近扣", "gif": "gifs/8代超特/月神/阴近扣.gif"},
                {"name": "阴远上", "gif": "gifs/8代超特/月神/阴远上.gif"},
                {"name": "阴远扣", "gif": "gifs/8代超特/月神/阴远扣.gif"},
                {"name": "阴远哭", "gif": "gifs/8代超特/月神/阴远哭.gif"}
            ]
        },
        {
            "id": "8_3",
            "name": "哈托尔",
            "generation": "8代超特",
            "description": "8代超特角色",
            "image": "characters/8代超特/哈托尔.png",
            "actions": [
                {"name": "X", "gif": "gifs/8代超特/哈托尔/X.gif"},
                {"name": "不看人传球", "gif": "gifs/8代超特/哈托尔/不看人传球.gif"},
                {"name": "中手冒", "gif": "gifs/8代超特/哈托尔/中手冒.gif"},
                {"name": "分球", "gif": "gifs/8代超特/哈托尔/分球.gif"},
                {"name": "地板", "gif": "gifs/8代超特/哈托尔/地板.gif"},
                {"name": "大手冒", "gif": "gifs/8代超特/哈托尔/大手冒.gif"},
                {"name": "小手冒", "gif": "gifs/8代超特/哈托尔/小手冒.gif"},
                {"name": "抢断", "gif": "gifs/8代超特/哈托尔/抢断.gif"},
                {"name": "篮板", "gif": "gifs/8代超特/哈托尔/篮板.gif"},
                {"name": "间接进攻手", "gif": "gifs/8代超特/哈托尔/间接进攻手.gif"},
                {"name": "阳三分", "gif": "gifs/8代超特/哈托尔/阳三分.gif"},
                {"name": "阳中投", "gif": "gifs/8代超特/哈托尔/阳中投.gif"},
                {"name": "阳近上", "gif": "gifs/8代超特/哈托尔/阳近上.gif"},
                {"name": "阳近扣", "gif": "gifs/8代超特/哈托尔/阳近扣.gif"},
                {"name": "阳远上", "gif": "gifs/8代超特/哈托尔/阳远上.gif"},
                {"name": "阳远扣", "gif": "gifs/8代超特/哈托尔/阳远扣.gif"},
                {"name": "阴三分", "gif": "gifs/8代超特/哈托尔/阴三分.gif"},
                {"name": "阴中投", "gif": "gifs/8代超特/哈托尔/阴中投.gif"},
                {"name": "阴近上", "gif": "gifs/8代超特/哈托尔/阴近上.gif"},
                {"name": "阴近扣", "gif": "gifs/8代超特/哈托尔/阴近扣.gif"},
                {"name": "阴远上", "gif": "gifs/8代超特/哈托尔/阴远上.gif"},
                {"name": "阴远扣", "gif": "gifs/8代超特/哈托尔/阴远扣.gif"}
            ]
        }
    ],
    "9": [
        {
            "id": "9_1",
            "name": "亚琪",
            "generation": "9代超特",
            "description": "9代超特角色",
            "image": "characters/9代超特/亚琪.png",
            "actions": [
                {
                    "name": "A三分",
                    "gif": "gifs/9代超特/亚琪亚克/A三分.gif"
                },
                {
                    "name": "A中投",
                    "gif": "gifs/9代超特/亚琪亚克/A中投.gif"
                },
                {
                    "name": "A分球",
                    "gif": "gifs/9代超特/亚琪亚克/A分球.gif"
                },
                {
                    "name": "A篮板",
                    "gif": "gifs/9代超特/亚琪亚克/A篮板.gif"
                },
                {
                    "name": "A近上",
                    "gif": "gifs/9代超特/亚琪亚克/A近上.gif"
                },
                {
                    "name": "A近扣",
                    "gif": "gifs/9代超特/亚琪亚克/A近扣.gif"
                },
                {
                    "name": "A远上",
                    "gif": "gifs/9代超特/亚琪亚克/A远上.gif"
                },
                {
                    "name": "A远扣",
                    "gif": "gifs/9代超特/亚琪亚克/A远扣.gif"
                },
                {
                    "name": "B三分",
                    "gif": "gifs/9代超特/亚琪亚克/B三分.gif"
                },
                {
                    "name": "B中投",
                    "gif": "gifs/9代超特/亚琪亚克/B中投.gif"
                },
                {
                    "name": "B分球",
                    "gif": "gifs/9代超特/亚琪亚克/B分球.gif"
                },
                {
                    "name": "B篮板",
                    "gif": "gifs/9代超特/亚琪亚克/B篮板.gif"
                },
                {
                    "name": "B近上",
                    "gif": "gifs/9代超特/亚琪亚克/B近上.gif"
                },
                {
                    "name": "B近扣",
                    "gif": "gifs/9代超特/亚琪亚克/B近扣.gif"
                },
                {
                    "name": "B远上",
                    "gif": "gifs/9代超特/亚琪亚克/B远上.gif"
                },
                {
                    "name": "B远扣",
                    "gif": "gifs/9代超特/亚琪亚克/B远扣.gif"
                },
                {
                    "name": "X",
                    "gif": "gifs/9代超特/亚琪亚克/X.gif"
                },
                {
                    "name": "不看人传球",
                    "gif": "gifs/9代超特/亚琪亚克/不看人传球.gif"
                },
                {
                    "name": "中手冒",
                    "gif": "gifs/9代超特/亚琪亚克/中手冒.gif"
                },
                {
                    "name": "地板",
                    "gif": "gifs/9代超特/亚琪亚克/地板.gif"
                },
                {
                    "name": "大手冒",
                    "gif": "gifs/9代超特/亚琪亚克/大手冒.gif"
                },
                {
                    "name": "小手冒",
                    "gif": "gifs/9代超特/亚琪亚克/小手冒.gif"
                },
                {
                    "name": "快速起来",
                    "gif": "gifs/9代超特/亚琪亚克/快速起来.gif"
                },
                {
                    "name": "抢断",
                    "gif": "gifs/9代超特/亚琪亚克/抢断.gif"
                },
                {
                    "name": "篮板",
                    "gif": "gifs/9代超特/亚琪亚克/篮板.gif"
                }
            ]
        },
        {
            "id": "9_2",
            "name": "亚克",
            "generation": "9代超特",
            "description": "9代超特角色",
            "image": "characters/9代超特/亚克.png",
            "actions": [
                {"name": "A三分", "gif": "gifs/9代超特/亚琪亚克/A三分.gif"},
                {"name": "A中投", "gif": "gifs/9代超特/亚琪亚克/A中投.gif"},
                {"name": "A分球", "gif": "gifs/9代超特/亚琪亚克/A分球.gif"},
                {"name": "A篮板", "gif": "gifs/9代超特/亚琪亚克/A篮板.gif"},
                {"name": "A近上", "gif": "gifs/9代超特/亚琪亚克/A近上.gif"},
                {"name": "A近扣", "gif": "gifs/9代超特/亚琪亚克/A近扣.gif"},
                {"name": "A远上", "gif": "gifs/9代超特/亚琪亚克/A远上.gif"},
                {"name": "A远扣", "gif": "gifs/9代超特/亚琪亚克/A远扣.gif"},
                {"name": "B三分", "gif": "gifs/9代超特/亚琪亚克/B三分.gif"},
                {"name": "B中投", "gif": "gifs/9代超特/亚琪亚克/B中投.gif"},
                {"name": "B分球", "gif": "gifs/9代超特/亚琪亚克/B分球.gif"},
                {"name": "B篮板", "gif": "gifs/9代超特/亚琪亚克/B篮板.gif"},
                {"name": "B近上", "gif": "gifs/9代超特/亚琪亚克/B近上.gif"},
                {"name": "B近扣", "gif": "gifs/9代超特/亚琪亚克/B近扣.gif"},
                {"name": "B远上", "gif": "gifs/9代超特/亚琪亚克/B远上.gif"},
                {"name": "B远扣", "gif": "gifs/9代超特/亚琪亚克/B远扣.gif"},
                {"name": "X", "gif": "gifs/9代超特/亚琪亚克/X.gif"},
                {"name": "不看人传球", "gif": "gifs/9代超特/亚琪亚克/不看人传球.gif"},
                {"name": "中手冒", "gif": "gifs/9代超特/亚琪亚克/中手冒.gif"},
                {"name": "地板", "gif": "gifs/9代超特/亚琪亚克/地板.gif"},
                {"name": "大手冒", "gif": "gifs/9代超特/亚琪亚克/大手冒.gif"},
                {"name": "小手冒", "gif": "gifs/9代超特/亚琪亚克/小手冒.gif"},
                {"name": "快速起来", "gif": "gifs/9代超特/亚琪亚克/快速起来.gif"},
                {"name": "抢断", "gif": "gifs/9代超特/亚琪亚克/抢断.gif"},
                {"name": "篮板", "gif": "gifs/9代超特/亚琪亚克/篮板.gif"}
            ]
        },
        {
            "id": "9_3",
            "name": "罗卡",
            "generation": "9代超特",
            "description": "9代超特角色",
            "image": "characters/9代超特/罗卡.png",
            "actions": [
                {
                    "name": "A三分",
                    "gif": "gifs/9代超特/罗卡/A三分.gif"
                },
                {
                    "name": "A中投",
                    "gif": "gifs/9代超特/罗卡/A中投.gif"
                },
                {
                    "name": "A分球",
                    "gif": "gifs/9代超特/罗卡/A分球.gif"
                },
                {
                    "name": "A篮板",
                    "gif": "gifs/9代超特/罗卡/A篮板.gif"
                },
                {
                    "name": "A近上",
                    "gif": "gifs/9代超特/罗卡/A近上.gif"
                },
                {
                    "name": "A近扣",
                    "gif": "gifs/9代超特/罗卡/A近扣.gif"
                },
                {
                    "name": "A远上",
                    "gif": "gifs/9代超特/罗卡/A远上.gif"
                },
                {
                    "name": "A远扣",
                    "gif": "gifs/9代超特/罗卡/A远扣.gif"
                },
                {
                    "name": "B三分",
                    "gif": "gifs/9代超特/罗卡/B三分.gif"
                },
                {
                    "name": "B中投",
                    "gif": "gifs/9代超特/罗卡/B中投.gif"
                },
                {
                    "name": "B分球",
                    "gif": "gifs/9代超特/罗卡/B分球.gif"
                },
                {
                    "name": "B篮板",
                    "gif": "gifs/9代超特/罗卡/B篮板.gif"
                },
                {
                    "name": "B近上",
                    "gif": "gifs/9代超特/罗卡/B近上.gif"
                },
                {
                    "name": "B近扣",
                    "gif": "gifs/9代超特/罗卡/B近扣.gif"
                },
                {
                    "name": "B远上",
                    "gif": "gifs/9代超特/罗卡/B远上.gif"
                },
                {
                    "name": "B远扣",
                    "gif": "gifs/9代超特/罗卡/B远扣.gif"
                },
                {
                    "name": "X",
                    "gif": "gifs/9代超特/罗卡/X.gif"
                },
                {
                    "name": "不看人传球",
                    "gif": "gifs/9代超特/罗卡/不看人传球.gif"
                },
                {
                    "name": "中手冒",
                    "gif": "gifs/9代超特/罗卡/中手冒.gif"
                },
                {
                    "name": "地板",
                    "gif": "gifs/9代超特/罗卡/地板.gif"
                },
                {
                    "name": "大手冒",
                    "gif": "gifs/9代超特/罗卡/大手冒.gif"
                },
                {
                    "name": "小手冒",
                    "gif": "gifs/9代超特/罗卡/小手冒.gif"
                }
            ]
        },
        {
            "id": "9_4",
            "name": "艾迪",
            "generation": "9代超特",
            "description": "9代超特角色",
            "image": "characters/9代超特/艾迪.png",
            "actions": [
                {"name": "A三分", "gif": "gifs/9代超特/艾迪艾薇/A三分.gif"},
                {"name": "A中投", "gif": "gifs/9代超特/艾迪艾薇/A中投.gif"},
                {"name": "A分球", "gif": "gifs/9代超特/艾迪艾薇/A分球.gif"},
                {"name": "A篮板", "gif": "gifs/9代超特/艾迪艾薇/A篮板.gif"},
                {"name": "A近上", "gif": "gifs/9代超特/艾迪艾薇/A近上.gif"},
                {"name": "A近扣", "gif": "gifs/9代超特/艾迪艾薇/A近扣.gif"},
                {"name": "A远上", "gif": "gifs/9代超特/艾迪艾薇/A远上.gif"},
                {"name": "A远扣", "gif": "gifs/9代超特/艾迪艾薇/A远扣.gif"},
                {"name": "B三分", "gif": "gifs/9代超特/艾迪艾薇/B三分.gif"},
                {"name": "B中投", "gif": "gifs/9代超特/艾迪艾薇/B中投.gif"},
                {"name": "B分球", "gif": "gifs/9代超特/艾迪艾薇/B分球.gif"},
                {"name": "B篮板", "gif": "gifs/9代超特/艾迪艾薇/B篮板.gif"},
                {"name": "B近上", "gif": "gifs/9代超特/艾迪艾薇/B近上.gif"},
                {"name": "B近扣", "gif": "gifs/9代超特/艾迪艾薇/B近扣.gif"},
                {"name": "B远上", "gif": "gifs/9代超特/艾迪艾薇/B远上.gif"},
                {"name": "B远扣", "gif": "gifs/9代超特/艾迪艾薇/B远扣.gif"},
                {"name": "不看人传球", "gif": "gifs/9代超特/艾迪艾薇/不看人传球.gif"},
                {"name": "中手冒", "gif": "gifs/9代超特/艾迪艾薇/中手冒.gif"},
                {"name": "地板", "gif": "gifs/9代超特/艾迪艾薇/地板.gif"},
                {"name": "大手冒", "gif": "gifs/9代超特/艾迪艾薇/大手冒.gif"},
                {"name": "小手冒", "gif": "gifs/9代超特/艾迪艾薇/小手冒.gif"},
                {"name": "快速补防", "gif": "gifs/9代超特/艾迪艾薇/快速补防.gif"},
                {"name": "抢断", "gif": "gifs/9代超特/艾迪艾薇/抢断.gif"}
            ]
        },
        {
            "id": "9_5",
            "name": "艾薇",
            "generation": "9代超特",
            "description": "9代超特角色",
            "image": "characters/9代超特/艾薇.png",
            "actions": [
                {"name": "A三分", "gif": "gifs/9代超特/艾迪艾薇/A三分.gif"},
                {"name": "A中投", "gif": "gifs/9代超特/艾迪艾薇/A中投.gif"},
                {"name": "A分球", "gif": "gifs/9代超特/艾迪艾薇/A分球.gif"},
                {"name": "A篮板", "gif": "gifs/9代超特/艾迪艾薇/A篮板.gif"},
                {"name": "A近上", "gif": "gifs/9代超特/艾迪艾薇/A近上.gif"},
                {"name": "A近扣", "gif": "gifs/9代超特/艾迪艾薇/A近扣.gif"},
                {"name": "A远上", "gif": "gifs/9代超特/艾迪艾薇/A远上.gif"},
                {"name": "A远扣", "gif": "gifs/9代超特/艾迪艾薇/A远扣.gif"},
                {"name": "B三分", "gif": "gifs/9代超特/艾迪艾薇/B三分.gif"},
                {"name": "B中投", "gif": "gifs/9代超特/艾迪艾薇/B中投.gif"},
                {"name": "B分球", "gif": "gifs/9代超特/艾迪艾薇/B分球.gif"},
                {"name": "B篮板", "gif": "gifs/9代超特/艾迪艾薇/B篮板.gif"},
                {"name": "B近上", "gif": "gifs/9代超特/艾迪艾薇/B近上.gif"},
                {"name": "B近扣", "gif": "gifs/9代超特/艾迪艾薇/B近扣.gif"},
                {"name": "B远上", "gif": "gifs/9代超特/艾迪艾薇/B远上.gif"},
                {"name": "B远扣", "gif": "gifs/9代超特/艾迪艾薇/B远扣.gif"},
                {"name": "不看人传球", "gif": "gifs/9代超特/艾迪艾薇/不看人传球.gif"},
                {"name": "中手冒", "gif": "gifs/9代超特/艾迪艾薇/中手冒.gif"},
                {"name": "地板", "gif": "gifs/9代超特/艾迪艾薇/地板.gif"},
                {"name": "大手冒", "gif": "gifs/9代超特/艾迪艾薇/大手冒.gif"},
                {"name": "小手冒", "gif": "gifs/9代超特/艾迪艾薇/小手冒.gif"},
                {"name": "快速补防", "gif": "gifs/9代超特/艾迪艾薇/快速补防.gif"},
                {"name": "抢断", "gif": "gifs/9代超特/艾迪艾薇/抢断.gif"}
            ]
        }
    ],
    "3_5": [
        {
            "id": "3_5_1",
            "name": "悠夏",
            "generation": "3.5代超特",
            "description": "3.5代超特角色",
            "image": "characters/3.5代超特/悠夏.png",
            "actions": [
                {"name": "X", "gif": "gifs/3.5代超特/悠夏/X.gif"},
                {"name": "分球", "gif": "gifs/3.5代超特/悠夏/分球.gif"},
                {"name": "地板", "gif": "gifs/3.5代超特/悠夏/地板.gif"},
                {"name": "大手冒", "gif": "gifs/3.5代超特/悠夏/大手冒.gif"},
                {"name": "小手冒", "gif": "gifs/3.5代超特/悠夏/小手冒.gif"},
                {"name": "投篮", "gif": "gifs/3.5代超特/悠夏/投篮.gif"},
                {"name": "篮板", "gif": "gifs/3.5代超特/悠夏/篮板.gif"},
                {"name": "近上", "gif": "gifs/3.5代超特/悠夏/近上.gif"},
                {"name": "近扣", "gif": "gifs/3.5代超特/悠夏/近扣.gif"},
                {"name": "远上", "gif": "gifs/3.5代超特/悠夏/远上.gif"},
                {"name": "远扣", "gif": "gifs/3.5代超特/悠夏/远扣.gif"}
            ]
        },
        {
            "id": "3_5_2",
            "name": "托姆斯",
            "generation": "3.5代超特",
            "description": "3.5代超特角色",
            "image": "characters/3.5代超特/托姆斯.png",
            "actions": [
                {"name": "X", "gif": "gifs/3.5代超特/托姆斯/X.gif"},
                {"name": "分球", "gif": "gifs/3.5代超特/托姆斯/分球.gif"},
                {"name": "地板", "gif": "gifs/3.5代超特/托姆斯/地板.gif"},
                {"name": "大手冒", "gif": "gifs/3.5代超特/托姆斯/大手冒.gif"},
                {"name": "小手冒", "gif": "gifs/3.5代超特/托姆斯/小手冒.gif"},
                {"name": "投篮", "gif": "gifs/3.5代超特/托姆斯/投篮.gif"},
                {"name": "篮板", "gif": "gifs/3.5代超特/托姆斯/篮板.gif"},
                {"name": "近上", "gif": "gifs/3.5代超特/托姆斯/近上.gif"},
                {"name": "近扣", "gif": "gifs/3.5代超特/托姆斯/近扣.gif"},
                {"name": "远上", "gif": "gifs/3.5代超特/托姆斯/远上.gif"},
                {"name": "远扣", "gif": "gifs/3.5代超特/托姆斯/远扣.gif"}
            ]
        },
        {
            "id": "3_5_3",
            "name": "浩燃",
            "generation": "3.5代超特",
            "description": "3.5代超特角色",
            "image": "characters/3.5代超特/浩燃.png",
            "actions": [
                {"name": "X", "gif": "gifs/3.5代超特/浩燃/X.gif"},
                {"name": "分球", "gif": "gifs/3.5代超特/浩燃/分球.gif"},
                {"name": "地板", "gif": "gifs/3.5代超特/浩燃/地板.gif"},
                {"name": "大手冒", "gif": "gifs/3.5代超特/浩燃/大手冒.gif"},
                {"name": "小手冒", "gif": "gifs/3.5代超特/浩燃/小手冒.gif"},
                {"name": "投篮", "gif": "gifs/3.5代超特/浩燃/投篮.gif"},
                {"name": "近上", "gif": "gifs/3.5代超特/浩燃/近上.gif"},
                {"name": "近扣", "gif": "gifs/3.5代超特/浩燃/近扣.gif"},
                {"name": "远上", "gif": "gifs/3.5代超特/浩燃/远上.gif"},
                {"name": "远扣", "gif": "gifs/3.5代超特/浩燃/远扣.gif"}
            ]
        },
        {
            "id": "3_5_4",
            "name": "芙熙",
            "generation": "3.5代超特",
            "description": "3.5代超特角色",
            "image": "characters/3.5代超特/芙熙.png",
            "actions": [
                {"name": "X分球地板", "gif": "gifs/3.5代超特/芙熙/X分球地板.gif"},
                {"name": "小冒大冒篮板", "gif": "gifs/3.5代超特/芙熙/小冒大冒篮板.gif"},
                {"name": "投篮远扣", "gif": "gifs/3.5代超特/芙熙/投篮远扣.gif"},
                {"name": "近扣远上近上", "gif": "gifs/3.5代超特/芙熙/近扣远上近上.gif"}
            ]
        }
    ],
    "4_5": [
        {
            "id": "4_5_1",
            "name": "夏洛梅特",
            "generation": "4.5代超特",
            "description": "4.5代超特角色",
            "image": "characters/4.5代超特/夏洛梅特.png",
            "gifFolder": "gifs/4.5代超特/夏洛梅特/"
        }
    ],
    "5_5": [
        {
            "id": "5_5_1",
            "name": "洛克斯C",
            "generation": "5.5代超特",
            "description": "5.5代超特角色",
            "image": "characters/5.5代超特/洛克斯C.png",
            "gifFolder": "gifs/5.5代超特/洛克斯C/"
        },
        {
            "id": "5_5_2",
            "name": "超觉醒雷龙",
            "generation": "5.5代超特",
            "description": "5.5代超特角色",
            "image": "characters/5.5代超特/超觉醒雷龙.png",
            "gifFolder": "gifs/5.5代超特/超觉醒雷龙/"
        }
    ],
    "6_5": [
        {
            "id": "6_5_1",
            "name": "洛克斯C",
            "generation": "6.5代超特",
            "description": "6.5代超特角色",
            "image": "characters/6.5代超特/洛克斯C.png",
            "actions": [
                {"name": "X", "gif": "gifs/6.5代超特/洛克斯C/X.gif"},
                {"name": "三分", "gif": "gifs/6.5代超特/洛克斯C/三分.gif"},
                {"name": "中投", "gif": "gifs/6.5代超特/洛克斯C/中投.gif"},
                {"name": "分球", "gif": "gifs/6.5代超特/洛克斯C/分球.gif"},
                {"name": "地板", "gif": "gifs/6.5代超特/洛克斯C/地板.gif"},
                {"name": "大手冒", "gif": "gifs/6.5代超特/洛克斯C/大手冒.gif"},
                {"name": "小手冒", "gif": "gifs/6.5代超特/洛克斯C/小手冒.gif"},
                {"name": "投篮", "gif": "gifs/6.5代超特/洛克斯C/投篮.gif"},
                {"name": "篮板", "gif": "gifs/6.5代超特/洛克斯C/篮板.gif"},
                {"name": "近上", "gif": "gifs/6.5代超特/洛克斯C/近上.gif"},
                {"name": "近扣", "gif": "gifs/6.5代超特/洛克斯C/近扣.gif"},
                {"name": "远上", "gif": "gifs/6.5代超特/洛克斯C/远上.gif"},
                {"name": "远扣", "gif": "gifs/6.5代超特/洛克斯C/远扣.gif"}
            ]
        },
        {
            "id": "6_5_2",
            "name": "超觉醒雷龙",
            "generation": "6.5代超特",
            "description": "6.5代超特角色",
            "image": "characters/6.5代超特/超觉醒雷龙.png",
            "actions": [
                {"name": "X", "gif": "gifs/6.5代超特/超觉醒雷龙/X.gif"},
                {"name": "三分", "gif": "gifs/6.5代超特/超觉醒雷龙/三分.gif"},
                {"name": "中投", "gif": "gifs/6.5代超特/超觉醒雷龙/中投.gif"},
                {"name": "分球", "gif": "gifs/6.5代超特/超觉醒雷龙/分球.gif"},
                {"name": "地板", "gif": "gifs/6.5代超特/超觉醒雷龙/地板.gif"},
                {"name": "大手冒", "gif": "gifs/6.5代超特/超觉醒雷龙/大手冒.gif"},
                {"name": "小手冒", "gif": "gifs/6.5代超特/超觉醒雷龙/小手冒.gif"},
                {"name": "投篮", "gif": "gifs/6.5代超特/超觉醒雷龙/投篮.gif"},
                {"name": "篮板", "gif": "gifs/6.5代超特/超觉醒雷龙/篮板.gif"},
                {"name": "近上", "gif": "gifs/6.5代超特/超觉醒雷龙/近上.gif"},
                {"name": "近扣", "gif": "gifs/6.5代超特/超觉醒雷龙/近扣.gif"},
                {"name": "远上", "gif": "gifs/6.5代超特/超觉醒雷龙/远上.gif"},
                {"name": "远扣", "gif": "gifs/6.5代超特/超觉醒雷龙/远扣.gif"}
            ]
        }
    ],
    "7_5": [
        {
            "id": "7_5_1",
            "name": "洛克斯PG",
            "generation": "7.5代超特",
            "description": "7.5代超特角色",
            "image": "characters/7.5代超特/洛克斯PG.png",
            "actions": [
                {"name": "X", "gif": "gifs/7.5代超特/洛克斯PG/X.gif"},
                {"name": "中手", "gif": "gifs/7.5代超特/洛克斯PG/中手.gif"},
                {"name": "中投", "gif": "gifs/7.5代超特/洛克斯PG/中投.gif"},
                {"name": "分球", "gif": "gifs/7.5代超特/洛克斯PG/分球.gif"},
                {"name": "地板", "gif": "gifs/7.5代超特/洛克斯PG/地板.gif"},
                {"name": "大手冒", "gif": "gifs/7.5代超特/洛克斯PG/大手冒.gif"},
                {"name": "小手冒", "gif": "gifs/7.5代超特/洛克斯PG/小手冒.gif"},
                {"name": "投篮", "gif": "gifs/7.5代超特/洛克斯PG/投篮.gif"},
                {"name": "篮板", "gif": "gifs/7.5代超特/洛克斯PG/篮板.gif"},
                {"name": "近上", "gif": "gifs/7.5代超特/洛克斯PG/近上.gif"},
                {"name": "近扣", "gif": "gifs/7.5代超特/洛克斯PG/近扣.gif"},
                {"name": "远上", "gif": "gifs/7.5代超特/洛克斯PG/远上.gif"},
                {"name": "远扣", "gif": "gifs/7.5代超特/洛克斯PG/远扣.gif"},
                {"name": "阴远扣", "gif": "gifs/7.5代超特/洛克斯PG/阴远扣.gif"}
            ]
        }
    ]
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

// 自动强制刷新（如果检测到微信浏览器）- 已禁用
function autoForceRefresh() {
    console.log('微信浏览器自动刷新功能已禁用');
    return;
}

// 通用版本检查和强制刷新（适用于所有浏览器）- 已禁用
function checkAndForceRefresh() {
    console.log('版本检查功能已禁用');
    return;
}

// 版本检查功能已移除，简化代码
function checkVersion() {
    console.log('版本检查功能已移除');
}



// 欢迎弹窗功能
function initWelcomeModal() {
    const welcomeModal = document.getElementById('welcomeModal');
    const startExploreBtn = document.getElementById('startExploreBtn');
    const contactBtn = document.getElementById('contactBtn');
    const wechatInfo = document.getElementById('wechatInfo');
    const wechatNumber = document.getElementById('wechatNumber');
    
    // 检查是否已经显示过弹窗（使用sessionStorage）
    const hasShownWelcome = sessionStorage.getItem('hasShownWelcome');
    
    if (!hasShownWelcome) {
        // 显示弹窗
        welcomeModal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // 禁止背景滚动
        
        // 记录已显示
        sessionStorage.setItem('hasShownWelcome', 'true');
    }
    
    // 开始探索按钮点击事件
    startExploreBtn.addEventListener('click', function() {
        welcomeModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // 恢复背景滚动
        wechatInfo.style.display = 'none'; // 隐藏微信号信息
    });
    
    // 联系老非按钮点击事件
    contactBtn.addEventListener('click', function() {
        if (wechatInfo.style.display === 'none' || wechatInfo.style.display === '') {
            wechatInfo.style.display = 'block';
        } else {
            wechatInfo.style.display = 'none';
        }
    });
    
    // 微信号点击复制功能
    wechatNumber.addEventListener('click', function() {
        // 始终复制原始微信号，而不是当前显示的文本
        const originalText = 'laofei90186';
        
        // 使用现代浏览器的Clipboard API
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(originalText).then(function() {
                showCopySuccess();
            }).catch(function() {
                fallbackCopyTextToClipboard(originalText);
            });
        } else {
            // 降级方案
            fallbackCopyTextToClipboard(originalText);
        }
    });
    
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
        const originalText = wechatNumber.textContent;
        wechatNumber.textContent = '已复制！';
        wechatNumber.style.background = 'rgba(76, 175, 80, 0.3)';
        
        setTimeout(function() {
            wechatNumber.textContent = originalText;
            wechatNumber.style.background = 'rgba(255, 255, 255, 0.2)';
        }, 1500);
    }
    
    // 显示复制失败提示
    function showCopyError() {
        const originalText = wechatNumber.textContent;
        wechatNumber.textContent = '复制失败';
        wechatNumber.style.background = 'rgba(244, 67, 54, 0.3)';
        
        setTimeout(function() {
            wechatNumber.textContent = originalText;
            wechatNumber.style.background = 'rgba(255, 255, 255, 0.2)';
        }, 1500);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM加载完成');
    
    // 初始化欢迎弹窗
    initWelcomeModal();
    
    // 检查CDN可用性
    checkCDNAvailability().then(isAvailable => {
        if (!isAvailable) {
            console.error('❌ CDN不可用，返回514错误');
            console.error('CDN域名:', COS_CONFIG.CDNDomain);
            console.error('可能的原因:');
            console.error('1. CDN服务异常 - 需要联系腾讯云技术支持');
            console.error('2. 源站连接问题 - 检查COS源站状态');
            console.error('3. CDN配置错误 - 检查域名配置');
            console.error('4. 其他访问控制规则 - 检查防盗链、IP限制等');
            console.error('建议: 联系腾讯云技术支持或检查CDN服务状态');
        } else {
            console.log('✅ CDN可用');
        }
    });
    
    // 禁用自动刷新功能，避免无限循环
    console.log('自动刷新功能已禁用');
    
    // 设置页面稳定标志，防止重复刷新
    setTimeout(function() {
        sessionStorage.setItem('fs_page_stable', 'true');
        console.log('页面已稳定，防止频繁刷新');
    }, 15000);
    
    // 移除额外强制刷新，避免无限循环
    
    // 清理预加载警告
    setTimeout(function() {
        var preloadLinks = document.querySelectorAll('link[rel="preload"]');
        preloadLinks.forEach(function(link) {
            if (link.href.includes('styles.css') || link.href.includes('script.js')) {
                link.remove();
            }
        });
    }, 10000);
    
    // 清理调试日志，减少控制台输出
    setTimeout(function() {
        console.clear();
        console.log('页面加载完成，调试日志已清理');
    }, 20000);
    
    // 防止频繁请求，设置请求间隔（避免514错误）
    var lastRequestTime = 0;
    var requestInterval = 1000; // 1秒间隔，避免CDN频率限制
    var requestCount = 0;
    var maxRequestsPerMinute = 30; // 每分钟最多30个请求，合理设置
    
    // 重写fetch函数，添加请求限制
    if (window.fetch) {
        var originalFetch = window.fetch;
        window.fetch = function(url, options) {
            var now = Date.now();
            requestCount++;
            
            // 每分钟重置计数器
            if (now - lastRequestTime > 60000) {
                requestCount = 0;
                lastRequestTime = now;
            }
            
            if (requestCount > maxRequestsPerMinute) {
                console.log('请求次数超限，跳过:', url);
                return Promise.reject(new Error('Request limit exceeded'));
            }
            
            if (now - lastRequestTime < requestInterval) {
                console.log('请求过于频繁，跳过:', url);
                return Promise.reject(new Error('Request too frequent'));
            }
            
            lastRequestTime = now;
            return originalFetch(url, options);
        };
    }
    
    // 重写XMLHttpRequest，添加请求限制
    var originalXHR = window.XMLHttpRequest;
    window.XMLHttpRequest = function() {
        var xhr = new originalXHR();
        var originalOpen = xhr.open;
        xhr.open = function(method, url, async, user, password) {
            var now = Date.now();
            requestCount++;
            
            // 每分钟重置计数器
            if (now - lastRequestTime > 60000) {
                requestCount = 0;
                lastRequestTime = now;
            }
            
            if (requestCount > maxRequestsPerMinute) {
                console.log('XHR请求次数超限，跳过:', url);
                return;
            }
            
            if (now - lastRequestTime < requestInterval) {
                console.log('XHR请求过于频繁，跳过:', url);
                return;
            }
            
            lastRequestTime = now;
            return originalOpen.call(this, method, url, async, user, password);
        };
        return xhr;
    };
    
    // 防止页面频繁刷新
    var lastReloadTime = 0;
    var reloadInterval = 30000; // 30秒间隔，避免CDN频率限制
    
    // 重写location.reload
    var originalReload = window.location.reload;
    window.location.reload = function(forceReload) {
        var now = Date.now();
        if (now - lastReloadTime < reloadInterval) {
            console.log('页面刷新过于频繁，跳过');
            return;
        }
        lastReloadTime = now;
        return originalReload.call(this, forceReload);
    };
    
    // 防止图片频繁加载
    var imageLoadCount = 0;
    var maxImagesPerMinute = 200; // 每分钟最多200张图片，为GIF检查预留更多空间
    
    // 重写Image构造函数
    var originalImage = window.Image;
    window.Image = function() {
        var img = new originalImage();
        var originalSrc = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
        
        Object.defineProperty(img, 'src', {
            get: function() {
                return originalSrc.get.call(this);
            },
            set: function(value) {
                var now = Date.now();
                imageLoadCount++;
                
                // 每分钟重置计数器
                if (now - lastRequestTime > 60000) {
                    imageLoadCount = 0;
                    lastRequestTime = now;
                }
                
                // 为GIF文件检查添加例外，允许更多请求
                var isGifCheck = value.includes('?v=') && (value.includes('.gif') || value.includes('gifs/'));
                var maxAllowed = isGifCheck ? maxImagesPerMinute * 10 : maxImagesPerMinute; // GIF检查允许10倍请求量
                
                if (imageLoadCount > maxAllowed) {
                    console.log('图片加载次数超限，跳过:', value);
                    return;
                }
                
                return originalSrc.set.call(this, value);
            }
        });
        
        return img;
    };
    
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
        
        console.log('2.5. 初始化移动端导航');
        initializeMobileNavigation();
        
        console.log('3. 加载角色');
        loadCharacters(currentGeneration);
        
        console.log('4. 加载图鉴');
        loadGallery(currentGeneration);
        
        // 默认显示首页
        console.log('5. 设置默认页面为首页');
        switchSection('home');
        
        // 默认隐藏筛选按钮（因为默认是home页面）
        var filterContainer = document.querySelector('.filter-container');
        if (filterContainer) {
            filterContainer.style.display = 'none';
        }
        
        console.log('5. 初始化排名');
        // 初始化职业排名功能
        initializeRanking();
        
        console.log('6. 初始化超特对比');
        // 初始化超特对比功能
        initializeComparison();
        
        console.log('6.5. 初始化职业&粉丝套');
        // 初始化职业&粉丝套功能
        initializeAccountRecommend();
        
        console.log('6.6. 初始化图片模块');
        // 初始化图片模块功能
        initializeImages();
        
        console.log('6.7. 初始化俱乐部');
        // 初始化俱乐部功能
        initializeClub();
        
        console.log('6.8. 初始化FS单字');
        // FS单字图片在切换到页面时加载，不需要在初始化时加载
        
        console.log('7. 初始化全屏显示');
        // 初始化全屏显示功能
        initializeFullscreen();
        
        console.log('8. 初始化分享功能');
        // 初始化分享功能
        initializeShare();
        
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
    var navButtons = document.querySelectorAll('.nav-btn');
    
    for (var i = 0; i < navButtons.length; i++) {
        navButtons[i].addEventListener('click', function(e) {
            // 优先检查是否是最新活动，如果是则直接跳转
            var section = this.getAttribute('data-section');
            console.log('导航按钮点击，section:', section);
            if (section === 'events') {
                console.log('检测到最新活动，准备跳转');
                e.preventDefault();
                e.stopPropagation();
                try {
                    window.location.href = 'https://www.fsjoy.com/news.html?newsTypeStr=894362&id=121524';
                } catch (error) {
                    console.error('跳转失败:', error);
                    window.open('https://www.fsjoy.com/news.html?newsTypeStr=894362&id=121524', '_blank');
                }
                return false;
            }
            
            // 检查是否有子菜单
            var parent = this.getAttribute('data-parent');
            if (parent) {
                e.stopPropagation();
                // 先隐藏所有内容区域
                const sections = document.querySelectorAll('.content-section');
                sections.forEach(section => section.classList.remove('active'));
                // 隐藏content-area
                const contentArea = document.querySelector('.content-area');
                if (contentArea) {
                    contentArea.classList.remove('active');
                }
                // 切换子菜单显示
                toggleSubnav(parent);
                // 激活当前按钮
                navButtons.forEach(function(btn) {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
                return;
            }
            
            // 关闭所有子菜单
            closeAllSubnavs();
            
            // 移除所有活动状态
            for (var j = 0; j < navButtons.length; j++) {
                navButtons[j].classList.remove('active');
            }
            // 添加当前活动状态
            this.classList.add('active');
            
            // 切换内容区域
            if (section) {
                switchSection(section);
            }
        });
    }
    
    // 使用事件委托处理二级导航按钮点击事件
    var subnavContainer = document.getElementById('subnav-container');
    if (subnavContainer) {
        subnavContainer.addEventListener('click', function(e) {
            var subnavBtn = e.target.closest('.subnav-btn');
            if (subnavBtn) {
                e.stopPropagation();
                e.preventDefault();
                
                console.log('点击二级导航按钮:', subnavBtn.getAttribute('data-section'));
                
                // 获取section名称
                var section = subnavBtn.getAttribute('data-section');
                if (section) {
                    // 直接调用switchToSection，它会处理所有状态更新
                    switchToSection(section);
                }
            }
        });
    } else {
        console.error('找不到二级导航容器');
    }
}

// 切换二级导航显示
function toggleSubnav(parent) {
    // 只在桌面端显示，移动端隐藏
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        // 移动端不显示桌面端子菜单
        const subnavContainer = document.getElementById('subnav-container');
        if (subnavContainer) {
            subnavContainer.style.display = 'none';
        }
        return;
    }
    
    var subnavContainer = document.getElementById('subnav-container');
    var subnav = document.getElementById(parent + '-subnav');
    
    console.log('切换二级导航:', parent, '容器:', subnavContainer, '菜单:', subnav);
    
    if (!subnavContainer || !subnav) {
        console.error('找不到二级导航元素');
        return;
    }
    
    var isActive = subnav.classList.contains('active');
    
    // 先关闭所有二级导航菜单
    var allSubnavs = document.querySelectorAll('.subnav-menu');
    allSubnavs.forEach(function(menu) {
        menu.classList.remove('active');
    });
    
    // 确保移动端子菜单隐藏
    const mobileSubnavContainer = document.getElementById('mobile-subnav-container');
    if (mobileSubnavContainer) {
        mobileSubnavContainer.style.display = 'none';
    }
    
    // 如果当前二级导航未激活，则激活它并显示容器
    if (!isActive) {
        subnavContainer.style.display = 'block';
        subnav.classList.add('active');
        console.log('显示二级导航:', parent);
    } else {
        // 如果已经激活，则关闭容器
        subnavContainer.style.display = 'none';
        console.log('隐藏二级导航:', parent);
    }
}

// 处理首页功能卡片点击
function handleHomeFeatureClick(parent) {
    // 切换到对应的导航按钮并显示二级导航
    var navBtn = document.querySelector(`[data-parent="${parent}"]`);
    if (navBtn) {
        // 激活导航按钮
        var allNavButtons = document.querySelectorAll('.nav-btn');
        allNavButtons.forEach(function(btn) {
            btn.classList.remove('active');
        });
        navBtn.classList.add('active');
        
        // 显示二级导航
        toggleSubnav(parent);
        
        // 切换到第一个子页面
        var subnav = document.getElementById(parent + '-subnav');
        if (subnav) {
            var firstSubnavBtn = subnav.querySelector('.subnav-btn');
            if (firstSubnavBtn) {
                var section = firstSubnavBtn.getAttribute('data-section');
                if (section) {
                    switchToSection(section);
                }
            }
        }
    }
}

// 确保函数在全局作用域中可用
window.toggleSubnav = toggleSubnav;
window.handleHomeFeatureClick = handleHomeFeatureClick;

// 关闭所有二级导航
function closeAllSubnavs() {
    var subnavContainer = document.getElementById('subnav-container');
    if (subnavContainer) {
        // 先关闭所有子菜单
        var subnavs = document.querySelectorAll('.subnav-menu');
        subnavs.forEach(function(subnav) {
            subnav.classList.remove('active');
        });
        // 然后隐藏容器
        subnavContainer.style.display = 'none';
    }
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
    // 隐藏所有内容区域
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.remove('active'));
    
    // 控制content-area的显示
    const contentArea = document.querySelector('.content-area');
    if (sectionName === 'home') {
        // 首页时隐藏content-area和二级导航
        contentArea.classList.remove('active');
        closeAllSubnavs();
        closeMobileSubnav();
    } else {
        // 其他页面显示content-area
        contentArea.classList.add('active');
    }
    
    // 显示选中的内容区域
    const targetSection = document.getElementById(sectionName + '-section');
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // 根据页面加载相应的内容
    if (sectionName === 'fs-single') {
        // 切换到FS单字页面时加载图片（延迟一点确保DOM已更新）
        setTimeout(function() {
            console.log('切换到FS单字页面，准备加载图片');
            loadFSSingleImage();
        }, 200);
    } else if (sectionName === 'club') {
        // 切换到俱乐部页面时加载图片（延迟一点确保DOM已更新）
        setTimeout(function() {
            loadClubImage();
        }, 200);
    }
    
    // 控制筛选按钮的显示/隐藏
    const filterContainer = document.querySelector('.filter-container');
    if (sectionName === 'characters') {
        // 只在"超特动作"页面显示筛选按钮
        filterContainer.style.display = 'block';
    } else {
        // 其他页面隐藏筛选按钮
        filterContainer.style.display = 'none';
    }
}

// 全局函数，供HTML中的onclick调用
function switchToSection(sectionName) {
    // 如果是最新活动，直接跳转到外部链接
    if (sectionName === 'events') {
        window.location.href = 'https://www.fsjoy.com/news.html?newsTypeStr=894362&id=121524';
        return;
    }
    
    // 先确定这个section属于哪个父级菜单
    let parentId = null;
    
    // 检查桌面端二级导航按钮
    const subnavButtons = document.querySelectorAll('.subnav-btn');
    subnavButtons.forEach(btn => {
        if (btn.getAttribute('data-section') === sectionName) {
            const subnav = btn.closest('.subnav-menu');
            if (subnav) {
                parentId = subnav.id.replace('-subnav', '');
            }
        }
    });
    
    // 如果没找到，检查移动端
    if (!parentId) {
        const mobileSubnavButtons = document.querySelectorAll('.mobile-subnav-btn');
        mobileSubnavButtons.forEach(btn => {
            if (btn.getAttribute('data-section') === sectionName) {
                const subnav = btn.closest('.mobile-subnav-menu');
                if (subnav) {
                    parentId = subnav.id.replace('-mobile-subnav', '');
                }
            }
        });
    }
    
    // 关闭所有二级导航，但保留当前父级的子菜单
    if (parentId) {
        // 只关闭其他父级的子菜单
        const allSubnavs = document.querySelectorAll('.subnav-menu');
        allSubnavs.forEach(menu => {
            const menuParentId = menu.id.replace('-subnav', '');
            if (menuParentId !== parentId) {
                menu.classList.remove('active');
            }
        });
        const allMobileSubnavs = document.querySelectorAll('.mobile-subnav-menu');
        allMobileSubnavs.forEach(menu => {
            const menuParentId = menu.id.replace('-mobile-subnav', '');
            if (menuParentId !== parentId) {
                menu.classList.remove('active');
            }
        });
        
        // 确保当前父级的子菜单显示（但不重复显示）
        // 检测是否为移动端
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // 移动端：只显示移动端子菜单，隐藏桌面端子菜单
            const mobileSubnavContainer = document.getElementById('mobile-subnav-container');
            const mobileSubnav = document.getElementById(parentId + '-mobile-subnav');
            if (mobileSubnavContainer && mobileSubnav) {
                // 只有当容器隐藏时才显示，避免重复显示
                if (mobileSubnavContainer.style.display === 'none' || !mobileSubnav.classList.contains('active')) {
                    mobileSubnavContainer.style.display = 'block';
                    mobileSubnav.classList.add('active');
                }
            }
            // 确保桌面端子菜单隐藏
            const subnavContainer = document.getElementById('subnav-container');
            if (subnavContainer) {
                subnavContainer.style.display = 'none';
            }
        } else {
            // 桌面端：只显示桌面端子菜单，隐藏移动端子菜单
            const subnavContainer = document.getElementById('subnav-container');
            const subnav = document.getElementById(parentId + '-subnav');
            if (subnavContainer && subnav) {
                // 只有当容器隐藏时才显示，避免重复显示
                if (subnavContainer.style.display === 'none' || !subnav.classList.contains('active')) {
                    subnavContainer.style.display = 'block';
                    subnav.classList.add('active');
                }
            }
            // 确保移动端子菜单隐藏
            const mobileSubnavContainer = document.getElementById('mobile-subnav-container');
            if (mobileSubnavContainer) {
                mobileSubnavContainer.style.display = 'none';
            }
        }
    } else {
        // 如果没有父级菜单，关闭所有二级导航
        closeAllSubnavs();
        closeMobileSubnav();
    }
    
    // 更新桌面端导航按钮状态
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-section') === sectionName) {
            btn.classList.add('active');
        } else if (parentId && btn.getAttribute('data-parent') === parentId) {
            btn.classList.add('active');
        }
    });
    
    // 更新二级导航按钮状态
    subnavButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-section') === sectionName) {
            btn.classList.add('active');
        }
    });
    
    // 更新移动端导航按钮状态
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    mobileNavItems.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-section') === sectionName) {
            btn.classList.add('active');
        } else if (parentId && btn.getAttribute('data-parent') === parentId) {
            btn.classList.add('active');
        }
    });
    
    // 更新移动端二级导航按钮状态
    const mobileSubnavButtons = document.querySelectorAll('.mobile-subnav-btn');
    mobileSubnavButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-section') === sectionName) {
            btn.classList.add('active');
        }
    });
    
    // 关闭移动端菜单
    closeMobileMenu();
    
    // 切换内容区域
    switchSection(sectionName);
}

// 移动端菜单控制
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-nav-menu');
    const toggle = document.getElementById('mobile-menu-toggle');
    
    if (menu && toggle) {
        menu.classList.toggle('active');
        toggle.classList.toggle('active');
    }
}

function closeMobileMenu() {
    const menu = document.getElementById('mobile-nav-menu');
    const toggle = document.getElementById('mobile-menu-toggle');
    
    if (menu && toggle) {
        menu.classList.remove('active');
        toggle.classList.remove('active');
    }
}

// 初始化移动端导航
function initializeMobileNavigation() {
    
    // 移动端导航项点击事件
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    mobileNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // 优先检查是否是最新活动，如果是则直接跳转
            const section = this.getAttribute('data-section');
            console.log('移动端导航按钮点击，section:', section);
            if (section === 'events') {
                console.log('检测到最新活动，准备跳转');
                e.preventDefault();
                e.stopPropagation();
                try {
                    window.location.href = 'https://www.fsjoy.com/news.html?newsTypeStr=894362&id=121524';
                } catch (error) {
                    console.error('跳转失败:', error);
                    window.open('https://www.fsjoy.com/news.html?newsTypeStr=894362&id=121524', '_blank');
                }
                return false;
            }
            
            e.stopPropagation();
            const parent = this.getAttribute('data-parent');
            
            if (parent) {
                // 有父级菜单，在下方显示子导航，不跳转页面
                // 先隐藏所有内容区域
                const sections = document.querySelectorAll('.content-section');
                sections.forEach(section => section.classList.remove('active'));
                // 隐藏content-area
                const contentArea = document.querySelector('.content-area');
                if (contentArea) {
                    contentArea.classList.remove('active');
                }
                toggleMobileSubnav(parent);
            } else if (section) {
                // 直接切换页面，关闭子导航
                closeMobileSubnav();
                switchToSection(section);
            }
        });
    });
    
    // 移动端二级导航按钮点击事件（使用事件委托）
    const mobileSubnavContainer = document.getElementById('mobile-subnav-container');
    if (mobileSubnavContainer) {
        mobileSubnavContainer.addEventListener('click', function(e) {
            const mobileSubnavBtn = e.target.closest('.mobile-subnav-btn');
            if (mobileSubnavBtn) {
                e.stopPropagation();
                e.preventDefault();
                const section = mobileSubnavBtn.getAttribute('data-section');
                if (section) {
                    switchToSection(section);
                }
            }
        });
    }
    
    // 点击页面其他地方关闭菜单
    document.addEventListener('click', function(e) {
        const mobileNav = document.querySelector('.mobile-nav');
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        
        if (mobileNav && mobileMenuToggle && 
            !mobileNav.contains(e.target) && 
            !mobileMenuToggle.contains(e.target)) {
            closeMobileMenu();
            closeMobileSubnav();
        }
    });
}

// 切换移动端二级导航显示（在导航栏下方）
function toggleMobileSubnav(parent) {
    // 只在移动端显示，桌面端隐藏
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) {
        // 桌面端不显示移动端子菜单
        const mobileSubnavContainer = document.getElementById('mobile-subnav-container');
        if (mobileSubnavContainer) {
            mobileSubnavContainer.style.display = 'none';
        }
        return;
    }
    
    const subnavContainer = document.getElementById('mobile-subnav-container');
    const subnav = document.getElementById(parent + '-mobile-subnav');
    
    if (!subnavContainer || !subnav) {
        console.error('找不到移动端二级导航元素');
        return;
    }
    
    var isActive = subnav.classList.contains('active');
    
    // 先关闭所有二级导航菜单
    var allSubnavs = document.querySelectorAll('.mobile-subnav-menu');
    allSubnavs.forEach(function(menu) {
        menu.classList.remove('active');
    });
    
    // 确保桌面端子菜单隐藏
    const desktopSubnavContainer = document.getElementById('subnav-container');
    if (desktopSubnavContainer) {
        desktopSubnavContainer.style.display = 'none';
    }
    
    // 如果当前二级导航未激活，则激活它并显示容器
    if (!isActive) {
        subnavContainer.style.display = 'block';
        subnav.classList.add('active');
        console.log('显示移动端二级导航:', parent);
    } else {
        // 如果已经激活，则关闭容器
        subnavContainer.style.display = 'none';
        console.log('隐藏移动端二级导航:', parent);
    }
}

// 关闭移动端二级导航
function closeMobileSubnav() {
    const subnavContainer = document.getElementById('mobile-subnav-container');
    if (subnavContainer) {
        // 先关闭所有子菜单
        const subnavs = document.querySelectorAll('.mobile-subnav-menu');
        subnavs.forEach(subnav => {
            subnav.classList.remove('active');
        });
        // 然后隐藏容器
        subnavContainer.style.display = 'none';
    }
}

// 兼容旧函数名
function closeSubmenu() {
    closeMobileSubnav();
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
    
    // 构建图片URL（使用腾讯云COS，添加时间戳避免缓存）
    var imageUrl = '';
    if (character.image) {
        imageUrl = buildImageUrl(character.image);
        console.log('角色图片URL:', imageUrl);
        
        // 所有设备都添加版本号避免缓存问题
        imageUrl += '?v=' + COS_CONFIG.Version;
        console.log('添加版本号后的URL:', imageUrl);
    } else {
        console.warn('角色没有图片路径:', character.name);
    }
    
    // 构建动作按钮HTML
    let actionsHtml = '';
    if (character.actions && character.actions.length > 0) {
        // 9代超特使用预设动作列表
        actionsHtml = `
            <div class="character-actions">
                <h4>动作技能</h4>
                <div class="action-buttons">
                    ${character.actions.map(action => `
                        <button class="action-btn" data-gif="${buildImageUrl(action.gif)}">
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
        // 8代超特使用动态读取GIF文件
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
                ${imageUrl ? `<img src="${imageUrl}" alt="${character.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="handleImageError(this, '${character.name}')" onload="handleImageLoad(this, '${character.name}')">` : '暂无图片'}
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
    
    // 添加动作按钮事件监听
    if (character.actions && character.actions.length > 0) {
        // 9代超特使用预设动作列表（直接显示，用户体验更好）
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
                    
                    // 显示对应的GIF（优化流量使用）
                    var gifUrl = this.getAttribute('data-gif');
                    var actionName = this.querySelector('span').textContent;
                    
                    // 显示加载提示
                    gifContainer.innerHTML = '<div class="gif-loading"><i class="fas fa-spinner fa-spin"></i><p>加载中...</p></div>';
                    
                    // 延迟加载GIF，减少流量消耗
                    setTimeout(function() {
                        var gifUrlWithCache = gifUrl + (gifUrl.includes('?') ? '&' : '?') + 'v=' + COS_CONFIG.Version;
                        var img = new Image();
                        img.onload = function() {
                            gifContainer.innerHTML = '<img src="' + gifUrlWithCache + '" alt="' + actionName + '" class="action-gif"><p class="action-name">' + actionName + '</p>';
                        };
                        img.onerror = function() {
                            console.error('❌ GIF CDN加载失败');
                            console.error('失败URL:', gifUrlWithCache);
                            gifContainer.innerHTML = '<div class="gif-error"><i class="fas fa-exclamation-triangle"></i><p>CDN加载失败</p></div>';
                        };
                        img.src = gifUrlWithCache;
                    }, 200);
                    
                    return false; // 阻止页面滚动
                };
            })(actionButtons[i]);
        }
    } else if (character.gifFolder) {
        // 8代超特动态加载GIF文件（懒加载模式）
        setupLazyGifLoading(character.gifFolder, character.id, card);
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
    
    // 构建图片URL（使用CDN优化）
    const imageUrl = galleryData.image ? buildImageUrl(galleryData.image) : '';
    console.log('图鉴图片URL:', imageUrl);
    
    // 添加版本号避免缓存问题
    const imageUrlWithTimestamp = imageUrl ? `${imageUrl}?v=${COS_CONFIG.Version}` : '';
    console.log('带版本号的图鉴图片URL:', imageUrlWithTimestamp);
    
    card.innerHTML = `
        <div class="gallery-image-full">
            ${imageUrlWithTimestamp ? `<img src="${imageUrlWithTimestamp}" alt="超特图鉴" style="width: 100%; height: auto; object-fit: contain;" onerror="handleGalleryImageError(this, '超特图鉴')" onload="handleImageLoad(this, '超特图鉴')">` : '暂无图片'}
        </div>
        <div class="gallery-info">
            <h3 class="gallery-name">超特图鉴</h3>
            <p class="gallery-generation">所有代数角色一览</p>
        </div>
    `;
    
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
        cosDomain: COS_CONFIG.CDNDomain
    };
    
    console.log('详细错误信息:', errorInfo);
    
    // 检查是否是CDN域名问题
    if (img.src.indexOf(COS_CONFIG.CDNDomain) === -1) {
        console.error('❌ 图片URL不是CDN域名，可能是配置问题');
        console.error('当前图片URL:', img.src);
        console.error('期望的CDN域名:', COS_CONFIG.CDNDomain);
        console.error('URL是否包含CDN域名:', img.src.indexOf(COS_CONFIG.CDNDomain));
    }
    
    // CDN加载失败，显示详细错误信息
    if (img.src.indexOf(COS_CONFIG.CDNDomain) !== -1) {
        console.error('❌ CDN图片加载失败');
        console.error('失败URL:', img.src);
        console.error('可能的原因:');
        console.error('1. CORS策略未配置 - 需要在CDN控制台配置跨域访问');
        console.error('2. SSL证书问题 - 证书未正确绑定到cdn.laofeifs.com');
        console.error('3. CDN服务异常 - 检查CDN服务状态');
        console.error('4. 资源不存在 - 检查文件路径是否正确');
        return;
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
            if (img.src.indexOf('?v=') === -1) {
                var retryUrl = img.src + '?v=' + COS_CONFIG.Version;
                console.log('iOS重试URL:', retryUrl);
                img.src = retryUrl;
            }
        }, 5000);
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
    
    // CDN访问失败，显示详细错误信息
    if (img.src.indexOf(COS_CONFIG.CDNDomain) !== -1) {
        console.error('❌ CDN图鉴图片加载失败');
        console.error('失败URL:', img.src);
        console.error('可能的原因:');
        console.error('1. CORS策略未配置 - 需要在CDN控制台配置跨域访问');
        console.error('2. SSL证书问题 - 证书未正确绑定到cdn.laofeifs.com');
        console.error('3. CDN服务异常 - 检查CDN服务状态');
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
            url: `${COS_CONFIG.CDNDomain}/${path}`
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

// 9代超特懒加载动作设置（按需加载，节省流量）
function setupLazyActionsLoading(character, card) {
    console.log('设置9代超特懒加载动作:', character.id);
    
    var actionButtonsContainer = card.querySelector('#actions-' + character.id);
    var gifContainer = card.querySelector('#gif-' + character.id);
    
    if (!actionButtonsContainer || !gifContainer) {
        console.error('找不到容器元素:', character.id);
        return;
    }
    
    // 显示占位符，提示用户点击加载
    actionButtonsContainer.innerHTML = '<div class="lazy-load-tip"><i class="fas fa-mouse-pointer"></i><p>点击加载动作</p></div>';
    
    // 添加点击事件，用户点击时才真正显示动作按钮
    actionButtonsContainer.addEventListener('click', function() {
        if (!this.classList.contains('actions-loaded')) {
            this.classList.add('actions-loaded');
            loadActionsButtons(character, card);
        }
    });
    
    // 添加视觉提示
    actionButtonsContainer.style.cursor = 'pointer';
    actionButtonsContainer.style.border = '2px dashed #4CAF50';
    actionButtonsContainer.style.padding = '20px';
    actionButtonsContainer.style.textAlign = 'center';
    actionButtonsContainer.style.borderRadius = '8px';
    actionButtonsContainer.style.backgroundColor = '#f8f9fa';
}

// 加载9代超特动作按钮
function loadActionsButtons(character, card) {
    console.log('加载9代超特动作按钮:', character.id);
    
    var actionButtonsContainer = card.querySelector('#actions-' + character.id);
    var gifContainer = card.querySelector('#gif-' + character.id);
    
    // 生成动作按钮HTML
    var actionsHtml = '<div class="actions-grid">';
    for (var i = 0; i < character.actions.length; i++) {
        var action = character.actions[i];
        actionsHtml += `
            <button class="action-btn" data-gif="${action.gif}">
                <span>${action.name}</span>
            </button>
        `;
    }
    actionsHtml += '</div>';
    
    // 更新HTML
    actionButtonsContainer.innerHTML = actionsHtml;
    actionButtonsContainer.style.cursor = 'default';
    actionButtonsContainer.style.border = 'none';
    actionButtonsContainer.style.padding = '0';
    actionButtonsContainer.style.backgroundColor = 'transparent';
    
    // 添加按钮事件监听
    var actionButtons = actionButtonsContainer.querySelectorAll('.action-btn');
    for (var i = 0; i < actionButtons.length; i++) {
        (function(button) {
            button.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // 移除所有按钮的激活状态
                for (var j = 0; j < actionButtons.length; j++) {
                    actionButtons[j].classList.remove('active');
                }
                // 添加当前按钮的激活状态
                this.classList.add('active');
                
                // 显示对应的GIF（优化流量使用）
                var gifUrl = this.getAttribute('data-gif');
                var actionName = this.querySelector('span').textContent;
                
                // 显示加载提示
                gifContainer.innerHTML = '<div class="gif-loading"><i class="fas fa-spinner fa-spin"></i><p>加载中...</p></div>';
                
                // 延迟加载GIF，减少流量消耗
                setTimeout(function() {
                    var gifUrlWithCache = gifUrl + (gifUrl.includes('?') ? '&' : '?') + 'v=' + COS_CONFIG.Version;
                    var img = new Image();
                    img.onload = function() {
                        gifContainer.innerHTML = '<img src="' + gifUrlWithCache + '" alt="' + actionName + '" class="action-gif"><p class="action-name">' + actionName + '</p>';
                    };
                    img.onerror = function() {
                        console.error('❌ GIF CDN加载失败');
                        console.error('失败URL:', gifUrlWithCache);
                        gifContainer.innerHTML = '<div class="gif-error"><i class="fas fa-exclamation-triangle"></i><p>CDN加载失败</p></div>';
                    };
                    img.src = gifUrlWithCache;
                }, 200);
                
                return false;
            };
        })(actionButtons[i]);
    }
}

// 懒加载GIF文件设置（按需加载，节省流量）
function setupLazyGifLoading(folder, characterId, card) {
    console.log('设置懒加载GIF:', characterId, '文件夹:', folder);
    
    var actionButtonsContainer = card.querySelector('#actions-' + characterId);
    var gifContainer = card.querySelector('#gif-' + characterId);
    
    if (!actionButtonsContainer || !gifContainer) {
        console.error('找不到容器元素:', characterId);
        return;
    }
    
    // 显示占位符，提示用户点击加载
    actionButtonsContainer.innerHTML = '<div class="lazy-load-tip"><i class="fas fa-mouse-pointer"></i><p>点击加载动作</p></div>';
    
    // 添加点击事件，用户点击时才真正加载GIF
    actionButtonsContainer.addEventListener('click', function() {
        if (!this.classList.contains('gif-loaded')) {
            this.classList.add('gif-loaded');
            loadGifFiles(folder, characterId, card);
        }
    });
    
    // 添加视觉提示
    actionButtonsContainer.style.cursor = 'pointer';
    actionButtonsContainer.style.border = '2px dashed #4CAF50';
    actionButtonsContainer.style.padding = '20px';
    actionButtonsContainer.style.textAlign = 'center';
    actionButtonsContainer.style.borderRadius = '8px';
    actionButtonsContainer.style.backgroundColor = '#f8f9fa';
}

// 动态加载GIF文件（实际加载函数）
function loadGifFiles(folder, characterId, card) {
    console.log('开始加载GIF文件:', characterId, '文件夹:', folder);
    
    // 确保文件夹路径正确（移除末尾斜杠，避免重复）
    var cleanFolder = folder.replace(/\/$/, '');
    
    // 根据角色ID确定使用哪个GIF文件列表
    var commonGifFiles = [];
    
    // 2代、3代、4代、4.5代、6.5代、7.5代超特通用GIF文件（排除芙熙）
    if ((characterId.includes('2_') || characterId.includes('3_') || characterId.includes('4_') || characterId.includes('6_5') || characterId.includes('7_5')) && characterId !== '3_5_4' && characterId !== '6_5_1' && characterId !== '6_5_2' && characterId !== '7_5_1') {
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
    } else if (characterId === '6_5_1') {
        // 6.5代超特洛克斯C的GIF文件
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
    } else if (characterId === '6_5_2') {
        // 6.5代超特超觉醒雷龙的GIF文件
        commonGifFiles = [
            'X.gif',
            '三分.gif',
            '中手冒.gif',
            '中投.gif',
            '大手冒.gif',
            '小手冒.gif',
            '悠闲起身.gif',
            '抢断.gif',
            '正面防守.gif',
            '篮板.gif',
            '近上.gif',
            '近扣.gif',
            '远上.gif',
            '远扣.gif'
        ];
    } else if (characterId === '7_5_1') {
        // 7.5代超特角色1的GIF文件
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
    } else if (characterId === '3_5_4') {
        // 芙熙的GIF文件（多个动作合在一个gif中）
        commonGifFiles = [
            'X分球地板.gif',
            '小冒大冒篮板.gif',
            '投篮远扣.gif',
            '近扣远上近上.gif'
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
    } else if (characterId.includes('7_') || characterId.includes('8_')) {
        // 7代、8代超特通用GIF文件
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
    
    // 批量检查GIF文件是否存在（优化速度）
    function checkGifFilesBatch() {
        // 将文件分成小批次，每批5个文件
        var batchSize = 5;
        var batches = [];
        for (var i = 0; i < commonGifFiles.length; i += batchSize) {
            batches.push(commonGifFiles.slice(i, i + batchSize));
        }
        
        // 检查每个批次
        function checkBatch(batchIndex) {
            if (batchIndex >= batches.length) {
                // 所有批次检查完成
                createButtons();
                return;
            }
            
            var batch = batches[batchIndex];
            var batchCheckedCount = 0;
            
            // 并行检查当前批次的所有文件
            for (var i = 0; i < batch.length; i++) {
                var file = batch[i];
                var gifUrl = COS_CONFIG.CDNDomain + '/' + cleanFolder + '/' + file + '?v=' + COS_CONFIG.Version;
        console.log('检查GIF文件:', gifUrl);
        
        var img = new Image();
        
                img.onload = function(fileName) {
                    return function() {
                        console.log('✅ GIF文件存在:', fileName);
                        validGifFiles.push(fileName);
                        batchCheckedCount++;
                        if (batchCheckedCount === batch.length) {
                            // 当前批次检查完成，检查下一批次
                            setTimeout(function() {
                                checkBatch(batchIndex + 1);
                            }, 100); // 批次间延迟100ms
                        }
                    };
                }(file);
                
                img.onerror = function(fileName) {
                    return function() {
                        console.log('❌ GIF文件不存在:', fileName);
                        batchCheckedCount++;
                        if (batchCheckedCount === batch.length) {
                            // 当前批次检查完成，检查下一批次
                            setTimeout(function() {
                                checkBatch(batchIndex + 1);
                            }, 100); // 批次间延迟100ms
                        }
                    };
                }(file);
        
        img.src = gifUrl;
            }
        }
        
        // 开始检查第一个批次
        checkBatch(0);
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
            var gifUrl = COS_CONFIG.CDNDomain + '/' + cleanFolder + '/' + file + '?v=' + COS_CONFIG.Version;
            
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
    
    // 开始批量检查文件
    checkGifFilesBatch();
    
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
                    
                    // 显示对应的GIF（优化流量使用）
                    var gifUrl = this.getAttribute('data-gif');
                    var actionName = this.querySelector('span').textContent;
                    
                    // 显示加载提示
                    gifContainer.innerHTML = '<div class="gif-loading"><i class="fas fa-spinner fa-spin"></i><p>加载中...</p></div>';
                    
                    // 延迟加载GIF，减少流量消耗
                    setTimeout(function() {
                        var gifUrlWithCache = gifUrl + (gifUrl.includes('?') ? '&' : '?') + 'v=' + COS_CONFIG.Version;
                        var img = new Image();
                        img.onload = function() {
                            gifContainer.innerHTML = '<img src="' + gifUrlWithCache + '" alt="' + actionName + '" class="action-gif"><p class="action-name">' + actionName + '</p>';
                        };
                        img.onerror = function() {
                            console.error('❌ GIF CDN加载失败');
                            console.error('失败URL:', gifUrlWithCache);
                            console.error('可能的原因:');
                            console.error('1. CORS策略未配置 - 需要在CDN控制台配置跨域访问');
                            console.error('2. SSL证书问题 - 证书未正确绑定到cdn.laofeifs.com');
                            console.error('3. CDN服务异常 - 检查CDN服务状态');
                            console.error('4. GIF文件不存在 - 检查文件路径是否正确');
                            gifContainer.innerHTML = '<div class="gif-error"><i class="fas fa-exclamation-triangle"></i><p>CDN加载失败</p></div>';
                        };
                        img.src = gifUrlWithCache;
                    }, 200);
                    
                    return false; // 阻止页面滚动
                };
            })(actionButtons[i]);
        }
    }
}

// 初始化职业排名功能
function initializeRanking() {
    // 设置职业排名图片路径（添加版本号防止缓存）
    const rankingImages = {
        'c': `${buildImageUrl('ranking/C排名.png')}?v=${COS_CONFIG.Version}`,
        'pf': `${buildImageUrl('ranking/PF排名.png')}?v=${COS_CONFIG.Version}`,
        'pg': `${buildImageUrl('ranking/PG排名.png')}?v=${COS_CONFIG.Version}`
    };
    
    // 加载图片
    Object.keys(rankingImages).forEach(rankingType => {
        const imgElement = document.getElementById(`${rankingType}-ranking-image`);
        if (imgElement) {
            imgElement.src = rankingImages[rankingType];
            imgElement.onerror = function() {
                this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l5PSIxNCIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuacrOWbvjwvdGV4dD4KPC9zdmc+Cg==';
                this.alt = `${rankingType.toUpperCase()}排名 (图片加载失败)`;
            };
            

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

// 超特对比数据
var comparisonData = [
    {
        id: 'comparison_1',
        title: '超特对比',
        description: '超特角色对比图',
        image: 'comparision/超特对比.jpg'
    }
];

// 职业&粉丝套数据
var accountRecommendData = [
    {
        id: 'recommend_1',
        title: '2025FSPL职业套',
        district: 'all',
        image: 'FSPL/微信图片_20251203205632_208.jpg'
    },
    {
        id: 'recommend_2',
        title: '2025FSPL粉丝套',
        district: 'all',
        image: 'FSPL/微信图片_20251203205632_209.jpg'
    }
];

// 老非课程数据
var courseData = [
    {
        id: 'course_1',
        title: 'PG跑位课',
        image: 'class/PG跑位课v1.jpg'
    },
    {
        id: 'course_2',
        title: 'TT综合打法课',
        image: 'class/TT综合打法课v1.jpg'
    },
    {
        id: 'course_3',
        title: '盖帽课',
        image: 'class/盖帽课v1.jpg'
    },
    {
        id: 'course_4',
        title: '碎步合集课',
        image: 'class/碎步合集课v1.jpg'
    },
    {
        id: 'course_5',
        title: '篮板课',
        image: 'class/篮板课v1.jpg'
    },
    {
        id: 'course_6',
        title: '精准传球课',
        image: 'class/精准传球课v1.jpg'
    },
    {
        id: 'course_7',
        title: '跑扣课',
        image: 'class/跑扣课v1.jpg'
    },
    {
        id: 'course_8',
        title: '躲吸与牵制课',
        image: 'class/躲吸与牵制课v1.jpg'
    }
];

// 初始化超特对比功能
function initializeComparison() {
    loadComparisonImages();
}

// 加载超特对比图片
function loadComparisonImages() {
    const comparisonGrid = document.getElementById('comparison-grid');
    if (!comparisonGrid) return;
    
    comparisonGrid.innerHTML = '';
    
    comparisonData.forEach(item => {
        const comparisonItem = document.createElement('div');
        comparisonItem.className = 'comparison-item';
        
        const imageUrl = buildImageUrl(item.image);
        const imageUrlWithTimestamp = `${imageUrl}?v=${COS_CONFIG.Version}`;
        
        comparisonItem.innerHTML = `
            <img src="${imageUrlWithTimestamp}" 
                 alt="${item.title}" 
                 class="comparison-image" 
                 onclick="openFullscreen(this)"
                 onerror="handleImageError(this, '${item.title}')" 
                 onload="handleImageLoad(this, '${item.title}')">
            <div class="comparison-info">
                <h3 class="comparison-title">${item.title}</h3>
                <p class="comparison-description">${item.description}</p>
            </div>
        `;
        
        comparisonGrid.appendChild(comparisonItem);
    });
    
    console.log('超特对比图片已加载');
}

// 初始化职业&粉丝套功能
function initializeAccountRecommend() {
    loadAccountRecommendImages();
}

// 初始化图片模块功能
function initializeImages() {
    loadImages();
}

// 初始化俱乐部功能
function initializeClub() {
    loadClubImage();
}

// 加载俱乐部图片
function loadClubImage() {
    const clubImage = document.getElementById('club-image');
    if (!clubImage) return;
    
    const imagePath = 'club/club1.png';
    const imageUrl = buildImageUrl(imagePath);
    const imageUrlWithTimestamp = `${imageUrl}?v=${COS_CONFIG.Version}`;
    
    clubImage.src = imageUrlWithTimestamp;
    clubImage.alt = '俱乐部';
    
    console.log('俱乐部图片已加载:', imageUrlWithTimestamp);
}

// 加载FS单字图片
function loadFSSingleImage() {
    console.log('=== 开始加载FS单字图片 ===');
    
    // 先检查页面是否可见
    const fsSingleSection = document.getElementById('fs-single-section');
    if (!fsSingleSection) {
        console.error('找不到FS单字页面区域');
        return;
    }
    
    console.log('找到FS单字页面区域，是否激活:', fsSingleSection.classList.contains('active'));
    
    const fsSingleImage = document.getElementById('fs-single-image');
    if (!fsSingleImage) {
        console.error('找不到FS单字图片元素，ID: fs-single-image');
        console.log('尝试查找所有图片元素...');
        const allImages = document.querySelectorAll('img');
        console.log('页面中图片元素数量:', allImages.length);
        // 尝试再次查找
        setTimeout(function() {
            const retryImage = document.getElementById('fs-single-image');
            if (retryImage) {
                console.log('重试找到图片元素');
                loadFSSingleImage();
            } else {
                console.error('重试后仍然找不到图片元素');
            }
        }, 300);
        return;
    }
    
    console.log('✅ 找到FS单字图片元素');
    console.log('图片元素当前src:', fsSingleImage.src);
    
    const imagePath = 'singleworld/single.jpg';
    const imageUrl = buildImageUrl(imagePath);
    const imageUrlWithTimestamp = `${imageUrl}?v=${COS_CONFIG.Version}`;
    
    console.log('图片路径:', imagePath);
    console.log('CDN域名:', COS_CONFIG.CDNDomain);
    console.log('完整图片URL:', imageUrlWithTimestamp);
    
    // 检查图片是否已经有src且相同
    if (fsSingleImage.src && fsSingleImage.src.includes('single.jpg')) {
        console.log('图片已有src，但重新加载以确保显示');
    }
    
    // 强制设置图片src
    fsSingleImage.src = '';
    fsSingleImage.src = imageUrlWithTimestamp;
    fsSingleImage.alt = 'FS单字';
    
    console.log('已设置图片src为:', imageUrlWithTimestamp);
    
    // 添加错误处理
    fsSingleImage.onerror = function(e) {
        console.error('❌ FS单字图片加载失败');
        console.error('错误事件:', e);
        console.error('图片URL:', imageUrlWithTimestamp);
        console.error('当前src:', fsSingleImage.src);
        console.error('可能的原因:');
        console.error('1. 图片路径不正确 - 请检查COS中路径是否为 singleworld/single.jpg');
        console.error('2. CDN配置问题 - 请检查CDN是否正确配置');
        console.error('3. 跨域问题 - 请检查CORS配置');
        console.error('4. 图片权限问题 - 请检查COS访问权限');
    };
    
    fsSingleImage.onload = function() {
        console.log('✅ FS单字图片加载成功！');
        console.log('图片URL:', imageUrlWithTimestamp);
        console.log('图片尺寸:', fsSingleImage.naturalWidth, 'x', fsSingleImage.naturalHeight);
    };
    
    console.log('=== FS单字图片加载函数执行完成 ===');
}

// 加载职业&粉丝套图片
function loadAccountRecommendImages(selectedDistrict = 'all') {
    const recommendGrid = document.getElementById('recommend-grid');
    if (!recommendGrid) return;
    
    recommendGrid.innerHTML = '';
    
    // 显示所有职业&粉丝套图片
    accountRecommendData.forEach(item => {
        const recommendItem = document.createElement('div');
        recommendItem.className = 'recommend-item';
        
        const imageUrl = buildImageUrl(item.image);
        const imageUrlWithTimestamp = `${imageUrl}?v=${COS_CONFIG.Version}`;
        
        recommendItem.innerHTML = `
            <img src="${imageUrlWithTimestamp}" 
                 alt="${item.title}" 
                 class="recommend-image" 
                 oncontextmenu="handleLongPress(event, this)"
                 onerror="handleImageError(this, '${item.title}')" 
                 onload="handleImageLoad(this, '${item.title}')">
        `;
        
        recommendGrid.appendChild(recommendItem);
    });
    
    // 为职业&粉丝套图片添加触摸事件监听器（减少重复绑定）
    setTimeout(function() {
        addTouchListenersToRecommendImages();
    }, 500);
    
    console.log(`职业&粉丝套图片已加载，共${accountRecommendData.length}张图片`);
}

// 加载老非课程页面
function loadImages() {
    const imagesGrid = document.getElementById('images-grid');
    if (!imagesGrid) return;
    
    imagesGrid.innerHTML = '';
    
    // 创建课程按钮区域
    const courseButtonsContainer = document.createElement('div');
    courseButtonsContainer.className = 'course-buttons-container';
    
    // 创建合集按钮
    const collectionButton = document.createElement('button');
    collectionButton.className = 'course-btn collection-btn';
    collectionButton.innerHTML = `
        <i class="fas fa-th-large"></i>
        <span>查看合集</span>
    `;
    collectionButton.onclick = () => showCourseCollection();
    courseButtonsContainer.appendChild(collectionButton);
    
    // 创建单个课程按钮
    courseData.forEach(course => {
        const courseButton = document.createElement('button');
        courseButton.className = 'course-btn';
        courseButton.setAttribute('data-course-id', course.id);
        courseButton.innerHTML = `
            <i class="fas fa-play-circle"></i>
            <span>${course.title}</span>
        `;
        courseButton.onclick = () => showSingleCourse(course);
        courseButtonsContainer.appendChild(courseButton);
    });
    
    imagesGrid.appendChild(courseButtonsContainer);
    
    // 创建课程显示区域
    const courseDisplayArea = document.createElement('div');
    courseDisplayArea.id = 'course-display-area';
    courseDisplayArea.className = 'course-display-area';
    courseDisplayArea.style.display = 'none';
    
    imagesGrid.appendChild(courseDisplayArea);
    
    // 为图片添加触摸事件监听器（减少重复绑定）
    setTimeout(function() {
        addTouchListenersToImages();
    }, 5000);
    
    console.log('图片模块图片已加载');
}

// 打开全屏图片显示
function openFullscreen(imgElement) {
    if (!imgElement) return;
    
    const src = imgElement.src;
    const alt = imgElement.alt;
    showFullscreenImage(src, alt);
}

// 打开全屏图片显示（不旋转）
function openFullscreenNoRotate(imgElement) {
    if (!imgElement) return;
    
    const src = imgElement.src;
    const alt = imgElement.alt;
    showFullscreenImageNoRotate(src, alt);
}

// 显示全屏图片
function showFullscreenImage(src, alt) {
    const overlay = document.getElementById('fullscreen-overlay');
    const fullscreenImg = document.getElementById('fullscreen-image');
    
    if (overlay && fullscreenImg) {
        fullscreenImg.src = src;
        fullscreenImg.alt = alt;
        
        // 自动添加旋转类，让图片旋转90度显示
        fullscreenImg.classList.add('rotated');
        
        // 重置缩放状态
        fullscreenImg.style.transform = 'rotate(-90deg) scale(1)';
        fullscreenImg.style.transformOrigin = 'center center';
        
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
        
        // 初始化缩放功能
        initializeImageZoom(fullscreenImg);
    }
}

// 显示全屏图片（不旋转）
function showFullscreenImageNoRotate(src, alt) {
    const overlay = document.getElementById('fullscreen-overlay');
    const fullscreenImg = document.getElementById('fullscreen-image');
    
    if (overlay && fullscreenImg) {
        fullscreenImg.src = src;
        fullscreenImg.alt = alt;
        
        // 不添加旋转类，保持原始角度
        fullscreenImg.classList.remove('rotated');
        
        // 重置缩放状态
        fullscreenImg.style.transform = 'scale(1)';
        fullscreenImg.style.transformOrigin = 'center center';
        
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
        
        // 初始化缩放功能
        initializeImageZoom(fullscreenImg);
    }
}

// 关闭全屏显示
function closeFullscreen() {
    const overlay = document.getElementById('fullscreen-overlay');
    const fullscreenImg = document.getElementById('fullscreen-image');
    
    if (overlay) {
        overlay.style.display = 'none';
        // 恢复页面滚动
        document.body.style.overflow = 'auto';
        
        // 重置图片状态
        if (fullscreenImg) {
            fullscreenImg.classList.remove('rotated');
            // 重置缩放状态
            fullscreenImg.style.transform = '';
            fullscreenImg.style.transformOrigin = '';
        }
        
        // 移除历史记录
        if (history.state && history.state.fullscreen) {
            history.back();
        }
    }
}


// 打开课程链接
function openCourse(url) {
    console.log('尝试打开课程链接:', url);
    
    try {
        // 检测是否在微信浏览器中
        if (/MicroMessenger/i.test(navigator.userAgent)) {
            console.log('在微信浏览器中，使用微信内置浏览器打开');
            // 微信浏览器中，尝试使用微信内置浏览器打开
            window.location.href = url;
        } else {
            console.log('在普通浏览器中，新窗口打开');
            // 其他浏览器，直接打开
            const newWindow = window.open(url, '_blank');
            if (!newWindow) {
                console.log('弹窗被阻止，尝试直接跳转');
                window.location.href = url;
            }
        }
    } catch (error) {
        console.error('打开课程链接失败:', error);
        // 如果所有方法都失败，显示提示
        alert('无法打开课程链接，请手动复制链接到浏览器中打开');
    }
}


// 打开店铺
function openStore() {
    const storeUrl = 'https://weidian.com/?userid=1797658216&wfr=wx&sfr=app&source=home_shop';
    
    // 检测是否在微信浏览器中
    if (/MicroMessenger/i.test(navigator.userAgent)) {
        // 微信浏览器中，尝试使用微信内置浏览器打开
        window.location.href = storeUrl;
    } else {
        // 其他浏览器，直接打开
        window.open(storeUrl, '_blank');
    }
}



// 初始化全屏显示功能
function initializeFullscreen() {
    const overlay = document.getElementById('fullscreen-overlay');
    if (!overlay) return;
    
    // 移除点击背景关闭功能，避免误触
    // 只保留关闭按钮和ESC键关闭功能
    
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
    
    console.log('全屏显示功能已初始化');
}

// 分享功能
function toggleShareMenu() {
    const shareMenu = document.getElementById('share-menu');
    if (shareMenu) {
        shareMenu.classList.toggle('show');
    }
}

// 分享到微信
function shareToWeChat() {
    const currentUrl = window.location.href;
    const shareTitle = '老非FS资料库 - 街头篮球超特角色大全';
    const shareDesc = '包含1-9代超特角色介绍、动作展示、职业排名等完整资料';
    
    // 检测是否在微信浏览器中
    if (/MicroMessenger/i.test(navigator.userAgent)) {
        // 在微信中，显示提示信息
        alert('请点击右上角菜单，选择"发送给朋友"或"分享到朋友圈"');
    } else {
        // 不在微信中，尝试调用微信分享API
        if (typeof WeixinJSBridge !== 'undefined') {
            WeixinJSBridge.invoke('sendAppMessage', {
                'appid': '',
                'img_url': 'https://cdn.laofeifs.com/gallery/超特图鉴.png',
                'img_width': '200',
                'img_height': '200',
                'link': currentUrl,
                'desc': shareDesc,
                'title': shareTitle
            });
        } else {
            // 降级处理：复制链接到剪贴板
            copyLink();
        }
    }
    
    // 关闭分享菜单
    const shareMenu = document.getElementById('share-menu');
    if (shareMenu) {
        shareMenu.classList.remove('show');
    }
}

// 复制链接
function copyLink() {
    const currentUrl = window.location.href;
    
    if (navigator.clipboard && window.isSecureContext) {
        // 使用现代 Clipboard API
        navigator.clipboard.writeText(currentUrl).then(function() {
            showToast('链接已复制到剪贴板');
        }).catch(function() {
            fallbackCopyTextToClipboard(currentUrl);
        });
    } else {
        // 降级处理
        fallbackCopyTextToClipboard(currentUrl);
    }
    
    // 关闭分享菜单
    const shareMenu = document.getElementById('share-menu');
    if (shareMenu) {
        shareMenu.classList.remove('show');
    }
}

// 降级复制方法
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showToast('链接已复制到剪贴板');
        } else {
            showToast('复制失败，请手动复制链接');
        }
    } catch (err) {
        showToast('复制失败，请手动复制链接');
    }
    
    document.body.removeChild(textArea);
}

// 显示提示信息
function showToast(message) {
    // 创建提示元素
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 10000;
        transition: all 0.3s ease;
    `;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // 2秒后移除
    setTimeout(function() {
        toast.style.opacity = '0';
        setTimeout(function() {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 2000);
}

// 初始化分享功能
function initializeShare() {
    // 点击外部区域关闭分享菜单
    document.addEventListener('click', function(e) {
        const shareFloat = document.getElementById('share-float');
        const shareMenu = document.getElementById('share-menu');
        
        if (shareFloat && shareMenu && !shareFloat.contains(e.target)) {
            shareMenu.classList.remove('show');
        }
    });
    
    console.log('分享功能已初始化');
}

// 初始化图片缩放功能
function initializeImageZoom(imgElement) {
    if (!imgElement) return;
    
    let scale = 1;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let translateX = 0;
    let translateY = 0;
    let lastDistance = 0;
    
    // 重置状态
    scale = 1;
    translateX = 0;
    translateY = 0;
    updateTransform();
    
    // 触摸开始
    imgElement.addEventListener('touchstart', function(e) {
        if (e.touches.length === 1) {
            // 单指拖拽
            isDragging = true;
            startX = e.touches[0].clientX - translateX;
            startY = e.touches[0].clientY - translateY;
        } else if (e.touches.length === 2) {
            // 双指缩放
            isDragging = false;
            const distance = getDistance(e.touches[0], e.touches[1]);
            lastDistance = distance;
        }
        e.preventDefault();
    });
    
    // 触摸移动
    imgElement.addEventListener('touchmove', function(e) {
        e.preventDefault();
        
        if (e.touches.length === 1 && isDragging) {
            // 单指拖拽
            translateX = e.touches[0].clientX - startX;
            translateY = e.touches[0].clientY - startY;
            updateTransform();
        } else if (e.touches.length === 2) {
            // 双指缩放
            isDragging = false;
            const distance = getDistance(e.touches[0], e.touches[1]);
            const scaleChange = distance / lastDistance;
            scale *= scaleChange;
            
            // 限制缩放范围
            scale = Math.max(0.5, Math.min(scale, 5));
            
            lastDistance = distance;
            updateTransform();
        }
    });
    
    // 触摸结束
    imgElement.addEventListener('touchend', function(e) {
        isDragging = false;
        
        // 如果缩放小于1，自动回到1
        if (scale < 1) {
            scale = 1;
            translateX = 0;
            translateY = 0;
            updateTransform();
        }
    });
    
    // 鼠标滚轮缩放（桌面端）
    imgElement.addEventListener('wheel', function(e) {
        e.preventDefault();
        
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        scale *= delta;
        scale = Math.max(0.5, Math.min(scale, 5));
        
        updateTransform();
    });
    
    // 更新变换
    function updateTransform() {
        const currentTransform = imgElement.style.transform;
        let baseTransform = '';
        
        // 保持原有的旋转
        if (currentTransform.includes('rotate')) {
            const rotateMatch = currentTransform.match(/rotate\([^)]+\)/);
            if (rotateMatch) {
                baseTransform = rotateMatch[0] + ' ';
            }
        }
        
        imgElement.style.transform = baseTransform + `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
    }
    
    // 计算两点间距离
    function getDistance(touch1, touch2) {
        const dx = touch1.clientX - touch2.clientX;
        const dy = touch1.clientY - touch2.clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }
}

// 长按检测变量
let longPressTimer = null;
let longPressStartTime = 0;
let isLongPress = false;
let touchStartX = 0;
let touchStartY = 0;

// 处理图片点击事件（已移除，仅保留长按功能）

// 处理长按事件
function handleLongPress(event, imgElement) {
    event.preventDefault();
    
    console.log('长按事件触发，显示扫描选项');
    
    // 显示长按提示
    showToast('长按功能：可以扫描图片中的二维码');
    
    // 在移动端，可以尝试调用系统相机扫描二维码
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // 移动端提示用户使用相机扫描
        setTimeout(function() {
            showToast('请使用相机应用扫描图片中的二维码');
        }, 1500);
    }
}

// 为职业&粉丝套图片添加触摸事件监听器
function addTouchListenersToRecommendImages() {
    const recommendImages = document.querySelectorAll('.recommend-image');
    
    console.log('找到职业&粉丝套图片数量:', recommendImages.length);
    
    recommendImages.forEach(function(img, index) {
        console.log('为图片', index, '添加触摸事件监听器');
        
        // 清除之前的事件监听器（如果有的话）
        img.removeEventListener('touchstart', handleTouchStart);
        img.removeEventListener('touchmove', handleTouchMove);
        img.removeEventListener('touchend', handleTouchEnd);
        
        // 触摸开始
        img.addEventListener('touchstart', handleTouchStart, { passive: false });
        
        // 触摸移动
        img.addEventListener('touchmove', handleTouchMove, { passive: true });
        
        // 触摸结束
        img.addEventListener('touchend', handleTouchEnd, { passive: true });
    });
}

// 为图片模块图片添加触摸事件监听器
function addTouchListenersToImages() {
    const images = document.querySelectorAll('.image-display');
    
    console.log('找到图片模块图片数量:', images.length);
    
    images.forEach(function(img, index) {
        console.log('为图片模块图片', index, '添加触摸事件监听器');
        
        // 清除之前的事件监听器（如果有的话）
        img.removeEventListener('touchstart', handleTouchStart);
        img.removeEventListener('touchmove', handleTouchMove);
        img.removeEventListener('touchend', handleTouchEnd);
        
        // 触摸开始
        img.addEventListener('touchstart', handleTouchStart, { passive: false });
        
        // 触摸移动
        img.addEventListener('touchmove', handleTouchMove, { passive: true });
        
        // 触摸结束
        img.addEventListener('touchend', handleTouchEnd, { passive: true });
    });
}

// 触摸开始处理函数
function handleTouchStart(e) {
    console.log('触摸开始');
    longPressStartTime = Date.now();
    isLongPress = false;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    
    // 设置长按定时器（600毫秒后触发长按，提高响应速度）
    longPressTimer = setTimeout(function() {
        console.log('触发长按');
        isLongPress = true;
        handleLongPress(e, e.target);
    }, 600);
}

// 触摸移动处理函数
function handleTouchMove(e) {
    // 如果移动距离过大，取消长按
    if (e.touches.length > 0) {
        const deltaX = Math.abs(e.touches[0].clientX - touchStartX);
        const deltaY = Math.abs(e.touches[0].clientY - touchStartY);
        
        if (deltaX > 10 || deltaY > 10) {
            console.log('移动距离过大，取消长按');
            if (longPressTimer) {
                clearTimeout(longPressTimer);
                longPressTimer = null;
            }
            isLongPress = false;
        }
    }
}

// 触摸结束处理函数
function handleTouchEnd(e) {
    console.log('触摸结束');
    const touchDuration = Date.now() - longPressStartTime;
    
    // 清除长按定时器
    if (longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
    }
    
    // 如果触摸时间超过600毫秒，说明是长按
    if (touchDuration >= 600 && isLongPress) {
        console.log('确认长按事件');
        // 长按事件已在handleLongPress中处理
        return;
    }
}

// 最新活动跳转函数
function openFSPLActivity() {
    try {
        // 最新活动页面URL
        const fsplUrl = 'https://www.fsjoy.com/news.html?newsTypeStr=894362&id=121524';
        
        // 检测设备类型
        const isMobile = /Mobile|Android|iPhone|iPad/.test(navigator.userAgent);
        const isWeChat = /MicroMessenger/i.test(navigator.userAgent);
        
        console.log('最新活动跳转 - 设备检测:', {isMobile, isWeChat});
        
        if (isMobile || isWeChat) {
            // 移动端和微信浏览器直接跳转
            console.log('移动端跳转到:', fsplUrl);
            window.location.href = fsplUrl;
        } else {
            // 桌面端在新标签页打开
            console.log('桌面端新标签页打开:', fsplUrl);
            window.open(fsplUrl, '_blank', 'noopener,noreferrer');
        }
    } catch (error) {
        console.error('最新活动跳转失败:', error);
        // 备用跳转方案
        window.location.href = 'https://www.fsjoy.com/news.html?newsTypeStr=894362&id=121524';
    }
}

// 确保函数在全局作用域中可用
window.openFSPLActivity = openFSPLActivity;

// 显示单个课程
function showSingleCourse(course) {
    const displayArea = document.getElementById('course-display-area');
    if (!displayArea) return;
    
    // 移除所有按钮的选中状态
    const allButtons = document.querySelectorAll('.course-btn');
    allButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // 为当前选中的按钮添加选中状态
    const currentButton = document.querySelector(`[data-course-id="${course.id}"]`);
    if (currentButton) {
        currentButton.classList.add('active');
    }
    
    const imageUrl = buildImageUrl(course.image);
    const imageUrlWithTimestamp = `${imageUrl}?v=${COS_CONFIG.Version}`;
    
    displayArea.innerHTML = `
        <div class="course-access-tip">
            <i class="fas fa-info-circle"></i>
            <span>长按图片扫码➡️点击继续访问即可看课</span>
        </div>
        <div class="single-course-display">
            <h3 class="course-title">${course.title}</h3>
            <img src="${imageUrlWithTimestamp}" 
                 alt="${course.title}" 
                 class="course-image" 
                 oncontextmenu="handleLongPress(event, this)"
                 onerror="handleImageError(this, '${course.title}')" 
                 onload="handleImageLoad(this, '${course.title}')">
            <div class="image-scan-tip">
                <i class="fas fa-qrcode"></i>
                <span>长按图片扫描二维码</span>
            </div>
        </div>
        <div class="contact-tip">
            <div class="contact-info">
                <i class="fas fa-info-circle"></i>
                <span>若无法观看联系老非微信：</span>
                <span class="wechat-number" onclick="copyWechatNumber('laofei90186')">laofei90186</span>
                <button class="copy-wechat-btn" onclick="copyWechatNumber('laofei90186')">
                    <i class="fas fa-copy"></i>
                    <span>点击复制</span>
                </button>
            </div>
        </div>
    `;
    
    displayArea.style.display = 'block';
}

// 显示课程合集
function showCourseCollection() {
    const displayArea = document.getElementById('course-display-area');
    if (!displayArea) return;
    
    // 移除所有按钮的选中状态
    const allButtons = document.querySelectorAll('.course-btn');
    allButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // 为合集按钮添加选中状态
    const collectionButton = document.querySelector('.collection-btn');
    if (collectionButton) {
        collectionButton.classList.add('active');
    }
    
    let coursesHtml = `
        <div class="course-access-tip">
            <i class="fas fa-info-circle"></i>
            <span>长按图片扫码➡️点击继续访问即可看课</span>
        </div>
        <div class="course-collection">
            <h3 class="collection-title">老非课程合集</h3>
            <div class="collection-grid">
    `;
    
    courseData.forEach(course => {
        const imageUrl = buildImageUrl(course.image);
        const imageUrlWithTimestamp = `${imageUrl}?v=${COS_CONFIG.Version}`;
        
        coursesHtml += `
            <div class="collection-item">
                <h4 class="course-name">${course.title}</h4>
                <img src="${imageUrlWithTimestamp}" 
                     alt="${course.title}" 
                     class="collection-image" 
                     oncontextmenu="handleLongPress(event, this)"
                     onerror="handleImageError(this, '${course.title}')" 
                     onload="handleImageLoad(this, '${course.title}')">
                <div class="collection-scan-tip">
                    <i class="fas fa-qrcode"></i>
                    <span>长按图片扫描二维码</span>
                </div>
            </div>
        `;
    });
    
    coursesHtml += `
            </div>
        </div>
        <div class="contact-tip">
            <div class="contact-info">
                <i class="fas fa-info-circle"></i>
                <span>若无法观看联系老非微信：</span>
                <span class="wechat-number" onclick="copyWechatNumber('laofei90186')">laofei90186</span>
                <button class="copy-wechat-btn" onclick="copyWechatNumber('laofei90186')">
                    <i class="fas fa-copy"></i>
                    <span>点击复制</span>
                </button>
            </div>
        </div>
    `;
    
    displayArea.innerHTML = coursesHtml;
    displayArea.style.display = 'block';
}

// 复制微信号函数
function copyWechatNumber(wechatNumber) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(wechatNumber).then(() => {
            showCopySuccess();
        }).catch(() => {
            fallbackCopyTextToClipboard(wechatNumber);
        });
    } else {
        fallbackCopyTextToClipboard(wechatNumber);
    }
}

// 备用复制方法
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
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
    const tip = document.createElement('div');
    tip.className = 'copy-success-tip';
    tip.innerHTML = '<i class="fas fa-check"></i> 微信号已复制';
    tip.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #4CAF50;
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        z-index: 10000;
        font-size: 14px;
    `;
    
    document.body.appendChild(tip);
    
    setTimeout(() => {
        document.body.removeChild(tip);
    }, 2000);
}

// 显示复制失败提示
function showCopyError() {
    const tip = document.createElement('div');
    tip.className = 'copy-error-tip';
    tip.innerHTML = '<i class="fas fa-exclamation-triangle"></i> 复制失败，请手动复制';
    tip.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #f44336;
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        z-index: 10000;
        font-size: 14px;
    `;
    
    document.body.appendChild(tip);
    
    setTimeout(() => {
        document.body.removeChild(tip);
    }, 3000);
}

// 导出函数供外部使用
window.FSDataLibrary = {
    loadCharacters,
    uploadToCOS,
    getCOSFileList,
    loadGifFiles,
    COS_CONFIG,
    openFSPLActivity,
    showSingleCourse,
    showCourseCollection,
    copyWechatNumber
};

