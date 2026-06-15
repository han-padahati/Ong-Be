# 快速開始指南

## 第一步：安裝依賴

在項目根目錄執行：

```bash
npm install
```

這會安裝所有必要的依賴包，包括：
- Vue 3
- Vite
- Tailwind CSS
- OpenCC (簡轉繁)

## 第二步：啟動開發服務器

```bash
npm run dev
```

開發服務器會在 `http://localhost:3000` 啟動，瀏覽器會自動打開。

## 第三步：開始開發

現在你可以：
- 編輯 `src/` 目錄下的 Vue 組件
- 修改樣式在 `src/style.css`
- 添加新的組件到 `src/components/`
- 添加新的 composables 到 `src/composables/`

## 構建生產版本

當你準備好部署時：

```bash
npm run build
```

構建的文件會在 `dist/` 目錄中。

## 項目結構說明

- **src/components/**: 所有 Vue 組件
- **src/composables/**: 可重用的邏輯（類似 Vue 2 的 mixins）
- **src/utils/**: 工具函數
- **src/App.vue**: 主應用組件
- **src/main.js**: 應用入口點

## 注意事項

- 原始的 `index.html` 文件已經被新的 Vue 項目結構替換
- 如果你需要保留原始文件，可以將其重命名為 `index.old.html`
- 所有功能都已經遷移到新的組件結構中

