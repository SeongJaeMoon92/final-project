import React from 'react'
import { Form, Button } from 'react-bootstrap'
import {asyncContainer, Typeahead} from 'react-bootstrap-typeahead'
import axios from 'axios'

import Select from 'react-select'
import makeAnimated from 'react-select/lib/animated'
const AsyncTypeahead = asyncContainer(Typeahead)

class Test extends React.Component{
  constructor() {
    super()

    this.state = { data:{}, isLoading: false, options: []}

    this.handleAutoChange = this.handleAutoChange.bind(this)

  }
  handleAutoChange(e){
    console.log(e, 'here')
    const data = {...this.state.data, company:e[0]}
    this.setState({data})
  }


  render(){
    console.log(this.state.data)
    return(
      <Form>
        <Form.Group controlId="Company">
          <Form.Label >Company</Form.Label>
          <AsyncTypeahead
            id={1}
            isLoading={this.state.isLoading}
            onSearch={query => {
              this.setState({isLoading: true})
              axios.get('/api/companies', {
                params: {
                  q: query
                }
              })
                .then(res => res.data.items.map(data => data.title))
                .then(res => this.setState({options:res}))
                .then(() => this.setState({isLoading: false}))
                .catch(err => console.log(err))
            }}
            options={this.state.options}
            onChange={this.handleAutoChange}
          />
        </Form.Group>
      </Form>
    )
  }
}

export default Test
