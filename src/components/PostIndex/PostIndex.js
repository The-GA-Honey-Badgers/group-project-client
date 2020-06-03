import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import './postIndex.scss'

const PostIndex = () => {
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    axios(`${apiUrl}/posts`)
      .then(res => {
        // console.log(res.data.posts)
        setPosts(res.data.posts)
      })
      .catch(console.error)
  }, [])

  const img = false
  const imgJsx = <Card.Img className="postImage" variant="bottom" src="https://digitalmarketing.blob.core.windows.net/7462/images/items/image568841.jpg" />

  if (!posts) {
    return <p>Loading....</p>
  }

  return (
    <div className="postIndexContainer">
      {posts.map(post => (
        <Card key={post._id} className="postBox">
          <div className="borderBox"></div>
          <Card.Body className="postContent">
            <div className="textBox">
              <img className="icon" src="https://us.123rf.com/450wm/andrey1978/andrey19781505/andrey1978150500065/39845361-stock-vector-cartoon-badger-children-illustration.jpg?ver=6"/>
              <p className="postInfo">{post.owner.username}</p>
              <p className="postInfo">Posted on 6/2/2020</p>
            </div>
            <div>
              {post.imgUrl && <Card.Img className="postImage" variant="bottom" src={post.imgUrl} />}
              {img && imgJsx}
              <div className="postTextBody">
                {post.title}
              </div>
            </div>
            <div className="buttonBox">
              <Button as={Link} to={`/posts/${post._id}`} className="button">View Post</Button>
              <Button as={Link} to='/' className="button">Add Comment</Button>
            </div>
          </Card.Body>
        </Card>
      ))}
      <p>Latest Posts</p>
    </div>
  )
}

export default PostIndex
