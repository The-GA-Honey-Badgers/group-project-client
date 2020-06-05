import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Form, Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import '../CreatePost/postCreateOrUpdate.scss'

class PostUpdate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      post: {
        title: null,
        body: null
      },
      success: false
    }
  }

  componentDidMount () {
    // this will run after the first render() runs
    // api request happen here
    axios(`${apiUrl}/posts/${this.props.postId}`)
      .then(res => {
        this.setState({ post: res.data.post })
      })
      .catch(error => {
        this.setState({ post: {} })
        this.props.msgAlert({
          heading: 'Submit New Post Fail' + error.message,
          message: 'Update Post Failed',
          variant: 'danger'
        })
      })
  }

  handleWordChange = (event) => {
    const updatedField = { [event.target.name]: event.target.value }
    this.setState(currentState => {
      return { post: { ...currentState.post, ...updatedField } }
    })
  }

  handleWordSubmit = (event) => {
    event.preventDefault()
    axios({
      method: 'PATCH',
      url: `${apiUrl}/posts/${this.props.postId}`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: { post: this.state.post }
    })
      .then(res => {
        return this.setState({ post: res.data.post })
      })
      .then(() => this.props.msgAlert({
        heading: 'Submit New Post Success',
        message: 'Update Post successfully!',
        variant: 'success'
      }))
      .then(() => this.setState({ success: true }))
      .catch(error => {
        this.setState({ post: {} })
        this.props.msgAlert({
          heading: 'Submit New Post Fail' + error.message,
          message: 'Update Post Failed',
          variant: 'danger'
        })
      })
  }

  render () {
    const { title, body } = this.state
    if (this.state.success) {
      return <Redirect to={`/posts/${this.props.postId}`}/>
    }
    return (
      <div id="post-create-form-field" className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <div className="body-wrapper">
            <div className="content-wrapper">
              <h3 className="create-post-header">Update Post</h3>

              <Form onSubmit={this.handleWordSubmit}>

                <Form.Group controlId="formBasicTitle">
                  <Form.Label className="form-field-label">Title: </Form.Label>
                  <Form.Control className="form-input-space" onChange={this.handleWordChange} value={title} name="title" type="text" placeholder="Need to update the title?" />
                  <Form.Text className="text-muted subtext">
                    <b>Maximum 50 characters.</b>
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicBody">
                  <Form.Label className="form-field-label">Body: </Form.Label>
                  <Form.Control className="form-input-space" onChange={this.handleWordChange} value={body} name="body" type="text" placeholder="Need to make any changes?" as="textarea" rows="5" />
                  <Form.Text className="text-muted">
                    <b>Maximum 400 characters.</b>
                  </Form.Text>
                </Form.Group>

                <div className="post-action-btn-container">
                  <Button className="post-action-btn" type="submit">
                    Update Post
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

export default PostUpdate
