import React from 'react'
import { Form, Button } from 'react-bootstrap'

const ProfileForm = (props) => {
  const { data, errors, handleSubmit, handleChange } = props
  return (
    <main>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            name="name"
            placeholder='Your full name'
            onChange={handleChange}
            value={data.name || ''}
          />
          {errors.name && <Form.Text>{errors.name}</Form.Text>}
        </Form.Group>
        <Form.Group controlId="location">
          <Form.Label>Location</Form.Label>
          <Form.Control
            name="location"
            placeholder='Your location'
            onChange={handleChange}
            value={data.location || ''}
          />
          {errors.location && <Form.Text>{errors.location}</Form.Text>}
        </Form.Group>
        <Form.Group controlId="headline">
          <Form.Label>Summary</Form.Label>
          <Form.Control
            name="headline"
            placeholder='Your profile headline'
            onChange={handleChange}
            value={data.headline || ''}
          />
          {errors.headline && <Form.Text>{errors.headline}</Form.Text>}
        </Form.Group>
        <Form.Group controlId="summary">
          <Form.Label>Summary</Form.Label>
          <Form.Control as="textarea" rows="3"
            name="summary"
            placeholder='Your profile summary'
            onChange={handleChange}
            value={data.summary || ''}
          />
          {errors.summary && <Form.Text>{errors.summary}</Form.Text>}
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </main>
  )
}

export default ProfileForm
