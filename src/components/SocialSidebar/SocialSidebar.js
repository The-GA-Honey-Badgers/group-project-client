import React from 'react'
import { LinkedinShareButton, LinkedinIcon, FacebookShareButton, FacebookIcon, PinterestShareButton, PinterestIcon, TwitterShareButton, TwitterIcon, EmailShareButton, EmailIcon } from 'react-share'
import './socialSidebar.scss'

const SocialSidebar = () => (
  <div className="social-sidebar">

    <div className="social-btn">
      <FacebookShareButton
        url="https://the-ga-honey-badgers.github.io/group-project-client/#/"
      >
        <FacebookIcon size={40} round={true} iconFillColor={'white'}/>
      </FacebookShareButton>
    </div>

    <div className="social-btn">
      <LinkedinShareButton
        url="https://the-ga-honey-badgers.github.io/group-project-client/#/"
      >
        <LinkedinIcon size={40} round={true} iconFillColor={'white'}/>
      </LinkedinShareButton>
    </div>

    <div className="social-btn">
      <TwitterShareButton
        url="https://the-ga-honey-badgers.github.io/group-project-client/#/"
      >
        <TwitterIcon size={40} round={true} iconFillColor={'white'}/>
      </TwitterShareButton>
    </div>

    <div className="social-btn">
      <PinterestShareButton
        url="https://the-ga-honey-badgers.github.io/group-project-client/#/"
        media="https://i.imgur.com/fl2wEsQ.png"
      >
        <PinterestIcon size={40} round={true} iconFillColor={'white'}/>
      </PinterestShareButton>
    </div>

    <div className="social-btn">
      <EmailShareButton
        subject="Come check out Envoy!"
        url="https://the-ga-honey-badgers.github.io/group-project-client/#/"
        body="Hey! I'm inviting you to check out this awesome website that I recently discovered called 'Envoy' where you can share some thoughts and photos in a public space. Come check it out!"
      >
        <EmailIcon size={40} round={true} iconFillColor={'white'}/>
      </EmailShareButton>
    </div>

  </div>
)

export default SocialSidebar
