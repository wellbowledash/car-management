import Car from "../models/car.model.js"
import { errorHandler } from "../utils/error.js"
import User from "../models/user.model.js";
export const createCar = async(req,res,next)=>{
    try {
        const { title, description, images, tags } = req.body;
        const car = new Car({ title, description, images, tags, owner: req.userId });
        await car.save();
    
        // Add car reference to user
        await User.findByIdAndUpdate(req.userId, { $push: { cars: car._id } },{new: true});
    
        res.status(201).json({ message: "Car created successfully", car });
      } catch (error) {
        next(error)
      }
}
export const getAllCars = async(req,res,next)=>{
    try {
        const cars = await Car.find({ owner: req.userId });
        res.status(200).json(cars);
      } catch (error) {
       next(error)
      }
}
export const getCar = async(req,res,next)=>{
    try {
        const car = await Car.findOne({ _id: req.params.id, owner: req.userId });
        if (!car) return next(errorHandler(404, "Car not found"))
        res.status(200).json(car);
      } catch (error) {
        next(error)
      }
}
export const updateCar = async(req,res,next)=>{
    try {
        const { title, description, images, tags } = req.body;
        const car = await Car.findOneAndUpdate(
          { _id: req.params.id, owner: req.userId },
          { title, description, images, tags },
          { new: true }
        );
        if (!car)return next(errorHandler(404, "Car not found"))
        res.status(200).json({ message: "Car updated successfully", car });
    }
    catch (error) {
            next(error)
    }
      
}
export const deleteCar = async(req,res,next)=>{
    try {
        const car = await Car.findOneAndDelete({ _id: req.params.id, owner: req.userId });
        if (!car)return next(errorHandler(404, "Car not found"))
    
        // Remove car reference from user
        await User.findByIdAndUpdate(req.userId, { $pull: { cars: car._id } });
    
        res.status(200).json({ message: "Car deleted successfully" });
      } catch (error) {
        next(error)
      }
}