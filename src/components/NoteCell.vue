<template>
    <td class="px-6 py-4 text-sm text-gray-500 whitespace-normal">
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
</template>

<script setup>
import AudioButton from './AudioButton.vue'

defineProps({
    item: {
        type: Object,
        required: true
    }
})
</script>

