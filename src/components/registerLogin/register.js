import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Button} from 'react-bootstrap'

import Flash from '../lib/flash'

class Register extends React.Component{
  constructor(){
    super()

    this.state = { data: {username: '', email: '', password: '', password_confirmation: ''}, errors: {}, validated: false}

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
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.stopPropagation()
    }
    this.setState({ validated: true }, () => {
      axios.post('/api/register', this.state.data)
        .then((res) => {
          Flash.setMessage('primary', res.data.message)
          this.props.history.push('/login')
        })
        .catch(err => this.setState({errors: err.response.data}))
    })
  }

  render(){
    const { data, errors, validated } = this.state
    return (
      <div className="register">
        <div className="registerForm animated fadeIn">
          <img className="pb-5" src="../assets/images/joinedup/joinedup_logo.png" />
          <Form
            noValidate
            validated={validated}
            onSubmit={this.handleSubmit}
          >
            <Form.Group controlId="username">
              <Form.Label className={errors.username ? 'text-danger' : ''}>Username</Form.Label>
              <Form.Control
                required
                className={errors.username ? 'border-danger' : ''}
                name="username"
                placeholder='Username'
                onChange={this.handleChange}
                value={data.username || ''}
              />
              {errors.username && <Form.Text className="text-danger">{errors.username}</Form.Text>}
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label className={errors.email ? 'text-danger' : ''}>Email Address</Form.Label>
              <Form.Control
                required
                className={errors.email ? 'border-danger' : ''}
                name="email"
                placeholder='name@example.com'
                onChange={this.handleChange}
                value={data.email || ''}
              />
              {errors.email && <Form.Text className="text-danger">{errors.email}</Form.Text>}
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label className={errors.password ? 'text-danger' : ''}>Password</Form.Label>
              <Form.Control
                required
                className={errors.password ? 'border-danger' : ''}
                type="password"
                name="password"
                placeholder="password"
                onChange={this.handleChange}
                value={data.password || ''}
              />
              {errors.password && <Form.Text className="text-danger">{errors.password}</Form.Text>}
            </Form.Group>
            <Form.Group controlId="password_confirmation">
              <Form.Label className={errors.password_confirmation ? 'text-danger' : ''}>Password Confirmation</Form.Label>
              <Form.Control
                required
                className={errors.password_confirmation ? 'border-danger' : ''}
                type="password"
                name="password_confirmation"
                placeholder='Password Confirmation'
                onChange={this.handleChange}
                value={data.password_confirmation || ''}
              />
              {errors.password_confirmation && <Form.Text className="text-danger">{errors.password_confirmation}</Form.Text>}
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
          </Form>
          <div>
            Already have an account? <Link to='/login'>Login here</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Register
