# Vue 組件功能說明與新增語言指南

## 📁 組件架構總覽

```
src/
├── App.vue                    # 主應用（路由控制）
├── components/
│   ├── Header.vue            # 標頭導航
│   ├── LanguageSelect.vue    # 語言選擇頁面
│   ├── LexiconApp.vue        # 詞彙檢索主容器
│   ├── SearchPage.vue        # 搜尋頁面
│   ├── LexiconPage.vue       # IPA 詞彙頁面
│   ├── PinyinPage.vue        # 拼音詞彙頁面
│   ├── CategoriesPage.vue    # 語意範疇頁面
│   ├── AudioButton.vue       # 音檔播放按鈕（可重用）
│   ├── NoteCell.vue          # Note 欄位組件（可重用）
│   └── DataTable.vue         # 數據表格組件（可重用，目前未使用）
└── composables/
    ├── useLexiconData.js     # 詞彙數據管理
    └── useAudio.js           # 音檔播放邏輯
```

---

## 🎯 各組件功能說明

### 1. **App.vue** - 主應用組件
**功能：**
- 管理整個應用的路由狀態（`currentView`）
- 管理子頁面狀態（`subPage`）
- 定義可用語言列表
- 處理語言選擇和頁面切換

**關鍵狀態：**
- `currentView`: `'LanguageSelect'` 或 `'LexiconApp'`
- `subPage`: `'Search'`, `'Lexicon'`, `'Pinyin'`, `'Categories'`, `'IntroYongxing'`
- `availableLanguages`: 語言列表配置

---

### 2. **Header.vue** - 標頭導航組件
**功能：**
- 顯示應用標題
- 顯示返回按鈕（當不在首頁時）
- 顯示語料庫內部導航（IPA、Pinyin、語意範疇、搜尋、語言介紹）

**Props：**
- `currentView`: 當前視圖
- `subPage`: 當前子頁面
- `headerTitle`: 標題文字

**Events：**
- `@back-to-home`: 返回首頁
- `@nav-change`: 切換子頁面

---

### 3. **LanguageSelect.vue** - 語言選擇頁面
**功能：**
- 顯示所有可用語言的卡片
- 處理語言選擇事件

**Props：**
- `availableLanguages`: 語言列表

**Events：**
- `@select-language`: 選擇語言時觸發

---

### 4. **LexiconApp.vue** - 詞彙檢索主容器
**功能：**
- 載入詞彙數據（使用 `useLexiconData` composable）
- 管理載入狀態和錯誤處理
- 根據 `subPage` 顯示不同的子頁面組件

**Props：**
- `subPage`: 要顯示的子頁面

**子組件：**
- `SearchPage` - 搜尋頁面
- `LexiconPage` - IPA 頁面
- `PinyinPage` - 拼音頁面
- `CategoriesPage` - 語意範疇頁面

---

### 5. **SearchPage.vue** - 搜尋頁面
**功能：**
- 提供搜尋表單（欄位選擇 + 關鍵字輸入）
- 執行搜尋並顯示結果
- 支援按 IPA、中文釋義、Pinyin 搜尋

**Props：**
- `data`: 詞彙數據陣列

**功能特點：**
- 使用簡轉繁轉換器處理搜尋關鍵字
- 顯示搜尋結果表格
- 支援音檔播放和 Note 子項目顯示

---

### 6. **LexiconPage.vue** - IPA 詞彙頁面
**功能：**
- 按子音（consonant）分類顯示詞彙
- 提供子音導航按鈕
- 顯示每個子音下的詞彙數量

**Props：**
- `data`: 詞彙數據陣列
- `groupedLexicon`: 按子音分組的數據

**功能特點：**
- 使用 `consonantOrder` 定義子音順序
- 支援多字組子音（如 'tsh', 'kh', 'ph'）

---

### 7. **PinyinPage.vue** - 拼音詞彙頁面
**功能：**
- 按拼音首字母分類顯示詞彙
- 提供字母導航按鈕
- 自動按拼音排序

**Props：**
- `data`: 詞彙數據陣列
- `groupedPinyin`: 按拼音首字母分組的數據

**功能特點：**
- 欄位順序：Gloss Pinyin → Gloss Chinese → Entry → Category → Note
- 自動 A-Z 排序

