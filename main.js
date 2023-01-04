const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
const body = document.querySelector("body");
const span = document.querySelectorAll("span");
const ul = document.querySelectorAll("ul");

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
let macrosCheckList = document.getElementById("list4");
let diet = document.querySelectorAll(".diet");
let diets = [];
let dietType = "";
let allergy = document.querySelectorAll(".allergies");
let allergies = [];
let healthLabel = "";
let cuisine = document.querySelectorAll(".cuisine");
let cuisines = [];
let cuisineType = "";
let macro = document.querySelectorAll(".macros");
let macros = [];
let macroType = "";

searchForm.addEventListener("submit", search);
searchIcon.addEventListener("click", search);

function search(e) {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  console.log(searchQuery);
  fetchAPI();
}

async function fetchAPI() {
  searchFilters();
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=${to}&from=${from}${cuisineType}${healthLabel}${dietType}${macroType}`;
  const response = await fetch(baseURL);
  data = await response.json();
  generateHTML(data.hits);
  console.log(response);
  console.log(data);
}

function generateHTML(results) {
  hideAllCheckLists();
  container.classList.remove("initial");
  next.classList.remove("initial");
  body.classList.remove("initial");
  searchIcon.classList.remove("initial-icon");
  span.forEach((item) => item.classList.remove("initial"));
  ul.forEach((item) => item.classList.remove("initial"));
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

function searchFilters() {
  if (cuisines.length !== 0) {
    cuisineType = "&cuisineType=" + cuisines.join("&cuisineType=");
    console.log(cuisineType);
  } else {
    cuisineType = "";
  }

  if (allergies.length !== 0) {
    healthLabel = "&health=" + allergies.join("&health=");
    console.log(healthLabel);
  } else {
    healthLabel = "";
  }

  if (diets.length !== 0) {
    dietType = "&health=" + diets.join("&health=");
    console.log(dietType);
  } else {
    dietType = "";
  }

  if (macros.length !== 0) {
    macroType = "&diet=" + macros.join("&diet=");
    console.log(dietType);
  } else {
    macroType = "";
  }
}

diet.forEach((checkbox) => {
  checkbox.addEventListener("change", (event) => {
    if (event.target.checked) {
      diets.push(event.target.value);
      console.log(diets);
    } else {
      diets.pop(event.target.value);
      console.log(diets);
    }
  });
});

allergy.forEach((checkbox) => {
  checkbox.addEventListener("change", (event) => {
    if (event.target.checked) {
      allergies.push(event.target.value);
      console.log(allergies);
    } else {
      allergies.pop(event.target.value);
      console.log(allergies);
    }
  });
});

cuisine.forEach((checkbox) => {
  checkbox.addEventListener("change", (event) => {
    if (event.target.checked) {
      cuisines.push(event.target.value);
      console.log(cuisines);
    } else {
      cuisines.pop(event.target.value);
      console.log(cuisines);
    }
  });
});

macro.forEach((checkbox) => {
  checkbox.addEventListener("change", (event) => {
    if (event.target.checked) {
      macros.push(event.target.value);
      console.log(macros);
    } else {
      macros.pop(event.target.value);
      console.log(macros);
    }
  });
});

dietCheckList.getElementsByClassName("anchor")[0].onclick = function () {
  if (dietCheckList.classList.contains("visible")) {
    dietCheckList.classList.remove("visible");
  } else {
    hideAllCheckLists();
    dietCheckList.classList.add("visible");
  }
};

allergiesCheckList.getElementsByClassName("anchor")[0].onclick = function () {
  if (allergiesCheckList.classList.contains("visible")) {
    allergiesCheckList.classList.remove("visible");
  } else {
    hideAllCheckLists();
    allergiesCheckList.classList.add("visible");
  }
};

cusineCheckList.getElementsByClassName("anchor")[0].onclick = function () {
  if (cusineCheckList.classList.contains("visible")) {
    cusineCheckList.classList.remove("visible");
  } else {
    hideAllCheckLists();
    cusineCheckList.classList.add("visible");
  }
};

macrosCheckList.getElementsByClassName("anchor")[0].onclick = function () {
  if (macrosCheckList.classList.contains("visible")) {
    macrosCheckList.classList.remove("visible");
  } else {
    hideAllCheckLists();
    macrosCheckList.classList.add("visible");
  }
};

function hideAllCheckLists() {
  macrosCheckList.classList.remove("visible");
  cusineCheckList.classList.remove("visible");
  allergiesCheckList.classList.remove("visible");
  dietCheckList.classList.remove("visible");
}

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
