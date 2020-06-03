import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'

class PostShow extends Component {
  constructor () {
    // call constructor of the component class
    super()
    this.state = {
      posts: null
    }
  }

  componentDidMount () {
    // this will run after the first render() runs
    // api request happen here
    axios(`${apiUrl}/posts`)
      .then(res => {
        this.setState({ posts: res.data.posts })
      })
      .catch(console.error)
  }

  render () {
    const { posts } = this.state
    let postJsx

    if (!posts) {
      postJsx = 'Loading...'
    } else if (!posts.length) {
      postJsx = 'No posts to display'
    } else {
      postJsx = (
        <ul>
          {posts.map(post => (
            <li key={post._id}>
              <h5>Id: {post._id}</h5>
              <h3>Title: {post.title}</h3>
              <h5>Body: {post.body}</h5>
              <img src= {post.imgUrl} />
            </li>)
          )}
        </ul>
      )
    }

    return (
      <div>
        <h2>Post Page</h2>
        {postJsx}
      </div>
    )
  }
}

export default PostShow
