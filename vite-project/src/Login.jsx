import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useState } from "react"



const Login = () => {

   const navigate = useNavigate("/login")

   const [data, setData] = useState({
      email: "",
      password: ""
   })

   const onChangeHandler = (event) => {
      const name = event.target.name
      const value = event.target.value
      setData({ ...data, [name]: value })
   }


   const onLogin = async (event) => {
      event.preventDefault()
      try {
         const response = await axios.post("http://localhost:4001/login", data, {withCredentials: true})
         if (response.data.success) {
            navigate("/dashboard")
         } else {
            navigate("/")
         }
      } catch (error) {
         console.log(error);

      }

   }
   return (
      <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
         <div className="bg-white p-3 rounded w-25">
            <h2>Login</h2>
            <form onSubmit={onLogin}>
               <div className="mb-3">
                  <label htmlFor="email"><strong>Email</strong></label>
                  <input id="email" onChange={onChangeHandler} type="email" placeholder="Enter Email" autoComplete="off" name="email" className="form-control rounded-0" />
               </div>
               <div className="mb-3">
                  <label htmlFor="password"><strong>Password</strong></label>
                  <input id="password" onChange={onChangeHandler} type="password" placeholder="Enter Password" autoComplete="off" name="password" className="form-control rounded-0" />
               </div>
               <button type="submit" className="btn btn-success w-100 rounded-0">Login</button>
            </form>
            <p>Dont have an account?</p>
            <button className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Register</button>
         </div>
      </div>
   )
}

export default Login