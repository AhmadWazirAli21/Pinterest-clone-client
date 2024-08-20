/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import "./ShareUrl.css";
import {
  FacebookShareButton,
  InstapaperShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  InstapaperIcon,
  LinkedinIcon,
  PinterestIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon
} from "react-share";
import { IoLink } from "react-icons/io5";
import { useContext } from "react";
import { MainContext } from "../../context/main";
import { copyToClip } from "../../utils/copyToClip";
import { RiCloseLine } from "react-icons/ri";
function ShareUrl({link , isOpen}) {
  const { shareLink} = useContext(MainContext)
  const handleCopyLink = () => {
    copyToClip();
    alert('Link copied')
  }
  return (
    <div className="share-link-container">
      <div className="social-share-modal">
        <button className='close' onClick={() => isOpen(false)}><RiCloseLine /></button>
        <div className="social-share">
          <FacebookShareButton url={link}>
            <FacebookIcon borderRadius={"50%"} />
          </FacebookShareButton>
          <InstapaperShareButton url={link}>
            <InstapaperIcon borderRadius={"50%"} />
          </InstapaperShareButton>
          <LinkedinShareButton url={link}>
            <LinkedinIcon borderRadius={"50%"} />
          </LinkedinShareButton>
          <PinterestShareButton url={link}>
            <PinterestIcon borderRadius={"50%"} />
          </PinterestShareButton>
          <RedditShareButton url={link}>
            <RedditIcon borderRadius={"50%"} />
          </RedditShareButton>
          <TelegramShareButton url={link}>
            <TelegramIcon borderRadius={"50%"} />
          </TelegramShareButton>
          <TwitterShareButton url={link}>
            <TwitterIcon borderRadius={"50%"} />
          </TwitterShareButton>
          <WhatsappShareButton url={link}>
            <WhatsappIcon borderRadius={"50%"} />
          </WhatsappShareButton>
          <div className="copy-link" onClick={handleCopyLink}>
            <IoLink size={30} color="#fff" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShareUrl;
