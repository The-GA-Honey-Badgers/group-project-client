import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Comments from '../Comments/Comments'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import './showPost.scss'

const ShowPost = props => {
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
  const username = post.owner.username
  const comments = post.comments
  // console.log(comments)

  let commentsJsx = ''
  if (comments.length > 0) {
    commentsJsx = <Comments commentArray={comments} />
  }

  // console.log('title: ', title)
  // console.log('body: ', body)
  // console.log('imgUrl: ', imgUrl)
  // console.log('owner: ', owner)

  return (
    <Card className="postBox">
      <div className="borderBox"></div>
      <Card.Body className="postContent">
        <div className="textBox">
          <img className="icon" src="https://us.123rf.com/450wm/andrey1978/andrey19781505/andrey1978150500065/39845361-stock-vector-cartoon-badger-children-illustration.jpg?ver=6"/>
          <p className="postInfo">{username}</p>
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
        </div>
        {commentsJsx}
      </Card.Body>
    </Card>
  )
}

export default withRouter(ShowPost)
