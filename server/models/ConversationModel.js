const mongoose=require("mongoose");


const messageSchema=new mongoose.Schema({
    text:{
        type:String,
        default:""
    },
    imageUrl:{
        type:String,
        dafault:""
    },
    videoUrl:{
        type:String,
        dafault:""
    },
    seen:{
        type:Boolean,
        dafault:false
    },
    msgByUserId:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    }
},{
    timestamps:true
})



const conversationSchema=new mongoose.Schema({
    sender:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    reciever:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    messages:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"Message",  
        }
    ]
},{
    timestamps:true
})

const MessageModel=mongoose.model("Message",messageSchema);
const ConversationModel=mongoose.model("Conversation",conversationSchema);

module.exports={
    MessageModel,
    ConversationModel
}