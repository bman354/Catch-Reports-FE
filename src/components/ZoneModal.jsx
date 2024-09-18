import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import FormRange from "react-bootstrap/esm/FormRange";

export default function ZoneModal({ name, show, fullscreen, setShow }) {
  const calculateTimeOfDay = (todayMilitaryHrs) => {
    if (todayMilitaryHrs <= 5 || todayMilitaryHrs > 18) {
      return "NIGHT";
    } else if (todayMilitaryHrs <= 8) {
      return "EARLY_MORNING";
    } else if (todayMilitaryHrs <= 12) {
      return "MORNING";
    } else if (todayMilitaryHrs <= 18) {
      return "AFTERNOON";
    } else {
      return "ISSUE_WITH_TIME_CONSTRAINTS";
    }
  };

  const sliderValueToString = (val) => {
    const value = Number(val);
    switch (value) {
      case 0:
        return "Early Morning";
      case 1:
        return "Morning";
      case 2:
        return "Afternoon";
      case 3:
        return "Night";
      default:
        return "Issue finding time of day";
    }
  };

  const [sliderValue, setSliderValue] = useState(4);
  const [catchReport, setCatchReport] = useState({
    species: "",
    size: "",
    location: name,
    time_of_day: calculateTimeOfDay(new Date().getHours()),
    bait_type: "",
    quantity: undefined,
    report_date: new Date().toISOString(), // Current date
    catch_date: new Date().toISOString(), // Current date
    released: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCatchReport({
      ...catchReport,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to backend)
    console.log("Form data submitted:", catchReport);
    handleClose();
  };

  return (
    <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='species'>
            <Form.Label>Species</Form.Label>
            <Form.Control
              type='text'
              name='species'
              value={catchReport.species}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId='size'>
            <Form.Label>Size</Form.Label>
            <Form.Control
              type='text'
              name='size'
              value={catchReport.size}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId='time_of_day'>
            <Form.Label>Time of Day: {catchReport.time_of_day}</Form.Label>
            <FormRange
              value={sliderValue}
              min={0}
              max={3}
              onChange={(e) => {
                setSliderValue(e.target.value);
                setCatchReport({
                  ...catchReport,
                  time_of_day: sliderValueToString(e.target.value),
                });
              }}
            />

            {/* <Form.Control
              type='text'
              name='time_of_day'
              value={
                catchReport.time_of_day.toLocaleUpperCase().charAt(0) +
                catchReport.time_of_day.slice(1).toLocaleLowerCase()
              }
              onChange={handleChange}
              required
            /> */}
          </Form.Group>

          <Form.Group controlId='quantity'>
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type='number'
              name='quantity'
              value={catchReport.quantity}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId='catch_date'>
            <Form.Label>Catch Date</Form.Label>
            <Form.Control
              type='date'
              name='catch_date'
              value={catchReport.catch_date}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId='bait_type'>
            <Form.Label>Bait Type</Form.Label>
            <Form.Control
              type='text'
              name='bait_type'
              value={catchReport.bait_type}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId='released'>
            <Form.Check
              type='checkbox'
              label='Released'
              name='released'
              checked={catchReport.released}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
