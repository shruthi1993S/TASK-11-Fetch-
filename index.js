
const loadAPI =  () => {
  
  const fetchUrl = fetch("https://restcountries.com/v2/all")
    .then((response) => response.json())
    .then((data) => displayCountries(data));

  // Displaying all countries

  const displayCountries = (countries) => {
    const countriesHTML = countries.map((country) => getcountry(country));
console.log(countriesHTML)
    const container = document.getElementById("countries");
    container.innerHTML = `<div class="row">${countriesHTML}</div>`;
  };

  //  Getting data & appending it to HTML

  const getcountry = (country) => {
    return `
  
 <div class="row col-lg-4 col-sm-12 bgcolor">
 <div class="card ">
 <div class="card-header" >
   <h3 >${country.name}</h3>
 </div>
    <img src="${country.flag}" class=" rounded mx-auto d-block" alt="countries flag width:200px height:150px " />
    <div class="card-body">
      <h5 class="card-title">Capital: ${country.capital}</h5>
      <h5 class="card-title">Region: ${country.region}</h5>
      <h5 class="card-title">Country-code: ${country.alpha3Code}</h5>
      <h5 class="card-title">LatLng: ${country.latlng}</h5>
      <button class="btn btn-primary "onclick="callweather('${country.name}')">Click for Weather Data</button>
       <div class="info" id="weatherReport${country.name}"> </div>
    </div>
</div>
      
   
</div>
 `;
  };
};
loadAPI()

const weatherData = async (val) => {
  const weatherURL = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${val}&appid=0017437fe8e3e7b7ad13296a438190a7&units=metric`
  );

  let responseWeather = await weatherURL.json();
  console.log(responseWeather);
  return responseWeather;
};

async function callweather(val) {
  try {
    console.log(val);
    const response = await weatherData(val);

    const getData = document.getElementById(`weatherReport${val}`);
    getData.innerHTML = ` 
    Weather :   ${response.weather[0].description}<br>
    Temperature : ${response.main.temp}°C <br>
    Humidity:     ${response.main.humidity}
    `;
  } catch (err) {
    console.log("Error");
  }
}
