import React from 'react'

import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated'
import industriesOptions from '../data/industriesOptions'

import { Form, Button} from 'react-bootstrap'

const SocialPostForm = ({handleSubmit,handleSelect, handleChange, data, errors, selectRef}) => {
  return(
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="post_title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          name="post_title"
          placeholder='Title'
          onChange={handleChange}
          value={data.post_title || ''}
        />
        {errors.post_title && <Form.Text>{errors.post_title}</Form.Text>}
      </Form.Group>
      <Form.Group controlId="post_content">
        <Form.Label>Content</Form.Label>
        <Form.Control
          name="post_content"
          placeholder='Content'
          onChange={handleChange}
          value={data.post_content || ''}
        />
        {errors.post_content && <Form.Text>{errors.post_content}</Form.Text>}
      </Form.Group>
      <Form.Group controlId="post_image">
        <Form.Label>Image</Form.Label>
        <Form.Control
          name="post_image"
          placeholder="Image"
          onChange={handleChange}
          value={data.post_image || ''}
        />
      </Form.Group>
      <Form.Label>Industries</Form.Label>
      <Form.Group controlId="industries">
        <Select
          ref={selectRef}
          closeMenuOnSelect={false}
          components={makeAnimated()}
          isMulti
          options={industriesOptions}
          onChange={handleSelect}
        />
      </Form.Group>
      <Button variant="primary" type="submit">Submit</Button>
    </Form>
  )
}

export default SocialPostForm
