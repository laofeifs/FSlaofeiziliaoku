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
            image: 'characters/1gen/xiaoyun.png'
        },
        {
            id: '1_2',
            name: '雷龙',
            generation: '1代超特',
            description: '一代超特角色',
            image: 'characters/1gen/leilong.png'
        },
        {
            id: '1_3',
            name: '蛇姬',
            generation: '1代超特',
            description: '一代超特角色',
            image: 'characters/1gen/sheji.png'
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
    
    // 强制重新加载
    window.location.reload(true);
}

// 检查版本并提示刷新
function checkVersion() {
    var currentVersion = '2.1';
    var storedVersion = localStorage.getItem('fs_version');
    
    if (storedVersion !== currentVersion) {
        localStorage.setItem('fs_version', currentVersion);
        
        // 显示刷新提示
        var refreshTip = document.getElementById('refresh-tip');
        if (refreshTip) {
            refreshTip.style.display = 'block';
            refreshTip.innerHTML = '<p>检测到新版本，请下拉刷新页面或点击<a href="javascript:forceRefresh()" style="color: #dc2626; text-decoration: underline;">这里强制刷新</a></p>';
        }
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 检查版本并提示刷新
    checkVersion();
    
    // 微信浏览器兼容性处理
    if (isWeChat()) {
        console.log('检测到微信内置浏览器');
        // 可以在这里添加微信特定的处理逻辑
    }
    
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
        // 使用更兼容的方式添加事件监听
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

// 导出函数供外部使用
window.FSDataLibrary = {
    loadCharacters,
    uploadToCOS,
    getCOSFileList,
    COS_CONFIG
};
