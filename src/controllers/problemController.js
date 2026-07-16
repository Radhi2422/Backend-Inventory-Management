// problem
// eachProblem
const problemSchema=require("../models/Problem")
exports.problem=async(req,res)=>{
    try{
        const problems=await problemSchema.find({});
        // console.log(problems.length);
        return res.status(200).json({
            success:true,
            message:"Problem found",
            problems
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Unable to find Problems."
        });

    }
}

exports.eachProblem=async(req,res)=>{
    return res.status(200).json({
        success:true,
        message: "Problem Found"
    })
}
