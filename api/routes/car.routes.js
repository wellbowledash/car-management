import express from 'express'
import { createCar, getAllCars,getCar,updateCar,deleteCar } from '../controllers/car.controller.js'
import { verifyToken } from '../utils/verifyUser.js'
const router = express.Router()
router.post('/create',verifyToken, createCar)
router.get('/get/:id',verifyToken, getCar)
router.get('/getall',verifyToken, getAllCars)
router.put('/update/:id',verifyToken, updateCar)
router.delete('/delete/:id',verifyToken,deleteCar)
export default router