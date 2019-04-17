import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Button} from 'react-bootstrap'

// import component

import Auth from '../lib/auth'
import Flash from '../lib/flash'

class Login extends React.Component{
  constructor(){
    super()

    this.state = { data: { username: '', email: ''}, errors: {}, validated: false}

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
      axios.post('/api/login', this.state.data)
        .then(res => {
          console.log(res)
          Flash.setMessage('primary', res.data.message)
          Auth.setToken(res.data.token)
          this.props.history.push('/')
        })
        .catch(err => this.setState({errors: err.response.data}))
    })
  }

  render(){
    console.log('Mount')
    const { data, errors, validated } = this.state
    return (
      <div className="login">
        <div className="loginForm animated fadeIn">
          <img className="pb-5" src="../assets/images/joinedup/joinedup_logo.png" />
          <Form
            noValidate
            validated={validated}
            onSubmit={this.handleSubmit}
          >
            <Form.Group controlId="email">
              <Form.Label className={errors.email ? 'text-danger' : ''}>Email</Form.Label>
              <Form.Control
                required
                className={errors.email ? 'border-danger' : ''}
                name="email"
                placeholder="Email"
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
