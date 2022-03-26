import jwt from 'jsonwebtoken'
import User from '../models/users'

export default async (ctx) => {
  const { account, password } = ctx.request.body
  const user = await User.findOne({ account })
  let back
  if (user) {
    if (user.password === password) {
      const type = user.type || ''
      back = {
        token: jwt.sign(
          {
            account,
            type,
          },
          'YourKey',
        ), // Store this key in an environment variable
        success: true,
        message: '登陆成功',
      }
    } else {
      back = {
        success: false,
        message: '密码错误',
      }
    }
  } else {
    back = {
      success: false,
      message: '用户不存在',
    }
  }
  ctx.status = 200
  ctx.body = back
  return ctx
}
