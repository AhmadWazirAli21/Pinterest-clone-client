/* eslint-disable react/prop-types */
import { useLocation } from "react-router-dom"
import Navbar from "./Navbar/Navbar"

function Layout({children}) {
    const path = useLocation()
  return (
    <div>
        {path.pathname === '/sign-in' || path.pathname === '/sign-up' ? children :
         <>
            <Navbar />
            {children}
        </>  }
    </div>
  )
}

export default Layout