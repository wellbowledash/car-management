import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.routes.js'
import carRoutes from './routes/car.routes.js'
import cors from 'cors'
dotenv.config()
const app  = express()
app.use(cors({
    origin: '*' // Allow all origins
    // You can also specify a specific origin or an array of origins
    // origin: ['https://your-frontend-domain.com']
  }));

app.use(express.json())
mongoose.connect(process.env.MONGO)
 .then(()=>{
     console.log('MongoDB is connected')
 }).catch(err=>{
     console.log(err)
 })

app.listen(3000, ()=>{
    console.log("server started at port 3000")
})

app.use("/api/users", userRoutes); 
app.use("/api/cars", carRoutes); 

app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    res.status(statusCode).json({
        success : false,
        statusCode,
        message,
        

})
}
)
