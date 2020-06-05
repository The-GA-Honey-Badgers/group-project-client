import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Form, Button } from 'react-bootstrap'
// import postCreate stylesheet
import './postCreateOrUpdate.scss'
import { Redirect } from 'react-router-dom'

class PostCreate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      post: {
        title: null,
        body: null,
        imgUrl: null
      },
      success: false
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
    // console.log(this.props.user.token)
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
        heading: 'Created!',
        message: 'Successfully created a new post',
        variant: 'success'
      }))
      .then(() => this.setState({ success: true }))
      .catch(error => {
        this.setState({ post: {} })
        this.props.msgAlert({
          heading: 'Failed to create post: ' + error.message,
          message: 'Please try again',
          variant: 'danger'
        })
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
        // console.log(res)
        // console.log('this is image upload response', res.data.upload.imageUrl)
        localStorage.setItem('imgUrl', res.data.upload.imageUrl)
        const imgUrl = { imgUrl: res.data.upload.imageUrl }
        const newState = Object.assign({}, this.state.post, imgUrl)
        this.setState({ post: newState })
      })
      .then(() => this.props.msgAlert({
        heading: 'Uploaded Image!',
        message: 'Uploaded image successfully',
        variant: 'success'
      }))
      .catch(error => {
        this.setState({ post: {} })
        this.props.msgAlert({
          heading: 'Failed to upload image: ' + error.message,
          message: 'Please try again',
          variant: 'danger'
        })
      })
  }

  InlineImgUpload = () => {
    return (
      <Form onSubmit = {this.handleLocalSubmit} >
        <Form.Control name="file" type="file" />
        <button type="submit">
        Upload Image
        </button>
        <Form.Text className="text-muted">
          Remember to upload an image <b>before</b> submitting your post.
        </Form.Text>
      </Form>
    )
  }

  render () {
    const { title, body } = this.state
    if (this.state.success) {
      return <Redirect to={'/my-post'}/>
    }
    return (
      <div id="post-create-form-field" className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <div className="body-wrapper">
            <div className="content-wrapper">
              <h3 className="create-post-header">Create New Post</h3>

              {/* Upload an image in-line with the post */}
              <this.InlineImgUpload />

              <Form onSubmit={this.handleWordSubmit}>

                <img src= {this.state.post.imgUrl} style={{ maxWidth: '50%' }} />

                <Form.Group controlId="formBasicTitle">
                  <Form.Label className="form-field-label">Title: </Form.Label>
                  <Form.Control className="form-input-space" required onChange={this.handleWordChange} value={title} name="title" type="text" placeholder="Enter Title" />
                  <Form.Text className="text-muted subtext">
                    <b>Maximum 50 characters.</b>
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicBody">
                  <Form.Label className="form-field-label">Body: </Form.Label>
                  <Form.Control className="form-input-space" required onChange={this.handleWordChange} value={body} name="body" type="text" placeholder="What's on your mind?" as="textarea" rows="5" />
                  <Form.Text className="text-muted">
                    <b>Maximum 400 characters.</b>
                  </Form.Text>
                </Form.Group>

                <div className="post-action-btn-container">
                  <Button className="post-action-btn" type="submit">
                    Submit Post
                  </Button>
                </div>

              </Form>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PostCreate
