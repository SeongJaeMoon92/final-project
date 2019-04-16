import React from 'react'
import {Modal, Button, ButtonToolbar, Form } from 'react-bootstrap'

class MessageProfileModal extends React.Component {
  constructor() {
    super()

    this.state = { show: false}

    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleClose() {
    this.setState({ show: false })
  }

  handleShow() {
    this.setState({ show: true })
  }

  render() {
    const {dataMessage, handleChange, data, handleSubmit} = this.props
    return (
      <>
        <Button className="mx-2" size="sm" variant="primary" onClick={this.handleShow}>
         Message to {data}
        </Button>
        <Modal
          show={this.state.show}
          onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>To {data}</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group controlId="message_content">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  name="message_content"
                  placeholder='Message'
                  onChange={handleChange}
                  value={dataMessage.message_content || ''}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button className="buttonColor" type="submit" onClick={this.handleClose}>Send</Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </>
    )
  }
}

export default MessageProfileModal
