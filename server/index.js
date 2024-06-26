const express=require('express');
const cors=require("cors");
require("dotenv").config();
const connectDB=require("./config/connectDB");
const router=require('./routes/index');
const cookiesParser=require('cookie-parser');
const {app,server}=require("./socket/index")

// const app=express();
const corsOptions = {
    origin: process.env.FRONTEND_URL, // The specific origin to allow
    credentials: true // Allow credentials
  };
  
app.use(cors(corsOptions));
  



app.use(express.json());
app.use(cookiesParser());


const PORT=process.env.PORT || 8080;

app.get("/",(request,response)=>{
    response.json({
        message:"server running at "+PORT
    })
})

app.use("/api",router);

connectDB().then(()=>{
    server.listen(PORT,()=>{
        console.log(`server running at port ${PORT}`);
    })
})

