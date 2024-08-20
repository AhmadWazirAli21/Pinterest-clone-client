import { useContext, useEffect } from 'react';
import logo from "../../assets/PikPng.com_pinterest-png_990426.png";
import './SomeUser.css'
import { MainContext } from '../../context/main';
import { useParams } from 'react-router-dom';
import PinBox from '../../components/PinBox/PinBox';

function SomeUser() {
    const { anyUser, getAnyUser } = useContext(MainContext);
    const {userId} = useParams()

      useEffect(() => {
        getAnyUser(userId);
      },[])

  return (
    <div className="user-profile-page-container">
      <div className="upper">
        <div className="avatar">
          {!anyUser?.user?.avatar && (
            <p>{anyUser?.user?.name.charAt(0).toUpperCase()}</p>
          )}
          {anyUser?.user?.avatar && <img src={anyUser?.user?.avatar} />}
        </div>
        <div className="username">
          <p>
            {anyUser
              ? anyUser?.user?.name.charAt(0).toUpperCase() +
                anyUser?.user?.name.slice(1)
              : null}
          </p>
        </div>
        {anyUser?.user?.about && (
          <div className="user-bio">{anyUser?.user?.about}</div>
        )}
        <div className="name">
          <p>{anyUser ? anyUser?.user?.username : null}</p>
          <img src={logo} alt="" />
        </div>
      </div>
      <div className="pins-container">
        {anyUser?.pins
          ? anyUser?.pins.map((ele, index) => {
              return <PinBox key={index} id={ele._id} img={ele?.img_url} />;
            })
          : null}
      </div>
    </div>
  );
}

export default SomeUser