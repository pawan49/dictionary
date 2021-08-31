const input = document.querySelector("#input");
const button = document.querySelector(".btn");
const notFound = document.querySelector(".not-found");
const def = document.querySelector(".def");
const sound = document.querySelector("#sound");
const loading = document.querySelector(".loading");

button.addEventListener("click", function (e) {
  e.preventDefault();

  //clear data
  notFound.innerText = "";
  def.innerText = "";
  sound.style.display = "none";

  //get data

  const word = input.value;

  if (word === "") {
    alert("enter word");
    return;
  }
  getData(word);
});

async function getData(word) {
  loading.style.display = "block";
  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );
  const data = await response.json();
  //data not found
  if (!data.length) {
    loading.style.display = "none";
    notFound.innerText = "No Result Found!";
    return;
  }
  //if data found

  const definition = data[0].meanings[0].definitions[0].definition;
  def.innerText = definition;
  loading.style.display = "none";
  //   audio
  const audio = data[0].phonetics[0].audio;
  sound.src = audio;
  sound.style.display = "block";
  console.log(data);
}
