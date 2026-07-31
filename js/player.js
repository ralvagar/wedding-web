const audio = document.getElementById('wedding-song');
const playBtn = document.getElementById('play-pause-btn');
const playIcon = document.getElementById('play-icon');
const pauseIcon = document.getElementById('pause-icon');
const seekSlider = document.getElementById('seek-slider');
const currentTimeElement = document.getElementById('current-time');
const durationElement = document.getElementById('duration');

const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// 1. Play & Pause Button Logic (UPDATED)
playBtn.addEventListener('click', () => {
    // If the slider is completely at the end, rewind to the start before playing
    if (audio.currentTime >= audio.duration) {
        audio.currentTime = 0;
    }

    if (audio.paused) {
        audio.play();
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
    } else {
        audio.pause();
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    }
});

// 2. Load the track duration
const setDuration = () => {
    seekSlider.max = Math.floor(audio.duration);
    durationElement.textContent = formatTime(audio.duration);
};

if (audio.readyState > 0) {
    setDuration();
} else {
    audio.addEventListener('loadedmetadata', setDuration);
}

// 3. Update the slider and timer as the song plays
audio.addEventListener('timeupdate', () => {
    seekSlider.value = Math.floor(audio.currentTime);
    currentTimeElement.textContent = formatTime(audio.currentTime);
    updateSliderColor();
});

// 4. Allow user to drag the slider to skip ahead
seekSlider.addEventListener('input', () => {
    audio.currentTime = seekSlider.value;
    updateSliderColor();
});

// 5. Left Button: Restart the song
prevBtn.addEventListener('click', () => {
    audio.currentTime = 0;
    updateSliderColor();
});

// 6. Right Button: Jump to the end (UPDATED)
nextBtn.addEventListener('click', () => {
    audio.currentTime = audio.duration;
    // Force the visuals directly to the finish line
    seekSlider.value = seekSlider.max; 
    currentTimeElement.textContent = durationElement.textContent; 
    updateSliderColor(); 
});

// 7. Reset icons when the song ends (UPDATED)
audio.addEventListener('ended', () => {
    playIcon.style.display = 'block'; 
    pauseIcon.style.display = 'none'; 
    
    // Lock the visuals at 100% instead of rewinding
    seekSlider.value = seekSlider.max;
    currentTimeElement.textContent = durationElement.textContent;
    updateSliderColor();
});

// Math to convert seconds into 00:00 format
function formatTime(secs) {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Fills the progress bar with green as it moves
function updateSliderColor() {
    const percentage = (seekSlider.value / seekSlider.max) * 100;
    seekSlider.style.background = `linear-gradient(to right, #6A7B58 ${percentage}%, #d3d3d3 ${percentage}%)`;
}