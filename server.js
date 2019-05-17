var express=require("express");
var cors=require("cors");
var nodemailer=require("nodemailer");
var app=express();
app.use(cors());
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'pmstransactions@gmail.com',
      pass: 'pms@1234'
    }
 });
app.get('/sendEmail/:to/:content',function(req,res){
	console.log("Email Sending started");
	var mailOptions = {
        from: 'pmstransactins@gmail.com',
        to: req.params.to,
        subject: 'Notification..',
        text: req.params.content
    }; 
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.send({msg:"failed"});
        } else {
            console.log('Email sent: ' + info.response);
            res.send({msg:"success"});
        }
    });
});
app.listen(process.env.PORT||3000,function(){
	console.log("Server running");
})