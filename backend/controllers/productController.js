import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import fs from 'fs'
import path from 'path'
import e from 'express'

//dir name
const __dirname = path.resolve()

// @desc Fetch data for all products
// @route GET /api/products
// @access public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 8
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}
  const count = await Product.countDocuments(keyword)
  const products = await Product.find(keyword)
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

// @desc Fetch data for single product
// @route GET /api/products/:id
// @access public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc Delete a single product
// @route DELETE /api/products/:id
// @access private/admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    if (!product.image.includes('sample.jpg')) {
      try {
        fs.unlink(path.join(__dirname + product.image), (err) => {
          if (err) console.log('there is no local image to remove')
        })
      } catch (err) {
        console.error(err)
      }
    }
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc Create a single product
// @route POST /api/products
// @access private/admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample Name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })
  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @desc Update a single product
// @route PUT /api/products/:id
// @access private/admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body

  const product = await Product.findById(req.params.id)
  if (product) {
    product.name = name
    product.price = price
    product.description = description
    if (product.image === image || product.image.includes('sample.jpg')) {
      product.image = image
    } else {
      fs.unlink(path.join(__dirname + product.image), (err) => {
        if (err) throw new Error('The image can not be removed')
      })
      product.image = image
    }

    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc Create new review
// @route POST /api/products/:id/reviews
// @access private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )
    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    const productReviewAdded = await product.save()
    res.status(201).json({ message: 'Review added', productReviewAdded })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc GET top rated products
// @route GET /api/products/top
// @access public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)
  res.json(products)
})

// @desc Delete a single product review
// @route DELETE /api/products/:id/reviews/:reviewId
// @access private/ or private/admin
const deleteProductReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    const review = await product.reviews.find(
      (x) => String(x._id) === String(req.params.reviewId)
    )

    if (
      req.user.isAdmin ||
      req.user._id.toString() === review.user.toString()
    ) {
      await review.remove()
      product.numReviews = product.reviews.length
      console.log(product.reviews ? 'exists' : 'doesnt')
      product.reviews.length > 0
        ? (product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length)
        : (product.rating = 0)
      console.log(product.reviews, product.rating, product.reviews.length)
      await product.save()
      res.json({ message: 'Review is removed', product })
    } else {
      res.status(401)
      throw new Error('Not authorized to remove this')
    }
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  deleteProductReview,
}
