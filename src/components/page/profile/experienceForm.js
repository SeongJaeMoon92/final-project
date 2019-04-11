import React from 'react'

const ExperienceForm = (props) => {
  const { data, errors, handleSubmit, handleChange } = props
  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Job title</label>
        <input
          name="title"
          id="title"
          placeholder='Title'
          onChange={handleChange}
          value={data.title || ''}
        />
        {errors.title && <small>{errors.title}</small>}
        <label htmlFor="company">Company</label>
        <input
          name="company"
          id="company"
          placeholder="Company"
          onChange={handleChange}
          value={data.company || ''}
        />
        {errors.company && <small>{errors.company}</small>}
        <label htmlFor="location">Location</label>
        <input
          name="location"
          id="location"
          placeholder="Location"
          onChange={handleChange}
          value={data.location || ''}
        />
        {errors.location && <small>{errors.location}</small>}
        <label htmlFor="start_date">Start Date</label>
        <input
          name="start_date"
          id="start_date"
          onChange={handleChange}
          value={data.start_date || ''}
        />
        {errors.start_date && <small>{errors.start_date}</small>}
        <label htmlFor="end_date">End Date</label>
        <input
          name="end_date"
          id="end_date"
          onChange={handleChange}
          value={data.end_date || ''}
        />
        {errors.end_date && <small>{errors.end_date}</small>}
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          placeholder="Description"
          onChange={handleChange}
          value={data.description || ''}
        />
        {errors.description && <small>{errors.description}</small>}
        <input type="submit" value="Submit"/>
      </form>
    </main>
  )
}

export default ExperienceForm
