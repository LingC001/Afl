import mongoose from 'mongoose'

const { Schema } = mongoose

// To fix https://github.com/Automattic/mongoose/issues/4291
mongoose.Promise = global.Promise

const auditSchema = new Schema({
  studentName: {
    type: String,
    required: true,
  },
  teacherName: String,
  applicant: Number,
  auditor: {
    type: Number,
    required: true,
  },
  auditStatus: {
    type: String,
    default: 'pending',
  },
  phone: {
    type: Number,
    required: true,
  },
  leaveDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  backDate: {
    type: Date,
    required: true,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('Audit', auditSchema)
