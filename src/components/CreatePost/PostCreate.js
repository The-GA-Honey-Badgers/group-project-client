import React, { Component, useState } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'

class PostCreate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      post: {
        title: null,
        body: null,
        imgUrl: null
      },
      url: ''
    }
  }

  handleWordChange = (event) => {
    const updatedField = { [event.target.name]: event.target.value }
    // combing the updatedField with the current state
    // const updatedBook = Object.assign(this.state.book, updatedField)
    // this.setState({ book: updatedBook })
    this.setState(currentState => {
      return { post: { ...currentState.post, ...updatedField } }
    })
  }

  handleWordSubmit = (event) => {
    console.log(this.props.user.token)
    event.preventDefault()
    axios({
      method: 'POST',
      url: `${apiUrl}/posts`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: { post: this.state.post }
    })
      .then(res => {
        return this.setState({ post: res.data.post })
      })
      .then(() => this.props.msgAlert({
        heading: 'Submit Post Success',
        message: 'Create Post successfully!',
        variant: 'success'
      }))
      .catch(error => {
        this.setState({ post: {} })
        this.props.msgAlert({
          heading: 'Submit Post Fail' + error.message,
          message: 'Create Post Failed',
          variant: 'danger'
        })
      })
  }

  handleLocalSubmit = (event) => {
    // const imgUrl = this.state.post.imgUrl
    const form = event.target
    const formData = new FormData(form)
    event.preventDefault()
    axios({
      method: 'POST',
      url: `${apiUrl}/localfileupload`,
      data: formData
    })
      .then(res => {
        console.log(res)
        // console.log('this is image upload response', res.data.upload.imageUrl)
        localStorage.setItem('imgUrl', res.data.upload.imageUrl)
        const imgUrl = { imgUrl: res.data.upload.imageUrl }
        const newState = Object.assign({}, this.state.post, imgUrl)
        this.setState({ post: newState })
      })
      .then(() => this.props.msgAlert({
        heading: 'Upload Image Success',
        message: 'Create Image successfully!',
        variant: 'success'
      }))
      .catch(error => {
        this.setState({ post: {} })
        this.props.msgAlert({
          heading: 'Upload Image Fail' + error.message,
          message: 'Create Image Failed',
          variant: 'danger'
        })
      })
  }

  handleUrlChange = (event) => {
    const updatedField = { [event.target.name]: event.target.value }
    const updatedUrl = Object.assign(this.state, updatedField)
    this.setState({ url: updatedUrl })
  }

  handleUrlSubmit = (event) => {
    event.preventDefault()
    axios({
      method: 'POST',
      url: `${apiUrl}/uploads`,
      data: this.state.url

    })
      .then(res => {
        const imgUrl = { imgUrl: res.data.upload.imageUrl }
        const newState = Object.assign({}, this.state.post, imgUrl)
        return this.setState({ post: newState })
      })
      // .then(res => this.props.setUrl({ url: res.data.post.image }))
      // .then(res => this.setState({ post: res.data.post }))
      .then(() => this.props.msgAlert({
        heading: 'Upload Image Success',
        message: 'Create Image successfully!',
        variant: 'success'
      }))
      .catch(error => {
        this.setState({ post: {} })
        this.props.msgAlert({
          heading: 'Upload Image Fail' + error.message,
          message: 'Create Image Failed',
          variant: 'danger'
        })
      })
  }

  Example = () => {
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const { url } = this.state
    return (
      <div>
        <Button variant="primary" onClick={handleShow}>
        Upload Image
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>You can choose any way you like!</Modal.Title>
          </Modal.Header>
          <Form onSubmit = {this.handleLocalSubmit} >
            <Form.Control name="file" type="file" />
            <Button variant="primary" type="submit">
            upload
            </Button>
          </Form>
          <Form onSubmit = {this.handleUrlSubmit}>
            <Form.Label>Image Url</Form.Label>
            <Form.Control required onChange={this.handleUrlChange} value={url} name="url" type="text" placeholder="Your Image Url (optional)" />
            <Button variant="primary" type="submit">
            Add Url
            </Button>
          </Form>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
            Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }

  render () {
    const { title, body, imgUrl } = this.state
    return (
      <div>
        <h3>Create Post</h3>
        <img src= {this.state.post.imgUrl} style={{ maxWidth: '50%' }} />
        <Card style={{ width: '66%' }}>
          <Card.Img variant="top" src={imgUrl} />
          <Card.Body>
            <Form onSubmit={this.handleWordSubmit} >
              <Form.Group controlId="formBasicTitle">
                <Form.Label>Title of Post</Form.Label>
                <Form.Control required onChange={this.handleWordChange} value={title} name="title" type="text" placeholder="Title of Post" />
              </Form.Group>
              <Form.Group controlId="formBasicBody">
                <Form.Label>Body of Post</Form.Label>
                <Form.Control style={{ height: '8rem' }} required onChange={this.handleWordChange} value={body} name="body" type="text" placeholder="Body of Post" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
            <Card.Text>
               If you want to upload local image please use following button
            </Card.Text>
            <this.Example />
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default PostCreate
