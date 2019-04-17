import React from 'react'
import { Form, Button } from 'react-bootstrap'

const ExperienceForm = (props) => {
  const { data, errors, handleSubmit, handleChange} = props
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="title">
        <Form.Label className={errors.title ? 'text-danger' : ''}>Job Title</Form.Label>
        <Form.Control
          className={errors.title ? 'border-danger' : ''}
          name="title"
          placeholder="Title of your job/role"
          onChange={handleChange}
          value={data.title || ''}
        / >
        {errors.title && <Form.Text className="text-danger">{errors.title}</Form.Text>}
      </Form.Group>
      <Form.Group controlId="company">
        <Form.Label className={errors.company ? 'text-danger' : ''}>Company</Form.Label>
        <Form.Control
          className={errors.company ? 'border-danger' : ''}
          name="company"
          placeholder="Name of the company"
          onChange={handleChange}
          value={data.company || ''}
        / >
        {errors.company && <Form.Text className="text-danger">{errors.company}</Form.Text>}
      </Form.Group>
      <Form.Group controlId="location">
        <Form.Label className={errors.location ? 'text-danger' : ''}>Location</Form.Label>
        <Form.Control
          className={errors.location ? 'border-danger' : ''}
          name="location"
          placeholder="Location of experience"
          onChange={handleChange}
          value={data.location || ''}
        / >
        {errors.location && <Form.Text className="text-danger">{errors.location}</Form.Text>}
      </Form.Group>
      <Form.Group controlId="start_date">
        <Form.Label className={errors.start_date ? 'text-danger' : ''}>Start Date</Form.Label>
        <Form.Control
          className={errors.start_date ? 'border-danger' : ''}
          type="date"
          name="start_date"
          onChange={handleChange}
          value={data.start_date || ''}
        / >
        {errors.start_date && <Form.Text className="text-danger">{errors.start_date}</Form.Text>}
      </Form.Group>
      <Form.Group controlId="end_date">
        <Form.Label className={errors.end_date ? 'text-danger' : ''}>End Date</Form.Label>
        <Form.Control
          className={errors.end_date ? 'border-danger' : ''}
          type="date"
          name="end_date"
          onChange={handleChange}
          value={data.end_date || ''}
        / >
        {errors.end_date && <Form.Text className="text-danger">{errors.end_date}</Form.Text>}
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label className={errors.description ? 'text-danger' : ''}>Description</Form.Label>
        <Form.Control as="textarea" rows="3"
          className={errors.description ? 'border-danger' : ''}
          name="description"
          placeholder="Description of your experience"
          onChange={handleChange}
          value={data.description || ''}
        / >
        {errors.description && <Form.Text className="text-danger">{errors.description}</Form.Text>}
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default ExperienceForm
