const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  exercise: [
    { type: Schema.Types.ObjectId, ref: 'Exercise' }
  ],

password: { type: String, required: true }
},
{
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;