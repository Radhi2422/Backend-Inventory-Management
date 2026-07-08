const customerinfo =
require("../models/customerSchema.js");

exports.createCustomer =
async(req,res)=>{

console.log("reached create Customer");
    const CustomerData =
        await customerinfo.create(req.body);
        // console.log(req.body);
        res.status(201).json(CustomerData);
};

exports.getCustomer =
async(req,res)=>{

    try{
        const customerData=await customerinfo.find({});
       // console.log(customerData);
        
        return res.status(200).json({
            success:true,
            count:customerData.length,
            customerData,
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

exports.getCustomerById =
async(req,res)=>{

    const CustomerData =
        await customerinfo.findById(
            req.params.id
        );

    res.json(CustomerData);
};

exports.deleteCustomer =
async(req,res)=>{

    await customerinfo.findByIdAndDelete(
        req.params.id
    );

    res.json({
        message:"Customer deleted"
    });
};