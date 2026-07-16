
const mongoose = require("mongoose");

const problemSchema=new mongoose.Schema(
{
    title: {
        type:String,
        required:true
    },

    difficulty:{
        type:String,
        enum: ["Easy", "Medium", "Hard"],
        required:true
    },

    description: {
        type:String,
        required:true
    },
    constraints: [String],

    examples: [
      {
        input: String,
        output: String
      }
    ],

    language: {
      type: String,
      default: "Java"
    },
    starterCode:{
        type:String,
        required:true
    },
    language: {
        type:String,
        required:true
    },

    testCases:[{
        input: String,
        expectedOutput: String
    }],
},
{
    timestamps:true,
    collection:"Problems"
}
)

module.exports = mongoose.model("Problems", problemSchema);
