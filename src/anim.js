let lastTime = -1;
let duration = 0;
const bpmInd = document.querySelector("#bpm");
const blockTotalWidth = 200;
const roundInd = document.querySelector("#round-ind");
const clockInd = document.querySelector("#indicator");

const blocks = [];
const beatStrength = Array(16).fill(1);
beatStrength[0] = 3;
let beeps = 4;
let currentBeep = 0;
let beepRound = 1;
const audio1 = new Audio("./assets/beep_1.wav");
const audio2 = new Audio("./assets/beep_2.wav");
const audio3 = new Audio("./assets/beep_3.wav");

function refreshColor(index) {
  blocks.forEach((e, i) => {
    if (i == index) {
      e.style.backgroundColor = "grey";
    } else {
      e.style.backgroundColor = "black";
    }
  });
}

function refreshRound() {
  roundInd.innerHTML = beepRound;
}
let timeout = null;
function tickle() {
  refreshColor(currentBeep);
  refreshClock();
  if (beatStrength[currentBeep] === 1) {
    audio1.play();
  } else if (beatStrength[currentBeep] === 2) {
    audio2.play();
  } else if (beatStrength[currentBeep] === 3) {
    audio3.play();
  }
}
const anim = (timer = performance.now()) => {
  if (lastTime == -1) {
    lastTime = timer;
    refreshRound();
    tickle();
  } else if (timer - lastTime > duration) {
    lastTime = timer;
    currentBeep++;
    currentBeep = currentBeep % beeps;
    if (currentBeep === 0) {
      beepRound++;
      refreshRound();
    }
    tickle();
  }
  timeout = setTimeout(anim, 2);
};
function refreshClock() {
  clockInd.style.transitionDuration = `${duration}ms`;
  if (currentBeep % 2 == 0) {
    clockInd.style.left = "192px";
  } else {
    clockInd.style.left = "0";
  }
}

function addBeep() {
  beeps++;
  refreshBlock();
}
function delBeep() {
  beeps--;
  refreshBlock();
}
const blockContainer = document.querySelector("#block-container");
function refreshBlock() {
  blockContainer.innerHTML = "";
  blocks.length = 0;
  for (let index = 0; index < beeps; index++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.onclick = () => {
      onBeatClicked(index);
    };
    blocks.push(block);
    blockContainer.appendChild(block);
  }
  refreshBlockSize();
}

function changeSpeed(bpm) {
  duration = (60 / bpm) * 1000;
  refreshBPM(bpm);
}

function refreshBPM(bpm) {
  bpmInd.innerText = `bpm: ${bpm}`;
}

function init() {
  refreshBlock();
  changeSpeed(100);
}
init();

function start() {
  anim();
}

function reset() {
  currentBeep = 0;
  beepRound = 1;
  clockInd.style.transitionDuration = "0ms";
  clockInd.style.left = "0px";
  lastTime = -1;
  refreshColor(-1);
}

function pause() {
  clearTimeout(timeout);
  reset();
}
function onBeatClicked(idx) {
  if (beatStrength[idx] + 1 > 3) {
    beatStrength[idx] = 1;
  } else {
    beatStrength[idx] = beatStrength[idx] + 1;
  }
  refreshBlockSize();
}
function refreshBlockSize() {
  blocks.forEach((block, idx) => {
    block.style.height = `${(beatStrength[idx] / 3) * 50}px`;
  });
}
