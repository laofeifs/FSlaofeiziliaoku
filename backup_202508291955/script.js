// 腾讯云COS配置
const COS_CONFIG = {
    // 这里需要你填入你的腾讯云COS配置信息
    SecretId: 'YOUR_SECRET_ID',
    SecretKey: 'YOUR_SECRET_KEY',
    Bucket: 'laofei-1259209256',
    Region: 'ap-nanjing', // 南京地域
    // COS访问域名，使用新存储桶域名
    Domain: 'https://laofei-1259209256.cos.ap-nanjing.myqcloud.com'
};

// 当前选中的代次
let currentGeneration = '9';

// 图鉴数据 - 所有代数共用一张图片
const galleryData = {
    image: 'gallery/超特图鉴.png'
};

// 角色数据示例（你可以根据实际情况修改）
const charactersData = {
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
            name: '角色名称2',
            generation: '2代超特',
            description: '这是2代超特的角色描述',
            image: 'characters/2gen/character2.jpg'
        }
        // 更多角色...
    ],
    '5': [
        {
            id: '5_1',
            name: '角色名称5',
            generation: '5代超特',
            description: '这是5代超特的角色描述',
            image: 'characters/5gen/character5.jpg'
        }
        // 更多角色...
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

// 检测服务器版本并强制刷新
function checkServerVersion() {
    // 微信浏览器禁用自动刷新
    if (isWeChat()) {
        console.log('微信浏览器禁用自动刷新');
        return;
    }
    
    // 安卓微信浏览器特殊处理
    if (isAndroidWeChat()) {
        console.log('安卓微信浏览器，完全禁用版本检测');
        return;
    }
    
    // 检查是否已经检测过，避免重复检测
    var lastCheck = localStorage.getItem('last_version_check');
    var currentTime = Date.now();
    
    // 如果距离上次检查不到5分钟，跳过检测
    if (lastCheck && (currentTime - parseInt(lastCheck)) < 5 * 60 * 1000) {
        console.log('距离上次版本检查不到5分钟，跳过检测');
        return;
    }
    
    localStorage.setItem('last_version_check', currentTime);
    
    fetch('/version.txt?t=' + currentTime) // 防止缓存
        .then(res => res.text())
        .then(serverVersion => {
            serverVersion = serverVersion.trim(); // 去除可能的空格
            let localVersion = localStorage.getItem('site_version');
            console.log('服务器版本:', serverVersion, '本地版本:', localVersion);
            
            if (localVersion !== serverVersion) {
                console.log('检测到新版本，执行强制刷新');
                localStorage.setItem('site_version', serverVersion);
                // location.reload(true); // 注释掉自动刷新
            } else {
                console.log('版本匹配，无需刷新');
            }
        })
        .catch(error => {
            console.log('版本检测失败:', error);
        });
}

// 检查版本并提示刷新（简化版）
function checkVersion() {
    // 版本检查现在由checkServerVersion()处理
    console.log('版本检查已移至服务器检测');
}



// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 禁用下拉刷新
    preventPullToRefresh();
    
    // 检查版本并提示刷新
    checkVersion();
    
    // 连接状态检测
    var connectionCheckInterval;
    var lastConnectionCheck = Date.now();
    
    // 检测网络连接状态
    function checkConnection() {
        var currentTime = Date.now();
        
        // 每2分钟检查一次连接状态（降低频率）
        if (currentTime - lastConnectionCheck > 120000) {
            lastConnectionCheck = currentTime;
            
            // 尝试加载一个小的资源来检测连接
            fetch('/version.txt?t=' + currentTime, { 
                method: 'HEAD',
                cache: 'no-cache',
                timeout: 5000 // 5秒超时
            })
            .then(function(response) {
                if (response.ok) {
                    console.log('网络连接正常');
                    // 清除连接错误提示
                    var errorTip = document.getElementById('connection-error-tip');
                    if (errorTip) {
                        errorTip.remove();
                    }
                } else {
                    throw new Error('网络响应异常');
                }
            })
            .catch(function(error) {
                console.log('网络连接检测失败:', error);
                // 不显示错误提示，只在控制台记录
                // showConnectionError(); // 注释掉自动显示错误
            });
        }
    }
    
    // 显示连接错误提示
    function showConnectionError() {
        // 检查是否已经显示过提示
        if (document.getElementById('connection-error-tip')) {
            return;
        }
        
        var errorTip = document.createElement('div');
        errorTip.id = 'connection-error-tip';
        errorTip.style.cssText = 'position:fixed;top:120px;left:10px;right:10px;background:#ff4757;color:white;padding:12px;border-radius:8px;font-size:14px;z-index:9999;text-align:center;';
        errorTip.innerHTML = `
            <div style="margin-bottom:8px;">⚠️ 网络连接异常，请检查网络后刷新页面</div>
            <button onclick="console.log('手动刷新已禁用')" style="background:white;color:#ff4757;border:none;padding:6px 12px;border-radius:4px;cursor:pointer;font-size:12px;">刷新页面</button>
            <button onclick="this.parentElement.remove()" style="background:transparent;color:white;border:1px solid white;padding:6px 12px;border-radius:4px;cursor:pointer;font-size:12px;margin-left:8px;">关闭</button>
        `;
        document.body.appendChild(errorTip);
    }
    
    // 启动连接检测（降低频率，避免频繁检测）
    connectionCheckInterval = setInterval(checkConnection, 300000); // 每5分钟检查一次
    

    

    
    // 手机端强制刷新检测
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
        console.log('检测到移动设备，检查是否需要强制刷新');
        var lastMobileCheck = localStorage.getItem('mobile_last_check');
        var currentTime = Date.now();
        
        // 如果距离上次检查超过1分钟，执行强制刷新
        if (!lastMobileCheck || (currentTime - parseInt(lastMobileCheck)) > 60 * 1000) {
            console.log('移动设备强制刷新检查');
            localStorage.setItem('mobile_last_check', currentTime);
            
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
            sessionStorage.clear();
            
            // 移除移动端刷新提示
            // var mobileTip = document.createElement('div');
            // mobileTip.style.cssText = 'position:fixed;top:10px;left:10px;right:10px;background:#ff6b6b;color:white;padding:12px;border-radius:8px;font-size:14px;z-index:9999;text-align:center;';
            // mobileTip.innerHTML = '📱 移动端检测到更新，请下拉刷新页面获取最新内容';
            // document.body.appendChild(mobileTip);
            
            // 10秒后自动隐藏提示
            // setTimeout(function() {
            //     if (mobileTip.parentNode) {
            //         mobileTip.parentNode.removeChild(mobileTip);
            //     }
            // }, 10000);
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
    
    // 检测服务器版本（只在必要时）
    setTimeout(checkServerVersion, 2000); // 延迟2秒检测，避免页面加载时立即检测
    
    initializeNavigation();
    initializeFilters();
    loadCharacters(currentGeneration);
    loadGallery(currentGeneration);
    
    // 默认显示筛选按钮（因为默认是characters页面）
    const filterContainer = document.querySelector('.filter-container');
    if (filterContainer) {
        filterContainer.style.display = 'block';
    }
    
    // 初始化职业排名功能
    initializeRanking();
});

