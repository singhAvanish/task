import mongoose from "mongoose";








const courseSchema = mongoose.Schema({
  name: { type: String, required: true },
  instructor: { type: String, required: true },
  description: { type: String, required: true },
  enrollmentStatus: { type: String, enum: ['Open', 'Closed', 'In Progress'], default: 'Open' },
  thumbnail: { type: String, required: true },
  duration: { type: String, required: true },
  schedule: { type: String, required: true },
  location: { type: String, required: true },
  prerequisites: [{ type: String }],
  syllabus: [{
    week: { type: Number, required: true },
    topic: { type: String, required: true },
    content: { type: String, required: true },
  }],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }], // Initialize as empty array
  progress: [{
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    completedWeeks: [{ type: Number }]
  }],
  createdOn: { type: Date, default: Date.now },
});

export default mongoose.model('Course', courseSchema);




