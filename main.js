const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
let searchQuery = "";
const APP_ID = "9f3e955c";
const APP_KEY = "697e39fbda613a7ed6247705abf91c3d";
let data = "";
let from = 0;
let to = 20;
const searchIcon = document.getElementById("search-icon");
const next = document.querySelector(".next");
const previous = document.querySelector(".previous");
let dietCheckList = document.getElementById("list1");
let allergiesCheckList = document.getElementById("list2");
let cusineCheckList = document.getElementById("list3");

let allergies = "";
let cusine = "";
let diets = [];

let diet = document.querySelectorAll(".diet");

diet.forEach((checkbox) => {
  checkbox.addEventListener("change", (event) => {
    if (event.target.checked) {
      diets.push(event.target.value);
      console.log(diets);
    } else {
      diets.pop(event.target.value);
    }
  });
});





searchForm.addEventListener("submit", search);
searchIcon.addEventListener("click", search);

function search(e) {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  console.log(searchQuery);
  fetchAPI();
}

async function fetchAPI() {
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=${to}&from=${from}`;
  const response = await fetch(baseURL);
  data = await response.json();
  generateHTML(data.hits);
  console.log(response);
  console.log(data);
}

function generateHTML(results) {
  container.classList.remove("initial");
  next.classList.remove("initial");
  let generatedHTML = "";
  results.map((result) => {
    generatedHTML += `
        <div class="search-result">
          <div class="item">
            <img src="${result.recipe.image}" alt="" />
            <div class="flex-container">
              <h1 class="title">${result.recipe.label}</h1>
              <a class="view-link" href="${
                result.recipe.url
              }" target="_blank">View Recipe</a>
            </div>
            <p class="item-data">Calories: ${result.recipe.calories.toFixed(
              2
            )}</p>
            <p class="item-data">Diet label: ${
              result.recipe.dietLabels.length > 0
                ? result.recipe.dietLabels
                : "No Data Found"
            }</p>
            <p class="item-data">Health label: ${result.recipe.healthLabels}</p>
          </div>
        </div>
        `;
  });
  searchResultDiv.innerHTML = generatedHTML;
}

dietCheckList.getElementsByClassName("anchor")[0].onclick = function () {
  if (dietCheckList.classList.contains("visible")) {
    dietCheckList.classList.remove("visible");
  } else {
    dietCheckList.classList.add("visible");
  }
};

allergiesCheckList.getElementsByClassName("anchor")[0].onclick = function () {
  if (allergiesCheckList.classList.contains("visible"))
    allergiesCheckList.classList.remove("visible");
  else allergiesCheckList.classList.add("visible");
};

cusineCheckList.getElementsByClassName("anchor")[0].onclick = function () {
  if (cusineCheckList.classList.contains("visible"))
    cusineCheckList.classList.remove("visible");
  else cusineCheckList.classList.add("visible");
};

next.addEventListener("click", function () {
  if (data.count > to) {
    from += 20;
    to += 20;
    previous.classList.remove("initial");
    fetchAPI();
    topFunction();
  }
});

previous.addEventListener("click", function () {
  if (from > 0) {
    from -= 20;
    to -= 20;
    next.classList.remove("initial");
    if (data.count < to) {
      next.classList.add("initial");
    }
    if (from < 1) {
      previous.classList.add("initial");
    }
    fetchAPI();
    topFunction();
  }
});

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
