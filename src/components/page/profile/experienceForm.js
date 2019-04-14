import React from 'react'
import { Form, Button } from 'react-bootstrap'

const ExperienceForm = (props) => {
  const { data, errors, handleSubmit, handleChange, handleEndDate, endDate } = props
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="title">
        <Form.Label>Job Title</Form.Label>
        <Form.Control
          name="title"
          placeholder="Title of your job/role"
          onChange={handleChange}
          value={data.title || ''}
        / >
        {errors.title && <Form.Text>{errors.title}</Form.Text>}
      </Form.Group>
      <Form.Group controlId="company">
        <Form.Label>Company</Form.Label>
        <Form.Control
          name="company"
          placeholder="Name of the company"
          onChange={handleChange}
          value={data.company || ''}
        / >
        {errors.company && <Form.Text>{errors.company}</Form.Text>}
      </Form.Group>
      <Form.Group controlId="location">
        <Form.Label>Location</Form.Label>
        <Form.Control
          name="location"
          placeholder="Location of experience"
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
          onChange={handleChange}
          value={data.start_date || ''}
        / >
        {errors.start_date && <Form.Text>{errors.start_date}</Form.Text>}
      </Form.Group>
      {!endDate && <Button size="sm" onClick={handleEndDate}>Add End Date</Button>}
      {endDate &&
        <Form.Group controlId="end_date">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            name="end_date"
            onChange={handleChange}
            value={data.end_date || ''}
          / >
          {errors.end_date && <Form.Text>{errors.end_date}</Form.Text>}
        </Form.Group>
      }
      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows="3"
          name="description"
          placeholder="Description of your experience"
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

export default ExperienceForm
