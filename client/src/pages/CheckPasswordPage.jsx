import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { PiUserCircle } from "react-icons/pi";
import Avatar from '../components/Avatar';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../redux/userSlice';

const CheckPasswordPage = () => {

  
  const [data,setData]=useState({
    password:"",
    userId:""
  })
  const location=useLocation();
  const navigate=useNavigate();
  const dispatch=useDispatch();

  useEffect(()=>{
    if(!location?.state?.name){
      navigate("/email");
    }
  },[])
  

  const handleSubmit=async (e)=>{
    e.preventDefault();
    e.stopPropagation();//to avoid opening the file again
    
    const url=`${import.meta.env.VITE_BACKEND_URL}/api/password`
    try {
      
      const response=await axios({
        method:"post",
        url:url,
        data:{
          userId:location?.state?._id,
          password:data.password
        },
        withCredentials:true
      })
      toast.success(response.data.message);


      if(response.data.success){
        dispatch(setToken(response?.data?.token))
        localStorage.setItem('token',response?.data?.token)
        setData({
          password:""
        })

        navigate("/")
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
     
    }
    
  }


  

  
  const handleOnChange=(e)=>{
    const {name,value}=e.target;
    setData((prev)=>{
      return {
        ...prev,
        [name]:value
      }
    })
  
  }
  return (
    <div className='mt-5'>
      <div className='bg-white w-full mx:2 max-w-md rounded overflow-hidden p-4 mx-auto shadow'>
        <div className='mx-auto w-fit mb-2 flex items-center justify-center flex-col'>
          {/* <PiUserCircle size={80}/> */}

          {
            <Avatar 
            width={70}
            height={70}
            name={location?.state?.name}
            imageUrl={location?.state?.profile_pic}
            
            />
            
          }
          <h2 className='mt-1 mb-1 font-semibold text-lg'>{location?.state?.name}</h2>
        </div>
      
        <form className='grid gap-4 mt-3' onSubmit={handleSubmit}>
          
          <div className='flex flex-col gap-1'>
            <label htmlFor='password'>Password :</label>
            <input 
            type='password'
            id='password'
            name='password'
            placeholder='enter your password'
            className='bg-slate-100 px-2 py-1 focus:outline-primary'
            value={data.email}
            onChange={handleOnChange}
            required
          />
          </div>
          
          
          <button
           className='bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white tracking-wider'
          >Login</button>
          
        </form>
        <p className='my-3 text-center'><Link to={"/forgot-password"} className='hover:text-primary font-semibold'>Forgot password ?</Link></p>
      </div>
    </div>
  )
}

export default CheckPasswordPage
