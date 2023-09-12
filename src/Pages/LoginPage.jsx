import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import { Image } from '../Assects/Img/Img';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
import api from "../Pages/Interceptors";

const LoginPage = ({setIsAuthenticated}) => {
  const navigate = useNavigate()
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const [validationError,setValidationError] = useState({
    email:"",
    password:"",
  })

  const validation = ()=>{
    const errors = {}

    if(!email){
      errors.email = "Email is Required";
    }

    if(!password){
      errors.password = "Password is Required"
    }
    return errors
  }

  const login = async(e)=>{
    e.preventDefault();
    const errors = validation();

    if (Object.keys(errors).length > 0) {
      setValidationError(errors);
      return;
    }
    
    setLoading(true);

    try{
     const res = await api.post("/admin/login",{
        email:email,
        password:password,
      });
      
      if (res.status === 200) {
        localStorage.setItem("accesstoken",res.data.accesstoken);
        localStorage.setItem("refreshtoken",res.data.refreshtoken);
        
        setIsAuthenticated(true)
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/dashboard")
        }, 2000);       
      }
    }catch(error){
      if(error.response && error.response.data){
      toast.error(error.response.data.message)
      setIsAuthenticated(false)
      }
    }
      setLoading(false);
      setValidationError("")
  }

  useEffect(()=>{
    localStorage.removeItem("accesstoken")
    localStorage.removeItem("refreshtoken")
    setIsAuthenticated(false)
    // eslint-disable-next-line 
  },[])

  return (
    <>
  <div className='d-flex flex-column justify-content-center align-items-center vh-100'> 
    <img src={Image.logo} alt="logo" className='img img-size'/>
        <Form className='form'>
        <h4>Login</h4>
        <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" className='rounded-1' onChange={(e)=>setEmail(e.target.value)}/> 
        {validationError.email && (<p className='error'>{validationError.email}</p>)}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" className='rounded-1' onChange={(e)=>setPassword(e.target.value)}/>
        {validationError.password && (<p className='error'>{validationError.password}</p>)}
      </Form.Group>
        <Link to='#' className='text-decoration-none'><small>Forgot Password?</small></Link>
        <Button variant='primary' type='submit' className='mt-3 rounded-1 w-100 border-0 py-2' onClick={login}>
            {loading ? (
              <div className="d-flex align-items-center justify-content-center">
                
                <ThreeDots height='24' width='40' radius='4' color='#000000' ariaLabel='three-dots-loading' />
                
              </div>
            ) : (
              'Login'
            )}
          </Button>
      </Form>
    </div>

<ToastContainer/>
    </>
  )
}

export default LoginPage