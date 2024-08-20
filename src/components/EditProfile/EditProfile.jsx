import { useContext, useRef, useState } from "react";
import { MainContext } from "../../context/main";
import './EditProfile.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Urls } from "../../config/urls";
function EditProfile() {
    const {currentUser} = useContext(MainContext)
    const navigate = useNavigate()
    const ref = useRef()
    const [values , setValues] = useState({
        username : '',
        name : '',
        password : '',
        avatar : '',
        about : ''
    })
    const onsubmit = async () => {
      console.log(values);
      
        let data = new FormData();
        data.append('username' , values.username)
        data.append("name", values.name);
        data.append("password", values.password);
        data.append("avatar", values.avatar);
        data.append("about", values.about);
      
        try {
            await axios.post(Urls.UPDATE_PROFILE , data , {headers : {
                Authorization : JSON.parse(localStorage.getItem('user')).token
            }}).then(res => {
                if(res.status === 200) {
                    navigate('/profile');
                    location.reload()
                }
            });
        } catch (error) {
            console.log(error);
            
        }
    }
    //console.log(values);
    
  return (
    <div className="edit">
      <div className="edit-avatar">
        <div className="new-avatar">
          {currentUser?.avatar && values?.avatar && (
            <img
              src={
                values?.avatar
                  ? URL.createObjectURL(values?.avatar)
                  : currentUser?.avatar
              }
              alt=""
            />
          )}
          {!currentUser?.avatar && values?.avatar && (
            <img
              src={
                values?.avatar
                  ? URL.createObjectURL(values?.avatar)
                  : currentUser?.avatar
              }
              alt=""
            />
          )}
          {!currentUser?.avatar && !values?.avatar && (
            <p>{currentUser?.name.charAt(0).toUpperCase()}</p>
          )}
        </div>
        <input
          type="file"
          ref={ref}
          style={{ display: "none" }}
          onChange={(e) => setValues({ ...values, avatar: e.target.files[0] })}
        />
        <button onClick={() => ref.current.click()}>Upload</button>
      </div>
      <div className="input">
        <label htmlFor="">Name</label>
        <input
          type="text"
          value={values.name}
          placeholder={currentUser?.name}
          onChange={(e) => setValues({ ...values, name: e.target.value })}
        />
      </div>
      <div className="input">
        <label htmlFor="">About</label>
        <textarea
          type="text"
          className="about"
          value={values.about}
          placeholder={currentUser?.about ? currentUser.about : "About"}
          onChange={(e) => setValues({ ...values, about: e.target.value })}
        />
      </div>
      <div className="input">
        <label htmlFor="">Username</label>
        <input
          type="text"
          placeholder={currentUser?.username}
          value={values.username}
          onChange={(e) => setValues({ ...values, username: e.target.value })}
        />
      </div>
      <div className="input">
        <label htmlFor="">Password</label>
        <input
          type="text"
          placeholder="Password"
          value={values.password}
          onChange={(e) => setValues({ ...values, password: e.target.value })}
        />
      </div>
      <div className="bts">
        <button onClick={onsubmit}>Save</button>
        <button onClick={() => navigate("/profile")}>Cancel</button>
      </div>
    </div>
  );
}

export default EditProfile