---

### 8. **CategoriesPage.vue** - 語意範疇頁面
**功能：**
- 按語意範疇（Category）分類顯示詞彙
- 提供分類導航按鈕
- 自動初始化第一個分類

**Props：**
- `data`: 詞彙數據陣列
- `groupedCategories`: 按分類分組的數據
- `categoryOrder`: 分類排序列表

**功能特點：**
- 自動按字母順序排序分類
- 自動選擇第一個分類

---

### 9. **AudioButton.vue** - 音檔播放按鈕（可重用組件）
**功能：**
- 顯示音檔播放圖標
- 處理音檔播放邏輯

**Props：**
- `fileName`: 音檔檔名
- `size`: 按鈕大小（'normal' 或 'small'）

---

### 10. **NoteCell.vue** - Note 欄位組件（可重用組件）
**功能：**
- 顯示原始 Note 內容
- 顯示子項目（有 root 值的項目）
- 為子項目提供音檔播放按鈕

**Props：**
- `item`: 詞彙項目對象（包含 `note` 和 `subItems`）

---

## 🆕 如何新增新語言

### 步驟 1: 在 App.vue 中添加語言配置

編輯 `src/App.vue`，在 `availableLanguages` 陣列中添加新語言：

```vue
const availableLanguages = ref([
    { id: 'yongxing', name: '永興', description: '包含 IPA、拼音、語意範疇及搜尋功能。', color: 'indigo' },
    { id: 'new_language', name: '新語言', description: '新語言的描述。', color: 'green' }, // 👈 新增這行
    { id: 'another_a', name: '其他語言 A', description: '（尚未開放）', color: 'green' },
    { id: 'another_b', name: '其他語言 B', description: '（尚未開放）', color: 'red' },
])
```

**配置說明：**
- `id`: 語言的唯一識別碼（用於內部邏輯）
- `name`: 顯示的語言名稱
- `description`: 語言描述
- `color`: Tailwind 顏色主題（'indigo', 'green', 'red', 'blue', 'purple' 等）

---

### 步驟 2: 在 App.vue 中添加語言處理邏輯

在 `handleSelectLanguage` 函數中添加新語言的處理：

```vue
const handleSelectLanguage = async (lang) => {
    if (lang.id === 'yongxing') {
        currentLanguage.value = lang
        currentView.value = 'LexiconApp'
        subPage.value = 'Search'
    } else if (lang.id === 'new_language') { // 👈 新增這個條件
        currentLanguage.value = lang
        currentView.value = 'LexiconApp'  // 或創建新的視圖
        subPage.value = 'Search'
        // 可以在這裡載入新語言的數據
    } else {
        console.log(`${lang.name} 尚未開放.`)
    }
}
```

---

### 步驟 3: 配置數據來源（可選）

如果新語言使用不同的 CSV 數據源，需要修改 `src/composables/useLexiconData.js`：

**選項 A：使用同一個 composable，但根據語言切換數據源**

```javascript
// 在 useLexiconData.js 中
export function useLexiconData(languageId = 'yongxing') {
    // 根據 languageId 選擇不同的 CSV URL
    const csvUrlMap = {
        'yongxing': 'https://raw.githubusercontent.com/han-padahati/temp/refs/heads/main/output4.csv',
        'new_language': 'https://your-repo/new-language-data.csv', // 👈 新語言的數據源
    }
    
    const csvUrl = csvUrlMap[languageId] || csvUrlMap['yongxing']
    // ... 其餘代碼
}
```

然後在 `LexiconApp.vue` 中傳入語言 ID：

```vue
// LexiconApp.vue
const { data, isLoading, error, fetchData, ... } = useLexiconData(props.languageId)
```

**選項 B：創建新的 composable**

如果新語言有完全不同的數據結構或處理邏輯，可以創建 `src/composables/useNewLanguageData.js`：

```javascript
// useNewLanguageData.js
export function useNewLanguageData() {
    // 新語言的數據處理邏輯
    // ...
}
```

---

### 步驟 4: 自定義子音順序（如果需要）

如果新語言使用不同的 IPA 子音順序，在 `src/composables/useLexiconData.js` 中：

