console.clear();
 const users=require("../models/User");
 const Mongoose =require("mongoose");
 var bcrypt = require('bcryptjs');
 const connectDB =async () => {
     try {
   await Mongoose.connect(
     process.env.URI,
     {
         useNewUrlParser : true , 
          useUnifiedTopology : true , 
          
       }, 
       async (err) => {
         if (err) console.log(err);
         else {
             let admin = await users.findOne({
                 role: 'admin superieur',
                 
             });
            
             if (!admin) {
                 let password = 'jihedhajri01'
                 const salt = await bcrypt.genSalt(10);
                 const hashed = await bcrypt.hash(password, salt);
                 let new_user = new users({
                  nom:"jawher",
                  prenom:"hajri",
                  email:"jawherhajri01@gmail.com",
                  password:hashed,
                  role:"admin superieur",
                 });
                  await new_user.save();
                  console.log(`admin account has been added : ${users.email}`);
             }else{
                 console.log(` admin account already exist \n admin email : ${admin.email}`);
 
             }
             
         }
 
     }
     
     
     )
   console.log("database connect")
     }catch(error){
       console.log(error)
       
 console.log("database is not connect");
     }
 };
 module.exports=connectDB;