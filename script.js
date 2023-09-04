//  Ejecutar al cargar DOM
document.addEventListener("DOMContentLoaded", init);

// Función inicial
function init() {
  // Obtener y guardar la ubicación
  navigator.geolocation.getCurrentPosition(success);
  // Función para ejecutar al obtener la ubicación
  function success(position) {
    // Añadir datos obtenidos a sessionStorage
    function addToSessionStorage(key, value) {
      var position = {
        latitude: value.latitude,
        longitude: value.longitude,
      };
      sessionStorage.clear();
      sessionStorage.setItem(key, JSON.stringify(position));
    }
    // Obtener datos de ubicación
    var latitude, longitude; 
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    addToSessionStorage("coords", {
      latitude: latitude,
      longitude: longitude,
    });
  }
  mostrarDatos();
}

// Obtener valores del sessionStorage
var coords = sessionStorage.getItem("coords");
var lat = JSON.parse(coords).latitude;
var lon = JSON.parse(coords).longitude;

var url =
  "http://www.7timer.info/bin/api.pl?lon=" +
  lat +
  "&lat=" +
  lon +
  "&product=astro&unit=metric&output=json";

function mostrarDatos() {
  var div = document.getElementById("mostrar");
  div.innerHTML = "";
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      function nubosidad(cloudcover) {
        switch (cloudcover) {
          case "1":
            return "0% - 6%";
          case "2":
            return "6% - 19%";
          case "3":
            return "19% - 31%";
          case "4":
            return "31% - 44%";
          case "5":
            return "44% - 56%";
          case "6":
            return "56% - 69%";
          case "7":
            return "69% - 81%";
          case "8":
            return "81% - 94%";
          case "9":
            return "94% - 100%";
        }
      }
      function humedad(rh2m) {
        switch (rh2m) {
          case "-4":
            return "0% - 5%";
          case "-3":
            return "5% - 10%";
          case "-2":
            return "10% - 15%";
          case "-1":
            return "15% - 20%";
          case "0":
            return "20% - 25%";
          case "1":
            return "25% - 30%";
          case "2":
            return "30% - 35%";
          case "3":
            return "35% - 40%";
          case "4":
            return "40% - 45%";
          case "5":
            return "45% - 50%";
          case "6":
            return "50% - 55%";
          case "7":
            return "55% - 60%";
          case "8":
            return "60% - 65%";
          case "9":
            return "65% - 70%";
          case "10":
            return "70% - 75%";
          case "11":
            return "75% - 80%";
          case "12":
            return "80% - 85%";
          case "13":
            return "85% - 90%";
          case "14":
            return "90% - 95%";
          case "15":
            return "95% - 99%";
          case "16":
            return "100%";
        }
      }
      function velocidadV(wind10mspeed) {
        switch (wind10mspeed) {
          case "1":
            return "Calmado ";
          case "2":
            return "Suave ";
          case "3":
            return "Moderado ";
          case "4":
            return "Fresco ";
          case "5":
            return "Fuerte ";
          case "6":
            return "Muy fuerte ";
          case "7":
            return "Tormenta ";
          case "8":
            return "Huracán ";
        }
      }
      function precipitaciones(prec_type) {
        switch (prec_type) {
          case "none":
            return "☁️";
          case "rain":
            return "🌧️";
          case "snow":
            return "🌨️";
          case "frzr":
            return "❄️";
          case "icep":
            return "🧊";
        }
      }
      console.log(data);
      var dia = 0;
      //document.getElementById("sigdia").addEventListener("click", function () {
      //  dia += 1;
      //});
      var dato = data.dataseries[dia];
      var nubosidad = nubosidad(JSON.stringify(dato.cloudcover));
      var humedad = humedad(JSON.stringify(dato.rh2m));
      var viento = velocidadV(JSON.stringify(dato.wind10m.speed));
      var precipitaciones = precipitaciones(dato.prec_type);
      div.innerHTML +=
        "<h4>Latitud: " +
        lat +
        ", Longitud: " +
        lon +
        `</h4>
      <h5>Temperatura: ${dato.temp2m}°</h5>
      <p>Nubosidad: ` +
        nubosidad +
        `</p>
      <p>Humedad: ` +
        humedad +
        `</p>
      <p>Viento: `+ viento +`${dato.wind10m.direction}</p>
      <p>Precipitaciones: `+ precipitaciones +`</p>
    `;
    });
}
