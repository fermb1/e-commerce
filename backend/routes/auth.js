import express from "express";


const Router = express.Router();

Router.get("/signup", (req,res) => {
    res.send("sign up route called")
})


export default Router