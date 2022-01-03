const audio = new Audio("./assets/metronome0-1.wav");
const audio1 = new Audio("./assets/a_1.wav");
const audio2 = new Audio("./assets/beep_3.wav");
let i = 0;
let start = 0;
function play() {
  bb();
  start = Date.now();
  setInterval(() => {
    let diff = Date.now() - start;
    start = Date.now();
    console.log(`-------${i}--${diff}-------`);
  }, 15 * 1000);
}

function bb() {
  setInterval(() => {
    audio2.play();
    i++;
  }, (60 / 190) * 1000);
}
