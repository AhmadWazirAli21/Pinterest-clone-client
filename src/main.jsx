
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import MainContextProvider from './context/main.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
ReactDOM.createRoot(document.getElementById("root")).render(

    <BrowserRouter>
      <MainContextProvider>
        <App />
      </MainContextProvider>
    </BrowserRouter>

);