// 初始化主导航
function initializeNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有活动状态
            navButtons.forEach(btn => btn.classList.remove('active'));
            // 添加当前活动状态
            this.classList.add('active');
            
            // 切换内容区域
            const section = this.getAttribute('data-section');
            
            // 特殊处理FS账号跳转
            if (section === 'account') {
                console.log('检测到FS账号点击');
                // 微店H5链接
                var weidianUrl = 'https://k.youshop10.com/6HZaEV6N';
                
                // 检测是否在微信浏览器中
                if (isWeChat()) {
                    console.log('微信浏览器，尝试跳转微店');
                    // 微信内置浏览器使用多种跳转方式
                    try {
                        // 方式1：直接跳转
                        window.location.href = weidianUrl;
                    } catch (e) {
                        console.log('直接跳转失败，尝试其他方式');
                        try {
                            // 方式2：使用location.replace
                            window.location.replace(weidianUrl);
                        } catch (e2) {
                            console.log('replace跳转失败，尝试assign');
                            try {
                                // 方式3：使用location.assign
                                window.location.assign(weidianUrl);
                            } catch (e3) {
                                console.log('所有跳转方式失败，显示提示');
                                // 方式4：显示提示让用户手动点击
                                var tip = document.createElement('div');
                                tip.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#22c55e;color:white;padding:20px;border-radius:8px;font-size:16px;z-index:10000;text-align:center;box-shadow:0 4px 12px rgba(0,0,0,0.3);';
                                tip.innerHTML = `
                                    <p style="margin:0 0 15px 0;">点击下方链接跳转到微店</p>
                                    <a href="${weidianUrl}" style="color:white;text-decoration:underline;font-weight:bold;">老非街头篮球账号微店</a>
                                    <br><br>
                                    <button onclick="this.parentElement.remove()" style="background:white;color:#22c55e;border:none;padding:8px 16px;border-radius:4px;cursor:pointer;">关闭</button>
                                `;
                                document.body.appendChild(tip);
                            }
                        }
                    }
                    return; // 阻止继续执行
                } else {
                    console.log('外置浏览器，新窗口打开微店');
                    // 外置浏览器打开新窗口
                    window.open(weidianUrl, '_blank');
                    return; // 阻止继续执行
                }
            }
            
            // 其他导航正常切换
            switchSection(section);
        });
    });
}

