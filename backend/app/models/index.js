const mongoose = require('mongoose')
const dbConfig = require('../config/db.config')

mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.url = dbConfig.url
db.students = require('./students.model')(mongoose)

module.exports = db
