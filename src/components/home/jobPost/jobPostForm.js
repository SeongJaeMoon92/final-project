import React from 'react'
import { Form, Container, Row, Col, Button } from 'react-bootstrap'

import Select from 'react-select'
import makeAnimated from 'react-select/lib/animated'

const JobPostForm = ({handleSubmit, handleSelect, handleChange, handleImageUpload, data, errors, imageUrl, selectRef, validated, industriesOptions}) => {
  return(
    <Form
      onSubmit={handleSubmit}
    >
      <Form.Group controlId="Company">
        <Form.Label className={errors.company ? 'text-danger' : ''}>Company</Form.Label>
        <Form.Control
          className={errors.company ? 'border-danger' : ''}
          name="company"
          placeholder='Company'
          onChange={handleChange}
          value={data.company || ''}
        />
        {errors.company && <Form.Text className="text-danger">{errors.company}</Form.Text>}
      </Form.Group>
      <Form.Group controlId="industries">
        <Form.Label>Industries</Form.Label>
        <Select
          ref={selectRef}
          closeMenuOnSelect={false}
          components={makeAnimated()}
          isMulti
          options={industriesOptions}
          onChange={(e, actionMeta) => handleSelect(e, actionMeta)}
        />
      </Form.Group>
      <Form.Group controlId="job_title">
        <Form.Label className={errors.job_title ? 'text-danger' : ''}>Job Title</Form.Label>
        <Form.Control
          className={errors.job_title ? 'border-danger' : ''}
          name="job_title"
          placeholder='Job title'
          onChange={handleChange}
          value={data.job_title || ''}
        />
        {errors.job_title && <Form.Text className="text-danger">{errors.job_title}</Form.Text>}
      </Form.Group>
      <Form.Group controlId="post_content">
        <Form.Label className={errors.post_content ? 'text-danger' : ''}>Content</Form.Label>
        <Form.Control
          className={errors.post_content ? 'border-danger' : ''}
          name="post_content"
          placeholder="Content"
          onChange={handleChange}
          value={data.post_content || ''}
        />
        {errors.post_content && <Form.Text className="text-danger">{errors.post_content}</Form.Text>}
      </Form.Group>
      <Form.Group controlId="post_image">
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
                <Col md={6}>
                  <img src={imageUrl} />
                </Col>
              </Row>
            </div>
          }
        </Container>
      </Form.Group>
      <Button className="buttonColor" type="submit">Submit</Button>
    </Form>
  )
}

export default JobPostForm