```javascript
// 為不同語言定義不同的子音順序
export const consonantOrderMap = {
    'yongxing': ['ʔ', 'ɓ', 'ɗ', 'h', 'k', 'kh', 'l', 'm', 'n', 'ŋ', 'ph', 's', 'tsh', 't', 'v', 'z'],
    'new_language': ['a', 'b', 'c', 'd', ...], // 👈 新語言的子音順序
}

export function useLexiconData(languageId = 'yongxing') {
    const consonantOrder = consonantOrderMap[languageId] || consonantOrderMap['yongxing']
    // ...
}
```

---

### 步驟 5: 自定義拼音順序（如果需要）

類似地，可以為不同語言定義不同的拼音順序：

```javascript
export const pinyinOrderMap = {
    'yongxing': ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'w', 'x', 'y', 'z'],
    'new_language': ['a', 'b', 'c', ...], // 👈 新語言的拼音順序
}
```

---

### 步驟 6: 配置音檔路徑（如果需要）

如果新語言使用不同的音檔倉庫，修改 `src/composables/useLexiconData.js`：

```javascript
export const audioBaseUrlMap = {
    'yongxing': 'https://raw.githubusercontent.com/han-padahati/Yongxing/main/audio/',
    'new_language': 'https://your-repo/audio/', // 👈 新語言的音檔路徑
}
```

---

## 📝 完整範例：新增「台語」語言

### 1. 在 App.vue 中添加：

```vue
const availableLanguages = ref([
    { id: 'yongxing', name: '永興', description: '包含 IPA、拼音、語意範疇及搜尋功能。', color: 'indigo' },
    { id: 'taiwanese', name: '台語', description: '台語詞彙檢索系統。', color: 'blue' }, // 👈 新增
    // ...
])

const handleSelectLanguage = async (lang) => {
    if (lang.id === 'yongxing') {
        currentLanguage.value = lang
        currentView.value = 'LexiconApp'
        subPage.value = 'Search'
    } else if (lang.id === 'taiwanese') { // 👈 新增
        currentLanguage.value = lang
        currentView.value = 'LexiconApp'
        subPage.value = 'Search'
    } else {
        console.log(`${lang.name} 尚未開放.`)
    }
}
```

### 2. 在 useLexiconData.js 中配置數據源：

```javascript
const csvUrlMap = {
    'yongxing': 'https://raw.githubusercontent.com/han-padahati/temp/refs/heads/main/output4.csv',
    'taiwanese': 'https://your-repo/taiwanese-data.csv', // 👈 新增
}
```

---

## 🎨 樣式自定義

如果需要為新語言使用不同的顏色主題，確保在 `App.vue` 的隱藏元素中包含該顏色：

```vue
<div class="hidden 
    bg-indigo-100 border-indigo-300 hover:shadow-indigo-300/50 text-indigo-700 
    bg-green-100 border-green-300 hover:shadow-green-300/50 text-green-700
    bg-red-100 border-red-300 hover:shadow-red-300/50 text-red-700
    bg-blue-100 border-blue-300 hover:shadow-blue-300/50 text-blue-700  <!-- 👈 新增藍色 -->
"></div>
```

---

## ✅ 檢查清單

新增語言時，確認以下項目：

- [ ] 在 `App.vue` 的 `availableLanguages` 中添加語言配置
- [ ] 在 `handleSelectLanguage` 中添加語言處理邏輯
- [ ] 配置 CSV 數據源（如果需要）
- [ ] 配置音檔路徑（如果需要）
- [ ] 自定義子音順序（如果需要）
- [ ] 自定義拼音順序（如果需要）
- [ ] 在樣式中添加顏色類別（如果需要新顏色）
- [ ] 測試所有功能是否正常運作

---

## 💡 提示

1. **保持組件可重用**：現有的頁面組件（SearchPage、LexiconPage 等）都是可重用的，只要數據格式一致，新語言可以直接使用。

2. **數據格式**：確保新語言的 CSV 數據格式與現有格式一致（entry, hashed_audio_file, pos, gloss_chinese, gloss_pinyin, category, note, cross_ref, root）。

3. **漸進式開發**：可以先添加語言配置，然後逐步完善數據處理邏輯。

4. **使用 Composables**：將語言特定的邏輯封裝在 composables 中，保持組件簡潔。


