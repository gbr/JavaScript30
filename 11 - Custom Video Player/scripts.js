const videoEl = document.querySelector('.viewer');
const progressEl = document.querySelector('.progress')
const progressFillEl = document.querySelector('.progress__filled');
const playButtonEl = document.querySelector('.toggle');
const volumeEl = document.querySelector('input[name="volume"]');
const playbackRateEl = document.querySelector('input[name="playbackRate"]');
const skipBackEl = document.querySelector('button[data-skip="-10');
const skipForwardEl = document.querySelector('button[data-skip="25');

let canPlay = false;

// toggle whether play/pause
function togglePlayback(e) {
    if (!canPlay) return;
    if (videoEl.paused) {
        videoEl.play();
    } else {
        videoEl.pause();
    }
}

function togglePlayButton(e) {
    if (!this.paused) {
        playButtonEl.innerText = '=';
        playButtonEl.style.transform = 'rotate(90deg)';
        playButtonEl.style.weight = '700';
        playButtonEl.style.fontSize = '22px';
    } else {
        playButtonEl.innerText = '►';
        playButtonEl.style.transform = 'rotate(0deg)';
        playButtonEl.style.weight = '400';
        playButtonEl.style.fontSize = '11px';
    }
}

// move the video progression 
function handleVideoProgression() {
    if (!canPlay) return;
    const {
        currentTime,
        duration
    } = this;
    progressFillEl.style.flexBasis = 
        currentTime / duration * 100 + '%';
}

function handleProgressClick(e) {
    if (!canPlay) return;
    let percentClicked = e.offsetX / progressEl.offsetWidth;
    videoEl.currentTime = percentClicked * videoEl.duration;
}

function handleVolumeChange() {
    if (!canPlay) return;
    videoEl.volume = volumeEl.value;
}

function handleRateChange() {
    if (!canPlay) return;
    videoEl.playbackRate = this.value;
}

function skipForward25s() {
    if (!canPlay) return;
    videoEl.currentTime += 25;
}

function skipBack10s(e) {
    if (!canPlay) return;
    videoEl.currentTime -= 10;
}

videoEl.addEventListener('play', togglePlayButton);
videoEl.addEventListener('pause', togglePlayButton);
videoEl.addEventListener('canplay', e => canPlay = true);
videoEl.addEventListener('loadeddata', () => progressFillEl.style.flexBasis = '0');
videoEl.addEventListener('click', togglePlayback);
videoEl.addEventListener('timeupdate', handleVideoProgression);
playButtonEl.addEventListener('click', togglePlayback);
progressEl.addEventListener('click', handleProgressClick);
volumeEl.addEventListener('change', handleVolumeChange);
playbackRateEl.addEventListener('change', handleRateChange);
skipBackEl.addEventListener('click', skipBack10s);
skipForwardEl.addEventListener('click', skipForward25s);