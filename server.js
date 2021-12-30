const userModel = require("./models/user");
const express = require("express");
const app = express();
app.use(express.json());
const port = 5000;
const mongoose = require("mongoose");


mongoose
.connect(
   "mongodb://localhost:27017/userDB"
)
.then(() => console.log("mongo db connected"));

app.post("/api/registration",(req,res) => {
    const newUser = req.body;
    userModel.create(newUser);
    return res.json({data:"registration sucessfully"});
})

app.post("/api/userdata",async(req,res) =>{
   const user = await userModel.findOne({username:req.body.username});

   if(user){
       return res.json({data:user});
       }
       return res.json({data:`${req.body.username} Not Found`});
});

app.delete('/api/deleteuser', async (req,res) => {
    const uname = req.body.username;
    const user = await userModel.findOne({username:uname});

    if(user){
        userModel.findOneAndDelete({username:uname});
        return res.json({data:`${uname} Delete successfully`});
    }else{
        return res.json({data:`${uname} Not Found`});
    }
    
});
app.listen(port, () => {
    console.log('Server running on ${port}.');
});
