// import environmental variables
import dotenv from 'dotenv'

// Import express
import express from 'express'

// connect to DB script
import connectDB from './config/db.js'

// import colors module for color coded error/server running messages and such
import colors from 'colors'

// import the product routes for API segregration
import productRoutes from './routes/productRoutes.js'

// import middleware for error handling
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

// Enable dotenv config for the dotenv variables like PORT and MONGO URI
dotenv.config()

// Create app variable for express functions
const app = express()

app.use(express.json())

connectDB()

// Test API index
app.get('/', (req, res) => {
  res.send('API is running')
})

// The /api/products route logic
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.use(notFound)

app.use(errorHandler)

// Port is either process env or default 5000 local
const PORT = process.env.PORT || 5000

// Run app on PORT
app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
)
