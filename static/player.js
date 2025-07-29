// /static/js/script.js

const audio = document.getElementById('audio');
const playPauseButton = document.getElementById('playPause');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const progressBar = document.getElementById('progressBar');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');

const songs = [
  { title: 'Song 1', src: '/static/media/song1.mp3' },
  { title: 'Song 2', src: '/static/media/song2.mp3' },
  { title: 'Song 3', src: '/static/media/song3.mp3' }
];

let currentSongIndex = 0;
let isPlaying = false;

// Function to play/pause the audio
playPauseButton.addEventListener('click', () => {
  if (isPlaying) {
    audio.pause();
    playPauseButton.textContent = '▶️'; // Play button
  } else {
    audio.play();
    playPauseButton.textContent = '⏸️'; // Pause button
  }
  isPlaying = !isPlaying;
});

// Function to update the progress bar
audio.addEventListener('timeupdate', () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progress;

  currentTimeDisplay.textContent = formatTime(audio.currentTime);
});

// Function to update the duration display
audio.addEventListener('loadedmetadata', () => {
  durationDisplay.textContent = formatTime(audio.duration);
});

// Function to format time (e.g., 2:05 -> 02:05)
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Function to skip to a new time based on progress bar change
progressBar.addEventListener('input', () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
});

// Function to go to the next song
nextButton.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
});

// Function to go to the previous song
prevButton.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
});

// Function to load a song based on the index
function loadSong(index) {
  audio.src = songs[index].src;
  audio.load();
  audio.play();
  playPauseButton.textContent = '⏸️'; // Set to pause when a song is playing
  isPlaying = true;
}
