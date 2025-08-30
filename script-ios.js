// iOS Safari兼容版本 - 简化代码
console.log('iOS兼容版本开始加载');

// 基本配置
var COS_CONFIG = {
    Domain: 'https://laofei-1259209256.cos.ap-nanjing.myqcloud.com'
};

// 当前代次
var currentGeneration = '9';

// 简化的角色数据
var charactersData = {
    '1': [
        { id: '1_1', name: '小芸', generation: '1代超特', image: 'characters/1代超特/小芸.png' },
        { id: '1_2', name: '雷龙', generation: '1代超特', image: 'characters/1代超特/雷龙.png' },
        { id: '1_3', name: '蛇姬', generation: '1代超特', image: 'characters/1代超特/蛇姬.png' }
    ],
    '2': [
        { id: '2_1', name: '安杰拉', generation: '2代超特', image: 'characters/2代超特/安杰拉.png', gifFolder: 'gifs/2代超特/安杰拉/' },
        { id: '2_2', name: '沃顿', generation: '2代超特', image: 'characters/2代超特/沃顿.png', gifFolder: 'gifs/2代超特/沃顿/' },
        { id: '2_3', name: '莉莉斯', generation: '2代超特', image: 'characters/2代超特/莉莉斯.png', gifFolder: 'gifs/2代超特/莉莉斯/' },
        { id: '2_4', name: '路西法', generation: '2代超特', image: 'characters/2代超特/路西法.png', gifFolder: 'gifs/2代超特/路西法/' }
    ],
    '3': [
        { id: '3_1', name: '凤凰', generation: '3代超特', image: 'characters/3代超特/凤凰.png', gifFolder: 'gifs/3代超特/凤凰/' },
        { id: '3_2', name: '白虎', generation: '3代超特', image: 'characters/3代超特/白虎.png', gifFolder: 'gifs/3代超特/白虎/' },
        { id: '3_3', name: '酒鬼', generation: '3代超特', image: 'characters/3代超特/酒鬼.png', gifFolder: 'gifs/3代超特/酒鬼/' }
    ],
    '3_5': [
        { id: '3_5_1', name: '雷神', generation: '3.5代超特', image: 'characters/3.5代超特/雷神.png', gifFolder: 'gifs/3.5代超特/雷神/' },
        { id: '3_5_2', name: '风神', generation: '3.5代超特', image: 'characters/3.5代超特/风神.png', gifFolder: 'gifs/3.5代超特/风神/' }
    ],
    '4': [
        { id: '4_1', name: '火神', generation: '4代超特', image: 'characters/4代超特/火神.png', gifFolder: 'gifs/4代超特/火神/' },
        { id: '4_2', name: '水神', generation: '4代超特', image: 'characters/4代超特/水神.png', gifFolder: 'gifs/4代超特/水神/' }
    ],
    '4_5': [
        { id: '4_5_1', name: '土神', generation: '4.5代超特', image: 'characters/4.5代超特/土神.png', gifFolder: 'gifs/4.5代超特/土神/' },
        { id: '4_5_2', name: '金神', generation: '4.5代超特', image: 'characters/4.5代超特/金神.png', gifFolder: 'gifs/4.5代超特/金神/' }
    ],
    '5': [
        { id: '5_1', name: '艾达', generation: '5代超特', image: 'characters/5代超特/艾达.png', gifFolder: 'gifs/5代超特/艾达/' },
        { id: '5_2', name: '杰罗', generation: '5代超特', image: 'characters/5代超特/杰罗.png', gifFolder: 'gifs/5代超特/杰罗/' }
    ],
    '6': [
        { id: '6_1', name: '光暗', generation: '6代超特', image: 'characters/6代超特/光暗.png', gifFolder: 'gifs/6代超特/光暗/' },
        { id: '6_2', name: '冰火', generation: '6代超特', image: 'characters/6代超特/冰火.png', gifFolder: 'gifs/6代超特/冰火/' },
        { id: '6_3', name: '钢铁剧毒', generation: '6代超特', image: 'characters/6代超特/钢铁剧毒.png', gifFolder: 'gifs/6代超特/钢铁剧毒/' },
        { id: '6_4', name: '风雷', generation: '6代超特', image: 'characters/6代超特/风雷.png', gifFolder: 'gifs/6代超特/风雷/' }
    ],
    '7': [
        { id: '7_1', name: '玄武', generation: '7代超特', image: 'characters/7代超特/玄武.png', gifFolder: 'gifs/7代超特/玄武/' },
        { id: '7_2', name: '雪舞', generation: '7代超特', image: 'characters/7代超特/雪舞.png', gifFolder: 'gifs/7代超特/雪舞/' },
        { id: '7_3', name: '月儿', generation: '7代超特', image: 'characters/7代超特/月儿.png', gifFolder: 'gifs/7代超特/月儿/' }
    ],
    '8': [
        { id: '8_1', name: '奥丁', generation: '8代超特', image: 'characters/8代超特/奥丁.png', gifFolder: 'gifs/8代超特/奥丁/' },
        { id: '8_2', name: '月神', generation: '8代超特', image: 'characters/8代超特/月神.png', gifFolder: 'gifs/8代超特/月神/' },
        { id: '8_3', name: '哈托尔', generation: '8代超特', image: 'characters/8代超特/哈托尔.png', gifFolder: 'gifs/8代超特/哈托尔/' }
    ],
    '9': [
        { 
            id: '9_1', 
            name: '亚琪/亚克', 
            generation: '9代超特', 
            image: 'characters/9代超特/亚琪亚克.png',
            actions: [
                { name: 'X', gif: 'gifs/9代超特/亚琪亚克/X.gif' },
                { name: '三分', gif: 'gifs/9代超特/亚琪亚克/三分.gif' },
                { name: '中投', gif: 'gifs/9代超特/亚琪亚克/中投.gif' },
                { name: '分球', gif: 'gifs/9代超特/亚琪亚克/分球.gif' },
                { name: '地板', gif: 'gifs/9代超特/亚琪亚克/地板.gif' },
                { name: '大手冒', gif: 'gifs/9代超特/亚琪亚克/大手冒.gif' },
                { name: '小手冒', gif: 'gifs/9代超特/亚琪亚克/小手冒.gif' },
                { name: '篮板', gif: 'gifs/9代超特/亚琪亚克/篮板.gif' },
                { name: '近上', gif: 'gifs/9代超特/亚琪亚克/近上.gif' },
                { name: '近扣', gif: 'gifs/9代超特/亚琪亚克/近扣.gif' },
                { name: '远上', gif: 'gifs/9代超特/亚琪亚克/远上.gif' },
                { name: '远扣', gif: 'gifs/9代超特/亚琪亚克/远扣.gif' }
            ]
        },
        { 
            id: '9_2', 
            name: '罗卡', 
            generation: '9代超特', 
            image: 'characters/9代超特/罗卡.png',
            actions: [
                { name: 'X', gif: 'gifs/9代超特/罗卡/X.gif' },
                { name: '三分', gif: 'gifs/9代超特/罗卡/三分.gif' },
                { name: '中投', gif: 'gifs/9代超特/罗卡/中投.gif' },
                { name: '分球', gif: 'gifs/9代超特/罗卡/分球.gif' },
                { name: '地板', gif: 'gifs/9代超特/罗卡/地板.gif' },
                { name: '大手冒', gif: 'gifs/9代超特/罗卡/大手冒.gif' },
                { name: '小手冒', gif: 'gifs/9代超特/罗卡/小手冒.gif' },
                { name: '篮板', gif: 'gifs/9代超特/罗卡/篮板.gif' },
                { name: '近上', gif: 'gifs/9代超特/罗卡/近上.gif' },
                { name: '近扣', gif: 'gifs/9代超特/罗卡/近扣.gif' },
                { name: '远上', gif: 'gifs/9代超特/罗卡/远上.gif' },
                { name: '远扣', gif: 'gifs/9代超特/罗卡/远扣.gif' }
            ]
        }
    ]
};

