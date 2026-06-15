<template>
    <div class="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <h2 class="text-2xl font-semibold mb-6 text-gray-700">Pinyin</h2>
        
        <!-- Pinyin Navigation Bar (拼音導航列) -->
        <div class="flex flex-wrap gap-2 p-3 bg-indigo-50 rounded-lg mb-6 shadow-inner justify-center">
            <button
                v-for="char in pinyinOrder"
                :key="char"
                @click="setPinyinFilter(char)"
                :class="{ 
                    'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-300': currentPinyinFilter === char,
                    'bg-white text-gray-700 hover:bg-indigo-100': currentPinyinFilter !== char 
                }"
                class="px-3 py-1.5 font-bold text-lg rounded-md transition duration-150 ease-in-out border border-gray-200 text-sm sm:text-base"
            >
                {{ char }} <span class="text-xs">({{ groupedPinyin[char] ? groupedPinyin[char].length : 0 }})</span>
            </button>
        </div>

        <!-- Pinyin Results -->
        <div class="overflow-x-auto bg-gray-50 rounded-lg shadow-inner border border-gray-200">
            <table v-if="filteredPinyin.length > 0" class="min-w-full divide-y divide-gray-200">
                <thead class="bg-indigo-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gloss Pinyin</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gloss Chinese</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entry</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Note</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="item in filteredPinyin" :key="item.entry" class="hover:bg-indigo-50 transition duration-100 ease-in-out">
                        <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{{ item.gloss_pinyin }}</td>
                        <td class="px-6 py-4 text-sm text-gray-700 whitespace-normal">{{ item.gloss_chinese }}</td>
                        <td class="px-6 py-4 font-medium text-gray-900 flex items-center whitespace-nowrap">
                            <span class="mr-2">{{ item.entry }}</span>
                            <AudioButton :fileName="item.hashed_audio_file" />
                        </td>
                        <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{{ item.category }}</td>
                        <NoteCell :item="item" />
                    </tr>
                </tbody>
            </table>
            <div v-else class="p-8 text-center text-gray-500">
                找不到以 "{{ currentPinyinFilter.toUpperCase() }}" 開頭的拼音詞條。
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { pinyinOrder } from '../composables/useLexiconData'
import AudioButton from './AudioButton.vue'
import NoteCell from './NoteCell.vue'

const props = defineProps({
    data: {
        type: Array,
        required: true
    },
    groupedPinyin: {
        type: Object,
        required: true
    }
})

const currentPinyinFilter = ref(pinyinOrder[0])

const filteredPinyin = computed(() => {
    const results = props.groupedPinyin[currentPinyinFilter.value] || []
    
    // 根據 gloss_pinyin 進行 A->Z 排序
    return results.slice().sort((a, b) => {
        const pinyinA = a.gloss_pinyin.toLowerCase()
        const pinyinB = b.gloss_pinyin.toLowerCase()
        if (pinyinA < pinyinB) return -1
        if (pinyinA > pinyinB) return 1
        return 0
    })
})

const setPinyinFilter = (char) => {
    currentPinyinFilter.value = char
}
</script>

