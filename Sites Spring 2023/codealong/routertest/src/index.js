/**
 * Index.js
 * I kan placere overordnede komponenter som eksempelvis 
 * browserrouter i denne fil - ligesom nedenstående eksempel 
 */
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { BrowserRouter } from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
