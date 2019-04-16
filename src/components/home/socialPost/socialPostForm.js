import React from 'react'

import Select from 'react-select'
import makeAnimated from 'react-select/lib/animated'

import { Form, Button} from 'react-bootstrap'

const SocialPostForm = ({handleSubmit,handleSelect, handleChange, data, errors, selectRef, industriesOptions}) => {
  return(
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="post_title">
        <Form.Label className={errors.post_title ? 'text-danger' : ''}>Title</Form.Label>
        <Form.Control
          className={errors.post_title ? 'border-danger' : ''}
          name="post_title"
          placeholder='Title'
          onChange={handleChange}
          value={data.post_title || ''}
        />
        {errors.post_title && <Form.Text className="text-danger">{errors.post_title}</Form.Text>}
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
      <Form.Group controlId="post_content">
        <Form.Label className={errors.post_content ? 'text-danger' : ''}>Content</Form.Label>
        <Form.Control
          className={errors.post_content ? 'border-danger' : ''}
          name="post_content"
          placeholder='Content'
          onChange={handleChange}
          value={data.post_content || ''}
        />
        {errors.post_content && <Form.Text className="text-danger">{errors.post_content}</Form.Text>}
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
      <Button className="buttonColor" type="submit">Submit</Button>
    </Form>
  )
}

export default SocialPostForm
