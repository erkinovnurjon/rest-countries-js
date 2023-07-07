const countriesElem = document.querySelector(".countries");
const dropDown = document.querySelector(".dropDown");
const dropElem = document.querySelector(".drop");
const regions = document.querySelectorAll(".region");
const search = document.querySelector(".search");
const toggle = document.querySelector(".toggle");
const moon = document.querySelector(".moon");
const countryModal = document.querySelector(".countryModal");

async function getCountry() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    console.log(data);
    showCountry(data);
  } catch (error) {
    console.error(error);
  }
};

function showCountry(data) {
  data.forEach((country) => {
    const countryElem = document.createElement("div");
    countryElem.classList.add("country");
    countryElem.innerHTML = `
      <div class="country-img">
        <img src="${country.flags.png}" alt="">
      </div>
      <div class="country-info">
        <h5 class="countryName">${country.name.common}</h5>
        <p><strong>Population:</strong> ${country.population}</p>
        <p class="regionName"><strong>Region:</strong> ${country.region}</p>
        <p><strong>Capital:</strong> ${country.capital}</p>
      </div>
    `;
    countriesElem.appendChild(countryElem);
    countryElem.addEventListener("click", () => {
      showCountryDetail(country);
    });
  });
};

const regionName = document.getElementsByClassName("regionName");
const countryName = document.getElementsByClassName("countryName");

getCountry();

dropDown.addEventListener("click", () => {
  dropElem.classList.toggle("showDropDown");
  console.log("hello");
});
dropDown.addEventListener("click", () => {
  dropElem.classList.toggle2("showDropDown");
  console.log("hello");
});

regions.forEach((region) => {
  region.addEventListener("click", () => {
    Array.from(regionName).forEach((name) => {
      if (
        name.innerText.includes(region.innerText) ||
        region.innerText === "All"
      ) {
        name.parentElement.parentElement.style.display = "grid";
      } else {
        name.parentElement.parentElement.style.display = "none";
      }
    });
  });
});

search.addEventListener("input", () => {
  Array.from(countryName).forEach((name) => {
    if (name.innerText.toLowerCase().includes(search.value.toLowerCase())) {
      name.parentElement.parentElement.style.display = "grid";
    } else {
      name.parentElement.parentElement.style.display = "none";
    }
  });
});

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  moon.classList.toggle("fa");
});

function showCountryDetail(country) {
    countryModal.classList.toggle("show");
    countryModal.innerHTML = `
      <button class="back">back</button>
      <div class="modal">
        <div class="leftModal">
          <img src="${country.flags.png}" alt="">
        </div>
        <div class="rightModal">
          <h1>${country.name.common}</h1>
          <div class="modalInfo">
            <div class="innerLEFT inner">
              <p><strong>Native:</strong> ${country.nativeName?.common || ""}</p>
              <p><strong>Population:</strong> ${country.population}</p>
              <p><strong>Region:</strong> ${country.region}</p>
              <p><strong>SubRegion:</strong> ${country.subregion}</p>
            </div>
            <div class="innerRight inner">
              <p><strong>Capital:</strong> ${country.capital}</p>
              <p><strong>Top Level Domain:</strong> ${country.topLevelDomain?.map((domain) => domain).join(", ") || ""}</p>
              <p><strong>Currencies:</strong> ${country.currencies ? Object.values(country.currencies).map((currency) => currency.name).join(", ") : ""}</p>
              <p><strong>Languages:</strong> ${country.languages ? Object.values(country.languages).map((language) => language).join(", ") : ""}</p>
            </div>
          </div>
        </div>
      </div>`;
  
    const back = countryModal.querySelector(".back");
    back.addEventListener("click", () => {
      countryModal.classList.toggle("show");
    });
  };

  
