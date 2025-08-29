// 腾讯云COS配置
const COS_CONFIG = {
    // 这里需要你填入你的腾讯云COS配置信息
    SecretId: 'YOUR_SECRET_ID',
    SecretKey: 'YOUR_SECRET_KEY',
    Bucket: 'fs-images-1259209256',
    Region: 'YOUR_REGION',
    // COS访问域名，格式类似：https://fs-images-1259209256.cos-website.ap-region.myqcloud.com
    Domain: 'https://fs-images-1259209256.cos-website.ap-beijing.myqcloud.com'
};

// 当前选中的代次
let currentGeneration = '9';

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
    window.location.reload(true);
}

// 自动强制刷新（如果检测到微信浏览器）
function autoForceRefresh() {
    if (isWeChat()) {
        console.log('检测到微信内置浏览器，检查是否需要刷新');
        // 只在版本不匹配时才刷新
        var storedVersion = localStorage.getItem('fs_version');
        var currentVersion = '202508291500';
        
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
                location.reload(true); // 只在版本不同才刷新
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
    // 检查版本并提示刷新
    checkVersion();
    
    // 微信浏览器兼容性处理
    if (isWeChat()) {
        console.log('检测到微信内置浏览器');
        // 自动强制刷新
        autoForceRefresh();
    }
    
    // 检测服务器版本（只在必要时）
    setTimeout(checkServerVersion, 2000); // 延迟2秒检测，避免页面加载时立即检测
    
    initializeNavigation();
    initializeFilters();
    loadCharacters(currentGeneration);
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
        <div class="character-image">
            ${imageUrl ? `<img src="${imageUrl}" alt="${character.name}" style="width: 100%; height: 100%; object-fit: cover;">` : '暂无图片'}
        </div>
        <div class="character-info">
            <h3 class="character-name">${character.name}</h3>
            <p class="character-generation">${character.generation}</p>
            <p class="character-description">${character.description}</p>
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
                button.onclick = function() {
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
                };
            })(actionButtons[i]);
        }
    } else if (character.gifFolder) {
        // 8代超特动态加载GIF文件
        loadGifFiles(character.gifFolder, character.id, card);
    }
    
    return card;
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
    
    // 由于无法直接获取COS文件列表，我们使用一个通用的方法
    // 尝试加载常见的GIF文件，如果存在就显示
    var commonGifFiles = [
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
                button.onclick = function() {
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
                };
            })(actionButtons[i]);
        }
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
