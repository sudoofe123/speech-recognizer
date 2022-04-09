const main = document.querySelector("main");

const voicesSelect = document.getElementById("voices");
const textarea = document.getElementById("text");
const readBtn = document.getElementById("read");
const toggleBtn = document.getElementById("toggle");
const closeBtn = document.getElementById("close");

const data = [
  {
    image: "./img/drink.jpg",
    text: "I'm Thristy",
  },
  {
    image: "./img/angry.jpg",
    text: "I'm Angry",
  },
  {
    image: "./img/food.jpg",
    text: "I'm Hungry",
  },
  {
    image: "./img/grandma.jpg",
    text: "This is grandma",
  },
  {
    image: "./img/happy.jpg",
    text: "I'm happy",
  },
  {
    image: "./img/home.jpg",
    text: "I'm in home",
  },
  {
    image: "./img/hurt.jpg",
    text: "I'm hurted",
  },
  {
    image: "./img/outside.jpg",
    text: "I'm outside",
  },
  {
    image: "./img/sad.jpg",
    text: "I'm sad",
  },
  {
    image: "./img/scared.jpg",
    text: "I'm scared",
  },
  {
    image: "./img/school.jpg",
    text: "I'm in school",
  },
  {
    image: "./img/tired.jpg",
    text: "I'm Tired",
  },
];

// data.forEach((item) => {
//   console.log(item);
// });

data.forEach(createBox);
// create speech box

function createBox(item) {
  // console.log(item); all the images and text got selected

  const box = document.createElement("div");

  const { image, text } = item;
  box.classList.add("box");
  box.innerHTML = `<img src="${image}" alt="${text}">
<p class="info">${text} </p> `;

  box.addEventListener("click", () => {
    setTextMessage(text);

    speakText();

    //add active effect

    box.classList.add("active");
    setTimeout(() => box.classList.remove("active"), 800);
  });

  //@todo=speak event

  //speak event
  box.addEventListener("click", () => {
    setTextMessage();

    speakText();

    //add active effect
    box.classList.add("active");
    setTimeout(() => box.classList.remove("active"), 800);
  });

  main.appendChild(box);
}

//init speech synth
const message = new SpeechSynthesisUtterance();

//store voices
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement("option");

    option.value = voice.name;

    option.innerText = `${voice.name} ${voice.lang} `;

    voicesSelect.appendChild(option);
  });
}

//set text

function setTextMessage(text) {
  message.text = text;
}
//speak text
function speakText() {
  speechSynthesis.speak(message);
}
//voices changed

//set voice
function setVoice(e) {
  message.voice = voices.find((voice) => voice.name === e.target.value);
}

speechSynthesis.addEventListener("voiceschanged", getVoices);

//toggle text box

toggleBtn.addEventListener("click", function () {
  document.getElementById("text-box").classList.toggle("show");
});

//close btn
closeBtn.addEventListener("click", function () {
  document.getElementById("text-box").classList.remove("show");

  // document.getElementById("text-box").style.display = "none";
});

voicesSelect.addEventListener("change", setVoice);

//read text button

readBtn.addEventListener("click", () => {
  setTextMessage(textarea.value);

  speakText();
});

getVoices();
