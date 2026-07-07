const customerinfo =
require("../models/customerSchema.js");

exports.createCustomer =
async(req,res)=>{

    const CustomerData =
        await customerinfo.create(req.body);
        // console.log(req.body);
        res.status(201).json(CustomerData);
};

exports.getCustomer =
async(req,res)=>{

    try{
        const {name}=req.query;
        let CustomerData;
        if(name){
            CustomerData=await customerinfo.find({
                name:{$regex:name,$options:"i"}
            })
        }
        else{
            CustomerData=await customerinfo.find();
        }
        res.status(500).json({
            success:true,
            count:CustomerData.length,
            CustomerData
        });
    }catch(error){
        console.log(error);
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