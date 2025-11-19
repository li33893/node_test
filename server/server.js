const express = require('express')
const cors = require('cors') 

const boardRouter = require("./routes/board");

const app = express()
app.use(cors({
    origin : "*",
    credentials : true
}))
app.use(express.json());

// router 영역
app.use("/board", boardRouter);


app.listen(3005, ()=>{
    console.log("server start!");
})