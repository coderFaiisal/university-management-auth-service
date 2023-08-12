import cors from 'cors'
import express, { Application } from 'express'
import usersRouter from './app/modules/users/users.route'

const app: Application = express()

//middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/users', usersRouter)

export default app
