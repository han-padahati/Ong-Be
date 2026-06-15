<template>
    <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-700 mb-2">歡迎使用Ong-Be檢索系統</h2>
        <p class="text-xl text-gray-500 mb-10">請選擇您要檢索的語言：</p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- 語言卡片列表 -->
            <div v-for="lang in availableLanguages" :key="lang.id">
                <div
                    :class="[
                        'p-6 sm:p-8 rounded-xl shadow-lg transform hover:scale-[1.02] transition duration-300 ease-in-out cursor-pointer h-full flex flex-col justify-between',
                        `bg-${lang.color}-100 border border-${lang.color}-300 hover:shadow-xl hover:shadow-${lang.color}-300/50`
                    ]"
                    @click="selectLanguage(lang)"
                >
                    <h3 :class="['text-2xl font-bold mb-2', `text-${lang.color}-700`]">
                        {{ lang.name }}
                    </h3>
                    <p class="text-gray-600 mb-4 flex-grow">{{ lang.description }}</p>

                    <button
                        :class="[
                            'px-4 py-2 font-semibold rounded-lg shadow-md transition duration-150 ease-in-out',
                            `bg-${lang.color}-600 text-white hover:bg-${lang.color}-700`
                        ]"
                    >
                        進入檢索頁面
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    availableLanguages: {
        type: Array,
        required: true
    }
})

const emit = defineEmits(['select-language'])

const selectLanguage = (lang) => {
    emit('select-language', lang)
}
</script>

