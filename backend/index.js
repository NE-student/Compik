import express from "express";
import cors from "cors";
import postgresql from './postgresql.js';
import auth from "./utils/routes/auth.js";
import upload from "./utils/routes/upload.js";

const app = express();



app.use(cors());

app.use(express.json());
app.use('/uploads',express.static('uploads'));
postgresql()

app.get("/", (req, res)=>{
    res.send("It's a root of a NodeJs express-program.");
})

//Routes
auth(app);
upload(app);


app.listen(4444, (err)=>{
    if (err){
        return console.log(err);
    }

    console.log("Server OK");
})