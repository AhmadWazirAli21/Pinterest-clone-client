/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Urls } from "../config/urls";

export const MainContext = createContext();
const MainContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [allPins, setAllPins] = useState([]);
  const [userPins, setUserPins] = useState([]);
  const [selectedPin, setSelectedPin] = useState(null);
  const [selectedPinComments, setSelectedPinComments] = useState(null);
  const [anyUser, setAnyUser] = useState(null);
  const [savedPins, setSavedPins] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [shareLink ,setShareLink] = useState(null)

  const [isUpdatePin, setIsUpdatePin] = useState(false);

  const navigate = useNavigate();
  console.log(selectedPin);

  useEffect(() => {
    getCurrentUser();
    getPins();
    getUserPins();
  }, []);
  const getCurrentUser = async () => {
    if (!localStorage.getItem("user")) navigate("/sign-in");
    try {
      await axios
        .get(Urls.CURRENT_USER, {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("user")).token,
          },
        })
        .then((res) => {
          setCurrentUser(res.data.user);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getUserPins = async () => {
    if (!localStorage.getItem("user")) return;
    try {
      await axios
        .get(Urls.GET_USER_PINS, {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("user")).token,
          },
        })
        .then((res) => {
          if (res.data) {
            setUserPins(res.data.reverse());
          } else {
            return;
          }
        });
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const getPins = async () => {
    if (!localStorage.getItem("user")) return;
    try {
      await axios
        .get(Urls.GET_ALL_PINS, {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("user")).token,
          },
        })
        .then((res) => {
          if (res.data) {
            setAllPins(res.data.reverse());
          } else {
            return;
          }
        });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getAnyUser = async (id) => {
    try {
      await axios
        .get(Urls.GET_USER + id, {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("user")).token,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setAnyUser(res.data);
            navigate(res.data.url);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getPin = async (id) => {
    try {
      await axios
        .get(Urls.GET_PIN + id, {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("user")).token,
          },
        })
        .then((res) => {
          setSelectedPin(res.data.pin);
          setSelectedPinComments(res.data.comments);
          console.log(res.data.url);
          
          navigate(res.data.url);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const ckeckIsSaved = (id) => {
    if (!savedPins) return;
    const saved = savedPins.filter((item) => id === item._id);
    if (saved.length > 0) return setIsSaved(true);
    else return setIsSaved(false);
  };

  return (
    <MainContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        getCurrentUser,
        userPins,
        allPins,
        getPins,
        // filterPins,
        setSelectedPin,
        selectedPin,
        selectedPinComments,
        setSelectedPinComments,
        getAnyUser,
        anyUser,
        savedPins,
        setSavedPins,
        ckeckIsSaved,
        isSaved,
        setIsSaved,
        getPin,
        isUpdatePin,
        setIsUpdatePin,
        setShareLink,
        shareLink,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
export default MainContextProvider;
