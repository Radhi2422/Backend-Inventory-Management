const express=require('express');
const router=express.Router();


const {
    problem,
    eachProblem
} =require("../controllers/problemController");

//GET /api/problems
//GET /api/problems/:id

router.get("/api/problems", problem);
router.get("/api/problems/:id", eachProblem);

module.exports=router;