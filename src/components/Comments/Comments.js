import React from 'react'
import './comments.scss'
import { withRouter } from 'react-router'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const Comments = props => {
  // console.log('Props: ', props)
  const user = props.user
  const postComments = props.commentArray

  const onCommentDelete = (commentId, postId) => {
    axios({
      method: 'DELETE',
      url: `${apiUrl}/comments/${commentId}`,
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(() => {
        console.log('success!')
      })
      .catch(console.error)
  }

  return (
    <div>
      {postComments.map(comment => (
        <div className='comment' key={comment._id}>
          <div className="flexWrapper">
            <div>
              <div className='username'>{comment.author ? comment.author.email : 'USERNAME'}</div>
              <div className='commentBody'>{comment.body}</div>
            </div>
            {user &&
            <div className="buttonContainer">
              <Button as={Link} to={`/posts/${comment.postId}/comment-update/${comment._id}`} className="button">Update</Button>
              <Button className="button" onClick={() => onCommentDelete(comment._id, comment.postId)}>Delete</Button>
            </div>}
          </div>
        </div>
      ))}
    </div>
  )
}

export default withRouter(Comments)
