# Ong-Be 詞彙檢索系統

這是一個使用 Vue 3 + Vite 構建的詞彙檢索系統，用於檢索永興語詞彙。

## 項目結構

```
Yongxing/
├── src/
│   ├── components/          # Vue 組件
│   │   ├── AudioButton.vue      # 音檔播放按鈕
│   │   ├── CategoriesPage.vue   # 語意範疇頁面
│   │   ├── DataTable.vue        # 數據表格組件
│   │   ├── Header.vue           # 標頭組件
│   │   ├── LanguageSelect.vue   # 語言選擇頁面
│   │   ├── LexiconApp.vue       # 詞彙檢索主應用
│   │   ├── LexiconPage.vue      # IPA 頁面
│   │   ├── NoteCell.vue         # Note 欄位組件
│   │   ├── PinyinPage.vue       # 拼音頁面
│   │   └── SearchPage.vue       # 搜尋頁面
│   ├── composables/         # Vue Composables
│   │   ├── useAudio.js          # 音檔播放邏輯
│   │   └── useLexiconData.js    # 詞彙數據邏輯
│   ├── utils/               # 工具函數
│   │   ├── csvParser.js         # CSV 解析器
│   │   └── textConverter.js      # 簡轉繁轉換器
│   ├── App.vue              # 主應用組件
│   ├── main.js              # 入口文件
│   └── style.css            # 全局樣式
├── audio/                   # 音檔目錄
├── index.html               # HTML 入口
├── package.json             # 項目配置
├── vite.config.js           # Vite 配置
├── tailwind.config.js       # Tailwind CSS 配置
└── postcss.config.js        # PostCSS 配置
```

## 安裝依賴

```bash
npm install
```

## 開發模式

```bash
npm run dev
```

開發服務器將在 `http://localhost:3000` 啟動。

## 構建生產版本

```bash
npm run build
```

構建的文件將輸出到 `dist/` 目錄。

## 預覽生產版本

```bash
npm run preview
```

## 技術棧

- **Vue 3** - 前端框架
- **Vite** - 構建工具
- **Tailwind CSS** - CSS 框架
- **OpenCC** - 簡體轉繁體中文

## 功能特性

- 語言選擇頁面
- 詞彙搜尋功能
- IPA 詞彙瀏覽（按子音分類）
- 拼音詞彙瀏覽（按首字母分類）
- 語意範疇瀏覽（按分類）
- 音檔播放功能
- 支援 root 關係的 Note 顯示

## 開發說明

### 組件說明

- `App.vue`: 主應用組件，管理路由和狀態
- `Header.vue`: 標頭組件，包含導航
- `LanguageSelect.vue`: 語言選擇頁面
- `LexiconApp.vue`: 詞彙檢索主應用，管理數據載入
- `SearchPage.vue`: 搜尋頁面
- `LexiconPage.vue`: IPA 詞彙頁面
- `PinyinPage.vue`: 拼音詞彙頁面
- `CategoriesPage.vue`: 語意範疇頁面
- `AudioButton.vue`: 可重用的音檔播放按鈕
- `NoteCell.vue`: Note 欄位組件，支援顯示子項目

### Composables

- `useLexiconData`: 管理詞彙數據的載入、分組和處理
- `useAudio`: 管理音檔播放功能

### 工具函數

- `csvParser`: 解析 CSV 文件
- `textConverter`: 簡體轉繁體中文

