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
        { id: '2_1', name: '安杰拉', generation: '2代超特', image: 'characters/2代超特/安杰拉.png' },
        { id: '2_2', name: '沃顿', generation: '2代超特', image: 'characters/2代超特/沃顿.png' },
        { id: '2_3', name: '莉莉斯', generation: '2代超特', image: 'characters/2代超特/莉莉斯.png' },
        { id: '2_4', name: '路西法', generation: '2代超特', image: 'characters/2代超特/路西法.png' }
    ],
    '3': [
        { id: '3_1', name: '凤凰', generation: '3代超特', image: 'characters/3代超特/凤凰.png' },
        { id: '3_2', name: '白虎', generation: '3代超特', image: 'characters/3代超特/白虎.png' },
        { id: '3_3', name: '酒鬼', generation: '3代超特', image: 'characters/3代超特/酒鬼.png' }
    ],
    '3_5': [
        { id: '3_5_1', name: '雷神', generation: '3.5代超特', image: 'characters/3.5代超特/雷神.png' },
        { id: '3_5_2', name: '风神', generation: '3.5代超特', image: 'characters/3.5代超特/风神.png' }
    ],
    '4': [
        { id: '4_1', name: '火神', generation: '4代超特', image: 'characters/4代超特/火神.png' },
        { id: '4_2', name: '水神', generation: '4代超特', image: 'characters/4代超特/水神.png' }
    ],
    '4_5': [
        { id: '4_5_1', name: '土神', generation: '4.5代超特', image: 'characters/4.5代超特/土神.png' },
        { id: '4_5_2', name: '金神', generation: '4.5代超特', image: 'characters/4.5代超特/金神.png' }
    ],
    '5': [
        { id: '5_1', name: '艾达', generation: '5代超特', image: 'characters/5代超特/艾达.png' },
        { id: '5_2', name: '杰罗', generation: '5代超特', image: 'characters/5代超特/杰罗.png' }
    ],
    '6': [
        { id: '6_1', name: '光暗', generation: '6代超特', image: 'characters/6代超特/光暗.png' },
        { id: '6_2', name: '冰火', generation: '6代超特', image: 'characters/6代超特/冰火.png' },
        { id: '6_3', name: '钢铁剧毒', generation: '6代超特', image: 'characters/6代超特/钢铁剧毒.png' },
        { id: '6_4', name: '风雷', generation: '6代超特', image: 'characters/6代超特/风雷.png' }
    ],
    '7': [
        { id: '7_1', name: '玄武', generation: '7代超特', image: 'characters/7代超特/玄武.png' },
        { id: '7_2', name: '雪舞', generation: '7代超特', image: 'characters/7代超特/雪舞.png' },
        { id: '7_3', name: '月儿', generation: '7代超特', image: 'characters/7代超特/月儿.png' }
    ],
    '8': [
        { id: '8_1', name: '奥丁', generation: '8代超特', image: 'characters/8代超特/奥丁.png' },
        { id: '8_2', name: '月神', generation: '8代超特', image: 'characters/8代超特/月神.png' },
        { id: '8_3', name: '哈托尔', generation: '8代超特', image: 'characters/8代超特/哈托尔.png' }
    ],
    '9': [
        { id: '9_1', name: '亚琪/亚克', generation: '9代超特', image: 'characters/9代超特/亚琪亚克.png' },
        { id: '9_2', name: '罗卡', generation: '9代超特', image: 'characters/9代超特/罗卡.png' }
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
    
    card.innerHTML = '<div class="character-header"><div class="character-image">' + 
        (imageUrl ? '<img src="' + imageUrl + '" alt="' + character.name + '" style="width: 100%; height: 100%; object-fit: cover;" onerror="handleImageError(this, \'' + character.name + '\')">' : '暂无图片') +
        '</div><div class="character-info"><h3 class="character-name">' + character.name + '</h3><p class="character-generation">' + character.generation + '</p></div></div>';
    
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
