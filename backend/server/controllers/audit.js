import Audit from '../models/audit'
import User from '../models/users'

class AuditControllers {
  /* eslint-disable no-param-reassign */

  /**
   * Get all audit
   * @param {ctx} Koa Context
   */
  async find(ctx) {
    console.log('payload----', ctx.state.user)
    try {
      const { account, type } = ctx.state.user
      const { auditStatus } = ctx.query
      // console.log('auditStatus--------------', auditStatus)
      const roleDic = {
        student: 'applicant',
        teacher: 'auditor',
      }
      const role = roleDic[type]
      const condition = { auditStatus }
      condition[role] = account
      // console.log('condition---------------', condition)
      if (!auditStatus) {
        delete condition.auditStatus
      }
      const all = await Audit.find(condition)
      ctx.body = _.colPick(all, ['studentName', 'phone', 'auditStatus', 'updated'])
    } catch (e) {
      console.log('eee', e)
      ctx.throw(500)
    }
  }

  /**
   * Add a audit
   * @param {ctx} Koa Context
   */
  async add(ctx) {
    console.log('payload----', ctx.state.user)
    try {
      const { account: applicant } = ctx.state.user
      const { auditor } = ctx.request.body
      console.log('auditor-------', auditor)
      const { name: teacherName } = await User.findOne({ account: auditor })
      Object.assign(ctx.request.body, { applicant, teacherName })
      await new Audit(ctx.request.body).save()
      ctx.body = {
        state: true,
        message: '新增成功',
      }
    } catch (err) {
      console.log('err--', err)
      ctx.throw(422)
    }
  }

  /**
   * Update a audit
   * @param {ctx} Koa Context
   */
  async update(ctx) {
    try {
      const { id, auditStatus } = ctx.request.body
      console.log('bbbbb----', auditStatus)
      const audit = await Audit.findByIdAndUpdate(
        id,
        { auditStatus },
      )
      if (!audit) {
        ctx.throw(404)
      }
      ctx.body = {
        change: true,
      }
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404)
      }
      ctx.throw(500)
    }
  }

  /* eslint-enable no-param-reassign */
}

export default new AuditControllers()
