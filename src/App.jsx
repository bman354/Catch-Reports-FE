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
    width: 360,
    height: 740,
  };

  const center = {
    lat: 26.962171207212403,
    lng: -82.20777345943749,
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

  const GULF_POLY = [
    [27.000096255180445, -82.25637293278437],
    [26.954497126008917, -82.20928622427687],
    [26.896641241711823, -82.17013881550457],
    [26.833874434135435, -82.15092972574777],
    [26.85377347781154, -82.13925826158754],
    [26.92480329755196, -82.1529692317215],
    [26.948683752204463, -82.1773465205933],
    [26.964908232609595, -82.1907415770708],
    [26.97500265250904, -82.22990269264936],
    [27.003777380408785, -82.23988164841342],
  ];

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
