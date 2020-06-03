import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Comments from '../Comments/Comments'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import './showPost.scss'
import { Link } from 'react-router-dom'

const ShowPost = (props) => {
  const [post, setPost] = useState(null)

  useEffect(() => {
    axios(`${apiUrl}/posts/${props.postId}`)
      .then(res => {
        // console.log(res.data.post)
        setPost(res.data.post)
      })
      .catch(console.error)
  }, [])

  const img = false
  const imgJsx = <Card.Img className="postImage" variant="bottom" src="https://digitalmarketing.blob.core.windows.net/7462/images/items/image568841.jpg" />

  if (!post) {
    return <p>Loading....</p>
  }

  const { title, imgUrl } = post
  // const username = post.owner.username
  const comments = post.comments
  // console.log(comments)

  let commentsJsx = ''
  if (comments.length > 0) {
    commentsJsx = <Comments commentArray={comments} />
  }

  const handleclick = event => {
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
    <Card className="postBox">
      <div className="borderBox"></div>
      <Card.Body className="postContent">
        <div className="textBox">
          <img className="icon" src="https://us.123rf.com/450wm/andrey1978/andrey19781505/andrey1978150500065/39845361-stock-vector-cartoon-badger-children-illustration.jpg?ver=6"/>
          <p className="postInfo">username</p>
          <p className="postInfo">Posted on 6/2/2020</p>
        </div>
        <div>
          {imgUrl && <Card.Img className="postImage" variant="bottom" src={imgUrl} />}
          {img && imgJsx}
          <div className="postTextBody">
            <p>{title}</p>
          </div>
        </div>
        <div className="buttonBox">
          <Button className="button">Add Comment</Button>
          <Button onClick={handleclick} className="button">Delete Post</Button>
          <Button as={Link} to={props.match.url + '/post-update'} className="button">Update Post</Button>
        </div>
        {commentsJsx}
      </Card.Body>
    </Card>
  )
}

export default withRouter(ShowPost)
