<template>
    <div class="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <h2 class="text-2xl font-semibold mb-6 text-gray-700">語意範疇</h2>
        
        <template v-if="categoryOrder.length > 0">
            <!-- Category Navigation Bar (分類導航列) -->
            <div class="flex flex-wrap gap-2 p-3 bg-indigo-50 rounded-lg mb-6 shadow-inner justify-center">
                <button
                    v-for="category in categoryOrder"
                    :key="category"
                    @click="setCategoryFilter(category)"
                    :class="{ 
                        'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-300': currentCategoryFilter === category,
                        'bg-white text-gray-700 hover:bg-indigo-100': currentCategoryFilter !== category 
                    }"
                    class="px-3 py-1.5 font-bold text-lg rounded-md transition duration-150 ease-in-out border border-gray-200 text-sm sm:text-base whitespace-nowrap"
                >
                    {{ category }} <span class="text-xs">({{ groupedCategories[category] ? groupedCategories[category].length : 0 }})</span>
                </button>
            </div>

            <!-- Category Results -->
            <div class="overflow-x-auto bg-gray-50 rounded-lg shadow-inner border border-gray-200">
                <table v-if="filteredCategories.length > 0" class="min-w-full divide-y divide-gray-200">
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
                        <tr v-for="item in filteredCategories" :key="item.entry" class="hover:bg-indigo-50 transition duration-100 ease-in-out">
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
                <div v-else class="p-8 text-center text-gray-500">
                    找不到屬於分類 "{{ currentCategoryFilter }}" 的詞條。
                </div>
            </div>
        </template>
        <template v-else>
            <div class="p-8 text-center text-gray-500">
                資料中未找到任何分類 (Category) 資訊。
            </div>
        </template>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import AudioButton from './AudioButton.vue'
import NoteCell from './NoteCell.vue'

const props = defineProps({
    data: {
        type: Array,
        required: true
    },
    groupedCategories: {
        type: Object,
        required: true
    },
    categoryOrder: {
        type: Array,
        required: true
    }
})

const currentCategoryFilter = ref(null)

const filteredCategories = computed(() => {
    if (!currentCategoryFilter.value) return []
    return props.groupedCategories[currentCategoryFilter.value] || []
})

const setCategoryFilter = (category) => {
    currentCategoryFilter.value = category
}

// 監聽 categoryOrder 變化，初始化分類篩選
watch(() => props.categoryOrder, (newOrder) => {
    if (newOrder.length > 0 && !currentCategoryFilter.value) {
        currentCategoryFilter.value = newOrder[0]
    }
}, { immediate: true })
</script>

