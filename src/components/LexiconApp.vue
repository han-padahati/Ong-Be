<template>
    <div>
        <!-- 載入狀態 / 錯誤訊息 -->
        <template v-if="isLoading">
            <div class="text-center p-12 text-xl text-indigo-500">
                資料載入中，請稍候...
                <div class="mt-4 animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto"></div>
            </div>
        </template>
        <template v-else-if="error">
            <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-lg" role="alert">
                <p class="font-bold">資料載入錯誤</p>
                <p>無法從 CSV 連結獲取或解析資料。錯誤訊息: {{ error }}</p>
            </div>
        </template>
        <template v-else>
            <SearchPage v-if="subPage === 'Search'" :data="data" />
            <LexiconPage v-else-if="subPage === 'Lexicon'" :data="data" :grouped-lexicon="groupedLexicon" />
            <PinyinPage v-else-if="subPage === 'Pinyin'" :data="data" :grouped-pinyin="groupedPinyin" />
            <CategoriesPage 
                v-else-if="subPage === 'Categories'" 
                :data="data" 
                :grouped-categories="groupedCategories"
                :category-order="categoryOrder"
            />
        </template>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useLexiconData } from '../composables/useLexiconData'
import SearchPage from './SearchPage.vue'
import LexiconPage from './LexiconPage.vue'
import PinyinPage from './PinyinPage.vue'
import CategoriesPage from './CategoriesPage.vue'

const props = defineProps({
    subPage: {
        type: String,
        required: true
    },
    languageId: {
        type: String,
        default: 'yongxing'
    }
})

const { data, isLoading, error, fetchData, groupedLexicon, groupedPinyin, groupedCategories, categoryOrder } = useLexiconData(props.languageId)

// 在組件掛載時載入資料
onMounted(() => {
    fetchData()
})
</script>

