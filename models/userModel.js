const mongoose = require('mongoose')
const validator = require('validator')
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: {
    type: String,
    required: [true, 'please provide your password'],
    minlength: [6, 'password must have more then 6 characters'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    validate: {
      validator: function (el) {
        // this only works on save :  create new object
        return el === this.password
      },
      message: 'passwords are not the same !',
    },
  },
  passwordChangedAt: Date,
  email: {
    type: String,
    validate: [validator.isEmail, 'please provide a valid email'],
  },
})
const User = mongoose.model('User', userSchema)

module.exports = User
