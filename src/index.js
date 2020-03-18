import "./styles.css";

const audio = document.getElementById("audio");
const startButton = document.getElementById("StartButton");
const count = document.getElementById("count");

var streamObject;
var audioRecorder;
var number = 0;
var timerset;

const Timer = () => {
  number++;
  count.innerHTML = "Recording for" + " " + number;
};

const stopAudio = () => {
  try {
    clearInterval(timerset);
    number = 0;
    count.innerHTML = "";
    audioRecorder.stop();
    startButton.removeEventListener("click", stopAudio);
    startButton.addEventListener("click", getAudio);
    startButton.innerHTML = "Start Recording";
  } catch (error) {
    console.log(error);
  }
};
const startAudio = () => {
  try {
    timerset = setInterval(Timer, 1000);
    audioRecorder = new MediaRecorder(streamObject);
    audioRecorder.start();
    audioRecorder.addEventListener("dataavailable", handleAudioData);
    startButton.addEventListener("click", stopAudio);
  } catch (error) {
    console.log(error);
  }
};
const handleAudioData = event => {
  const { data: audioFile } = event;
  console.log(audioFile);
  const link = document.createElement("a");
  link.href = URL.createObjectURL(audioFile);
  link.download = "audio.mp4";
  document.body.appendChild(link);
  link.click();
};

const getAudio = req => {
  try {
    console.log(req);
    navigator.mediaDevices
      .getUserMedia({
        audio: { type: "audio/webm;codecs=opus" }
      })
      .then(stream => {
        count.muted = true;
        startButton.innerHTML = "Stop Recoding";
        streamObject = stream;
        startAudio();
        startButton.removeEventListener("click", getAudio);
      });
  } catch (error) {
    console.log(error);
  }
};

startButton.addEventListener("click", getAudio);
