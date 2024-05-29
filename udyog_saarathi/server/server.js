
const exp = require("express");
const app = exp();
const cors=require("cors");
app.use(cors());

const nodemailer = require("nodemailer");

app.use(cors({ origin: true }));
app.use(exp.json());
app.listen(5000, () => {
  console.log("server is listening in port 5000");
});
// connecting backend and frontend by server
const path = require("path");
app.use(exp.static(path.join(__dirname,"../client/build")));

require("dotenv/config");


const mclient = require("mongodb").MongoClient;


// connect to mongodb server
mclient
  .connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/?retryWrites=true&w=majority`, { useNewUrlParser: true
  })
  .then((dbRef) => {

    // access user database
    let usersdbObj = dbRef.db("usersdb");
    let userCollection = usersdbObj.collection("usercollection");
    let jobCollection = usersdbObj.collection("jobcollection");
    let courseCollection = usersdbObj.collection("coursecollection");
    let sampleCollection = usersdbObj.collection("samplecollection");


    console.log("connected to DB successfully");

    // share collections objects to APIs
    app.set("userCollection", userCollection);
    app.set("jobCollection", jobCollection);
    app.set("courseCollection", courseCollection);
    app.set("sampleCollection", sampleCollection);
    
    
  })
  .catch((err) => console.log("database connection err is", err));

const userapp = require("./APIs/userApi");
const jobapp = require("./APIs/jobApi");
const courseapp = require("./APIs/courseApi");


app.use("/user-api", userapp);
app.use("/job-api", jobapp);

app.use("/course-api", courseapp);
userapp.use(exp.json());
app.post("/send_recovery_email", (req, res) => {
  sendEmail(req.body)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});
function sendEmail({  OTP ,recipient_email}) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "yunoastha3@gmail.com",
        pass: "pxhcostmjjmzmkwv",
      },
    });

    const mail_configs = {
      from: "yunoastha3@gmail.com",
      to: recipient_email,
      subject: "KODING 101 PASSWORD RECOVERY",
      html: `<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>CodePen - OTP Email Template</title>
  

</head>
<body>
<!-- partial:index.partial.html -->
<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Koding 101</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Thank you for choosing Koding 101. Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
    <p style="font-size:0.9em;">Regards,<br />Koding 101</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>Koding 101 Inc</p>
      <p>1600 Amphitheatre Parkway</p>
      <p>California</p>
    </div>
  </div>
</div>
<!-- partial -->
  
</body>
</html>`,
    };
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occured` });
      }
      return resolve({ message: "Email sent succesfuly" });
    });
  });
}





// create a middleware to handle invalid path
const invalidPathHandlingMiddleware = (request, response, next) => {
  response.send({ message: "Invalid path" });
};
app.use(invalidPathHandlingMiddleware);

// create err handling middleware
const errHandler = (error, request, response, next) => {
  response.send({ "error-message": error.message });
};
app.use(errHandler);

