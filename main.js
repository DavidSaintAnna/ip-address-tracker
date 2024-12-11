const ip = document.querySelector(".ip");
const location = document.querySelector(".location");
const timezone = document.querySelector(".timezone");
const isp = document.querySelector(".isp");
const ipSearch = document.getElementById("search-ip");
const btn = document.querySelector(".btn");

const map = L.map("map").setView([51.505, -0.09], 13);
const tileLayer = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution = {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};
const firstTile = L.tileLayer(tileLayer, attribution);
firstTile.addTo(map);
let marker= L.marker([28.644800, 77.216721]);
marker.addTo(map);




function sendRequest() {
    let inputValue = ipSearch.value;
    fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_rfBYgHw2wOTYNYUJnNf6GugnSWJ4w&ipAddress=${inputValue}`
    )
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        const locationValue = `${responseData.location.city}, ${responseData.location.region} ${responseData.location.geonameId}`;
        ip.textContent = responseData.ip;
        location.textContent = locationValue;
        timezone.textContent = responseData.location.timezone;
        isp.textContent = responseData.isp;

        map.flyTo([responseData.location.lat, responseData.location.lng], 13);
        marker = L.marker([responseData.location.lat, responseData.location.lng]);
        marker.addTo(map);
      }); 
      
}

btn.addEventListener("click", function () {
  sendRequest();
});



