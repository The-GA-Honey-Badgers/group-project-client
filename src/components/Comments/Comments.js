import React from 'react'
import './comments.scss'

const Comments = props => {
  // console.log('Array: ', props.commentArray)
  // console.log('Props: ', props)
  const postComments = props.commentArray

  return (
    <div>
      {postComments.map(comment => (
        <div className='comment' key={comment._id}>
          <div>{comment.author.username}</div>
          <div>{comment.body}</div>
        </div>
      ))}
    </div>
  )
}

export default (Comments)
