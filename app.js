import express from 'express'
import { mongoodb } from './model/db/mongo.js' 
import 'dotenv/config'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { Router } from './routes/routes.js'
import { CostumJwt } from './routes/middleware/auth.js'
import { logger } from './helpers/logger/logger.js'

import { UserHandler } from './model/handler/user.js'
import { UserUsecase } from './business/user.js'
import { UserController } from './controllers/userController.js'

import morgan from 'morgan'
import { BookHandler } from './model/handler/book.js'
import { BookUsecase } from './business/book.js'
import { BookController } from './controllers/bookController.js'

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(morgan('combined'))
app.use(
  cors({
    origin : "*"
  })
  )
  
  const db = new mongoodb(process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_NAME)
  db.init()
  
  //user
  const userHandler = new UserHandler()
  const userUsecase = new UserUsecase(userHandler)
  const userController = new UserController(userUsecase)

  //books
  const bookHandler = new BookHandler()
  const bookUsecase = new BookUsecase(bookHandler)
  const bookController = new BookController(bookUsecase)

  const authHandler = new CostumJwt()
  
  const controllerList = {
    user : userController,
    book : bookController,
    authHandler : authHandler
}

const router = new Router(app, controllerList)
router.routes()

app.listen(process.env.PORT, () => {
  logger.info(`Drive-Thru-Lib running on port ${process.env.PORT}`)
})