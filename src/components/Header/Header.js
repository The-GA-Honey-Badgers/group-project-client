import React, { Fragment } from 'react'
import { Nav, Navbar, Button } from 'react-bootstrap'

const navbarTextStyle = {
  color: 'white'
}

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#post-create"><Button className='nav-btn'>Create Post</Button></Nav.Link>
    <Nav.Link href="#change-password"><Button className='nav-btn'>Change Password</Button></Nav.Link>
    <Nav.Link href="#sign-out"><Button className='nav-btn'>Sign Out</Button></Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up"><Button className='nav-btn'>Sign Up</Button></Nav.Link>
    <Nav.Link href="#sign-in"><Button className='nav-btn'>Sign In</Button></Nav.Link>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <Nav.Link to="/"><Button className='nav-btn'>Home</Button></Nav.Link>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar className='navbar' variant="dark" expand="md">
    <Navbar.Brand href="#">
      honey-badgers-client
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user ? authenticatedOptions : unauthenticatedOptions }
        { alwaysOptions }
        { user && <span style={navbarTextStyle} className="navbar-text mr-2">Welcome, {user.email}</span>}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
