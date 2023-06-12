const express = require("express");
const mongoose =require("mongoose");
const dotenv=require("dotenv")
const port=process.env.PORT || 5000;
const cors =require("cors")
const logger = require("morgan")


dotenv.config()

const app =express();


//test 
const categoryRoute = require("./routes/categories.js")
const productRoute = require("./routes/products.js")
const billRoute = require("./routes/bills.js")
const authRoute = require("./routes/auth.js")
const userRoute = require("./routes/users.js")




const connect= async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to mongo")
    } catch (error) {
        throw error
    }
}
app.use(express.json());
app.use(cors());

app.use(logger("dev"))

app.use("/api/categories",categoryRoute)
app.use("/api/products",productRoute)
app.use("/api/bills",billRoute)
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)



app.listen(port,()=>{
    connect();
    console.log(' 5000 portundan bağlantı kuruldu')
})