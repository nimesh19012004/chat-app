import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
function App() {
  

  return (

    <>
      <Toaster></Toaster>
      <main>
      <Outlet/>
    </main>
    </>
    
  )
}

export default App
