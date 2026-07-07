const orderinfo =
require("../models/orderSchema.js");


exports.getOrders =
async(req,res)=>{

    try{
        const {name}=req.query;
        let OrderData;
        if(name){
            OrderData=await orderinfo.find({
                name:{$regex:name,$options:"i"}
            })
        }
        else{
            OrderData=await orderinfo.find();
        }
        res.status(500).json({
            success:true,
            count:OrderData.length,
            OrderData
        });
    }catch(error){
        console.log(error);
    }
};