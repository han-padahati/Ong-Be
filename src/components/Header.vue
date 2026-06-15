<template>
    <header class="bg-white shadow-md sticky top-0 z-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <!-- Title 標題 (左上角) -->
            <h1 class="text-3xl font-extrabold tracking-tight">
                <span :class="currentView === 'LanguageSelect' ? 'text-gray-700' : 'text-indigo-600'">
                    {{ headerTitle }}
                </span>
            </h1>
            
            <!-- Navigation 導航 (右上角) -->
            <nav class="flex space-x-4 sm:space-x-6">
                <!-- 返回首頁按鈕 -->
                <button 
                    v-if="currentView !== 'LanguageSelect'"
                    @click="$emit('back-to-home')"
                    class="nav-link bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                    <svg class="w-5 h-5 inline-block mr-1 -mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                    返回語言選擇
                </button>

                <!-- 語料庫內部導航 -->
                <template v-if="currentView === 'LexiconApp'">
                    <button 
                        v-for="nav in lexiconNavs"
                        :key="nav.key"
                        @click="$emit('nav-change', nav.key)"
                        :class="[
                            'nav-link',
                            subPage === nav.key ? ['bg-indigo-50', 'text-indigo-700', 'font-semibold', 'shadow-inner'] : []
                        ]"
                    >
                        {{ nav.label }}
                    </button>
                </template>
            </nav>
        </div>
    </header>
</template>

<script setup>
defineProps({
    currentView: {
        type: String,
        required: true
    },
    subPage: {
        type: String,
        default: 'Search'
    },
    headerTitle: {
        type: String,
        required: true
    }
})

defineEmits(['back-to-home', 'nav-change'])

const lexiconNavs = [
    { key: 'Lexicon', label: 'IPA' },
    { key: 'Pinyin', label: 'Pinyin' },
    { key: 'Categories', label: '語意範疇' },
    { key: 'Search', label: '搜尋' },
    { key: 'IntroYongxing', label: '語言介紹' }
]
</script>

