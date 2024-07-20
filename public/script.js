const audio = document.getElementById('audio');
const playButton = document.getElementById('play');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const volumeSlider = document.getElementById('volume');
const trackImage = document.getElementById('track-image');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const progress = document.getElementById('progress');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');

let isPlaying = false;
let currentTrack = 0;

const tracks = [
  { 
    src: 'song/song1.mp3', 
    img: 'images/song1.png',
    title: 'Choo Loo', 
    artist: 'Local Train' 
  },
  
  { 
    src: 'song/song2.mp3', 
    img: 'images/song2.png', 
    title: 'Unstoppable', 
    artist: 'Sia' 
  },
  
  { 
    src: 'song/song3.mp3', 
    img: 'images/song3.png', 
    title: 'Nandaaniyan', 
    artist: 'Akshath' 
  },
  
  {
    src: 'song/song4.mp3', 
    img: 'images/song4.png', 
    title: 'Perfect', 
    artist: 'Ed Sherran' 
  }

];

function loadTrack(index) {
  
    audio.src = tracks[index].src;
    trackImage.src = tracks[index].img;
    trackTitle.textContent = tracks[index].title;
    trackArtist.textContent = tracks[index].artist;
    audio.load();

}

function playPause() {
  if (isPlaying) {
    
    audio.pause();
    playButton.textContent = '►';

  } else {
    
    audio.play();
    playButton.textContent = '❚❚';
  }

  isPlaying = !isPlaying;
}

function prevTrack() {
  
    currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrack);
  if (isPlaying) audio.play();
  
}

function nextTrack() {
    
    currentTrack = (currentTrack + 1) % tracks.length;
    loadTrack(currentTrack);
    if (isPlaying) audio.play();
}

function updateProgress() {
  
    if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progress.value = progressPercent;
        updateTimeDisplay();

  }
}

function setProgress(e) {
  
    const newTime = (e.target.value / 100) * audio.duration;
    audio.currentTime = newTime;
}

function updateTimeDisplay() {
  
    const currentMinutes = Math.floor(audio.currentTime / 60);
    const currentSeconds = Math.floor(audio.currentTime % 60);
    const durationMinutes = Math.floor(audio.duration / 60);
    const durationSeconds = Math.floor(audio.duration % 60);

  
    currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
    durationDisplay.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
}


playButton.addEventListener('click', playPause);
prevButton.addEventListener('click', prevTrack);
nextButton.addEventListener('click', nextTrack);
volumeSlider.addEventListener('input', (e) => {
  audio.volume = e.target.value;
});
audio.addEventListener('timeupdate', updateProgress);
progress.addEventListener('input', setProgress);
audio.addEventListener('loadedmetadata', updateTimeDisplay);
audio.addEventListener('ended', nextTrack);

loadTrack(currentTrack);
