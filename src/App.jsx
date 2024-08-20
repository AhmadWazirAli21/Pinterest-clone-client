import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import {Routes , Route} from 'react-router-dom'
import Layout from "./components/Layout"
import NotFound from "./pages/NotFound/NotFound"
import Profile from './pages/Profile/Profile'
import EditProfile from "./components/EditProfile/EditProfile"
import axios from "axios";
import CreatePin from "./components/createPin/CreatePin"
import Pin from "./pages/Pin/Pin"
import SomeUser from "./pages/SomuUser/SomeUser"
import ShareUrl from "./components/ShareUrl/ShareUrl"

function App() {

  axios.defaults.baseURL = 'http://localhost:3000'
  return (
    <Layout>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/create-pin" element={<CreatePin />} />
        <Route path="/pin/:pinId" element={<Pin />} />
        <Route path="/user/:userId" element={<SomeUser />} />
        <Route path="/share" element={<ShareUrl />} />
      </Routes>
    </Layout>
  );
}

export default App
