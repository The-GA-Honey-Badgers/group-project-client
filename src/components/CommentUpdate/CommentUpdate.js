import React, { useState } from 'react'
import { withRouter } from 'react-router'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import './commentUpdate.scss'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const CommentUpdate = props => {
  const { commentId, user } = props

  const [comment, setComment] = useState({
    body: ''
  })

  const [show, setShow] = useState(true)
  const handleClose = () => setShow(false)

  const handleInput = event => {
    const updatedField = { [event.target.name]: event.target.value }
    const newState = Object.assign({}, comment, updatedField)
    setComment(newState)
  }

  const onUpdateComment = event => {
    event.preventDefault()
    axios({
      method: 'PATCH',
      url: `${apiUrl}/comments/${commentId}`,
      data: {
        comment: comment
      },
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(() => {
        // console.log('success!')
        // props.history.push(`/posts/${props.postId}`)
        handleClose()
      })
      .then(() => props.msgAlert({
        heading: 'Submit Comment Success',
        message: 'Update Comment successfully!',
        variant: 'success'
      }))
      .catch(error => {
        setComment('')
        props.msgAlert({
          heading: 'Submit Comment Fail' + error.message,
          message: 'Update Comment Failed',
          variant: 'danger'
        })
      })
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Comment</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onUpdateComment}>
        <Form.Label>Comment Text</Form.Label>
        <Form.Control required maxLength='200' value={comment.body} name="body" as="textarea" placeholder="Comment Update" onChange={handleInput} />
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

export default withRouter(CommentUpdate)
