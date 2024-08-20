import './CreatePin.css'
import { FaCircleArrowUp } from "react-icons/fa6";
import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../alert/Alert';
import { Urls } from "../../config/urls";
import axios from 'axios'
import { MainContext } from '../../context/main';

function CreatePin() {
  const {currentUser} = useContext(MainContext)
    const ref = useRef()
    const navigate = useNavigate()
    const [values , setValues] = useState({
        title : '',
        description : '',
        img_url : '',
    })
    const [error , setError] = useState(null)
    const [alert ,setAlert] = useState(false)

    const onsubmit = async () => {
      let data = new FormData()
      data.append('img_url', values.img_url);
      data.append("title", values.title);
      data.append("description", values.description);
      try {
        await axios.post(Urls.CREATE_PIN ,data , {headers : {
          Authorization : JSON.parse(localStorage.getItem('user')).token
        }}).then(res => {
          if(res.status === 201){
            setAlert(true)
          }
        })
      } catch (error) {
        setError(error.response.data)
        console.log(error);
      }
    }
  return (
    <div className="create-pin-container">
      {alert && <Alert message='Post added successfuly' page={`profile/${currentUser?._id}`} alert={(e) => setAlert(e)}/> }
      <div className="left-side" onClick={() => ref.current.click()}>
        <input type="file" style={{display : 'none'}} ref={ref} onChange={(e) => setValues({...values , img_url : e.target.files[0]})}/>
       {!values?.img_url && <>
          <FaCircleArrowUp size={30}/>
          <p>Pick a file and drop it here</p>
        </>}
        {values?.img_url && <img src={URL.createObjectURL(values?.img_url)}/>}
      </div>
      <div className="right-side">
        {error&& <p className='error'>{error}</p>}
        <div className="input">
          <label htmlFor="">Title</label>
          <input type="text" placeholder="Add title" value={values.title} onChange={(e) => setValues({...values , title : e.target.value})}/>
        </div>
        <div className="input">
          <label htmlFor="">Description</label>
          <textarea type="text" placeholder="Add description" value={values.description} onChange={(e) => setValues({...values , description : e.target.value})}/>
        </div>
        <div className="btns">
            <button onClick={onsubmit}>Post</button>
            <button onClick={() => navigate('/')}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default CreatePin