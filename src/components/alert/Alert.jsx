/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'
import './Alert.css'

function Alert({message , alert , page}) {
    const navigate = useNavigate()
    const handleClick = () => {
        alert(false)
        navigate(`/${page}`)
        location.reload()
    }
  return (
    <div className='alert'>
        <div className="alert-body">
            <p>{message}</p>
            <button onClick={handleClick}>ok</button>
        </div>
    </div>
  )
}

export default Alert