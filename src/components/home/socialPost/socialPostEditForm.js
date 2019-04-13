import React from 'react'

import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated'
import industriesOptions from './industriesOptions'

const SocialPostEditForm = ({handleSubmit,handleSelect, handleChange, data, errors}) => {
  return(
    <form onSubmit={handleSubmit}>
      <label htmlFor="post_title">Title</label>
      <input
        name="post_title"
        id="post_title"
        placeholder='Username'
        onChange={handleChange}
        value={data.post_title || ''}
      />
      {errors.post_title && <small>{errors.post_title}</small>}
      <label htmlFor="post_content">Content</label>
      <input
        name="post_content"
        id="post_content"
        onChange={handleChange}
        value={data.post_content || ''}
      />
      {errors.post_content && <small>{errors.post_content}</small>}
      <label htmlFor="post_image">Image</label>
      <input
        name="post_image"
        id="post_image"
        placeholder="post_image"
        onChange={handleChange}
        value={data.post_image || ''}
      />
      <label htmlFor="industries">Industries</label>
      <Select
        closeMenuOnSelect={false}
        components={makeAnimated()}
        isMulti
        options={industriesOptions}
        onChange={handleSelect}
      />
      <button>submit</button>
    </form>
  )
}

export default SocialPostEditForm
