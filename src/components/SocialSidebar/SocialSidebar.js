import React from 'react'
import { LinkedinShareButton, LinkedinIcon, FacebookShareButton, FacebookIcon, PinterestShareButton, PinterestIcon, TwitterShareButton, TwitterIcon, EmailShareButton, EmailIcon } from 'react-share'
import './socialSidebar.scss'

const SocialSidebar = () => (
  <div className="social-sidebar">

    <div className="social-btn">
      <FacebookShareButton
        url="www.google.com"
      >
        <FacebookIcon size={40} round={true} iconFillColor={'white'}/>
      </FacebookShareButton>
    </div>

    <div className="social-btn">
      <LinkedinShareButton
        url="www.google.com"
      >
        <LinkedinIcon size={40} round={true} iconFillColor={'white'}/>
      </LinkedinShareButton>
    </div>

    <div className="social-btn">
      <TwitterShareButton
        url="www.google.com"
      >
        <TwitterIcon size={40} round={true} iconFillColor={'white'}/>
      </TwitterShareButton>
    </div>

    <div className="social-btn">
      <PinterestShareButton
        url="www.google.com"
        media="https://i.imgur.com/fl2wEsQ.png"
      >
        <PinterestIcon size={40} round={true} iconFillColor={'white'}/>
      </PinterestShareButton>
    </div>

    <div className="social-btn">
      <EmailShareButton
        subject="Come check out Envoy!"
        url="www.google.com"
        body="Hey! I'm inviting you to check out this awesome website that I recently discovered called 'Envoy' where you can share some thoughts and photos in a public space. Come check it out!"
      >
        <EmailIcon size={40} round={true} iconFillColor={'white'}/>
      </EmailShareButton>
    </div>

  </div>
)

export default SocialSidebar
