import User from '../models/users'

class UsersControllers {
  /* eslint-disable no-param-reassign */

  /**
   * 新增账号
   * @param {ctx} Koa Context
   */
  async add(ctx) {
    console.log('ctx------------', ctx.request.body)
    // console.log('payload----',payload)
    try {
      const { account } = ctx.request.body
      // console.log('account-----', account)
      const getAccount = await User.findOne({ account })
      console.log('getAccount--------', getAccount)
      if (getAccount) {
        ctx.body = {
          state: false,
          message: '账号已存在',
        }
      } else {
        const user = await new User(ctx.request.body).save()
        if (user) {
          ctx.body = {
            state: true,
            message: '账号新增成功',
          }
        }
      }
    } catch (err) {
      ctx.throw(err)
    }
  }

  /**
   * Get all users
   * @param {ctx} Koa Context
   */
  async find(ctx) {
    ctx.body = await User.find()
  }

  /**
   * Find a user
   * @param {ctx} Koa Context
   */
  async findById(ctx) {
    try {
      const user = await User.findById(ctx.params.id)
      if (!user) {
        ctx.throw(404)
      }
      ctx.body = user
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404)
      }
      ctx.throw(500)
    }
  }

  /**
   * 查找所有老师
   * @param {ctx} Koa Context
   */
  async findAllTeacher(ctx) {
    try {
      const teachers = await User.find({ type: 'teacher' })
      if (!teachers) {
        ctx.throw(404)
      }
      ctx.body = teachers.map((i) => ({
        account: i.account,
        name: i.name,
      }))
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404)
      }
      ctx.throw(500)
    }
  }

  /**
   * Update a user
   * @param {ctx} Koa Context
   */
  async update(ctx) {
    try {
      const user = await User.findByIdAndUpdate(
        ctx.params.id,
        ctx.request.body,
      )
      if (!user) {
        ctx.throw(404)
      }
      ctx.body = user
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404)
      }
      ctx.throw(500)
    }
  }

  /**
   * Delete a user
   * @param {ctx} Koa Context
   */
  async delete(ctx) {
    try {
      const user = await User.findByIdAndRemove(ctx.params.id)
      if (!user) {
        ctx.throw(404)
      }
      ctx.body = user
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404)
      }
      ctx.throw(500)
    }
  }

  /* eslint-enable no-param-reassign */
}

export default new UsersControllers()
