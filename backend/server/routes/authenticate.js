import 'babel-polyfill'
import Router from 'koa-router'
import { baseApi } from '../config'
import authenticate from '../middlewares/authenticate'

const api = 'login'

const router = new Router()

router.prefix(`/${baseApi}/${api}`)

// POST /api/authenticate
router.post('/', authenticate)

export default router
