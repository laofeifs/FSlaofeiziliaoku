# 老非FS资料库

一个专为街头篮球游戏教学博主设计的静态资料库网站，支持腾讯云COS资源调用。

## 项目特点

- 🎮 专为街头篮球游戏角色介绍设计
- 📱 响应式设计，支持移动端访问
- ☁️ 集成腾讯云COS，支持视频、GIF等多媒体资源
- 🚀 静态部署，可直接上传到GitHub Pages
- 🎨 现代化UI设计，符合游戏风格

## 文件结构

```
老非FS资料库/
├── index.html          # 主页面
├── styles.css          # 样式文件
├── script.js           # JavaScript功能
└── README.md           # 项目说明
```

## 快速开始

### 1. 配置腾讯云COS

在 `script.js` 文件中找到 `COS_CONFIG` 配置项，填入你的腾讯云COS信息：

```javascript
const COS_CONFIG = {
    SecretId: '你的SecretId',
    SecretKey: '你的SecretKey',
    Bucket: '你的存储桶名称',
    Region: '你的地域',
    Domain: '你的COS访问域名'
};
```

### 2. 本地预览

直接在浏览器中打开 `index.html` 文件即可预览效果。

### 3. 部署到GitHub Pages

1. 将项目文件上传到GitHub仓库
2. 在仓库设置中启用GitHub Pages
3. 选择部署分支（通常是main或master）
4. 访问生成的链接即可查看网站

## 功能说明

### 主导航功能

- **超特角色介绍**: 显示各代次超特角色信息
- **职业排名**: 显示职业排名数据
- **实用技巧**: 显示游戏技巧内容
- **活动**: 显示游戏活动信息
- **FS账号**: 显示账号相关信息
- **管理端**: 管理功能入口

### 角色筛选

支持按代次筛选角色：
- 1代超特 - 9代超特
- 包含3.5、4.5、5.5、6.5、7.5等半代次

### 角色卡片

每个角色卡片包含：
- 角色图片（从COS加载）
- 角色名称
- 代次信息
- 角色描述

## 自定义配置

### 添加新角色

在 `script.js` 文件的 `charactersData` 对象中添加角色信息：

```javascript
const charactersData = {
    '5': [
        {
            id: '5_1',
            name: '角色名称',
            generation: '5代超特',
            description: '角色描述',
            image: 'characters/5gen/character.jpg'
        }
    ]
};
```

### 修改样式

编辑 `styles.css` 文件来自定义：
- 颜色主题
- 布局样式
- 响应式设计
- 动画效果

### 添加新功能

在 `script.js` 中添加新的JavaScript功能：
- 数据加载
- 用户交互
- COS文件操作

## 腾讯云COS使用

### 文件上传

使用 `uploadToCOS` 函数上传文件：

```javascript
const result = await uploadToCOS(file, 'characters/5gen/new-character.jpg');
if (result.success) {
    console.log('上传成功:', result.url);
}
```

### 文件列表获取

使用 `getCOSFileList` 函数获取文件列表：

```javascript
const files = await getCOSFileList('characters/5gen/');
console.log('文件列表:', files);
```

## 更新指南

### 添加新角色

1. 将角色图片上传到COS对应目录
2. 在 `script.js` 中添加角色数据
3. 提交代码到GitHub
4. 网站自动更新

### 修改样式

1. 编辑 `styles.css` 文件
2. 本地预览效果
3. 提交代码到GitHub
4. 网站自动更新

## 注意事项

1. **安全性**: 不要在代码中直接暴露COS的SecretKey，建议使用临时密钥或服务端代理
2. **文件大小**: 建议图片文件不超过2MB，视频文件不超过50MB
3. **文件格式**: 支持jpg、jpeg、png、gif、mp4、webm等格式
4. **命名规范**: 建议使用"时间+标题"格式命名文件，时间格式为YYYYMMDD

## 技术支持

如有问题，请联系：
- 微信：laofei90186
- 项目地址：[GitHub仓库链接]

## 更新日志

### v1.0.0 (2024-01-XX)
- 初始版本发布
- 基础角色展示功能
- 腾讯云COS集成
- 响应式设计
