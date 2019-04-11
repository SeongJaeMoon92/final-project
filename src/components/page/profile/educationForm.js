import React from 'react'

const EducationForm = (props) => {
  const { data, errors, handleSubmit, handleChange } = props
  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor="school">School</label>
        <input
          name="school"
          id="school"
          placeholder='School'
          onChange={handleChange}
          value={data.school || ''}
        />
        {errors.school && <small>{errors.school}</small>}
        <label htmlFor="degree">Degree</label>
        <input
          name="degree"
          id="degree"
          placeholder="Degree"
          onChange={handleChange}
          value={data.degree || ''}
        />
        {errors.degree && <small>{errors.degree}</small>}
        <label htmlFor="field_of_study">Field of Study</label>
        <input
          name="field_of_study"
          id="field_of_study"
          placeholder="Field of Study"
          onChange={handleChange}
          value={data.field_of_study || ''}
        />
        {errors.field_of_study && <small>{errors.field_of_study}</small>}
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
        <label htmlFor="grade">Grade</label>
        <input
          name="grade"
          id="grade"
          placeholder="Grade"
          onChange={handleChange}
          value={data.grade || ''}
        />
        {errors.grade && <small>{errors.grade}</small>}
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

export default EducationForm
