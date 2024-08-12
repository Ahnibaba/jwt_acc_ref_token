import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { Routes, Route } from "react-router-dom"
import Register from "./Register"
import Login from "./Login"
import Home from "./Home"
import Dashboard from "./Dashboard"


const App = () => {

  return (
    <>
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/register" element={<Register />} />
         <Route path="/login" element={<Login />} />
         <Route path="/dashboard" element={<Dashboard />} />
       </Routes>
    </>
  )
}

export default App