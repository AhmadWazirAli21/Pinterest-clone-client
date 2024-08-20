/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { MainContext } from "../../context/main";
import { useContext } from "react";

function PinBox({ id, img }) {
  const {
    ckeckIsSaved,
    // setSelectedPin,
    // setSelectedPinComments,
    pinUrl,
    getPin
  } = useContext(MainContext);
  const navigate = useNavigate()
  const handleClick = (id) => {
    getPin(id)
    ckeckIsSaved(id);
    navigate(pinUrl)
  };


  return (
    <div className="img-box" onClick={() => handleClick(id)}>
      <img src={img} alt=""  />
    </div>
  );
}

export default PinBox