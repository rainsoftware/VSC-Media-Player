const BACKWARD_SECONDS = 10;
const FORWARD_SECONDS = 10;
const $video = document.querySelector("#player");
const $play = document.querySelector("#play");
const $pause = document.querySelector("#pause");
const $forward = document.querySelector("#forward");
const $backward = document.querySelector("#backward");
const $progress = document.querySelector("#progress");
const $selectVideoBtn = document.querySelector("#selectVideoBtn");
const $fileInput = document.querySelector("#fileInput");
const $videoTitleDisplay = document.querySelector("#videoTitleDisplay");

const player = require('play-sound')();

$selectVideoBtn.addEventListener("click", handleSelectVideo);
$play.addEventListener("click", handlePlay);
$pause.addEventListener("click", handlePause);
$backward.addEventListener("click", handleBackward);
$forward.addEventListener("click", handleForward);
$video.addEventListener("loadedmetadata", handleVideoLoaded);
$video.addEventListener("timeupdate", handleTimeUpdate);
$progress.addEventListener("input", handleProgressInput);

function handleSelectVideo() {
  $fileInput.click();
}

$fileInput.addEventListener("change", function () {
  const file = this.files[0];

  if (file) {
    const objectURL = URL.createObjectURL(file);
    $video.src = objectURL;
    $video.load(); // Load the new video source
    $video.play(); // Start playing the new video

    // Get the title of the selected video and display it
    const fileName = file.name;
    displayVideoTitle(fileName);

    // Play the audio using play-sound
    player.play(objectURL, (err) => {
      if (err) console.error(err);
    });
  }
});

function displayVideoTitle(title) {
  $videoTitleDisplay.textContent = title;
}

function handlePlay() {
  $video.play();
  $play.hidden = true;
  $pause.hidden = false;
}

function handlePause() {
  $video.pause();
  $play.hidden = false;
  $pause.hidden = true;
}

function handleBackward() {
  $video.currentTime -= BACKWARD_SECONDS;
}

function handleForward() {
  $video.currentTime += FORWARD_SECONDS;
}

function handleVideoLoaded() {
  $progress.max = $video.duration;
}

function handleTimeUpdate() {
  $progress.value = $video.currentTime;
}

function handleProgressInput() {
  $video.currentTime = $progress.value;
}