// 图鉴数据
var galleryData = {
    image: 'gallery/超特图鉴.png'
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM加载完成');
    
    try {
        // 初始化导航
        initNavigation();
        
        // 初始化筛选
        initFilters();
        
        // 加载默认内容
        loadCharacters(currentGeneration);
        loadGallery(currentGeneration);
        
        // 隐藏筛选按钮
        var filterContainer = document.querySelector('.filter-container');
        if (filterContainer) {
            filterContainer.style.display = 'none';
        }
        
        // 初始化排名
        initRanking();
        
        console.log('页面初始化完成');
    } catch (error) {
        console.error('初始化错误:', error);
    }
});

// 初始化导航
function initNavigation() {
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
            switchSection(section);
        });
    }
}

// 初始化筛选按钮
function initFilters() {
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
    var sections = document.querySelectorAll('.content-section');
    for (var i = 0; i < sections.length; i++) {
        sections[i].classList.remove('active');
    }
    
    // 显示选中的内容区域
    var targetSection = document.getElementById(sectionName + '-section');
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // 控制筛选按钮的显示/隐藏
    var filterContainer = document.querySelector('.filter-container');
    if (sectionName === 'characters') {
        filterContainer.style.display = 'block';
    } else {
        filterContainer.style.display = 'none';
    }
}

