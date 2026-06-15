<template>
    <div class="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <h2 class="text-2xl font-semibold mb-6 text-gray-700">搜尋</h2>

        <!-- 篩選條件輸入區 -->
        <div class="flex flex-col sm:flex-row gap-4 mb-6 items-center">
            <!-- 欄位選擇下拉式選單 -->
            <select 
                v-model="searchField" 
                @change="searchTerm = ''"
                class="flex-shrink-0 w-full sm:w-auto p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
            >
                <option value="entry">IPA</option>
                <option value="gloss_chinese">中文釋義</option>
                <option value="gloss_pinyin">Pinyin</option>
            </select>
            
            <!-- 關鍵字輸入框 -->
            <input
                type="text"
                v-model="searchTerm"
                @keyup.enter="handleSearch"
                placeholder="輸入關鍵字進行篩選..."
                class="flex-grow w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
            />

            <!-- 篩選按鈕 -->
            <button
                @click="handleSearch"
                class="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out"
            >
                篩選
            </button>
        </div>

        <!-- 篩選結果顯示 -->
        <template v-if="currentQuery.length > 0">
            <div class="text-sm text-gray-500 mb-4">
                已找到 <span class="font-semibold text-indigo-600">{{ filteredResults.length }}</span> 筆結果
            </div>
        </template>

        <!-- 結果表格 -->
        <div class="overflow-x-auto bg-gray-50 rounded-lg shadow-inner border border-gray-200">
            <table v-if="filteredResults.length > 0" class="min-w-full divide-y divide-gray-200">
                <thead class="bg-indigo-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entry</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gloss Chinese</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gloss Pinyin</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Note</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="item in filteredResults" :key="item.entry" class="hover:bg-indigo-50 transition duration-100 ease-in-out">
                        <!-- Entry (詞條) 欄位 -->
                        <td class="px-6 py-4 font-medium text-gray-900 flex items-center whitespace-nowrap">
                            <span class="mr-2">{{ item.entry }}</span>
                            <AudioButton :fileName="item.hashed_audio_file" />
                        </td>
                        <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{{ item.category }}</td>
                        <td class="px-6 py-4 text-sm text-gray-700 whitespace-normal">{{ item.gloss_chinese }}</td>
                        <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{{ item.gloss_pinyin }}</td>
                        <NoteCell :item="item" />
                    </tr>
                </tbody>
            </table>
            <div v-else-if="currentQuery.length > 0" class="p-8 text-center text-gray-500">
                沒有找到符合篩選條件 "<span class="font-semibold text-gray-600">{{ currentQuery }}</span>" 的結果。
            </div>
            <div v-else class="p-8 text-center text-gray-500">
                請選擇欄位並輸入關鍵字開始檢索。
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { converter } from '../utils/textConverter'
import AudioButton from './AudioButton.vue'
import NoteCell from './NoteCell.vue'

const props = defineProps({
    data: {
        type: Array,
        required: true
    }
})

const searchTerm = ref('')
const searchField = ref('entry')
const filteredResults = ref([])
const currentQuery = ref('')

const handleSearch = () => {
    const term = converter(searchTerm.value.trim().toLowerCase())
    const field = searchField.value
    
    if (term.length === 0) {
        filteredResults.value = []
        currentQuery.value = ''
        return
    }
    
    const results = props.data.filter(item => {
        const value = item[field]?.toString().toLowerCase() || ''
        return value.includes(term)
    })

    currentQuery.value = term
    filteredResults.value = results
}
</script>

