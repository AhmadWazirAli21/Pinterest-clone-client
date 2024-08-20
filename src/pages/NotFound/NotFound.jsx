import './NotFound.css'
import notfound from '../../assets/404-Page-Featured-Image.png'

function NotFound() {
  return (
    <div className='notfound-container'>
        <img src={notfound} alt="" />
    </div>
  )
}

export default NotFound