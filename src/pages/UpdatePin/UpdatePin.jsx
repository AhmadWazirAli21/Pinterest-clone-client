import "./UpdatePin.css";
import { useContext,  useState } from "react";
import Alert from "../../components/alert/Alert";

import axios from "axios";
import { MainContext } from "../../context/main";
import { useParams } from "react-router-dom";
import { Urls } from "../../config/urls";
function UpdatePin() {
    const { setIsUpdatePin, selectedPin } = useContext(MainContext);
    const {pinId} = useParams()
 // const navigate = useNavigate();
  const [values, setValues] = useState({
    title: "",
    description: "",
  });
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(false);
  const [alertContent , setAlertContent] = useState('')

  const onsubmit = async () => {
    try {
      await axios
        .post(Urls.UPDATE_PIN + pinId, values, {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("user")).token,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setAlertContent(res.data);
            setAlert(true);
          }
        });
    } catch (error) {
      setError(error.response.data);
      console.log(error);
    }
  };
  return (
    <div className="update-pin-container">
      {alert && (
        <Alert
          message={alertContent}
          page={`/pin/${pinId}`}
          alert={(e) => setAlert(e)}
        />
      )}
      <div className="left-side">
        <img src={selectedPin?.img_url} />
      </div>
      <div className="right-side">
        {error && <p className="error">{error}</p>}
        <div className="input">
          <label htmlFor="">Update title</label>
          <input
            type="text"
            placeholder="Update title"
            value={values.title}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
          />
        </div>
        <div className="input">
          <label htmlFor="">Update description</label>
          <textarea
            type="text"
            placeholder="Update description"
            value={values.description}
            onChange={(e) =>
              setValues({ ...values, description: e.target.value })
            }
          />
        </div>
        <div className="btns">
          <button onClick={onsubmit}>Update</button>
          <button onClick={() => setIsUpdatePin(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default UpdatePin;
