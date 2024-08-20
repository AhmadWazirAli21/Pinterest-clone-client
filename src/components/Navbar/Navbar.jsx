import './Navbar.css'
import logo from '../../assets/pinterest.svg'
import { useContext } from 'react'
import { MainContext } from '../../context/main'
import { useNavigate } from 'react-router-dom';
function Navbar() {
  const {currentUser ,setCurrentUser} = useContext(MainContext);
  const navigate = useNavigate()
  const handleNavigate = () => {
    if(currentUser){
      navigate(`/profile/${currentUser?._id}`)
    }else return
  }
  const handleLogout = () => {
    localStorage.clear();
    setCurrentUser(null)
    navigate('/sign-in')
  }
  return (
    <div className="nav-conatiner">
      <div className="left-side">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <button className="home-btn" onClick={() => navigate('/')}>Home</button>
        <button className="create-btn" onClick={() => navigate('/create-pin')}>Create</button>
      </div>
      <div className="right-side">
        {currentUser && (
          <div className="profile-btn" onClick={handleNavigate}>
            {currentUser?.avatar && <img src={currentUser?.avatar} />}
            {!currentUser?.avatar && <p>{currentUser?.name.charAt(0).toUpperCase()}</p>}
          </div>
        )}
        {currentUser ? (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button className="logout-btn" onClick={() => navigate("/sign-in")}>
            Login
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar