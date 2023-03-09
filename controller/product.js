const { Product } = require('../models')

const getProducts = async (req, res) => {
  const { prev = 0, next = 5 } = req.query

  const query = { state: true }
  const [total, products] = await Promise.all([
    Product.find(query).countDocuments(),
    Product.find(query)
      .populate('user', 'name')
      .populate('category', 'name')
      .skip(prev)
      .limit(next)
  ])

  res.status(200).json({ total, products })
}

const getProduct = async (req, res) => {
  const { id } = req.params
  const product = await Product.findOne({
    $and: [{ _id: id }, { state: true }]
  })
    .populate('user', 'name')
    .populate('category', 'name')

  if (!product) {
    return res
      .status(400)
      .json({ msg: 'The product that you search was deleted.' })
  }

  res.status(200).json({ product })
}

const createProduct = async (req, res) => {
  const { name, state, user, ...rest } = req.body
  try {
    const productDB = await Product.findOne({ name })
    if (productDB) {
      return res.status(400).json({ msg: `The product ${name} already exist.` })
    }

    const data = {
      ...rest,
      name: name.toUpperCase(),
      user: req.userAuth._id
    }
    const product = new Product(data)

    await product.save()
    res.status(201).json({ msg: 'Product added.' })
  } catch (err) {
    console.log(err)
    res.status(400).json({ msg: 'Something was wrong' })
  }
}

const updateProduct = async (req, res) => {
  const { id } = req.params
  const { state, user, ...rest } = req.body

  if (rest.name) rest.name = rest.name.toUpperCase()

  rest.user = req.userAuth._id

  await Product.findByIdAndUpdate(id, rest)
  res.status(200).json({ msg: 'Product updated.' })
}

const deleteProduct = async (req, res) => {
  const { id } = req.params
  await Product.findByIdAndUpdate(id, { state: false })
  res.status(200).json({ msg: 'Product deleted.' })
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
}
