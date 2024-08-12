import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


const Register = () => {

  const navigate = useNavigate("/login")

  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData({ ...data, [name]: value })
  }

  const onRegisterHandler = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post("http://localhost:4001/register", data)
      console.log(response.data.success);
      if (response.data.success) {
        navigate("/login")
      }
      
    } catch (err) {
        console.log(err);
        
    }
      


  }

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Register</h2>
        <form onSubmit={onRegisterHandler}>
          <div className="mb-3">
            <label htmlFor="name"><strong>Name</strong></label>
            <input id="name" onChange={onChangeHandler} type="text" placeholder="Enter Name" autoComplete="off" name="name" className="form-control rounded-0" />
          </div>
          <div className="mb-3">
            <label htmlFor="email"><strong>Email</strong></label>
            <input id="email" onChange={onChangeHandler} type="email" placeholder="Enter Email" autoComplete="off" name="email" className="form-control rounded-0" />
          </div>
          <div className="mb-3">
            <label htmlFor="password"><strong>Password</strong></label>
            <input id="password" onChange={onChangeHandler} type="password" placeholder="Enter Password" autoComplete="off" name="password" className="form-control rounded-0" />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">Register</button>
        </form>
        <p>Already have an account?</p>
        <button className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Login</button>
      </div>
    </div>
  )
}

export default Register