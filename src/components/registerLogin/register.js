import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Button} from 'react-bootstrap'

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
    return (
      <div className="register animated fadeIn slow">
        <div className="registerForm animated zoomIn">
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
                <Form.Control
                  name="username"
                  placeholder='Username'
                  onChange={this.handleChange}
                  value={data.username || ''}
                />
            {errors.username && <Form.Text>{errors.username}</Form.Text>}
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
                <Form.Control
                  name="email"
                  placeholder='name@example.com'
                  onChange={this.handleChange}
                  value={data.email || ''}
                />
            {errors.email && <Form.Text>{errors.email}</Form.Text>}
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
            <Form.Group controlId="password_confirmation">
              <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  name="password_confirmation"
                  placeholder='Password Confirmation'
                  onChange={this.handleChange}
                  value={data.password_confirmation || ''}
                />
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
