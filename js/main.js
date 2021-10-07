"use strict";
let lng, lat;
const cityName = document.getElementById("city-name");
const searchCity = document.getElementById("search-city");
const tempDegree = document.querySelector(".temperature-degree");
const tempDiv = document.querySelector(".temperature");
const timeZone = document.querySelector(".location-timezone");
const tempDesc = document.querySelector(".temperature-description");
const apiKey = "d3fbf2b1bd263206c599d1c0f2568eae";

console.log(cityName);

searchCity.addEventListener("click", function () {
  let insertedCityName = cityName.value;
  console.log(insertedCityName);
  getCityData(insertedCityName);
  // cityName.value = "";
});

const time = 19800 / 60 / 60;
console.log(Intl.DateTimeFormat().resolvedOptions());

const getCityData = async function (insCity) {
  try {
    const request = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${insCity}&appid=${apiKey}`
    );
    const response = await request.json();
    console.log(response);

    //gaurd class
    if (!response) return;

    renderHtml(response);
  } catch (error) {
    console.error(new Error("Error while fetching"));
  }
};

const renderHtml = function (response) {
  const { temp } = response.main;
  tempDegree.innerHTML = temp;

  timeZone.textContent = `Timezone - 
  UTC${response.timezone / 60 / 60} hrs`;
  tempDesc.innerHTML = ``;
  response.weather.forEach((ele) => {
    tempDesc.innerHTML = `${ele.main} - ${ele.description}`;
  });
  // const html = response.weather
  //   .map(
  //     (ele) =>
  //       `<div class="temperature-description">
  //     ${ele.main} - ${ele.description}
  //   </div>`
  //   )
  //   .join("");
  // document.querySelector("temperature-description").remove();
  // tempDiv.insertAdjacentHTML("beforeend", html);
};
/*
https://api.openweathermap.org/data/2.5/weather?q=mumbai&appid=d3fbf2b1bd263206c599d1c0f2568eae
*/
