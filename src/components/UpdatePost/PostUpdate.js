import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Redirect } from 'react-router-dom'

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
      <div className="update-box">
        <h3>Update Post</h3>
        <Card style={{ width: '66%' }} >
          {/* <Card.Img variant="top" src={imgUrl} /> */}
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
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default PostUpdate
