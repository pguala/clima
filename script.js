//  Ejecutar al cargar DOM
document.addEventListener("DOMContentLoaded", init);

// Función inicial
function init() {
  obtenerCoord()
    .then((x) => {
      window.location.reload();
      mostrarDatos(x);
    })
    .catch((error) => {
      console.log(error);
    });
}

// Obtener y guardar la ubicación
function obtenerCoord() {
  navigator.geolocation.getCurrentPosition(success,error);
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
    //Mostrar coordenadas en footer
    document.getElementById("footer").innerHTML +=
      "<i><p id='footercoord'>Latitud: " +
      shortLat +
      "</i> 🌐 <i>Longitud: " +
      shortLon +
      "</p></i>";
  }
  function error(){
    document.getElementById("footer").innerHTML +=
      "<i><p id='footercoord'>Debes permitir la ubicación</p></i>";
  }
  //Promise
  return new Promise((resolve, reject) => {
    if (coords) {
      resolve(coords);
    } else {
      reject(new Error("Valor no encontrado"));
    }
  });
}
 
// Obtener valores del sessionStorage
var coords = sessionStorage.getItem("coords");
var lat = JSON.parse(coords).latitude;
var lon = JSON.parse(coords).longitude;
var shortLat = JSON.stringify(lat).substring(0, 6);
var shortLon = JSON.stringify(lon).substring(0, 6);

var url =
  "https://www.7timer.info/bin/api.pl?lon=" +
  lon +
  "&lat=" +
  lat +
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
      function direccionV(wind10mdirection) {
        switch (wind10mdirection) {
          case "N":
            return "Norte ⬆️";
          case "NE":
            return "Noreste ↗️";
          case "E":
            return "Este ➡️";
          case "SE":
            return "Sureste ↘️";
          case "S":
            return "Sur ⬇️";
          case "SW":
            return "Suroeste ↙️";
          case "W":
            return "Oeste ⬅️";
          case "NW":
            return "Noroeste ↖️";
        }
      }
      function precipitaciones(prec_type) {
        switch (prec_type) {
          case "none":
            return "Seco 🌂";
          case "rain":
            return "Lluvioso ☔";
          case "snow":
            return "🌨️";
          case "frzr":
            return "❄️";
          case "icep":
            return "🧊";
        }
      }
      function icono(prec, nubo) {
        if (!prec === "none") {
          return '<div class="rainy"><div class="rainy__cloud"></div><div class="rainy__rain"></div></div>';
        } else if (nubo >= 7) {
          return '<div class="cloudy"></div>';
        } else if (nubo >= 4) {
          return '<div class="partly_cloudy"><div class="partly_cloudy__sun"></div><div class="partly_cloudy__cloud"></div></div>';
        } else if (nubo <= 3) {
          return '<div class="sunny"></div>';
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
      var viento =
        velocidadV(JSON.stringify(dato.wind10m.speed)) +
        "al " +
        direccionV(dato.wind10m.direction);
      var precipitaciones = precipitaciones(dato.prec_type);
      div.innerHTML +=
        icono(dato.prec_type, dato.cloudcover) +
        `</h5>
      <p><b>Temperatura:</b> ${dato.temp2m}°</p>
      <p><b>Nubosidad:</b> ` +
        nubosidad +
        `</p>
      <p><b>Humedad:</b> ` +
        humedad +
        `</p>
      <p><b>Viento:</b> ` +
        viento +
        `</p>
      <p><b>Precipitaciones:</b> ` +
        precipitaciones +
        `</p>
    `;
    });
}
