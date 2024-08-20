/* eslint-disable no-unused-vars */
import './Register.css'
import logo from '../../assets/pinterest.svg'
import { Link, useNavigate } from 'react-router-dom';
import { useState ,useContext } from 'react';
import { MainContext } from "../../context/main";
import { Urls } from '../../config/urls';
import axios from 'axios'
function Register() {
  const navigate = useNavigate()
  const { currentUser, setCurrentUser,getCurrentUser } = useContext(MainContext);
  const [values , setValues ] = useState({
    username : null,
    name : null,
    email:null,
    password : null,
  })
  const [error , setError] = useState(null)

  const onsubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(Urls.AUTH_REGSITER, values).then(res => {
        if(res.status === 201){
          localStorage.setItem("user", JSON.stringify(res.data));
          setCurrentUser(res.data);
          getCurrentUser();
           navigate("/");
           console.log(res.data);
        }
      })
    } catch (e) {
      console.log(e);
      if(typeof e.response.data === Object) {
          setError(e.response.data.message);
        console.log(values.error);
      }else{
          setError(e.response.data);
         console.log(error);
      }
    }
  }

  return (
    <div className="signup-page-container">
      <img src={logo} alt="" />
      <h1>Welcome to Pinterest</h1>
      {error && <p className="error">{error}</p>}
      <form action="" onSubmit={onsubmit}>
        <div className="input">
          <label htmlFor="">Name</label>
          <input
            type="text"
            placeholder="Name"
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />
        </div>
        <div className="input">
          <label htmlFor="">Username</label>
          <input
            type="text"
            placeholder="Username"
            value={values.username}
            onChange={(e) => setValues({ ...values, username: e.target.value })}
          />
        </div>
        <div className="input">
          <label htmlFor="">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
        </div>
        <div className="input">
          <label htmlFor="">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={values.password}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
          />
        </div>
        <button>Sign up</button>
      </form>
      <Link to="/sign-in">Already have an account?</Link>
    </div>
  );
}

export default Register