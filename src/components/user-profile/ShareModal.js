import { useEffect, useRef } from 'react';

import { FacebookShareButton, FacebookIcon } from 'react-share';
import { TwitterShareButton, TwitterIcon } from 'react-share';
import { EmailShareButton, EmailIcon } from 'react-share';
import { WhatsappShareButton, WhatsappIcon } from 'react-share';

import './savedconfs.styles.scss';

const ShareModal = ({ data, showPopUp, setShowPopUp }) => {
  const ref = useRef();

  console.log('data', data);
  useEffect(() => {
    const onBodyClick = (event) => {
      if (ref.current.contains(event.target)) return;
      setShowPopUp(false);
    };

    document.body.addEventListener('click', onBodyClick, { capture: true });
    return () => {
      document.body.removeEventListener('click', onBodyClick, {
        capture: true,
      });
    };
  }, []);
  const handleFacebook = (url) => {
    setShowPopUp(!showPopUp);
    window.open(url);
  };
  const handleLinkedIn = (url) => {
    setShowPopUp(!showPopUp);
    window.open(url);
  };
  const handleTwitter = (url) => {
    setShowPopUp(!showPopUp);
    window.open(url);
  };
  const handleInstagram = (url) => {
    setShowPopUp(!showPopUp);
    window.open(url);
  };
  return (
    <div className="share-card" ref={ref}>
      <span className="share-btn">
         
        <FacebookShareButton
          url={`http://localhost:3000/search-conference/${data._id}`}
          quote={'Dummy text!'}
          hashtag="#muo"
        >
                  
          <FacebookIcon size={36} round />
                
        </FacebookShareButton>
      </span>
      <span className="share-btn">
        <TwitterShareButton
          url={`http://localhost:3000/search-conference/${data._id}`}
          quote={'Dummy text!'}
          hashtag="#muo"
        >
            
          <TwitterIcon size={36} round />
        </TwitterShareButton>
      </span>
      <span className="share-btn">
        <EmailShareButton
          url={`http://localhost:3000/search-conference/${data._id}`}
          quote={'Dummy text!'}
          hashtag="#muo"
        >
            
          <EmailIcon size={36} round />
        </EmailShareButton>
      </span>
      <span className="share-btn">
        <WhatsappShareButton
          url={`http://localhost:3000/search-conference/${data._id}`}
          quote={'Dummy text!'}
          hashtag="#muo"
        >
            
          <WhatsappIcon size={36} round />
        </WhatsappShareButton>
      </span>
    </div>
  );
};

export default ShareModal;
