import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

// import component

import Auth from '../lib/auth'

class Login extends React.Component{
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
    axios.post('/api/login', this.state.data)
      .then(res => {
        Auth.setToken(res.data.token)
        this.props.history.push('/')
      })
      .catch(err => this.setState({errors: err.response.data}))
  }

  render(){
    const { data, errors } = this.state
    return (
      <main>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            onChange={this.handleChange}
            value={data.email || ''}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            onChange={this.handleChange}
            value={data.password || ''}
          />
          {errors.message && <small>{errors.message}</small>}
          <input type="submit" value="Submit"/>
        </form>
        <div>
          Not yet registered? <Link to='/register'>Register here</Link>
        </div>
      </main>
    )
  }
}

export default Login
