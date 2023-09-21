const mongoose = require("mongoose");
const nodeMailer = require('nodemailer')

const fileSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    imageUrl:{
        type:String
    },
    tags:{
        type: String
    },
    email:{
        type: String
    }
});

//post middleware
fileSchema.post('save', async function(doc){    
    try {
        console.log("docs:-->", doc)
        //create transporter
        //shift this configuration to config folder
        let transporter = nodeMailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        });

        //send mail
        console.log("info is printing...")
        let info = await transporter.sendMail({
            from:`Abhishek - Full Stack Web Developer`, 
            to: doc.email,
            subject: "New file uploaded to coludinary",
            html:`<h2> Hello!</h2> <p>File uploaded successfully</p> <br> <h2>View uploaded file: </h2> <a href="${doc.imageUrl}">${doc.imageUrl}</a>`
        })        ;

        console.log("Info -->", info)

    } catch (error) {
        console.log(error)
    }
})

const File = mongoose.model("File", fileSchema)
module.exports = File