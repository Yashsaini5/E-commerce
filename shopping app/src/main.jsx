// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import DataProvider from "./context/DataProvider.jsx"
import ReactDOM from "react-dom"
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

// createRoot(document.getElementById('root')).render(
//     <DataProvider>
//     <App />
//     </DataProvider>
// )
ReactDOM.render(
  <BrowserRouter>
    <DataProvider>
      <App />
    </DataProvider>
  </BrowserRouter>,
    document.getElementById("root")
  );
