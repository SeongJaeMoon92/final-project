import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

const ProfileForm = (props) => {
  const { data, errors, handleSubmit, handleChange, handleImageUpload, imageUrl } = props
  return (
    <Col xs={12}>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label className={errors.name ? 'text-danger' : ''}>Full Name</Form.Label>
          <Form.Control
            className={errors.name ? 'border-danger' : ''}
            name="name"
            placeholder='Your full name'
            onChange={handleChange}
            value={data.name || ''}
          />
          {errors.name && <Form.Text className="text-danger">{errors.name}</Form.Text>}
        </Form.Group>
        <Form.Group controlId="location">
          <Form.Label className={errors.location ? 'text-danger' : ''}>Location</Form.Label>
          <Form.Control
            className={errors.location ? 'border-danger' : ''}
            name="location"
            placeholder='Your location'
            onChange={handleChange}
            value={data.location || ''}
          />
          {errors.location && <Form.Text className="text-danger">{errors.location}</Form.Text>}
        </Form.Group>
        <Form.Group controlId="headline">
          <Form.Label className={errors.headline ? 'text-danger' : ''}>Headline</Form.Label>
          <Form.Control
            className={errors.headline ? 'border-danger' : ''}
            name="headline"
            placeholder='Your profile headline'
            onChange={handleChange}
            value={data.headline || ''}
          />
          {errors.headline && <Form.Text className="text-danger">{errors.headline}</Form.Text>}
        </Form.Group>
        <Form.Group controlId="image">
          <Form.Label className={errors.image ? 'text-danger' : ''}>Image</Form.Label>
          <Container>
            <Row className="mb-3">
              <Button size="sm" onClick={handleImageUpload}>{imageUrl ? 'Change my image' : 'Upload an image'}</Button>
            </Row>
            {imageUrl &&
              <div>
                <Row>
                  Image preview:
                </Row>
                <Row>
                  <Col md={3}>
                    <img src={imageUrl} />
                  </Col>
                </Row>
              </div>
            }
          </Container>
        </Form.Group>
        <Form.Group controlId="summary">
          <Form.Label className={errors.summary ? 'text-danger' : ''}>Summary</Form.Label>
          <Form.Control
            as="textarea" rows="3"
            className={errors.summary ? 'border-danger' : ''}
            name="summary"
            placeholder='Your profile summary'
            onChange={handleChange}
            value={data.summary || ''}
          />
          {errors.summary && <Form.Text className="text-danger">{errors.summary}</Form.Text>}
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Col>
  )
}

export default ProfileForm
