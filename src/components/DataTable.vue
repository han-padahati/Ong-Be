<template>
    <div class="overflow-x-auto bg-gray-50 rounded-lg shadow-inner border border-gray-200">
        <table v-if="items.length > 0" class="min-w-full divide-y divide-gray-200">
            <thead class="bg-indigo-50">
                <tr>
                    <th 
                        v-for="column in columns" 
                        :key="column.key"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        {{ column.label }}
                    </th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                <tr 
                    v-for="item in items" 
                    :key="item.entry" 
                    class="hover:bg-indigo-50 transition duration-100 ease-in-out"
                >
                    <!-- Entry 欄位 -->
                    <td class="px-6 py-4 font-medium text-gray-900 flex items-center whitespace-nowrap">
                        <span class="mr-2">{{ item.entry }}</span>
                        <AudioButton :fileName="item.hashed_audio_file" />
                    </td>
                    
                    <!-- 其他欄位 -->
                    <template v-for="column in otherColumns" :key="column.key">
                        <td 
                            v-if="column.key === 'note'"
                            class="px-6 py-4 text-sm text-gray-500 whitespace-normal"
                        >
                            <div v-if="item.note && item.note.trim() !== ''">{{ item.note }}</div>
                            <div v-for="(subItem, idx) in item.subItems" :key="idx" class="mt-1 flex items-center">
                                <span class="mr-2">{{ subItem.entry }}</span>
                                <span v-if="subItem.gloss_chinese && subItem.gloss_chinese.trim() !== ''" class="text-gray-600 mr-2">
                                    ({{ subItem.gloss_chinese }})
                                </span>
                                <span v-if="subItem.gloss_pinyin && subItem.gloss_pinyin.trim() !== ''" class="text-gray-500 mr-2">
                                    [{{ subItem.gloss_pinyin }}]
                                </span>
                                <AudioButton :fileName="subItem.hashed_audio_file" size="small" />
                            </div>
                        </td>
                        <td 
                            v-else
                            :class="[
                                'px-6 py-4 text-sm',
                                column.key === 'gloss_chinese' ? 'text-gray-700 whitespace-normal' : 'text-gray-500 whitespace-nowrap'
                            ]"
                        >
                            {{ item[column.key] }}
                        </td>
                    </template>
                </tr>
            </tbody>
        </table>
        <div v-else-if="emptyMessage" class="p-8 text-center text-gray-500">
            {{ emptyMessage }}
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import AudioButton from './AudioButton.vue'

const props = defineProps({
    items: {
        type: Array,
        required: true
    },
    columns: {
        type: Array,
        required: true
    },
    emptyMessage: {
        type: String,
        default: ''
    }
})

const otherColumns = computed(() => {
    return props.columns.filter(col => col.key !== 'entry')
})
</script>

