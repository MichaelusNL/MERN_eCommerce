// imports

import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

// dotenv config enable
dotenv.config()

// Connect db to URI
connectDB()

// clear existing seed then add new data from users.js and product.js data.
// Every product has added owner user: adminUser from the createdUsers entry for admin.

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)

    const adminUser = createdUsers[0]._id

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })

    await Product.insertMany(sampleProducts)
    console.log('Data has been imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error('${error}'.red.inverse)
    process.exit(1)
  }
}

// Delete all instances of order, product and user.

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data has been destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error('${error}'.red.inverse)
    process.exit(1)
  }
}

// This takes in an argument when calling the .js file with an argument.
// If this is -d, call the destroy data function, otherwise import data.

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
