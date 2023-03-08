const { Category } = require('../models')

const getCategories = async (req, res) => {
  const { prev = 0, next = 5 } = req.query

  const query = { state: true }
  const [total, categories] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query)
      .populate('user', 'name')
      .skip(Number(prev))
      .limit(Number(next))
  ])

  res.status(200).json({ total, categories })
}

const getCategory = async (req, res) => {
  const { id } = req.params
  const category = await Category.findOne({
    $and: [{ id }, { state: true }]
  }).populate('user', 'name')

  if (!category) {
    return res
      .status(400)
      .json({ msg: 'The category that you search was deleted.' })
  }

  res.status(200).json({ category })
}

const createCategory = async (req, res) => {
  try {
    const name = req.body.name.toUpperCase()

    // check if category already exists, if exists do not create it
    const categoryDB = await Category.findOne({ name })
    if (categoryDB) {
      return res
        .status(400)
        .json({ msg: `${categoryDB.name} category already exists.` })
    }

    // create the data for the category
    const data = {
      name,
      user: req.userAuth._id
    }
    const category = new Category(data)

    // save category on database
    await category.save()
    res.status(201).json({ msg: 'Category added.' })
  } catch (err) {
    console.log(err)
    res.staus(400).json({ msg: 'Something was wrong.' })
  }
}

const updateCategory = async (req, res) => {
  const { state, user, ...rest } = req.body
  const { id } = req.params

  // update the user field with last the user who makes changes in the doc
  rest.name = rest.name.toUpperCase()
  rest.userAuth = req.userAuth._id

  await Category.findByIdAndUpdate(id, rest)
  res.status(200).json({ msg: 'Category updated.' })
}

const deleteCategory = async (req, res) => {
  const { id } = req.params
  await Category.findByIdAndUpdate(id, { state: false })
  res.status(202).json({ msg: 'Category deleted.' })
}

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
}
