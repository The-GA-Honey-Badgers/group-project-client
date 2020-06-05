import React, { Fragment } from 'react'
import { Nav, Navbar, Button, Dropdown, DropdownButton } from 'react-bootstrap'
import BadgerLogo from '../../Honey-Badger.png'
// import { Link } from 'react-router-dom'

const navbarWelcomeTextStyle = {
  color: '#53005C'
}
const navbarEnvoyTextStyle = {
  color: '#53005C',
  fontFamily: 'Gloria Hallelujah, Times New Roman, serif',
  fontSize: 'clamp(15px, 4vw, 25px)'
}

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#/post-create"><Button className='nav-btn'>Create Post</Button></Nav.Link>
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
    <Nav.Link href="#/"><Button className='nav-btn'>Home</Button></Nav.Link>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar id="header" className='navbar' variant="dark" expand="md">
    <Navbar.Brand href="#">
      <img className="BadgerLogo" src={BadgerLogo} alt="Cartoon-ish Badger Logo"/>
    </Navbar.Brand>
    <div style={navbarEnvoyTextStyle}>
      ENVOY
    </div>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user ? authenticatedOptions : unauthenticatedOptions }
        { alwaysOptions }
        <div style={{ padding: '0px 0px 0px 0px' }}>
          { user && <span style={navbarWelcomeTextStyle} className="navbar-text mr-2">Welcome, <DropdownButton drop="down" className="userdropdown-button" title={user.email}>
            <Dropdown.Item href="#my-post"><Button>My Post</Button></Dropdown.Item>
            <Dropdown.Item href="#/change-password"><Button>Change Password</Button></Dropdown.Item>
            <Dropdown.Item href="#/sign-out"><Button>Sign Out</Button></Dropdown.Item>
          </DropdownButton></span>}
        </div>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
