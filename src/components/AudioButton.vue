<template>
    <button 
        v-if="fileName" 
        @click.stop="playAudio(fileName)" 
        title="播放音檔"
        :class="size === 'small' ? 'w-4 h-4' : 'w-5 h-5'"
        class="text-indigo-500 hover:text-indigo-700 focus:outline-none p-1 rounded-full hover:bg-indigo-100 transition duration-150 flex-shrink-0"
    >
        <svg fill="currentColor" viewBox="0 0 260 228" class="w-full h-full">
            <path d="M170.81,78.043l15.653-15.653c14.848,12.299,24.323,30.868,24.323,51.61c0,21.04-9.757,39.836-24.974,52.128l-15.68-15.68
                c11.291-8.184,18.655-21.469,18.655-36.448C188.786,99.32,181.719,86.262,170.81,78.043z M236,114
                c0,28.068-12.569,53.253-32.371,70.231l15.584,15.584C242.982,178.82,258,148.133,258,114c0-33.836-14.757-64.286-38.168-85.265
                L204.257,44.31C223.696,61.28,236,86.229,236,114z M146,2L56.4,66H2v96h54.4l89.6,64V2z"/>
        </svg>
    </button>
</template>

<script setup>
import { useAudio } from '../composables/useAudio'

const props = defineProps({
    fileName: {
        type: String,
        default: null
    },
    size: {
        type: String,
        default: 'normal', // 'normal' or 'small'
        validator: (value) => ['normal', 'small'].includes(value)
    }
})

const { playAudio } = useAudio()
</script>

