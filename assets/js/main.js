// functions
const showCard = async () => {
  body.style.backgroundColor = "#262c3a";

  const response = await fetch(
    `https://rickandmortyapi.com/api/character/
    ${Math.floor(Math.random() * 100)}`
  );
  const data = await response.json();

  image.innerHTML = `
    <img
      src="${data.image}"
      class="w-100"
      alt="${data.name}"
    />
  `;

  // <li>Resposta <span>${data.name}</span></li>

  description.innerHTML = `
    <li><b>Status</b> <span>${data.status}</span></li>
    <li><b>Espécie</b> <span>${data.species}</span></li>
    <li><b>Gênero</b> <span>${data.gender}</span></li>
    <li><b>Origem</b> <span>${data.origin.name}</span></li>
    <li><b>Última localização</b> <span>${data.location.name}</span></li>
  `;

  localStorage.setItem("rightAnswer", data.name.toLowerCase());

  showScore();
};

const showScore = () => {
  if (localStorage.getItem("score") === null)
    localStorage.setItem("score", "0");

  score.innerHTML = localStorage.getItem("score");
};

const addScore = () => {
  localStorage.setItem(
    "score",
    String(parseInt(localStorage.getItem("score")) + 1)
  );
};

const subScore = () => {
  localStorage.setItem(
    "score",
    String(parseInt(localStorage.getItem("score")) - 1)
  );
};

const checkAnswer = evt => {
  evt.preventDefault();

  const answer = input.value.toLowerCase().trim();

  if (answer === "") return;

  if (answer === localStorage.getItem("rightAnswer")) {
    body.style.backgroundColor = "#30af2d";
    addScore();
  } else {
    subScore();
    body.style.backgroundColor = "#d44343";
  }

  input.value = "";
  input.focus();

  showScore();
  setTimeout(() => {
    showCard();
  }, 500);
};

// selectors
const image = document.querySelector("#image");
const description = document.querySelector("#description");
const score = document.querySelector("#score");
const form = document.querySelector("#form");
const input = document.querySelector("#form input");
const h1 = document.querySelector("h1");
const body = document.querySelector("body");

// events
window.onload = showCard;
form.onsubmit = checkAnswer;
