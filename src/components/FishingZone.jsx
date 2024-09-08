import { useState } from "react";
import { Polygon } from "@react-google-maps/api";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

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
    console.log(latlng);
    return latlng;
  };

  const handleSubmit = () => {
    console.log("Submitting modal");
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
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>Modal body content</Modal.Body>
        <Modal.Footer closeButton>
          <Button className='me-2 mb-2' onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
