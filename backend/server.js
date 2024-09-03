const express = require('express');
const app =express();
const mongoose=require("mongoose");
const dotenv=require('dotenv');
app.use(express.json());//you can also use body-parser
dotenv.config();
const cors = require('cors');
app.use(cors());

const userRouter = require("./routes/userRoute");

mongoose.connect(process.env.URI).then(()=>{
    console.log("Database connected Successfully!!!");
    app.listen(process.env.PORT||4000,(err)=>{
        if(err){
            console.log(err);
        }
            console.log("Running successfully at",process.env.PORT);
    });

})
.catch((error)=>{
    console.error(error);
    
});


app.use(userRouter);

