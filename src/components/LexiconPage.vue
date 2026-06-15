<template>
    <div class="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <h2 class="text-2xl font-semibold mb-6 text-gray-700">IPA</h2>
        
        <!-- Character Navigation Bar (子音導航列) -->
        <div class="flex flex-wrap gap-2 p-3 bg-indigo-50 rounded-lg mb-6 shadow-inner justify-center">
            <button
                v-for="char in consonantOrder"
                :key="char"
                @click="setLexiconFilter(char)"
                :class="{ 
                    'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-300': currentLexiconFilter === char,
                    'bg-white text-gray-700 hover:bg-indigo-100': currentLexiconFilter !== char 
                }"
                class="px-3 py-1.5 font-bold text-lg rounded-md transition duration-150 ease-in-out border border-gray-200 text-sm sm:text-base"
            >
                {{ char }} <span class="text-xs">({{ groupedLexicon[char] ? groupedLexicon[char].length : 0 }})</span>
            </button>
        </div>

        <!-- Lexicon Results -->
        <div class="overflow-x-auto bg-gray-50 rounded-lg shadow-inner border border-gray-200">
            <table v-if="filteredLexicon.length > 0" class="min-w-full divide-y divide-gray-200">
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
                    <tr v-for="item in filteredLexicon" :key="item.entry" class="hover:bg-indigo-50 transition duration-100 ease-in-out">
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
                找不到以 "{{ currentLexiconFilter }}" 開頭的詞條。
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { consonantOrder } from '../composables/useLexiconData'
import AudioButton from './AudioButton.vue'
import NoteCell from './NoteCell.vue'

const props = defineProps({
    data: {
        type: Array,
        required: true
    },
    groupedLexicon: {
        type: Object,
        required: true
    }
})

const currentLexiconFilter = ref(consonantOrder[0])

const filteredLexicon = computed(() => {
    return props.groupedLexicon[currentLexiconFilter.value] || []
})

const setLexiconFilter = (char) => {
    currentLexiconFilter.value = char
}
</script>

