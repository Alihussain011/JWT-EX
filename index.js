const express = require("express");
const app = express();
const PORT = process.env.PORT||8000;
const jwt = require("jsonwebtoken");


app.use(express.json());

const secrateKey = "secrateKey";

app.get("/",(req,res)=>{
    res.send("welcome to jwt");
});

app.post("/login",(req,res)=>{
    jwt.sign(req.body,secrateKey,{expiresIn: '20s'},(err,token)=>{
        if(err){
            res.send("Token not created yet");
        }
        else{
            res.send({
                token
            });
        }
    });
});

const verifyToken = (req,res,next)=>{
    if(req.headers.authorization){
        req.token = req.headers.authorization.split(" ")[1];
        next();
    }else{
        res.status(401).send("Token not find")
    }
}
app.post("/profile",verifyToken,(req,res)=>{
    jwt.verify(req.token,secrateKey,(err,authData)=>{
        if(err){
            res.status(401).json(err);
        }else{
            res.json({
                message:"login with token",
                authData
            })
        }
    })
});

app.listen(PORT,()=>{
    console.log(`server is listing on ${PORT}`)
})