import React from 'react'
import { Form, Button } from 'react-bootstrap'

const EducationForm = (props) => {
  const { data, errors, handleSubmit, handleChange } = props
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="school">
        <Form.Label>School/Institute</Form.Label>
        <Form.Control
          name="school"
          placeholder="Name of your school/university/educational institute"
          onChange={handleChange}
          value={data.school || ''}
        / >
        {errors.school && <Form.Text>{errors.school}</Form.Text>}
      </Form.Group>
      <Form.Group controlId="degree">
        <Form.Label>Degree</Form.Label>
        <Form.Control
          name="degree"
          placeholder="Title of your degree/diploma/certification"
          onChange={handleChange}
          value={data.degree || ''}
        / >
        {errors.degree && <Form.Text>{errors.degree}</Form.Text>}
      </Form.Group>
      <Form.Group controlId="location">
        <Form.Label>Location</Form.Label>
        <Form.Control
          name="location"
          placeholder="Location of your studies"
          onChange={handleChange}
          value={data.location || ''}
        / >
        {errors.location && <Form.Text>{errors.location}</Form.Text>}
      </Form.Group>
      <Form.Group controlId="start_date">
        <Form.Label>Start Date</Form.Label>
        <Form.Control
          type="date"
          name="start_date"
          placeholder="Start Date"
          onChange={handleChange}
          value={data.start_date || ''}
        / >
        {errors.start_date && <Form.Text>{errors.start_date}</Form.Text>}
      </Form.Group>
      <Form.Group controlId="end_date">
        <Form.Label>End Date</Form.Label>
        <Form.Control
          type="date"
          name="end_date"
          placeholder="End Date"
          onChange={handleChange}
          value={data.end_date || ''}
        / >
        {errors.end_date && <Form.Text>{errors.end_date}</Form.Text>}
      </Form.Group>
      <Form.Group controlId="grade">
        <Form.Label>Grade</Form.Label>
        <Form.Control
          name="grade"
          placeholder="Overall grade/mark of your studes"
          onChange={handleChange}
          value={data.grade || ''}
        / >
        {errors.grade && <Form.Text>{errors.grade}</Form.Text>}
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows="3"
          name="description"
          placeholder="Description of your studies"
          onChange={handleChange}
          value={data.description || ''}
        / >
        {errors.description && <Form.Text>{errors.description}</Form.Text>}
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default EducationForm
