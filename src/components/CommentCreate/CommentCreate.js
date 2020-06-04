import React, { useState } from 'react'
import { withRouter } from 'react-router'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import './commentCreate.scss'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const CommentCreate = props => {
  // console.log('commentCreate props: ', props.user.token)

  const [comment, setComment] = useState({
    body: '',
    postId: props.postId
  })

  const [show, setShow] = useState(true)
  const handleClose = () => setShow(false)

  const handleInput = event => {
    const updatedField = { [event.target.name]: event.target.value }
    const newState = Object.assign({}, comment, updatedField)
    setComment(newState)
  }

  const onCreateComment = event => {
    event.preventDefault()
    axios({
      method: 'POST',
      url: `${apiUrl}/comments`,
      data: {
        comment: comment
      },
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(() => {
        // console.log('success!')
        props.history.push(`/posts/${props.postId}`)
      })
      .then(() => props.msgAlert({
        heading: 'Submit Comment Success',
        message: 'Create Comment successfully!',
        variant: 'success'
      }))
      .catch(error => {
        setComment('')
        props.msgAlert({
          heading: 'Submit Comment Fail' + error.message,
          message: 'Create Comment Failed',
          variant: 'danger'
        })
      })
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add a new comment</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onCreateComment}>
        <Form.Label>Comment Text</Form.Label>
        <Form.Control required maxLength='200' value={comment.body} name="body" as="textarea" placeholder="Comment" onChange={handleInput} />
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
          Close
          </Button>
          <Button variant="primary" type="submit">
          Post Comment
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default withRouter(CommentCreate)
