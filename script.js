// -------------------- MAP INIT --------------------
var map = L.map('map').setView([1.3521, 103.8198], 12);

// Standard map
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap.<br> Contains information from "Taxi Availability" from LTA Datamall <br> which is made under the terms <br> of the Singapore Open Data Licence 1.0 <br> (datamall.lta.gov.sg/content/datamall/en/SingaporeOpenDataLicence.html)'
});

// Satellite map
var satellite = L.tileLayer('https://www.onemap.gov.sg/maps/tiles/Satellite/{z}/{x}/{y}.png', {
  maxZoom: 19,
  minZoom: 11,
  attribution:
    '<a href="https://www.onemap.gov.sg/" target="_blank">OneMap</a> &copy; contributors'
});

// default layer
osm.addTo(map);

// toggle control
var baseMaps = {
  "Standard": osm,
  "Satellite": satellite
};

L.control.layers(baseMaps, null, { position: 'bottomleft' }).addTo(map);

// -------------------- TAXI LAYER --------------------
var markers = L.layerGroup().addTo(map);

// official Singapore API
const TAXI_API = "https://api.data.gov.sg/v1/transport/taxi-availability";

// -------------------- FETCH TAXIS --------------------
function getTaxis() {

  fetch(TAXI_API)
    .then(res => res.json())
    .then(data => {

      markers.clearLayers();

      const coords = data.features?.[0]?.geometry?.coordinates || [];

      let count = 0;

      // for loop rendering
      for (let i = 0; i < coords.length; i++) {

        const lon = coords[i][0];
        const lat = coords[i][1];

        count++;

        L.circleMarker([lat, lon], {
          radius: 3,
          color: '#0000ff',
          fillOpacity: 0.7
        }).addTo(markers);
      }

      // UI update
      document.getElementById('taxi-count').innerText = count;
      document.getElementById('time').innerText = new Date().toLocaleTimeString();
    })
    .catch(err => console.error("Taxi API error:", err));
}

// start
getTaxis();
setInterval(getTaxis, 60000);