// 加载角色数据
function loadCharacters(generation) {
    var charactersGrid = document.getElementById('characters-grid');
    if (!charactersGrid) return;
    
    // 清空现有内容
    charactersGrid.innerHTML = '';
    
    // 获取当前代次的角色数据
    var characters = charactersData[generation] || [];
    
    if (characters.length === 0) {
        charactersGrid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #6b7280;"><p>暂无' + generation + '代超特角色数据</p><p>请稍后更新...</p></div>';
        return;
    }
    
    // 创建角色卡片
    for (var i = 0; i < characters.length; i++) {
        var characterCard = createCharacterCard(characters[i]);
        charactersGrid.appendChild(characterCard);
    }
}

// 创建角色卡片
function createCharacterCard(character) {
    var card = document.createElement('div');
    card.className = 'character-card';
    
    // 构建图片URL
    var imageUrl = '';
    if (character.image) {
        imageUrl = COS_CONFIG.Domain + '/' + character.image;
    }
    
    // 构建动作按钮HTML
    var actionsHtml = '';
    if (character.actions && character.actions.length > 0) {
        // 9代超特使用预设动作列表
        actionsHtml = '<div class="character-actions"><h4>动作技能</h4><div class="action-buttons">';
        for (var i = 0; i < character.actions.length; i++) {
            var action = character.actions[i];
            actionsHtml += '<button class="action-btn" data-gif="' + COS_CONFIG.Domain + '/' + action.gif + '"><i class="fas fa-play"></i><span>' + action.name + '</span></button>';
        }
        actionsHtml += '</div><div class="action-preview"><div class="gif-container" id="gif-' + character.id + '"><p>点击上方动作按钮查看GIF</p></div></div></div>';
    } else if (character.gifFolder) {
        // 其他代超特使用动态读取GIF文件
        actionsHtml = '<div class="character-actions"><h4>动作技能</h4><div class="action-buttons" id="actions-' + character.id + '"><p>正在加载动作...</p></div><div class="action-preview"><div class="gif-container" id="gif-' + character.id + '"><p>点击上方动作按钮查看GIF</p></div></div></div>';
    }
    
    card.innerHTML = '<div class="character-header"><div class="character-image">' + 
        (imageUrl ? '<img src="' + imageUrl + '" alt="' + character.name + '" style="width: 100%; height: 100%; object-fit: cover;" onerror="handleImageError(this, \'' + character.name + '\')">' : '暂无图片') +
        '</div><div class="character-info"><h3 class="character-name">' + character.name + '</h3><p class="character-generation">' + character.generation + '</p></div></div>' +
        '<div class="character-actions-container">' + actionsHtml + '</div>';
    
    // 添加动作按钮事件监听
    if (character.actions && character.actions.length > 0) {
        // 9代超特使用预设动作列表
        var actionButtons = card.querySelectorAll('.action-btn');
        var gifContainer = card.querySelector('#gif-' + character.id);
        
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
                    
                    // 显示对应的GIF
                    var gifUrl = this.getAttribute('data-gif');
                    var actionName = this.querySelector('span').textContent;
                    gifContainer.innerHTML = '<img src="' + gifUrl + '" alt="' + actionName + '" class="action-gif"><p class="action-name">' + actionName + '</p>';
                    
                    return false;
                };
            })(actionButtons[i]);
        }
    } else if (character.gifFolder) {
        // 其他代超特动态加载GIF文件
        loadGifFiles(character.gifFolder, character.id, card);
    }
    
    return card;
}

// 加载图鉴
function loadGallery(generation) {
    var galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return;
    
    // 清空现有内容
    galleryGrid.innerHTML = '';
    
    // 创建图鉴卡片
    var galleryCard = createGalleryCard();
    galleryGrid.appendChild(galleryCard);
}

// 创建图鉴卡片
function createGalleryCard() {
    var card = document.createElement('div');
    card.className = 'gallery-card';
    
    // 构建图片URL
    var imageUrl = '';
    if (galleryData.image) {
        imageUrl = COS_CONFIG.Domain + '/' + galleryData.image;
    }
    
    card.innerHTML = '<img src="' + imageUrl + '" alt="超特图鉴" style="width: 100%; height: auto; object-fit: contain;" onerror="handleImageError(this, \'超特图鉴\')">';
    
    return card;
}

