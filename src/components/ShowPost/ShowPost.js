import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { Card, Button, Form, Modal } from 'react-bootstrap'
import Comments from '../Comments/Comments'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import EnvoyIcon from '../../Envoy.png'
import '../Comments/commentModal.scss'
// <-- stylesheet inherited from 'PostIndex.js' -->

const ShowPost = (props) => {
  const [post, setPost] = useState(null)
  const [showUpdateModal, setUpdateModalStatus] = useState({
    update: false,
    commentId: null
  })
  const [refresh, setRefresh] = useState(false)
  const [comment, setComment] = useState({
    body: ''
  })

  const [newComment, setNewComment] = useState({
    body: '',
    postId: props.postId
  })

  const [showCreateModal, setCreateModalStatus] = useState(false)

  const closeCreateModal = () => {
    setCreateModalStatus(false)
    createFormReset()
  }

  const closeUpdateModal = () => {
    setUpdateModalStatus({
      update: false,
      commentId: null
    })
    updateFormReset()
  }

  const updateFormReset = () => setComment({
    body: ''
  })

  const createFormReset = () => setNewComment({
    body: '',
    postId: props.postId
  })

  const handleUpdateInput = event => {
    const updatedField = { [event.target.name]: event.target.value }
    const newState = Object.assign({}, comment, updatedField)
    setComment(newState)
  }

  const handleCreateInput = event => {
    const updatedField = { [event.target.name]: event.target.value }
    const newState = Object.assign({}, newComment, updatedField)
    setNewComment(newState)
  }

  const onUpdateComment = event => {
    event.preventDefault()
    axios({
      method: 'PATCH',
      url: `${apiUrl}/comments/${showUpdateModal.commentId}`,
      data: {
        comment: comment
      },
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(() => {
        closeUpdateModal()
        updateFormReset()
      })
      .then(() => props.msgAlert({
        heading: 'Update Comment Success',
        message: 'Update Comment successfully!',
        variant: 'success'
      }))
      .catch(error => {
        closeUpdateModal()
        updateFormReset()
        props.msgAlert({
          heading: 'Update Comment Fail' + error.message,
          message: 'Update Comment Failed',
          variant: 'danger'
        })
      })
  }

  const onCreateComment = event => {
    event.preventDefault()
    axios({
      method: 'POST',
      url: `${apiUrl}/comments`,
      data: {
        comment: newComment
      },
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(() => {
        closeCreateModal()
        createFormReset()
      })
      .then(() => props.msgAlert({
        heading: 'Create Comment Success',
        message: 'Create Comment successfully!',
        variant: 'success'
      }))
      .catch(error => {
        closeCreateModal()
        createFormReset()
        props.msgAlert({
          heading: 'Create Comment Fail' + error.message,
          message: 'Create Comment Failed',
          variant: 'danger'
        })
      })
  }

  useEffect(() => {
    axios(`${apiUrl}/posts/${props.postId}`)
      .then(res => {
        // console.log(res.data.post)
        setPost(res.data.post)
      })
      // .catch(console.error)
  }, [showUpdateModal, refresh, showCreateModal])

  if (!post) {
    return <p>Loading....</p>
  }

  const { title, body, imgUrl } = post
  const comments = post.comments

  let commentsJsx = ''
  if (comments.length > 0) {
    commentsJsx = <Comments setRefresh={setRefresh} msgAlert={props.msgAlert} updateModal={setUpdateModalStatus} commentArray={comments} postId={props.postId} user={props.user} />
  }

  const onCreateClick = () => {
    setCreateModalStatus(true)
  }

  const handleDeleteClick = event => {
    event.preventDefault()
    axios({
      method: 'DELETE',
      url: `${apiUrl}/posts/${props.postId}`,
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(() => props.msgAlert({ message: 'Successfully Delete Post!', variant: 'success' }))
      .then(() => props.history.push('/'))
      .catch(() => props.msgAlert({ message: 'Failed to Delete Post', variant: 'danger' }))
  }

  return (
    <div>
      <Modal className="commentModal" show={showUpdateModal.update} onHide={closeUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update a comment:</Modal.Title>
        </Modal.Header>
        <Form onSubmit={onUpdateComment}>
          <Form.Control required maxLength='200' value={comment.body} name="body" as="textarea" placeholder="Maximum 200 characters..." onChange={handleUpdateInput} />
          <Modal.Footer>
            <Button className="commentModalSubmitBtn" type="submit">
            Update Comment
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Modal className="commentModal" show={showCreateModal} onHide={closeCreateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add a comment:</Modal.Title>
        </Modal.Header>
        <Form onSubmit={onCreateComment}>
          <Form.Control required maxLength='200' value={newComment.body} name="body" as="textarea" placeholder="Maximum 200 characters..." onChange={handleCreateInput} />
          <Modal.Footer>
            <Button className="commentModalSubmitBtn" type="submit">
            Post Comment
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Card className="postBox">
        <div className="borderBox"></div>
        <Card.Body className="postContent">
          <div className="textBox">
            <img className="postIcon" src={EnvoyIcon}/>
            <p className="postInfo">{post.owner ? post.owner.email : 'USERNAME'}</p>
            <p className="postInfo">Posted on {post.createdAt ? post.createdAt.split('T')[0] : 'DATE'}</p>
          </div>
          <div>
            {imgUrl && <Card.Img className="postImage" variant="bottom" src={imgUrl} />}
            <div className="postTextTitle">
              {title}
            </div>
            <div className="postTextBody">
              {body}
            </div>
          </div>
          <div className="buttonBox">
            { props.user && <Button onClick={onCreateClick} className="button">Create Comment</Button>}
            <Button as={Link} to='/' className="button">Back to Latest Posts</Button>
            { props.user &&
            <div>
              <Button as={Link} to={props.match.url + '/post-update'} className="button">Update Post</Button>
              <Button onClick={handleDeleteClick} id="delete-button" className="button delete-button">Delete Post</Button>
            </div> }
          </div>
          {commentsJsx}
        </Card.Body>
      </Card>
    </div>
  )
}

export default withRouter(ShowPost)
