const { Schema, model } = require('mongoose')

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Product name is required.']
  },
  state: {
    type: Boolean,
    default: true,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  price: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    default: 'None'
  },
  available: {
    type: Boolean,
    default: true
  }
})

productSchema.methods.toJSON = function () {
  const { __v, state, ...category } = this.toObject()
  return category
}

const Product = model('Product', productSchema)

module.exports = Product
