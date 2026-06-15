<template>
    <div class="min-h-screen text-gray-800 bg-gray-50">
        <!-- 隱藏的元素：強制 Tailwind JIT 產生動態綁定所需的顏色類別 -->
        <div class="hidden
            bg-indigo-100 border-indigo-300 hover:shadow-indigo-300/50 text-indigo-700
            bg-green-100 border-green-300 hover:shadow-green-300/50 text-green-700
            bg-amber-100 border-amber-300 hover:shadow-amber-300/50 text-amber-700
            bg-red-100 border-red-300 hover:shadow-red-300/50 text-red-700
        "></div>

        <Header 
            :current-view="currentView"
            :sub-page="subPage"
            :header-title="headerTitle"
            @back-to-home="handleBackToHome"
            @nav-change="handleNavChange"
        />

        <!-- 主要內容區 -->
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <LanguageSelect 
                v-if="currentView === 'LanguageSelect'"
                :available-languages="availableLanguages"
                @select-language="handleSelectLanguage"
            />
            <LexiconApp
                v-else-if="currentView === 'LexiconApp'"
                :sub-page="subPage"
                :language-id="currentLanguage ? currentLanguage.id : 'yongxing'"
            />
        </main>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Header from './components/Header.vue'
import LanguageSelect from './components/LanguageSelect.vue'
import LexiconApp from './components/LexiconApp.vue'

// 定義語言列表
const availableLanguages = ref([
    { id: 'yongxing', name: '永興', description: '包含 IPA、拼音、語意範疇及搜尋功能。', color: 'indigo' },
    { id: 'changliu', name: '長流', description: '包含 IPA、拼音、語意範疇及搜尋功能。', color: 'indigo' },
    { id: 'xinying', name: '新盈', description: '包含 IPA、拼音、語意範疇及搜尋功能。', color: 'indigo' },
])

// 主要應用程式狀態
const currentView = ref('LanguageSelect') // 'LanguageSelect' (首頁) 或 'LexiconApp' (檢索系統)
const currentLanguage = ref(null)
const subPage = ref('Search')

const headerTitle = computed(() => {
    if (currentView.value === 'LanguageSelect') {
        return 'Ong-Be'
    }
    return currentLanguage.value ? `${currentLanguage.value.name}詞彙檢索` : 'Ong-Be'
})

const handleSelectLanguage = async (lang) => {
    currentLanguage.value = lang
    currentView.value = 'LexiconApp'
    subPage.value = 'Search'
}

const handleBackToHome = () => {
    currentView.value = 'LanguageSelect'
    subPage.value = 'Search'
}

const handleNavChange = (page) => {
    subPage.value = page
}
</script>

