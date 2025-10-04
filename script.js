// 腾讯云COS配置
var COS_CONFIG = {
    // 这里需要你填入你的腾讯云COS配置信息
    SecretId: 'YOUR_SECRET_ID',
    SecretKey: 'YOUR_SECRET_KEY',
    Bucket: 'laofei-1259209256',
    Region: 'ap-nanjing', // 南京地域
    
    // COS访问域名
    Domain: 'https://laofei-1259209256.cos.ap-nanjing.myqcloud.com',
};

// 当前选中的代次
var currentGeneration = '9';

// 图片URL构建函数
function buildImageUrl(imagePath) {
    return COS_CONFIG.Domain + '/' + imagePath;
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
            name: '浩燃',
            generation: '3.5代超特',
            description: '三点五代超特角色',
            image: 'characters/3.5代超特/浩燃.png',
            gifFolder: 'gifs/3.5代超特/浩燃/'
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
    '6_5': [
        {
            id: '6_5_1',
            name: '洛克斯C',
            generation: '6.5代超特',
            description: '六点五代超特角色',
            image: 'characters/6.5代超特/洛克斯C.png',
            gifFolder: 'gifs/6.5代超特/洛克斯C/'
        },
        {
            id: '6_5_2',
            name: '超觉醒雷龙',
            generation: '6.5代超特',
            description: '六点五代超特角色',
            image: 'characters/6.5代超特/超觉醒雷龙.png',
            gifFolder: 'gifs/6.5代超特/超觉醒雷龙/'
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
    '7_5': [
        {
            id: '7_5_1',
            name: '洛克斯PG',
            generation: '7.5代超特',
            description: '七点五代超特角色',
            image: 'characters/7.5代超特/洛克斯PG.png',
            gifFolder: 'gifs/7.5代超特/洛克斯PG/'
        }
    ],
    '9': [
        {
            id: '9_1',
            name: '亚琪',
            generation: '9代超特',
            description: '九代超特角色',
            image: 'characters/9代超特/亚琪.png',
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
            name: '亚克',
            generation: '9代超特',
            description: '九代超特角色',
            image: 'characters/9代超特/亚克.png',
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
            id: '9_3',
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
        },
        {
            id: '9_4',
            name: '艾迪',
            generation: '9代超特',
            description: '九代超特角色',
            image: 'characters/9代超特/艾迪.png',
            actions: [
                { name: '不看人传球', gif: 'gifs/9代超特/艾迪艾薇/不看人传球.gif' },
                { name: '大手冒', gif: 'gifs/9代超特/艾迪艾薇/大手冒.gif' },
                { name: '地板', gif: 'gifs/9代超特/艾迪艾薇/地板.gif' },
                { name: '快速起来', gif: 'gifs/9代超特/艾迪艾薇/快速起来.gif' },
                { name: '篮板', gif: 'gifs/9代超特/艾迪艾薇/篮板.gif' },
                { name: '抢断', gif: 'gifs/9代超特/艾迪艾薇/抢断.gif' },
                { name: '小手冒', gif: 'gifs/9代超特/艾迪艾薇/小手冒.gif' },
                { name: '中手冒', gif: 'gifs/9代超特/艾迪艾薇/中手冒.gif' },
                { name: 'A分球', gif: 'gifs/9代超特/艾迪艾薇/A分球.gif' },
                { name: 'A近扣', gif: 'gifs/9代超特/艾迪艾薇/A近扣.gif' },
                { name: 'A近上', gif: 'gifs/9代超特/艾迪艾薇/A近上.gif' },
                { name: 'A篮板', gif: 'gifs/9代超特/艾迪艾薇/A篮板.gif' },
                { name: 'A三分', gif: 'gifs/9代超特/艾迪艾薇/A三分.gif' },
                { name: 'A远扣', gif: 'gifs/9代超特/艾迪艾薇/A远扣.gif' },
                { name: 'A远上', gif: 'gifs/9代超特/艾迪艾薇/A远上.gif' },
                { name: 'A中投', gif: 'gifs/9代超特/艾迪艾薇/A中投.gif' },
                { name: 'B分球', gif: 'gifs/9代超特/艾迪艾薇/B分球.gif' },
                { name: 'B近扣', gif: 'gifs/9代超特/艾迪艾薇/B近扣.gif' },
                { name: 'B近上', gif: 'gifs/9代超特/艾迪艾薇/B近上.gif' },
                { name: 'B篮板', gif: 'gifs/9代超特/艾迪艾薇/B篮板.gif' },
                { name: 'B三分', gif: 'gifs/9代超特/艾迪艾薇/B三分.gif' },
                { name: 'B远扣', gif: 'gifs/9代超特/艾迪艾薇/B远扣.gif' },
                { name: 'B远上', gif: 'gifs/9代超特/艾迪艾薇/B远上.gif' },
                { name: 'B中投', gif: 'gifs/9代超特/艾迪艾薇/B中投.gif' },
                { name: 'X', gif: 'gifs/9代超特/艾迪艾薇/X.gif' }
            ]
        },
        {
            id: '9_5',
            name: '艾薇',
            generation: '9代超特',
            description: '九代超特角色',
            image: 'characters/9代超特/艾薇.png',
            actions: [
                { name: '不看人传球', gif: 'gifs/9代超特/艾迪艾薇/不看人传球.gif' },
                { name: '大手冒', gif: 'gifs/9代超特/艾迪艾薇/大手冒.gif' },
                { name: '地板', gif: 'gifs/9代超特/艾迪艾薇/地板.gif' },
                { name: '快速起来', gif: 'gifs/9代超特/艾迪艾薇/快速起来.gif' },
                { name: '篮板', gif: 'gifs/9代超特/艾迪艾薇/篮板.gif' },
                { name: '抢断', gif: 'gifs/9代超特/艾迪艾薇/抢断.gif' },
                { name: '小手冒', gif: 'gifs/9代超特/艾迪艾薇/小手冒.gif' },
                { name: '中手冒', gif: 'gifs/9代超特/艾迪艾薇/中手冒.gif' },
                { name: 'A分球', gif: 'gifs/9代超特/艾迪艾薇/A分球.gif' },
                { name: 'A近扣', gif: 'gifs/9代超特/艾迪艾薇/A近扣.gif' },
                { name: 'A近上', gif: 'gifs/9代超特/艾迪艾薇/A近上.gif' },
                { name: 'A篮板', gif: 'gifs/9代超特/艾迪艾薇/A篮板.gif' },
                { name: 'A三分', gif: 'gifs/9代超特/艾迪艾薇/A三分.gif' },
                { name: 'A远扣', gif: 'gifs/9代超特/艾迪艾薇/A远扣.gif' },
                { name: 'A远上', gif: 'gifs/9代超特/艾迪艾薇/A远上.gif' },
                { name: 'A中投', gif: 'gifs/9代超特/艾迪艾薇/A中投.gif' },
                { name: 'B分球', gif: 'gifs/9代超特/艾迪艾薇/B分球.gif' },
                { name: 'B近扣', gif: 'gifs/9代超特/艾迪艾薇/B近扣.gif' },
                { name: 'B近上', gif: 'gifs/9代超特/艾迪艾薇/B近上.gif' },
                { name: 'B篮板', gif: 'gifs/9代超特/艾迪艾薇/B篮板.gif' },
                { name: 'B三分', gif: 'gifs/9代超特/艾迪艾薇/B三分.gif' },
                { name: 'B远扣', gif: 'gifs/9代超特/艾迪艾薇/B远扣.gif' },
                { name: 'B远上', gif: 'gifs/9代超特/艾迪艾薇/B远上.gif' },
                { name: 'B中投', gif: 'gifs/9代超特/艾迪艾薇/B中投.gif' },
                { name: 'X', gif: 'gifs/9代超特/艾迪艾薇/X.gif' }
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



// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM加载完成');
    
    // 禁用自动刷新功能，避免无限循环
    console.log('自动刷新功能已禁用');
    
    // 设置页面稳定标志，防止重复刷新
    setTimeout(function() {
        sessionStorage.setItem('fs_page_stable', 'true');
    }, 3000);
    
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
    }, 15000);
    
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
        
        console.log('6.5. 初始化账号推荐');
        // 初始化账号推荐功能
        initializeAccountRecommend();
        
        console.log('6.6. 初始化图片模块');
        // 初始化图片模块功能
        initializeImages();
        
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
        navButtons[i].addEventListener('click', function() {
            // 移除所有活动状态
            for (var j = 0; j < navButtons.length; j++) {
                navButtons[j].classList.remove('active');
            }
            // 添加当前活动状态
            this.classList.add('active');
            
            // 切换内容区域
            var section = this.getAttribute('data-section');
            
            // 正常切换内容区域
            switchSection(section);
        });
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
        // 首页时隐藏content-area
        contentArea.classList.remove('active');
    } else {
        // 其他页面显示content-area
        contentArea.classList.add('active');
    }
    
    // 显示选中的内容区域
    const targetSection = document.getElementById(sectionName + '-section');
    if (targetSection) {
        targetSection.classList.add('active');
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
    // 更新桌面端导航按钮状态
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
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
        item.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            switchToSection(section);
        });
    });
    
    // 点击页面其他地方关闭菜单
    document.addEventListener('click', function(e) {
        const mobileNav = document.querySelector('.mobile-nav');
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        
        if (mobileNav && mobileMenuToggle && 
            !mobileNav.contains(e.target) && 
            !mobileMenuToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });
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
        
        // 所有设备都添加时间戳避免缓存问题
        imageUrl += '?t=' + new Date().getTime();
        console.log('添加时间戳后的URL:', imageUrl);
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
                    
                    // 显示对应的GIF
                    var gifUrl = this.getAttribute('data-gif');
                    var actionName = this.querySelector('span').textContent;
                    var gifUrlWithCache = gifUrl + (gifUrl.includes('?') ? '&' : '?') + 'refresh=' + Date.now();
                    gifContainer.innerHTML = '<img src="' + gifUrlWithCache + '" alt="' + actionName + '" class="action-gif"><p class="action-name">' + actionName + '</p>';
                    
                    return false; // 阻止页面滚动
                };
            })(actionButtons[i]);
        }
    } else if (character.gifFolder) {
        // 8代超特动态加载GIF文件
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
    
    // 构建图片URL（使用CDN优化）
    const imageUrl = galleryData.image ? buildImageUrl(galleryData.image) : '';
    console.log('图鉴图片URL:', imageUrl);
    
    // 添加时间戳避免缓存问题
    const imageUrlWithTimestamp = imageUrl ? `${imageUrl}?t=${Date.now()}` : '';
    console.log('带时间戳的图鉴图片URL:', imageUrlWithTimestamp);
    
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
    
    // 检查每个GIF文件是否存在
    function checkGifFile(file, index) {
        // 正确构建URL路径
        var gifUrl = COS_CONFIG.Domain + '/' + cleanFolder + '/' + file + '?v=' + Date.now() + '&t=' + Math.random();
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
            var gifUrl = COS_CONFIG.Domain + '/' + cleanFolder + '/' + file + '?v=' + Date.now() + '&t=' + Math.random();
            
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
                    
                    // 显示对应的GIF
                    var gifUrl = this.getAttribute('data-gif');
                    var actionName = this.querySelector('span').textContent;
                    var gifUrlWithCache = gifUrl + (gifUrl.includes('?') ? '&' : '?') + 'refresh=' + Date.now();
                    gifContainer.innerHTML = '<img src="' + gifUrlWithCache + '" alt="' + actionName + '" class="action-gif"><p class="action-name">' + actionName + '</p>';
                    
                    return false; // 阻止页面滚动
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
        'c': `${buildImageUrl('ranking/C排名.png')}?v=${timestamp}`,
        'pf': `${buildImageUrl('ranking/PF排名.png')}?v=${timestamp}`,
        'pg': `${buildImageUrl('ranking/PG排名.png')}?v=${timestamp}`
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

// 账号推荐数据
var accountRecommendData = [
    {
        id: 'recommend_1',
        title: '账号推荐1',
        image: 'accountrec/账号推荐1.jpg'
    },
    {
        id: 'recommend_2',
        title: '账号推荐2',
        image: 'accountrec/账号推荐2.jpg'
    }
];

// 图片模块数据
var imagesData = [
    {
        id: 'image_1',
        title: '课程二维码',
        image: 'class/课程二维码.jpg'
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
        const imageUrlWithTimestamp = `${imageUrl}?t=${Date.now()}`;
        
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

// 初始化账号推荐功能
function initializeAccountRecommend() {
    loadAccountRecommendImages();
}

// 初始化图片模块功能
function initializeImages() {
    loadImages();
}

// 加载账号推荐图片
function loadAccountRecommendImages() {
    const recommendGrid = document.getElementById('recommend-grid');
    if (!recommendGrid) return;
    
    recommendGrid.innerHTML = '';
    
    accountRecommendData.forEach(item => {
        const recommendItem = document.createElement('div');
        recommendItem.className = 'recommend-item';
        
        const imageUrl = buildImageUrl(item.image);
        const imageUrlWithTimestamp = `${imageUrl}?v=${Date.now()}&t=${Math.random()}`;
        
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
    
    // 为账号推荐图片添加触摸事件监听器
    setTimeout(function() {
        addTouchListenersToRecommendImages();
    }, 300);
    
    // 再次尝试绑定（防止第一次失败）
    setTimeout(function() {
        addTouchListenersToRecommendImages();
    }, 800);
    
    // 第三次尝试绑定（确保成功）
    setTimeout(function() {
        addTouchListenersToRecommendImages();
    }, 1500);
    
    console.log('账号推荐图片已加载');
}

// 加载图片模块图片
function loadImages() {
    const imagesGrid = document.getElementById('images-grid');
    if (!imagesGrid) return;
    
    imagesGrid.innerHTML = '';
    
    imagesData.forEach(item => {
        const imageItem = document.createElement('div');
        imageItem.className = 'image-item';
        
        const imageUrl = buildImageUrl(item.image);
        const imageUrlWithTimestamp = `${imageUrl}?v=${Date.now()}&t=${Math.random()}`;
        
        imageItem.innerHTML = `
            <img src="${imageUrlWithTimestamp}" 
                 alt="${item.title}" 
                 class="image-display" 
                 oncontextmenu="handleLongPress(event, this)"
                 onerror="handleImageError(this, '${item.title}')" 
                 onload="handleImageLoad(this, '${item.title}')">
            <div class="image-info">
                <h3 class="image-title">${item.title}</h3>
            </div>
        `;
        
        imagesGrid.appendChild(imageItem);
    });
    
    // 为图片添加触摸事件监听器
    setTimeout(function() {
        addTouchListenersToImages();
    }, 300);
    
    // 再次尝试绑定（防止第一次失败）
    setTimeout(function() {
        addTouchListenersToImages();
    }, 800);
    
    // 第三次尝试绑定（确保成功）
    setTimeout(function() {
        addTouchListenersToImages();
    }, 1500);
    
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
                'img_url': 'https://laofei-1259209256.cos.ap-nanjing.myqcloud.com/gallery/超特图鉴.png',
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

// 为账号推荐图片添加触摸事件监听器
function addTouchListenersToRecommendImages() {
    const recommendImages = document.querySelectorAll('.recommend-image');
    
    console.log('找到账号推荐图片数量:', recommendImages.length);
    
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

// 导出函数供外部使用
window.FSDataLibrary = {
    loadCharacters,
    uploadToCOS,
    getCOSFileList,
    loadGifFiles,
    COS_CONFIG
};
