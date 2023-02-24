const express=require("express")
const jwt  = require("jsonwebtoken")

function validator(req,res,next){
   const token=  req.headers.authorization
  jwt.verify(token,"Backend",(error,decode)=>{
    console.log(decode)
  if(error){
    res.send(error)
  }else if(decode){
    req.body.Author = decode.user
    next()
  }
 })
}
module.exports={
    validator
}

