import { useState } from "react";
import { Polygon } from "@react-google-maps/api";
import ZoneModal from "./ZoneModal";

export default function FishingZone({ coordinates, name, style }) {
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  function handleShow() {
    setFullscreen("md-down");
    setShow(true);
  }

  const handlePolygonOnClick = () => {
    handleShow();
    // other polygon functionality
  };

  const parseCoordinates = (coords, fillColor, fillOpacity) => {
    const latlng = coords.map((coordPair, index) => ({
      lat: coordPair[0],
      lng: coordPair[1],
    }));

    return latlng;
  };

  return (
    <>
      <Polygon
        paths={parseCoordinates(coordinates)}
        onClick={handlePolygonOnClick}
        // onMouseOver={}
        options={{
          fillColor: style.fillColor,
          fillOpacity: style.fillOpacity,
          strokeColor: style.strokeColor,
          strokeOpacity: style.strokeOpacity,
          strokeWeight: style.strokeWeight,
        }}
      ></Polygon>
      <ZoneModal name={name} show={show} fullscreen={fullscreen} setShow={setShow} />
    </>
  );
}
