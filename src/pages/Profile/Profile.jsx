/* eslint-disable react/jsx-key */

import './Profile.css'
import logo from '../../assets/PikPng.com_pinterest-png_990426.png'
import PinBox from '../../components/PinBox/PinBox';
import { useContext, useEffect, useState } from 'react';
import { MainContext } from '../../context/main';
import { useNavigate, useParams } from 'react-router-dom';
import { Urls } from "../../config/urls";
import  {copyProfileLink} from '../../utils/copyToClip'
import axios from 'axios';
function Profile() {

  useEffect(() => {
    setScreenWidth(window.innerWidth);
  } , [])
  const {userId} = useParams()
  const [screenWidth , setScreenWidth] = useState(null)
  const [btns, setBtns] = useState("pinCreated");
  const {
    currentUser,
    setCurrentUser,
    userPins,
    savedPins,
    setSavedPins,
  } = useContext(MainContext);

  const navigate = useNavigate()
    const handleLogout = () => {
      localStorage.clear();
      setCurrentUser(null);
      navigate('/sign-in')
    };

    const handleCopyProfileLink = (id) => {
      copyProfileLink(id  );
      alert('Profile link copied')
    }
    const getSavedPins = async() => {
        try {
          await axios.get(Urls.GET_SAVED_PIN , {headers : {
            Authorization : JSON.parse(localStorage.getItem('user')).token
          }}).then(res => {
            setSavedPins(res.data)
          })
        } catch (error) {
          console.log(error);
        }
    }

    const handleClikcingSavedBtn = () => {
      getSavedPins();
      setBtns("saved");
    }

  
    console.log(savedPins);
    
  return (
    <div className="profile-page-container">
      <div className="upper">
        <div className="avatar">
          {!currentUser?.avatar && (
            <p>{currentUser?.name.charAt(0).toUpperCase()}</p>
          )}
          {currentUser?.avatar && <img src={currentUser?.avatar} />}
        </div>
        <div className="username">
          <p>
            {currentUser
              ? currentUser?.name.charAt(0).toUpperCase() +
                currentUser.name.slice(1)
              : null}
          </p>
        </div>
        {currentUser?.about && (
          <div className="user-bio">{currentUser?.about}</div>
        )}
        <div className="name">
          <p>{currentUser ? currentUser?.username : null}</p>
          <img src={logo} alt="" />
        </div>
        {currentUser?._id === userId ? (
          <div className="btns">
            <button onClick={() => handleCopyProfileLink(currentUser?._id)}>
              Share
            </button>
            <button onClick={() => navigate("/profile/edit")}>
              Edit profile
            </button>
            {screenWidth <= 480 ? (
              <button className="logout" onClick={handleLogout}>
                logout
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
      {currentUser?._id === userId ? (
        <>
          <div className="lower">
            <ul>
              <li onClick={handleClikcingSavedBtn} value="saved">
                Saved
              </li>
              <li value="pinCreated" onClick={() => setBtns("pinCreated")}>
                Pins created
              </li>
            </ul>
          </div>
          {userPins?.length == 0 && (
            <div className="add-first-pin">
              <button onClick={() => navigate("/create-pin")}>
                Add first pin
              </button>
            </div>
          )}
        </>
      ) : null}
      {btns === "pinCreated" ? (
        <div className="pins-container">
          {userPins
            ? userPins.map((ele, index) => {
                return <PinBox key={index} id={ele._id} img={ele?.img_url} />;
              })
            : null}
        </div>
      ) : "saved" && savedPins.length !== 0 ? (
        <div className="pins-container">
          {savedPins
            ? savedPins.map((ele, index) => {
                return <PinBox key={index} id={ele._id} img={ele?.img_url} />;
              })
            : null}
        </div>
      ) : (
        <p className="no-saved-pins">No saved pins</p>
      )}
    </div>
  );
}

export default Profile