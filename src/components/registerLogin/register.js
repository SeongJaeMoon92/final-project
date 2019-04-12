import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Register extends React.Component{
  constructor(){
    super()

    this.state = { data: {}, errors: {}}

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange({target: {name, value}}){
    const data = {...this.state.data, [name]: value}
    const errors = {...this.state.errors, [name]: ''}
    this.setState({ data, errors })
  }

  handleSubmit(e){
    e.preventDefault()
    axios.post('/api/register', this.state.data)
      .then(() => {
        this.props.history.push('/login')
      })
      .catch(err => this.setState({errors: err.response.data}))
  }

  render(){
    const { data, errors } = this.state
    console.log(errors)
    return (
      <main>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            name="username"
            id="username"
            placeholder='Username'
            onChange={this.handleChange}
            value={data.username || ''}
          />
          {errors.username && <small>{errors.username}</small>}
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            onChange={this.handleChange}
            value={data.email || ''}
          />
          {errors.email && <small>{errors.email}</small>}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            onChange={this.handleChange}
            value={data.password || ''}
          />
          <label htmlFor="passwordConfirmation">Password Confirmation</label>
          <input
            type="password"
            name="password_confirmation"
            id="passwordConfirmation"
            onChange={this.handleChange}
            value={data.password_confirmation || ''}
          />
          <input type="submit" value="Submit"/>
        </form>
        <div>
          Already have an account? <Link to='/login'>Login here</Link>
        </div>
      </main>
    )
  }
}

export default Register
