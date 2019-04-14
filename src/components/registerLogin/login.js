import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Button} from 'react-bootstrap'

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
      <div className="login animated fadeIn slow">
        <div className="loginForm animated zoomIn">
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  placeholder="Email"
                  onChange={this.handleChange}
                  value={data.email || ''}
                />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="password"
                  onChange={this.handleChange}
                  value={data.password || ''}
                />
            </Form.Group>
            {errors.message && <Form.Text>{errors.message}</Form.Text>}
            <Button type="submit">Submit</Button>
          </Form>
          <div>
            Not yet registered? <Link to='/register'>Register here</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
