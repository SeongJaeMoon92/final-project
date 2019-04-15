import React from 'react'
import { Form, Button } from 'react-bootstrap'

const EducationForm = (props) => {
  const { data, errors, handleSubmit, handleChange } = props
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="school">
        <Form.Label className={errors.school ? 'border-danger' : ''}>School/Institute</Form.Label>
        <Form.Control
          className={errors.school ? 'text-danger' : ''}
          name="school"
          placeholder="Name of your school/university/educational institute"
          onChange={handleChange}
          value={data.school || ''}
        / >
        {errors.school && <Form.Text className="text-danger">{errors.school}</Form.Text>}
      </Form.Group>
      <Form.Group controlId="degree">
        <Form.Label className={errors.degree ? 'border-danger' : ''}>Degree</Form.Label>
        <Form.Control
          className={errors.degree ? 'text-danger' : ''}
          name="degree"
          placeholder="Title of your degree/diploma/certification"
          onChange={handleChange}
          value={data.degree || ''}
        / >
        {errors.degree && <Form.Text className="text-danger">{errors.degree}</Form.Text>}
      </Form.Group>
      <Form.Group controlId="field_of_study">
        <Form.Label className={errors.field_of_study ? 'border-danger' : ''}>Field of Study</Form.Label>
        <Form.Control
          className={errors.field_of_study ? 'text-danger' : ''}
          name="field_of_study"
          placeholder="Field of study of your degree/diploma/certification"
          onChange={handleChange}
          value={data.field_of_study || ''}
        / >
        {errors.field_of_study && <Form.Text className="text-danger">{errors.field_of_study}</Form.Text>}
      </Form.Group>
      <Form.Group controlId="location">
        <Form.Label className={errors.location ? 'border-danger' : ''}>Location</Form.Label>
        <Form.Control
          className={errors.location ? 'text-danger' : ''}
          name="location"
          placeholder="Location of your studies"
          onChange={handleChange}
          value={data.location || ''}
        / >
        {errors.location && <Form.Text className="text-danger">{errors.location}</Form.Text>}
      </Form.Group>
      <Form.Group controlId="start_date">
        <Form.Label className={errors.start_date ? 'border-danger' : ''}>Start Date</Form.Label>
        <Form.Control
          className={errors.start_date ? 'text-danger' : ''}
          type="date"
          name="start_date"
          onChange={handleChange}
          value={data.start_date || ''}
        / >
        {errors.start_date && <Form.Text className="text-danger">{errors.start_date}</Form.Text>}
      </Form.Group>
      <Form.Group controlId="end_date">
        <Form.Label className={errors.end_date ? 'border-danger' : ''}>End Date</Form.Label>
        <Form.Control
          className={errors.end_date ? 'text-danger' : ''}
          type="date"
          name="end_date"
          onChange={handleChange}
          value={data.end_date || ''}
        / >
        {errors.end_date && <Form.Text className="text-danger">{errors.end_date}</Form.Text>}
      </Form.Group>
      <Form.Group controlId="grade">
        <Form.Label className={errors.grade ? 'border-danger' : ''}>Grade</Form.Label>
        <Form.Control
          className={errors.grade ? 'text-danger' : ''}
          name="grade"
          placeholder="Overall grade/mark of your studes"
          onChange={handleChange}
          value={data.grade || ''}
        / >
        {errors.grade && <Form.Text className="text-danger">{errors.grade}</Form.Text>}
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label className={errors.description ? 'border-danger' : ''}>Description</Form.Label>
        <Form.Control
          as="textarea" rows="3"
          className={errors.description ? 'text-danger' : ''}
          name="description"
          placeholder="Description of your studies"
          onChange={handleChange}
          value={data.description || ''}
        / >
        {errors.description && <Form.Text className="text-danger">{errors.description}</Form.Text>}
      </Form.Group>
      <Button variant="success" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default EducationForm
