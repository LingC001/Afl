import 'babel-polyfill'
import Router from 'koa-router'
import { baseApi } from '../config'
import jwt from '../middlewares/jwt'
import AuditControllers from '../controllers/audit'

const api = 'audit'

const router = new Router()

router.prefix(`/${baseApi}/${api}`)

// POST /api/audit
// This route is protected, call POST /api/authenticate to get the token
router.post('/', jwt, AuditControllers.add)

// GET /api/audit
router.get('/', jwt, AuditControllers.find)

// PUT /api/audit/id
// This route is protected, call POST /api/authenticate to get the token
router.put('/', jwt, AuditControllers.update)

export default router
