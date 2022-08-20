import express from 'express'
import dotenv from 'dotenv'
import helmet from 'helmet'
import { v2 as cloudinary } from 'cloudinary'
import cors from 'cors'
import { sequelize } from './database/sequelize'

import authRoute from './routes/auth'
import roleAdminRoute from './routes/admin/role'
import userAdminRoute from './routes/admin/user'

import { errorHandler, errorRoute } from './utils/error'

dotenv.config()

const app = express()

app.use(helmet())

app.use(express.json({ limit: '5mb' }))
app.use(cors())

// Setup up

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

app.use('/api/v1/auth', authRoute)

app.use('/api/v1/admin/role', roleAdminRoute)
app.use('/api/v1/admin/user', userAdminRoute)

app.use(errorRoute)
app.use(errorHandler)

const PORT = process.env.PORT || 3005

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

sequelize
  .sync()
  .then(() => {
    console.log('Conecting to database...')
  })
  .catch((err) => {
    console.log('Error conecting to database...', err)
  })
