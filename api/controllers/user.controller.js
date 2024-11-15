import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js"
import jwt from 'jsonwebtoken'
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const signup = async (req,res,next)=>{
    const {name, email, password} = req.body
    if(!name || !email || !password || name===''||email===''||password===''){
     return next(errorHandler(400, 'All fields are required'))
    }
    if (!emailRegex.test(email)) {
        return next(errorHandler(400, 'invalid email format'));
      }
    const checkUserByEmail = await User.findOne({email})
    if(checkUserByEmail){
       return next(errorHandler(400,'a user already exists with this email'))
    }
    if(req.body.password.length<6){
       return next(errorHandler(400, 'Password must be at least 6 characters'))
   }
    const hashedPassword = bcryptjs.hashSync(password,10)
 
  

    const newUser  = new User({
     name,
     email,
     password: hashedPassword,
    })
    try {
     await newUser.save()
     res.status(200).json(newUser)
    }
    catch (err){
      next(err)
    }
    
 }

 export const signin = async(req,res,next)=>{
    const {email,password}=req.body
    if(!email  || !password || email===''||password===''){
       return next(errorHandler(400, 'All fields are required'))
      }
      try{
       const validUser = await User.findOne({email})
       if(!validUser){
         return next(errorHandler(404, 'User not found'))
       }
       const validPassword = bcryptjs.compareSync(password,validUser.password)
       if(!validPassword){
          return next(errorHandler(400,'Invalid Password'))
       }
       const token = jwt.sign(
          {
             userId : validUser._id,
          },
          `${process.env.JWT_SECRET}`,
          {expiresIn: "1h"}
          
 
 
       )
       const{password:pass, ...rest} = validUser._doc
       res.status(200).json({
         message: "Sign-in successful", token,rest
        }
        );
      }
      catch(error){
       next(error)
      }
 }

 export const getAllUsers = async(req,res,next)=>{
    try {
        const users = await User.find();
        res.status(200).json(users);
      } catch (error) {
       next(error)
      }
}

