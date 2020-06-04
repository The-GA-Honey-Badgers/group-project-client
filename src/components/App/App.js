import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import SocialSidebar from '../SocialSidebar/SocialSidebar'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'

import PostCreate from '../CreatePost/PostCreate'
import PostIndex from '../PostIndex/PostIndex'
import MyPost from '../PostIndex/MyPost'
import ShowPost from '../ShowPost/ShowPost'
import PostUpdate from '../UpdatePost/PostUpdate'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <div id="page-container">
          <Fragment>
            <div id="content-wrap">
              <Header id="header" user={user} />
              <div>
                <SocialSidebar />
              </div>
              {msgAlerts.map((msgAlert, index) => (
                <AutoDismissAlert
                  key={index}
                  heading={msgAlert.heading}
                  variant={msgAlert.variant}
                  message={msgAlert.message}
                />
              ))}
              <main className="container">
                <Route path='/sign-up' render={() => (
                  <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
                )} />
                <Route path='/sign-in' render={() => (
                  <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
                )} />
                <AuthenticatedRoute user={user} path='/sign-out' render={() => (
                  <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
                )} />
                <AuthenticatedRoute user={user} path='/change-password' render={() => (
                  <ChangePassword msgAlert={this.msgAlert} user={user} />
                )} />
                <AuthenticatedRoute user={user} exact path="/post-create" render={() => (
                  <PostCreate msgAlert={this.msgAlert} user={user} />
                )} />
                <AuthenticatedRoute user={user} path='/my-post' render={() => (
                  <MyPost msgAlert={this.msgAlert} user={user} />
                )} />
                <Route exact path='/' component={PostIndex} />
                <Route exact path='/posts/:id' render={({ match }) => {
                  const currentPost = match.params.id
                  return (
                    <ShowPost
                      postId={currentPost}
                      user={user}
                      msgAlert={this.msgAlert}
                    />
                  )
                }} />
                <Route path= {'/posts/:id/post-update'} render={({ match }) => {
                  const currentPost = match.params.id
                  return (
                    <PostUpdate
                      postId={currentPost}
                      msgAlert={this.msgAlert}
                      user = {user}
                    />
                  )
                }} />
              </main>
            </div>
          </Fragment>
          <div id="footer"><Footer /></div>
        </div>
      </Fragment>
    )
  }
}

export default App
