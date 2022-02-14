const express= require("express");
const bodyparser=require("body-parser");
const https=require("https");
const app=express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("publiv"));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
})
app.post("/signup.html",function(req,res){
  const fname=req.body.FirstName;
  const lname=req.body.LastName;
  const mail=req.body.Email;
 const data={
   members:[
     {
       email_address:mail,
       status:"subscribed",
       mergefields:{
         FNAME:fname,LNAME:lname,
       }
     }
   ]
 };
 const jsondata= JSON.stringify(data);
 const url="https://us14.api.mailchimp.com/3.0/lists/3854f9bf3e";
 const options={
   method:"POST",
   auth:"hari10:280b969ab0a7570f55e5fab62bb39bcd-us14"
 };
 const request=https.request(url,options,function(response){
response.on("data",function(data){
  if(response.statusCode===200)
  res.sendFile(__dirname+"/success.html");
  else
  res.sendFile(__dirname+"/failure.html");
console.log(JSON.parse(jsondata));
})
 })
 request.write(jsondata);
 request.end();
})
app.post("/failure.html",function(req,res){
  res.redirect("/");
})
app.listen(process.env.PORT||3000,function(req,res){
  console.log("working at port 3000");
})


// API KEY 280b969ab0a7570f55e5fab62bb39bcd-us14
//audience id 3854f9bf3e
