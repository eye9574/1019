const countdown = document.getElementById("倒數");
const today = new Date();
today.setHours(0, 0, 0, 0);

const firstPerformance = new Date(2026, 10, 7);
const daysUntilPerformance = Math.ceil(
    (firstPerformance - today) / (1000 * 60 * 60 * 24)
);

if (countdown) {
    countdown.textContent = daysUntilPerformance > 0
        ? `還有 ${daysUntilPerformance} 天`
        : daysUntilPerformance === 0
            ? "今天開演！"
            : "巡演已開始";
}

const audioFileInput = document.getElementById("audio-file");
const audioPlayer = document.getElementById("audio-player");
const audioStatus = document.getElementById("audio-status");
const trackTitle = document.getElementById("track-title");
let currentAudioUrl;

audioFileInput?.addEventListener("change", () => {
    const file = audioFileInput.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("audio/")) {
        audioStatus.textContent = "請選擇有效的音訊檔案。";
        audioFileInput.value = "";
        return;
    }

    if (currentAudioUrl) URL.revokeObjectURL(currentAudioUrl);
    currentAudioUrl = URL.createObjectURL(file);
    audioPlayer.src = currentAudioUrl;
    trackTitle.textContent = file.name.replace(/\.[^.]+$/, "");
    audioStatus.textContent = `已載入「${file.name}」，按下播放即可試聽。`;
    audioPlayer.load();
});
