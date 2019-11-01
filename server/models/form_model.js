const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Form = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: String,  required: true }
  },
)

module.exports = mongoose.model('event_form', Form);
