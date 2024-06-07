import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { PiUserCircle } from "react-icons/pi";


const CheckEmailPage = () => {

  const [data,setData]=useState({
    email:""
  })
  
  
  const navigate=useNavigate();

  const handleSubmit=async (e)=>{
    e.preventDefault();
    e.stopPropagation();//to avoid opening the file again
    
    const url=`${import.meta.env.VITE_BACKEND_URL}/api/email`
    try {
      
      const response=await axios.post(url,data,{withCredentials:true});
     
      toast.success(response.data.message);

      if(response.data.success){
        setData({
          email:""
        })

        navigate("/password",{
          state:response?.data?.data
        })
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
      <div className='bg-white w-full mx:2 max-w-md rounded overflow-hidden p-4 mx-auto'>
        <div className='mx-auto w-fit mb-2'>
          <PiUserCircle size={80}/>
        </div>
        <h3>Welcome to chat app!</h3>
        <form className='grid gap-4 mt-3' onSubmit={handleSubmit}>
          
          <div className='flex flex-col gap-1'>
            <label htmlFor='email'>Email :</label>
            <input 
            type='email'
            id='email'
            name='email'
            placeholder='enter your email'
            className='bg-slate-100 px-2 py-1 focus:outline-primary'
            value={data.email}
            onChange={handleOnChange}
            required
          />
          </div>
          
          
          <button
           className='bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white tracking-wider'
          >Let's Go</button>
          
        </form>
        <p className='my-3 text-center'>New user ? <Link to={"/register"} className='hover:text-primary font-semibold'>Register</Link></p>
      </div>
    </div>
  )

}

export default CheckEmailPage
