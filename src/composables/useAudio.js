import { audioBaseUrl } from './useLexiconData'

export function useAudio() {
    const playAudio = (fileName) => {
        if (!fileName) return

        // 為了讓瀏覽器能直接播放，需要使用 GitHub 的 raw 連結
        const fullAudioUrl = `${audioBaseUrl}${fileName}`
        
        try {
            const audio = new Audio(fullAudioUrl)
            
            audio.play().catch(e => {
                console.error("Audio play failed, possibly due to browser autoplay policy:", e)
            })
            
            audio.onerror = () => {
                console.error('音檔載入或播放失敗:', fullAudioUrl)
            }

        } catch (e) {
            console.error("Error creating audio object:", e)
        }
    }

    return {
        playAudio
    }
}

