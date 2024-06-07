const UserModel =require("../models/UserModel");

async function searchUser(request,response){
    try {

        const {search}=request.body;

        const query=new RegExp(search,'i','g');

        const user=await UserModel.find({
            $or:[
                {name:query},
                {email:query}
            ]
        }).select("-password");

        return response.status(200).json({
            message:'all user',
            data:user,
            success:true
        })

        
    } catch (error) {
        return response.status(500).json({
            message:error.message||errro,
            error:true
        })
    }
}

module.exports=searchUser