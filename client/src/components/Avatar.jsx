import React from 'react'
import { PiUserCircle } from "react-icons/pi";
import { useSelector } from 'react-redux';

const Avatar = ({userId,name,imageUrl,width,height}) => {
    const onlineUser=useSelector(state=>state?.user?.onlineUser);
    let avatarName="";

    if(name){
        const splitname=name?.split(' ');

        if(splitname.length>1){
            avatarName=splitname[0][0]+splitname[1][0];
        }else{
            avatarName=splitname[0][0]
        }
    }

    const bgColor=[
        'bg-slat-200',
        'bg-teal-200',
        'bg-red-200',
        'bg-green-200',
        'bg-yellow-200',
        'bg-sky-200',
        'bg-indigo-200',
        'bg-purple-200'
    ]

    const randomNo=Math.floor(Math.random()*8);
  
    const isOnline=onlineUser.includes(userId)
  return (
    <div className={`text-slat-800 rounded-full text-center text-xl font-bold relative`} style={{width:width+'px', height:height+"px"}}>
      {
        imageUrl?(<img 
        src={imageUrl}
        width={width}
        height={height}
        alt={name}
        className={`overflow-hidden shadow border rounded-full ${bgColor[randomNo]}`}
        ></img>):
        (name?(
            <div style={{width:width+'px', height:height+"px"}} className={`overflow-hidden rounded-full flex justify-center items-center shadow border ${bgColor[randomNo]} `}>
                {avatarName}
            </div>
        ):(
            <PiUserCircle
                size={width}
            />
        ))
      }

      {
        isOnline && (
            <div className='bg-green-600 p-1 absolute bottom-2 -right-1 rounded-full'></div>
        )
      }
      
    </div>
  )
}

export default Avatar
