/**
 * Importing the User model to perform create operations
 */
const User = require('../../models/userSchema');

// create user in db
exports.createUser = async(req,res)=>{
   try{
     //  Destructures the input received in req.body.
     const {id, name, email} = req.body

     // validate data
     
 
     // create new user
     const user = await User.create({id, name, email})
      res.status(201).json({
         status: "success",
         data: {
           user,
         },
       });
   }catch(err){
    res.status(404).json({ status: "fail", message: err.message });
   }
}