// 初始化排名
function initRanking() {
    var rankingImages = {
        'c': COS_CONFIG.Domain + '/ranking/C排名.png',
        'pf': COS_CONFIG.Domain + '/ranking/PF排名.png',
        'pg': COS_CONFIG.Domain + '/ranking/PG排名.png'
    };
    
    // 加载图片
    for (var rankingType in rankingImages) {
        var imgElement = document.getElementById(rankingType + '-ranking-image');
        if (imgElement) {
            imgElement.src = rankingImages[rankingType];
        }
    }
    
    // 添加标签切换事件
    var rankingTabs = document.querySelectorAll('.ranking-tab');
    for (var i = 0; i < rankingTabs.length; i++) {
        rankingTabs[i].addEventListener('click', function() {
            // 移除所有active状态
            for (var j = 0; j < rankingTabs.length; j++) {
                rankingTabs[j].classList.remove('active');
            }
            var rankingItems = document.querySelectorAll('.ranking-item');
            for (var j = 0; j < rankingItems.length; j++) {
                rankingItems[j].classList.remove('active');
            }
            
            // 添加当前active状态
            this.classList.add('active');
            var rankingType = this.getAttribute('data-ranking');
            var targetItem = document.getElementById(rankingType + '-ranking');
            if (targetItem) {
                targetItem.classList.add('active');
            }
        });
    }
}

