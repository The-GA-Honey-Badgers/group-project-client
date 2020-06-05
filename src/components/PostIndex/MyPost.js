import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import EnvoyIcon from '../../Envoy.png'
// <-- stylesheet inherited from 'PostIndex.js' -->

const MyPost = (props) => {
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    axios(`${apiUrl}/posts`)
      .then(res => {
        const respost = res.data.posts
        return respost.filter(post => post.owner._id === props.user._id)
      })
      .then(response => {
        // console.log(res.data.posts)
        setPosts(response)
      })
      // .catch(console.error)
  }, [])

  if (!posts) {
    return <p>Loading....</p>
  }

  if (posts.length === 0) {
    return <p>There are no posts yet!!! Make one!</p>
  }

  return (
    <div className="postIndexContainer">
      {posts.map(post => (
        <Card key={post._id} className="postBox">
          <div className="borderBox"></div>
          <Card.Body className="postContent">
            <div className="textBox">
              <img className="postIcon" src={EnvoyIcon}/>
              <p className="postInfo">{post.owner ? post.owner.email : 'USERNAME'}</p>
              <p className="postInfo">Posted on {post.createdAt ? post.createdAt.split('T')[0] : 'DATE'}</p>
            </div>
            <div>
              {post.imgUrl && <Card.Img className="postImage" variant="bottom" src={post.imgUrl} />}
              <div className="postTextTitle">
                {post.title}
              </div>
              <div className="postTextBody">
                {post.body}
              </div>
              <div className="commentStatsBody">
                {post.comments.length} Comments
              </div>
            </div>
            <div className="buttonBox">
              <Button as={Link} to={`/posts/${post._id}`} className="button">View Post</Button>
            </div>
          </Card.Body>
        </Card>
      ))}
      <div id="latestPostsWrapper">
        <div id="latestPostsBanner">
          My Posts
        </div>
      </div>
    </div>
  )
}

export default MyPost
