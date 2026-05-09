import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import Taskrouter from './routes/Task.route.js'
import Authrouter from './routes/Auth.route.js'

dotenv.config()

const PORT = process.env.PORT

const app = express()

app.use(express.json())
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://task-management-wine-beta.vercel.app'
  ]
}))

// routes 

app.use('/api/task', Taskrouter)
app.use('/api/auth', Authrouter)

mongoose.connect(process.env.MONGODB_CONN).then(() => {
    console.log('Database connected.')
}).catch(err => console.log('Database connection failed.', err))


app.listen(PORT, () => {
    console.log('Server running on port:', PORT)
})