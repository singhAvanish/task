import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  joinedOn: { type: Date, default: Date.now },
  role: { type: String, enum: ['student', 'instructor'], default: 'student' },
  coursesPurchased: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  coursesCreated: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
});

const User = mongoose.model('User', userSchema);
export default User;
