const { Schema, model } = require('mongoose')

const roleSchema = new Schema({
  role: {
    type: String,
    required: [true, 'Role is required and has to be in the database.']
  }
})

roleSchema.methods.toJSON = function () {
  const { __v, ...role } = this.toObject()
  return role
}

const Role = model('Role', roleSchema)

module.exports = Role
