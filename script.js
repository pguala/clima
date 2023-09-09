// Accionar en evento DOMContentLoaded 
document.addEventListener("DOMContentLoaded", obtenerUbicacion);

const div = document.getElementById("mostrar");
const pie = document.getElementById("footer");
//Placeholder para los valores
var coord = "";
var url = "";

//Obtener ubicación
function obtenerUbicacion() {
  // Obtener geolocalización
  const geolocation = navigator.geolocation;
  // Si geolocalización es soportada 
  if (geolocation) {
    // Pedir accesso a geolocalización
    geolocation.getCurrentPosition(
      // Para callback exitoso
      (position) => {
        // Obtener latitud y longitud y crear un string
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        url += "https://www.7timer.info/bin/api.pl?lon=" + longitude + "&lat=" + latitude + "&product=astro&unit=metric&output=json";
        // Desplegar coordenadas acortadas en cuerpo
        var shortLat = JSON.stringify(latitude).substring(0, 6);
        var shortLon = JSON.stringify(longitude).substring(0, 6);
        coord += `<i>Latitud: ${shortLat}</i> 🌐 <i>Longitud: ${shortLon}</i>`;
        pie.innerHTML = coord;
        mostrarDatos();
      },
      // Para error en callback
      (error) => {
        console.log(`Error: ${error.message}`);
      }
    );
  } else {
    alert("Geolocalización no soportada");
  }
}

//Funciones para mostrar contenido
//Fetch
function mostrarDatos() {
  div.innerHTML = "";
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //Funciones para reemplazar valores de la API con texto
      function nubosidad(cloudcover) {
        switch (cloudcover) {
          case "1":
            return "0% y 6%";
          case "2":
            return "6% y 19%";
          case "3":
            return "19% y 31%";
          case "4":
            return "31% y 44%";
          case "5":
            return "44% y 56%";
          case "6":
            return "56% y 69%";
          case "7":
            return "69% y 81%";
          case "8":
            return "81% y 94%";
          case "9":
            return "94% y 100%";
        }
      }
      function humedad(rh2m) {
        switch (rh2m) {
          case "-4":
            return "0% y 5%";
          case "-3":
            return "5% y 10%";
          case "-2":
            return "10% y 15%";
          case "-1":
            return "15% y 20%";
          case "0":
            return "20% y 25%";
          case "1":
            return "25% y 30%";
          case "2":
            return "30% y 35%";
          case "3":
            return "35% y 40%";
          case "4":
            return "40% y 45%";
          case "5":
            return "45% y 50%";
          case "6":
            return "50% y 55%";
          case "7":
            return "55% y 60%";
          case "8":
            return "60% y 65%";
          case "9":
            return "65% y 70%";
          case "10":
            return "70% y 75%";
          case "11":
            return "75% y 80%";
          case "12":
            return "80% y 85%";
          case "13":
            return "85% y 90%";
          case "14":
            return "90% y 95%";
          case "15":
            return "95% y 99%";
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
      // Insertar iconos generados con clases CSS
      function icono(prec, nubosidad) {
        if (!prec === "none") {
          return '<div class="rainy"><div class="rainy__cloud"></div><div class="rainy__rain"></div></div>';
        } else if (nubosidad >= 7) {
          return '<div class="cloudy"></div>';
        } else if (nubosidad >= 4) {
          return '<div class="partly_cloudy"><div class="partly_cloudy__sun"></div><div class="partly_cloudy__cloud"></div></div>';
        } else if (nubosidad <= 3) {
          return '<div class="sunny"></div>';
        }
      }
      //Generar variables para los datos a mostrar
      var datadia = data.dataseries[0];
      var nubosidad = nubosidad(JSON.stringify(datadia.cloudcover));
      var humedad = humedad(JSON.stringify(datadia.rh2m));
      var viento = velocidadV(JSON.stringify(datadia.wind10m.speed))+"al "+direccionV(datadia.wind10m.direction);
      var precipitaciones = precipitaciones(datadia.prec_type);
      console.log(data);
      //Mostrar datos en el HTML
      div.innerHTML +=
        icono(datadia.prec_type, datadia.cloudcover) +
        `</h5>
      <p><b>Temperatura:</b> ${datadia.temp2m}°</p>
      <p><b>Nubosidad:</b> Entre ` +
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