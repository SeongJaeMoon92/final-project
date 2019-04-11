import React from 'react'

const ProfileForm = (props) => {
  const { data, errors, handleSubmit, handleChange } = props
  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name</label>
        <input
          name="name"
          id="name"
          placeholder='Full Name'
          onChange={handleChange}
          value={data.name || ''}
        />
        {errors.name && <small>{errors.name}</small>}
        <label htmlFor="location">Location</label>
        <input
          name="location"
          id="location"
          placeholder='Location'
          onChange={handleChange}
          value={data.location || ''}
        />
        {errors.location && <small>{errors.location}</small>}
        <label htmlFor="summary">Summary</label>
        <textarea
          name="summary"
          id="summary"
          placeholder="Summary"
          onChange={handleChange}
          value={data.summary || ''}
        />
        {errors.summary && <small>{errors.summary}</small>}
        <input type="submit" value="Submit"/>
      </form>
    </main>
  )
}

export default ProfileForm