// 动态加载GIF文件
function loadGifFiles(folder, characterId, card) {
    // 从COS文件夹中动态读取GIF文件
    var cosUrl = COS_CONFIG.Domain + '/' + folder;
    
    // 根据角色ID确定使用哪个GIF文件列表
    var commonGifFiles = [];
    
    // 6代超特特定GIF文件（双角色系统）
    if (characterId.includes('6_')) {
        // 根据具体角色ID确定使用哪个双角色的GIF文件
        if (characterId === '6_1') {
            // 光暗双角色
            commonGifFiles = [
                '光X.gif', '光三分.gif', '光中手.gif', '光中投.gif', '光分球.gif', '光地板.gif', '光大手.gif', '光小手.gif', '光篮板.gif', '光近上.gif', '光近扣.gif', '光远上.gif', '光远扣.gif',
                '暗X.gif', '暗三分.gif', '暗中手.gif', '暗中投.gif', '暗分球.gif', '暗地板.gif', '暗大手.gif', '暗小手冒.gif', '暗篮板.gif', '暗近上.gif', '暗近扣.gif', '暗远上.gif', '暗远扣.gif'
            ];
        } else if (characterId === '6_2') {
            // 冰火双角色
            commonGifFiles = [
                '水X.gif', '水三分.gif', '水中投.gif', '水分球.gif', '水地板.gif', '水大手冒.gif', '水小手冒.gif', '水篮板.gif', '水近上.gif', '水近扣.gif', '水远上.gif', '水远扣.gif',
                '火X.gif', '火三分.gif', '火中投.gif', '火分球.gif', '火地板.gif', '火大手冒.gif', '火小手冒.gif', '火篮板.gif', '火近上.gif', '火近扣.gif', '火远上.gif', '火远扣.gif'
            ];
        } else if (characterId === '6_3') {
            // 钢铁剧毒双角色
            commonGifFiles = [
                '剧毒X.gif', '剧毒三分.gif', '剧毒中投.gif', '剧毒分球.gif', '剧毒地板.gif', '剧毒大手冒.gif', '剧毒小手冒.gif', '剧毒小手哦冒.gif', '剧毒篮板.gif', '剧毒近上.gif', '剧毒近扣.gif', '剧毒远上.gif', '剧毒远扣.gif',
                '毒液中投.gif', '钢铁X.gif', '钢铁XX.gif', '钢铁三分.gif', '钢铁中投.gif', '钢铁分球.gif', '钢铁地板.gif', '钢铁大手冒.gif', '钢铁小手冒.gif', '钢铁篮板.gif', '钢铁近上.gif', '钢铁近扣.gif', '钢铁远上.gif', '钢铁远扣.gif'
            ];
        } else if (characterId === '6_4') {
            // 风雷双角色
            commonGifFiles = [
                '雷X.gif', '雷三分.gif', '雷中投.gif', '雷分球.gif', '雷地板.gif', '雷大手冒.gif', '雷小手冒.gif', '雷篮板.gif', '雷近上.gif', '雷近扣.gif', '雷远上.gif', '雷远扣.gif',
                '风X.gif', '风三分.gif', '风中投.gif', '风分球.gif', '风地板.gif', '风大手冒.gif', '风小手冒.gif', '风篮板.gif', '风近上.gif', '风近扣.gif', '风远上.gif', '风远扣.gif'
            ];
        }
    } else if (characterId.includes('5_')) {
        // 5代超特特定GIF文件
        if (characterId === '5_1') {
            // 艾达
            commonGifFiles = [
                '艾达X.gif', '艾达三分.gif', '艾达中投.gif', '艾达分球.gif', '艾达地板.gif', '艾达大手冒.gif', '艾达小手冒.gif', '艾达篮板.gif', '艾达近上.gif', '艾达近扣.gif', '艾达远上.gif', '艾达远扣.gif'
            ];
        } else if (characterId === '5_2') {
            // 杰罗
            commonGifFiles = [
                '杰罗X.gif', '杰罗三分.gif', '杰罗中投.gif', '杰罗分球.gif', '杰罗地板.gif', '杰罗大手冒.gif', '杰罗小手冒.gif', '杰罗篮板.gif', '杰罗近上.gif', '杰罗近扣.gif', '杰罗远上.gif', '杰罗远扣.gif'
            ];
        }
    } else if (characterId.includes('2_') || characterId.includes('3_') || characterId.includes('4_')) {
        // 2代、3代、3.5代、4代、4.5代通用GIF文件
        commonGifFiles = [
            'X.gif', '不看人传球.gif', '中手冒.gif', '分球.gif', '地板.gif', '大手冒.gif', '小手冒.gif', '抢断.gif', '篮板.gif', '间接进攻手.gif',
            '阳三分.gif', '阳中投.gif', '阳近上.gif', '阳近扣.gif', '阳远上.gif', '阳远扣.gif',
            '阴三分.gif', '阴中投.gif', '阴近上.gif', '阴近扣.gif', '阴远上.gif', '阴远扣.gif',
            '快速起来.gif', 'A分球.gif', 'A近扣.gif', 'A近上.gif', 'A篮板.gif', 'A三分.gif', 'A远扣.gif', 'A远上.gif', 'A中投.gif',
            'B分球.gif', 'B近扣.gif', 'B近上.gif', 'B篮板.gif', 'B三分.gif', 'B远扣.gif', 'B远上.gif', 'B中投.gif'
        ];
    } else {
        // 其他代数的通用GIF文件
        commonGifFiles = [
            'X.gif', '不看人传球.gif', '中手冒.gif', '分球.gif', '地板.gif', '大手冒.gif', '小手冒.gif', '抢断.gif', '篮板.gif', '间接进攻手.gif',
            '阳三分.gif', '阳中投.gif', '阳近上.gif', '阳近扣.gif', '阳远上.gif', '阳远扣.gif',
            '阴三分.gif', '阴中投.gif', '阴近上.gif', '阴近扣.gif', '阴远上.gif', '阴远扣.gif',
            '快速起来.gif', 'A分球.gif', 'A近扣.gif', 'A近上.gif', 'A篮板.gif', 'A三分.gif', 'A远扣.gif', 'A远上.gif', 'A中投.gif',
            'B分球.gif', 'B近扣.gif', 'B近上.gif', 'B篮板.gif', 'B三分.gif', 'B远扣.gif', 'B远上.gif', 'B中投.gif'
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
        
        for (var i = 0; i < validGifFiles.length; i++) {
            var file = validGifFiles[i];
            var actionName = file.replace('.gif', '');
            var gifUrl = COS_CONFIG.Domain + '/' + folder + file;
            
            buttonsHtml += '<button class="action-btn" data-gif="' + gifUrl + '"><i class="fas fa-play"></i><span>' + actionName + '</span></button>';
        }
        
        actionButtonsContainer.innerHTML = buttonsHtml;
        addButtonEvents();
    }
    
    // 开始检查文件
    for (var i = 0; i < commonGifFiles.length; i++) {
        checkGifFile(commonGifFiles[i], i);
    }
    
    // 添加按钮事件监听的函数
    function addButtonEvents() {
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
                    
                    // 显示对应的GIF
                    var gifUrl = this.getAttribute('data-gif');
                    var actionName = this.querySelector('span').textContent;
                    gifContainer.innerHTML = '<img src="' + gifUrl + '" alt="' + actionName + '" class="action-gif"><p class="action-name">' + actionName + '</p>';
                    
                    return false;
                };
            })(actionButtons[i]);
        }
    }
}

// 图片加载失败处理
function handleImageError(img, characterName) {
    console.log('图片加载失败: ' + characterName);
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7mnKzlm748L3RleHQ+Cjwvc3ZnPgo=';
    img.alt = characterName + ' (图片加载失败)';
}

// 页面加载完成
window.addEventListener('load', function() {
    console.log('页面完全加载完成');
});

// 错误处理
window.addEventListener('error', function(e) {
    console.error('页面错误:', e.error);
});
