/* eslint-disable no-unused-vars */
import './Login.css'
import logo from '../../assets/pinterest.svg'
import {Link} from 'react-router-dom'
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MainContext } from '../../context/main';
import { Urls } from "../../config/urls";
function Login() {
    const navigate = useNavigate();
    const { currentUser, setCurrentUser, getCurrentUser } = useContext(MainContext);
    const [values, setValues] = useState({
      email: null,
      password: null,
    });
    const [error, setError] = useState(null);

    const onsubmit = async (e) => {
      e.preventDefault();
      console.log(values);
      
      try {
        await axios.post(Urls.AUTH_LOGIN, values).then((res) => {
          if (res.status === 200) {
            localStorage.setItem('user' , JSON.stringify(res.data))
            setCurrentUser(res.data);
            getCurrentUser();
            navigate("/");
            location.reload()
          }
        });
      } catch (e) {
        console.log(e);
        if (typeof e.response.data === Object) {
          setError(e.response.data.message);
          console.log(values.error);
        } else {
          setError(e.response.data);
          console.log(error);
        }
      }
    };

  return (
    <div className="login-page-container">
      <img src={logo} alt="" />
      <h1>Welcome to Pinterest</h1>
      {error && <p className="error">{error}</p>}
      <form action="" onSubmit={onsubmit}>
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
        <button value='onsubmit'>Sign in</button>
      </form>
      <Link to="/sign-up">Dont have an account?</Link>
    </div>
  );
}

export default Login