// 初始化筛选按钮
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有活动状态
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // 添加当前活动状态
            this.classList.add('active');
            
            // 更新当前代次并加载角色
            currentGeneration = this.getAttribute('data-generation');
            loadCharacters(currentGeneration);
            loadGallery(currentGeneration);
        });
    });
}

// 切换内容区域
function switchSection(sectionName) {
    // 隐藏所有内容区域
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.remove('active'));
    
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

// 加载角色数据
function loadCharacters(generation) {
    const charactersGrid = document.getElementById('characters-grid');
    if (!charactersGrid) return;
    
    // 清空现有内容
    charactersGrid.innerHTML = '';
    
    // 获取当前代次的角色数据
    const characters = charactersData[generation] || [];
    
    if (characters.length === 0) {
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
        const characterCard = createCharacterCard(character);
        charactersGrid.appendChild(characterCard);
    });
}

// 创建角色卡片
function createCharacterCard(character) {
    const card = document.createElement('div');
    card.className = 'character-card';
    
    // 构建图片URL（使用腾讯云COS）
    const imageUrl = character.image ? `${COS_CONFIG.Domain}/${character.image}` : '';
    
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
                    gifContainer.innerHTML = '<img src="' + gifUrl + '" alt="' + actionName + '" class="action-gif"><p class="action-name">' + actionName + '</p>';
                    
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
    const card = document.createElement('div');
    card.className = 'gallery-card-full';
    
    // 构建图片URL（使用腾讯云COS）
    const imageUrl = galleryData.image ? `${COS_CONFIG.Domain}/${galleryData.image}` : '';
    
    card.innerHTML = `
        <div class="gallery-image-full">
            ${imageUrl ? `<img src="${imageUrl}" alt="超特图鉴" style="width: 100%; height: auto; object-fit: contain;" onerror="handleImageError(this, '超特图鉴')" onload="handleImageLoad(this, '超特图鉴')">` : '暂无图片'}
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
}

// 图片加载失败处理
function handleImageError(img, characterName) {
    console.log(`❌ ${characterName} 图片加载失败: ${img.src}`);
    
    // 设置默认图片
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7mnKzlm748L3RleHQ+Cjx0ZXh0IHg9IjEwMCIgeT0iMTIwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7lm77niYfliqDovb3lpLHotKU8L3RleHQ+Cjwvc3ZnPgo=';
    img.alt = characterName + ' (图片加载失败)';
}

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



// 显示COS帮助信息
function showCOSHelp() {
    var helpHtml = `
        <div style="margin-bottom:15px;font-weight:bold;text-align:center;">🔧 COS 451错误解决方案</div>
        <div style="text-align:left;margin-bottom:15px;">
            <div style="margin-bottom:10px;"><strong>问题原因：</strong></div>
            <div style="font-size:12px;margin-bottom:8px;">• COS存储桶访问权限受限</div>
            <div style="font-size:12px;margin-bottom:8px;">• 文件可能被设置为私有</div>
            <div style="font-size:12px;margin-bottom:8px;">• 存储桶配置问题</div>
        </div>
        <div style="text-align:left;margin-bottom:15px;">
            <div style="margin-bottom:10px;"><strong>解决步骤：</strong></div>
            <div style="font-size:12px;margin-bottom:8px;">1. 登录腾讯云控制台</div>
            <div style="font-size:12px;margin-bottom:8px;">2. 进入COS存储桶管理</div>
            <div style="font-size:12px;margin-bottom:8px;">3. 检查存储桶权限设置</div>
            <div style="font-size:12px;margin-bottom:8px;">4. 确保文件为公开读取</div>
        </div>
        <div style="text-align:center;">
            <button onclick="this.parentElement.parentElement.remove()" style="background:#22c55e;color:white;border:none;padding:8px 16px;border-radius:4px;cursor:pointer;font-size:14px;">知道了</button>
        </div>
    `;
    
    var helpDiv = document.createElement('div');
    helpDiv.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,0.95);color:white;padding:20px;border-radius:8px;font-size:14px;z-index:10001;min-width:350px;max-width:500px;';
    helpDiv.innerHTML = helpHtml;
    document.body.appendChild(helpDiv);
}

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
    // 从COS文件夹中动态读取GIF文件
    // 使用fetch请求获取文件夹内容
    var cosUrl = COS_CONFIG.Domain + '/' + folder;
    
    // 根据角色ID确定使用哪个GIF文件列表
    var commonGifFiles = [];
    
    // 6代超特特定GIF文件（双角色系统）
    if (characterId.includes('6_')) {
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
    
    var actionButtonsContainer = card.querySelector('#actions-' + characterId);
    var gifContainer = card.querySelector('#gif-' + characterId);
    
    // 动态检测GIF文件是否存在
    var buttonsHtml = '';
    var validGifFiles = [];
    
    // 检查每个GIF文件是否存在
    function checkGifFile(file, index) {
        var gifUrl = COS_CONFIG.Domain + '/' + folder + file;
        var img = new Image();
        
        img.onload = function() {
            // 文件存在，添加到按钮列表
            validGifFiles.push(file);
            if (validGifFiles.length === commonGifFiles.length) {
                // 所有文件检查完成，创建按钮
                createButtons();
            }
        };
        
        img.onerror = function() {
            // 文件不存在，跳过
            if (index === commonGifFiles.length - 1) {
                // 最后一个文件检查完成，创建按钮
                createButtons();
            }
        };
        
        img.src = gifUrl;
    }
    
    // 创建按钮的函数
    function createButtons() {
        if (validGifFiles.length === 0) {
            actionButtonsContainer.innerHTML = '<p>未找到动作文件</p>';
            return;
        }
        
        validGifFiles.forEach(function(file) {
            var actionName = file.replace('.gif', '');
            var gifUrl = COS_CONFIG.Domain + '/' + folder + file;
            
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
                    gifContainer.innerHTML = '<img src="' + gifUrl + '" alt="' + actionName + '" class="action-gif"><p class="action-name">' + actionName + '</p>';
                    
                    return false; // 阻止页面滚动
                };
            })(actionButtons[i]);
        }
    }
}

// 初始化职业排名功能
function initializeRanking() {
    // 设置职业排名图片路径
    const rankingImages = {
        'c': `${COS_CONFIG.Domain}/ranking/C排名.png`,
        'pf': `${COS_CONFIG.Domain}/ranking/PF排名.png`,
        'pg': `${COS_CONFIG.Domain}/ranking/PG排名.png`
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
            
            // 添加点击全屏显示功能（兼容移动端）
            imgElement.addEventListener('click', function() {
                showFullscreenImage(this.src, this.alt, this.classList.contains('rotated'));
            });
            
            // 添加触摸事件，兼容苹果手机
            imgElement.addEventListener('touchstart', function(e) {
                e.preventDefault();
                showFullscreenImage(this.src, this.alt, this.classList.contains('rotated'));
            });
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
function showFullscreenImage(src, alt, isRotated = false) {
    const overlay = document.getElementById('fullscreen-overlay');
    const fullscreenImg = document.getElementById('fullscreen-image');
    
    if (overlay && fullscreenImg) {
        fullscreenImg.src = src;
        fullscreenImg.alt = alt;
        
        // 设置旋转状态
        if (isRotated) {
            fullscreenImg.classList.add('rotated');
        } else {
            fullscreenImg.classList.remove('rotated');
        }
        
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

// 切换图片旋转状态
function toggleImageRotation() {
    const rankingImages = document.querySelectorAll('.ranking-image');
    const isRotated = rankingImages[0] && rankingImages[0].classList.contains('rotated');
    
    rankingImages.forEach(img => {
        if (isRotated) {
            img.classList.remove('rotated');
        } else {
            img.classList.add('rotated');
        }
    });
    
    // 更新按钮文字
    const rotateBtn = document.querySelector('.rotate-btn span');
    if (rotateBtn) {
        rotateBtn.textContent = isRotated ? '旋转图片' : '取消旋转';
    }
    
    // 更新按钮图标
    const rotateIcon = document.querySelector('.rotate-btn i');
    if (rotateIcon) {
        rotateIcon.className = isRotated ? 'fas fa-redo' : 'fas fa-undo';
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
