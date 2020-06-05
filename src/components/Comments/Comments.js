import React from 'react'
import './comments.scss'
import { withRouter } from 'react-router'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const Comments = props => {
  const user = props.user
  const postComments = props.commentArray

  const onUpdateClick = commentId => {
    // console.log('the commentId: ', commentId)
    props.updateModal({
      update: true,
      commentId: commentId
    })
  }

  const onCommentDelete = (commentId, postId) => {
    axios({
      method: 'DELETE',
      url: `${apiUrl}/comments/${commentId}`,
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(() => {
        props.setRefresh(true)
      })
      .then(() => props.msgAlert({
        heading: 'Delete Comment Success',
        message: 'Delete Comment successfully!',
        variant: 'success'
      }))
      .catch(error => {
        props.msgAlert({
          heading: 'Delete Comment Fail' + error.message,
          message: 'Delete Comment Failed',
          variant: 'danger'
        })
      })
  }

  return (
    <div>
      {postComments.map(comment => (
        <div className='comment' key={comment._id}>
          <div className="flexWrapper">
            <div>
              <div className='username'>
                <span>{comment.author ? comment.author.email : 'USERNAME'}</span>
                <span style={{ 'margin-left': '5px' }}>Added on {comment.createdAt ? comment.createdAt.split('T')[0] : 'DATE'}</span>
              </div>
              <div className='commentBody'>{comment.body}</div>
            </div>
            {user &&
            <div className="buttonContainer">
              <Button onClick={() => onUpdateClick(comment._id)} className="button">Update</Button>
              <Button id="delete-button" className="button delete-button" onClick={() => onCommentDelete(comment._id, comment.postId)}>Delete</Button>
            </div>}
          </div>
        </div>
      ))}
    </div>
  )
}

export default withRouter(Comments)
