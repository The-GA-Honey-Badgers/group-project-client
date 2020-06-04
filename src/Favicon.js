import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import apiUrl from './apiConfig'

class UploadImage extends Component {
  constructor () {
    super()
    this.state = {
      resurl: '',
      uploadUrl: '',
      postid: ''
    }
  }

  handleLocalChange = (event) => {
    const updatedField = event.target.value
    this.setState(currentState => {
      return { postid: updatedField }
    })
  }

  handleLocalSubmit = (event) => {
    const form = event.target
    const formData = new FormData(form)
    event.preventDefault()
    axios({
      method: 'POST',
      url: `${apiUrl}/localfileupload`,
      data: formData
    })
      .then(res => {
        this.setState({ uploadUrl: res.data.upload.imageUrl })
      })
      .catch(console.error)
  }

  render () {
    // const { websiteUrl } = this.state
    console.log(this.props)
    return (
      <div>
        <h3>Upload Image</h3>
        <img src= {this.state.resurl} />
        <Form onSubmit = {this.handleLocalSubmit} >
          <Form.Control name="file" type="file" />
          <Button variant="primary" type="submit">
          upload
          </Button>
        </Form>
        <img src= {this.state.uploadUrl} />
      </div>
    )
  }
}

export default UploadImage
