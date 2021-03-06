import bodyParser from 'koa-bodyparser'
import Koa from 'koa'
import logger from 'koa-logger'
import mongoose from 'mongoose'
import helmet from 'koa-helmet'
import _ from 'lodash'
import routing from './routes'
import { port, connexionString } from './config'
import { colPick } from './utils/util'

_.colPick = colPick
global._ = _

mongoose.connect(connexionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to the database!')
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err)
    process.exit()
  })
mongoose.connection.on('error', console.error)

// Create Koa Application
const app = new Koa()

app
  .use(logger())
  .use(bodyParser())
  .use(helmet())

routing(app)

// Start the application
app.listen(port, () => console.log(`✅  The server is running at http://localhost:${port}/`))
export default app
