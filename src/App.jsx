import "./App.css";

import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Polygon } from "@react-google-maps/api";
import { useState, useCallback, memo } from "react";
import Spinner from "react-bootstrap/Spinner";
import FishingZone from "./components/FishingZone";
import fishingzones from "./AreaCoords";

function App() {
  const [map, setMap] = useState(null);
  const apiKey = import.meta.env.VITE_GMAPS_KEY;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

  const containerStyle = {
    width: '100%',
    height: 915,
  };

  const center = {
    lat: 26.82895828006981,
    lng: -82.11667282510092,
  };
 
  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);


  // convert array of [[lat,lng], ...] to [{lat, lng}, ...]
  const parseCoordinates = (coords) => {
    return coords.map((coordPair, index) => ({
      lat: coordPair[0],
      lng: coordPair[1],
    }));
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {fishingzones.map((zone, index) => (
        <FishingZone
          key={`area ${index + 1}`}
          coordinates={zone.coordinates}
          name={zone.name}
          style={zone.style}
        />
      ))}
    </GoogleMap>
  ) : (
    <Spinner animation='border' variant='info' role='status'>
      <span className='visually-hidden'>Loading...</span>
    </Spinner>
  );
}

export default App;
