import "./Pin.css";
import { VscSend } from "react-icons/vsc";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../../context/main";
import Alert from "../../components/alert/Alert";
import axios from "axios";
import moment from "moment";
import { MdDelete } from "react-icons/md";
import { useParams } from "react-router-dom";
import UpdatePin from "../UpdatePin/UpdatePin";
import { ShareLink } from "../../utils/copyToClip";
import ShareUrl from "../../components/ShareUrl/ShareUrl";
import { Urls } from "../../config/urls";
function Pin() {
  // context functions and variabels
  const {
    // getPinComments,
    currentUser,
    getAnyUser,
    isSaved,
    setIsSaved,
    selectedPin,
    selectedPinComments,
    getPin,
    isUpdatePin,
    setIsUpdatePin,
    setShareLink,
    shareLink,
  } = useContext(MainContext);
  //states
  const [content, setContent] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [pageUrl, setPageUrl] = useState("");
  const [readMore, setReadMore] = useState(false);
  const [openShareModal, setOpneShareModal] = useState(false);
  const { pinId } = useParams();

  //refetch pin on reload

  useEffect(() => {
    getPin(pinId);
    setShareLink(ShareLink());
  }, []);

  //Add comment to a pin

  const onsubmit = async (id) => {
    let data = {
      content: content,
      pinId: id,
    };
    try {
      await axios
        .post(Urls.CREATE_COMMENT, data, {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("user")).token,
          },
        })
        .then((res) => {
          if (res.status === 201) {
            // getPinComments(id)
            setContent("");
            setAlert(true);
            setAlertContent("Commment added successfuly");
            setPageUrl(`/pin/${selectedPin?._id}`);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  //save a pin

  const onsave = async () => {
    let data = {
      pin: selectedPin,
    };
    console.log(data.pin);

    try {
      await axios
        .put(Urls.SAVE_PIN, data, {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("user")).token,
          },
        })
        .then((res) => {
          console.log(res.data);
          setIsSaved(true);
        });
    } catch (error) {
      console.log(error);
    }
  };

  //unsave a pin

  const onunsave = async () => {
    let data = {
      pin: selectedPin,
    };
    try {
      await axios
        .put(Urls.UNSAVE_PIN, data, {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("user")).token,
          },
        })
        .then(() => {
          setIsSaved(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  //delete a comment

  const handleDeleteComment = async (id) => {
    let data = {
      comment_id: id,
    };
    try {
      await axios
        .delete(Urls.DELETE_COMMENT, {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("user")).token,
          },
          data,
        })
        .then((res) => {
          if (res.status === 200) {
            setAlert(true);
            setAlertContent("Commment deleted successfuly");
            setPageUrl(`/pin/${selectedPin?._id}`);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  // delete current pin

  const deletePin = async () => {
    try {
      await axios
        .delete(Urls.DELETE_PIN + pinId, {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("user")).token,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setAlert(true);
            setAlertContent("Pin deleted successfuly");
            setPageUrl(`profile/${currentUser?._id}`);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  // render update pin commponent when user wont to update pin

  if (isUpdatePin) {
    return <UpdatePin />;
  }
  return (
    <div className="pin-page-container">
      {alert && (
        <Alert
          message={alertContent}
          page={pageUrl}
          alert={(e) => setAlert(e)}
        />
      )}
      {openShareModal && (
        <ShareUrl isOpen={(e) => setOpneShareModal(e)} link={shareLink} />
      )}
      <div className="pin-container">
        <div className="left-side">
          <img src={selectedPin?.img_url} alt="" />
        </div>
        <div className="right-side">
          <div className="upper">
            <div className="upper-btns">
              {!isSaved ? (
                <button onClick={onsave}>save</button>
              ) : (
                <button onClick={onunsave}>Unsave</button>
              )}
              {currentUser?._id === selectedPin?.userId?._id ? (
                <button onClick={() => setOpneShareModal(true)}>share</button>
              ) : null}

              {currentUser?._id === selectedPin?.userId?._id ? (
                <button className="delete-pin" onClick={deletePin}>
                  delete
                </button>
              ) : null}
              {currentUser?._id === selectedPin?.userId?._id ? (
                <button
                  className="update-pin"
                  onClick={() => setIsUpdatePin(true)}
                >
                  update
                </button>
              ) : null}
            </div>
            <div className="user">
              {selectedPin?.userId?.avatar ? (
                <img
                  src={selectedPin?.userId?.avatar}
                  alt=""
                />
              ) : (
                <div className="u-un">
                  {selectedPin?.userId?.username.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="user-names">
                <p
                  className="username"
                  onClick={() => getAnyUser(selectedPin?.userId?._id)}
                >
                  {selectedPin?.userId?.username}
                </p>
                <p className="name">{selectedPin?.userId?.name}</p>
              </div>
            </div>
          </div>
          <div className="lower">
            <h3>{selectedPin?.title}</h3>
            <p onClick={() => setReadMore((prev) => !prev)} className="desc">
              {selectedPin?.description?.length > 200 && !readMore
                ? selectedPin?.description.slice(0, 201) + "...Read more"
                : selectedPin?.description}
            </p>
            <div className="comments">
              <p className="comments-p">Comments</p>
              <div className="comments-container">
                {selectedPinComments?.length === 0 ? (
                  <p className="no-comms">Add the first commment</p>
                ) : null}
                {selectedPinComments
                  ? selectedPinComments.map((comm, index) => {
                      return (
                        <div key={index} className="user">
                          {comm?.userId?.avatar ? (
                            <img src={comm?.userId?.avatar} alt="" />
                          ) : (
                            <div className="no-avatar">
                              {comm?.userId?.username.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div className="user-names">
                            <div className="date">
                              <p
                                className="username"
                                onClick={() => getAnyUser(comm?.userId?._id)}
                              >
                                {comm?.userId?.username}
                              </p>
                              <p className="comm-date">
                                {moment(comm?.date).fromNow()}
                              </p>
                              {comm?.userId?._id === currentUser?._id && (
                                <div
                                  className="trach"
                                  onClick={() => handleDeleteComment(comm._id)}
                                >
                                  <MdDelete color="#CB1F27" size={18} />
                                </div>
                              )}
                            </div>
                            <p className="comment">{comm?.content}</p>
                          </div>
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
          </div>
          <div className="add-comment">
            <p className="num-of-comments">
              {selectedPinComments?.length} of comments
            </p>
            <div className="input">
              {currentUser?.avatar ? (
                <img src={currentUser?.avatar} />
              ) : (
                <div className="input-no-avatar">
                  {currentUser?.username.charAt(0).toUpperCase()}
                </div>
              )}
              <input
                type="text"
                placeholder="Add comment"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <div className="send" onClick={() => onsubmit(selectedPin?._id)}>
                <VscSend size={25} color="#fff" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pin;
