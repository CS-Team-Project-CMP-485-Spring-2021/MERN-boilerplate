const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  clearance: {
    type: String,
    default: ''
  },


});

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateHash = function(clearance) {
  return bcrypt.hashSync(clearance, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validClearance = function(clearance) {
  return bcrypt.compareSync(clearance, this.clearance);
};

module.exports = mongoose.model('User', UserSchema);
