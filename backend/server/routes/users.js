import 'babel-polyfill'
import Router from 'koa-router'
import { baseApi } from '../config'
import jwt from '../middlewares/jwt'
import UsersControllers from '../controllers/users'

const api = 'user'

const router = new Router()

router.prefix(`/${baseApi}/${api}`)

// POST /api/users
// This route is protected, call POST /api/authenticate to get the token
router.post('/', jwt, UsersControllers.add)

// GET /api/users/findAllTeacher
router.get('/findAllTeacher', UsersControllers.findAllTeacher)

export default router
