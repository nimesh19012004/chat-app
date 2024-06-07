import React, { useEffect, useMemo } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { logout, setOnlineUser, setSocketConnection, setUser } from '../redux/userSlice'
import Sidebar from '../components/Sidebar'
import logo from '../assets/logo.png'
import io from 'socket.io-client'


const Home = () => {

  const user=useSelector(state=>state.user);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const location =useLocation();


  useEffect(()=>{
    if(!localStorage.getItem('token')){
      navigate('/register');
    }
  },[])


  const fetchUserDetails=async ()=>{
    
    try {
      const url=`${import.meta.env.VITE_BACKEND_URL}/api/user-details`
      const response=await axios({
        url:url,
        withCredentials:true 
      })

      
      
      dispatch(setUser(response.data.data));
      if(response.data.data.logout)
        { 
          dispatch(logout());
          navigate("/email")
        }

     
    } catch (error) {
      console.log("error",error);
    }
  }

  useEffect(()=>{
    fetchUserDetails();
  },[])


  // socket connetion 

  useEffect(()=>{
    const socketConnection=io(import.meta.env.VITE_BACKEND_URL,{
      auth:{
        token:localStorage.getItem('token')
      }
    });

    socketConnection.on('onlineUser',(data)=>{
        dispatch(setOnlineUser(data))
    })

    dispatch(setSocketConnection(socketConnection))

    return ()=>{
      socketConnection.disconnect()
    }
  },[])

  const basePath=location.pathname==='/';
 

  return (
    <div className='grid lg:grid-cols-[300px,1fr] h-screen max-h-screen'>
      <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
       <Sidebar/>
      </section>

      <section className={`${basePath && "hidden"}`}>
        <Outlet/>
      </section>

      <div className={` justify-center items-center flex-col gap-2 hidden ${!basePath ? "hidden": "lg:flex" }` }>
        <div>
          <img 
            src={logo}
            width={250}
            alt="logo"
          />

        </div>
        <p className='text-lg mt-2 text-slate-500'>Select user to send message</p>
      </div>
    </div>
  )
}

export default Home
