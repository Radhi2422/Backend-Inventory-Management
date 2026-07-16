const orderinfo =
require("../models/orderSchema.js");


exports.getOrders =
async(req,res)=>{

    try{
        const orderData=await orderinfo.find({});
                
                return res.status(200).json({
                    success:true,
                    count:orderData.length,
                    orderData,
                })
            }
            catch(error){
                return res.status(500).json({
                    success:false,
                    message:"Error fetching customers",
                    error:error.message,
                })
            }
};