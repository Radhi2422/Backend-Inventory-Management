const User=require("../models/User");

const Role=require("../models/Role");

const Permission=require("../models/Permission")
module.exports=(permission)=>{

    return async(req,res,next)=>{

        const user=await User.findById(req.user.id)
        .populate({
            path:"role",
            populate:{
                path:"permission"
            }
        });

        // console.log(user);
        
        //console.log(user.role);
        console.log("Permission Data only")
        console.log(user.role);
                console.log(user);

        const permissions = user.role.permission.name
        
       
        
        if(!permissions.includes(permission)){

        // console.log("Reached here also");
            return res.status(403).json({

                success:false,
                message:"Permission Denied"

            });

        }

        next();

    }

}