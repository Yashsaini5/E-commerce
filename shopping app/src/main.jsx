// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import DataProvider from "./context/DataProvider.jsx"
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <DataProvider>
      <App />
    </DataProvider>
  </BrowserRouter>
);
