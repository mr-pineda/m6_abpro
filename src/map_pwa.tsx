import { useEffect } from "react";
import { DirectionsCallback } from '../utils/map_google';
import { Loader } from "@googlemaps/js-api-loader";

const ContactMap = () => {
  const hospitalLocation = { lat: -34.6037, lng: -58.3816 }; // Ubicación del hospital

  useEffect(() => {
    const loader = new Loader({
      apiKey: "YOUR_GOOGLE_MAPS_API_KEY",
      version: "weekly",
    });

    loader.load().then(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userPos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            
            const mapInstance = new window.google.maps.Map(document.getElementById("map"), {
              center: userPos,
              zoom: 14,
            });

            new window.google.maps.Marker({
              position: userPos,
              map: mapInstance,
              title: "Tu ubicación",
            });

            new window.google.maps.Marker({
              position: hospitalLocation,
              map: mapInstance,
              title: "Hospital",
            });

            const directionsService = new window.google.maps.DirectionsService();
            const directionsRenderer = new window.google.maps.DirectionsRenderer();
            directionsRenderer.setMap(mapInstance);

            directionsService.route(
              {
                origin: userPos,
                destination: hospitalLocation,
                travelMode: window.google.maps.TravelMode.DRIVING,
              },
              (response, status) => {
                if (status === "OK") {
                  directionsRenderer.setDirections(response);
                } else {
                  console.error("Error al obtener la ruta: ", status);
                }
              }
            );
          },
          () => alert("No se pudo obtener la ubicación"),
          { timeout: 10000 }
        );
      } else {
        alert("Geolocalización no soportada por este navegador");
      }
    });
  }, []);

  return <div id="map" style={{ width: "100%", height: "500px" }}></div>;
};

export default ContactMap;
