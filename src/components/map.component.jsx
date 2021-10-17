import { useEffect, useRef, useState } from "react";

const Map = ({ locations, zoomProp }) => {
  const { L } = window;
  const accessToken = process.env.REACT_APP_LEAFLET_API_KEY;
  const mapContainer = useRef(null);
  const [myMap, setMyMap] = useState();
  const lat = (locations.length && locations[0][1]) || 0;
  const lng = (locations.length && locations[0][2]) || 0;
  const zoom = zoomProp || 2;

  useEffect(() => {
    if (mapContainer.current && !myMap) {
      const newMap = L.map("mapid").setView([lat, lng], zoom);
      L.tileLayer(
        `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${accessToken}`,
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: "mapbox/streets-v11",
          tileSize: 512,
          zoomOffset: -1,
          accessToken: { accessToken },
        }
      ).addTo(newMap);
      setMyMap(newMap);
    }
  }, [L, myMap, mapContainer, lat, lng, zoom, accessToken]);

  useEffect(() => {
    if (myMap) {
      for (var i = 0; i < locations.length; i++) {
        new L.marker([locations[i][1], locations[i][2]])
          .bindPopup(locations[i][0])
          .addTo(myMap);
      }
    }
  }, [myMap, L, locations]);

  return <div ref={mapContainer} id="mapid" style={{ height: "100%" }} />;
};

export default Map;
