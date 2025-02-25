import { Router } from "express";
import { addUser, editUser, getAllUser, getSpecificUser, removeUser } from "../controller/userController.js";
import { validateUser } from "../middileware/validator.js";
import { validateUpdateUser } from "../middileware/editingValidator.js";
const router = Router()

router.post('/users',validateUser,addUser)
router.get('/users',getAllUser)
router.get('/users/:id',getSpecificUser)
router.put('/users/:id',validateUpdateUser ,editUser)
router.delete('/users/:id',removeUser)

export default router 