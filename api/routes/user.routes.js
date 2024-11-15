import express from 'express'
import { signup } from '../controllers/user.controller.js'
import { signin } from '../controllers/user.controller.js'
import { getAllUsers } from '../controllers/user.controller.js'
const router = express.Router()
router.post('/signup', signup)
router.post('/signin', signin)
router.get('/getall', getAllUsers)
export default router