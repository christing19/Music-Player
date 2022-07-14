const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next')

// Music library
const songs = [
    {
        name: 'dlmlg',
        displayName: "Don't Let Me Let Go",
        artist: 'Dillon Francis, ILLENIUM, EVAN GIIA',
    },
    {
        name: 'starlight',
        displayName: 'Starlight (Keep Me Afloat)',
        artist: 'Martin Garrix, DubVision ft. Shaun Farrugia',
    }, 
    {
        name: 'mtyn',
        displayName: 'More Than You Know',
        artist: 'Axwell & Ingrosso',
    }, 
    {
        name: 'sya',
        displayName: 'See You Again',
        artist: 'Seven Lions, Jason Ross & Fiora',
    }, 
];

// Check if playing 
let isPlaying = false;

// Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.png`;
}

// Current song
let songIndex = 0;

// Prev song
function prevSong() {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    // console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
}

// Next song
function nextSong() {
    songIndex++;

    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    // console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
}

// On load, select first song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;

        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);

        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }

        // Delay switching duration element to avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        // Calculate display for current
        const currentMinutes = Math.floor(currentTime / 60);

        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`; 
        }

        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// Set progress bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;

    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}

// Event listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);

document.body.onkeyup = function(e) {
    if (e.keyCode === 32) {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    } else if (e.keyCode === 39) {
        nextSong();
    } else if (e.keyCode === 37) {
        prevSong();
    }
}
