function fetchRestCountriesData() {
  fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
      const countries = data.slice(0, 21); // Get only the first 10 countries for simplicity

      // Call the  function for create cards of each country
      createCards(countries);
    })
    .catch(error => console.error('Error:', error));
}


function createCards(countries) {
  const cardContainer = document.getElementById('cardContainer');

  countries.forEach(country => {
    const card = document.createElement('div');
    card.className = 'col-lg-4 col-sm-12 mb-3';

    const cardContent = `
      <div class="card">
        <div class="card-header">${country.name.common}</div>
        <div class="card-body">
          <p><strong>Capital:</strong> ${country.capital}</p>
          <p><strong>Latlng:</strong> ${country.latlng}</p>
          <img src="${country.flags.png}" alt="Flag" class="mb-2" style="max-width: 100px;">
          <button class="btn btn-primary" onclick="fetchWeatherData('${country.name.common}')">Click for Weather</button>
        </div>
      </div>
    `;

    card.innerHTML = cardContent;
    cardContainer.appendChild(card);
  });
}



function fetchWeatherData(countryName) {
  
  const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=7f1af5c29a6f227aefbf00c51c44c9b2`


  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Extract the necessary weather data is display it
      const weatherDescription = data.weather[0].description;
      const temperature = data.main.temp;

      alert(`Weather in ${countryName}: ${weatherDescription}, Temperature: ${temperature}°C`);
    })
    .catch(error => console.error('Error:', error));
}


window.onload = function() {
  fetchRestCountriesData();
};