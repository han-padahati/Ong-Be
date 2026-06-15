import { ref, computed } from 'vue'
import { yongxingData } from '../data/yongxingData'
import { changliuData } from '../data/changliuData'
import { xinyingData } from '../data/xinyingData'

export const audioBaseUrl = 'https://raw.githubusercontent.com/han-padahati/Yongxing/main/audio/'

const dataSourceMap = {
    yongxing: yongxingData,
    changliu: changliuData,
    xinying: xinyingData,
}

// 定義 Lexicon (IPA) 的子音順序（首字列表）
export const consonantOrder = ['ʔ', 'ɓ', 'ɗ', 'h', 'k', 'kh', 'l', 'm', 'n', 'ŋ', 'ph', 's', 'tsh', 't', 'v', 'z']
// 優先檢查多字組的順序，確保 'tsh' 在 't' 之前檢查
export const prioritizedInitials = ['tsh', 'kh', 'ph', 'ʔ', 'ɓ', 'ɗ', 'h', 'k', 'l', 'm', 'n', 'ŋ', 's', 't', 'v', 'z']

// 定義 Pinyin 的首字順序
export const pinyinOrder = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'w', 'x', 'y', 'z']

export function useLexiconData(languageId = 'yongxing') {
    const data = ref([])
    const isLoading = ref(false)
    const error = ref(null)

    // 從 JS 模組載入資料（取代原本的 fetch CSV）
    const fetchData = () => {
        isLoading.value = true
        error.value = null

        try {
            const sourceData = dataSourceMap[languageId] || yongxingData
            const parsedData = sourceData.map(item => ({ ...item, subItems: [] }))

            // 處理 root 關係：將有 root 值的項目掛到對應母詞條的 subItems 下
            const rootMap = {}
            parsedData.forEach(item => { rootMap[item.entry] = item })

            parsedData.forEach(item => {
                const rootValue = item.root?.trim()
                if (rootValue && rootValue !== 'None') {
                    const rootItem = rootMap[rootValue]
                    if (rootItem) rootItem.subItems.push(item)
                }
            })

            // 過濾掉子項目，使其不出現在主列表中
            data.value = parsedData.filter(item => {
                const rootValue = item.root?.trim()
                return !rootValue || rootValue === 'None'
            })

        } catch (err) {
            console.error('資料載入錯誤:', err)
            error.value = err.message || '未知錯誤'
            data.value = []
        } finally {
            isLoading.value = false
        }
    }

    // 找出詞條的開頭子音（處理多字組如 'tsh'）
    const getInitial = (entry) => {
        if (!entry) return null
        const lowerEntry = entry.toLowerCase()
        
        // 依優先順序檢查
        for (const initial of prioritizedInitials) {
            if (lowerEntry.startsWith(initial)) {
                return initial
            }
        }
        return null // 不符合任何定義的子音
    }

    // 將所有詞條按子音分組
    const groupedLexicon = computed(() => {
        const groups = {}
        
        // 初始化分組，確保所有定義的子音鍵都存在
        consonantOrder.forEach(char => groups[char] = [])

        data.value.forEach(item => {
            const initial = getInitial(item.entry)
            if (initial && groups[initial]) {
                groups[initial].push(item)
            }
        })

        return groups
    })

    // 找出拼音的首字母 (只取第一個字元)
    const getPinyinInitial = (pinyin) => {
        if (!pinyin) return null
        // 移除可能存在的聲調符號，然後取第一個字元
        const cleanedPinyin = pinyin.toLowerCase().replace(/[āáǎàēéěèīíǐìōóǒòūúǔùüǖǘǚǜ]/g, (char) => {
            switch (char) {
                case 'ā': case 'á': case 'ǎ': case 'à': return 'a'
                case 'ē': case 'é': case 'ě': case 'è': return 'e'
                case 'ī': case 'í': case 'ǐ': case 'ì': return 'i'
                case 'ō': case 'ó': case 'ǒ': case 'ò': return 'o'
                case 'ū': case 'ú': case 'ǔ': case 'ù': return 'u'
                case 'ǖ': case 'ǘ': case 'ǚ': case 'ǜ': return 'v' // 'ü' in pinyin is sometimes written as 'v'
                default: return char
            }
        })
        
        const initial = cleanedPinyin.charAt(0)
        return pinyinOrder.includes(initial) ? initial : null
    }
    
    // 將所有詞條按拼音首字母分組
    const groupedPinyin = computed(() => {
        const groups = {}
        
        // 初始化分組，確保所有定義的拼音鍵都存在
        pinyinOrder.forEach(char => groups[char] = [])

        data.value.forEach(item => {
            const initial = getPinyinInitial(item.gloss_pinyin)
            if (initial && groups[initial]) {
                groups[initial].push(item)
            }
        })

        return groups
    })

    // 將所有詞條按 Category 分組
    const groupedCategories = computed(() => {
        const groups = {}
        data.value.forEach(item => {
            // 如果 category 欄位為空，可以歸類為 '未分類'
            const category = item.category && item.category.trim() !== '' ? item.category.trim() : '未分類'
            if (!groups[category]) {
                groups[category] = []
            }
            groups[category].push(item)
        })
        return groups
    })

    // 獲取分類名稱的排序列表
    const categoryOrder = computed(() => {
        // 取得所有分類名稱並按字母順序排序
        return Object.keys(groupedCategories.value).sort()
    })

    return {
        data,
        isLoading,
        error,
        fetchData,
        groupedLexicon,
        groupedPinyin,
        groupedCategories,
        categoryOrder
    }
}

