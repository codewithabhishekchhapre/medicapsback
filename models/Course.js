// models/Course.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  classname:{
    type:String,
  },
  instructorName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  coverImage: {
    type: String,
    default: ''
  },
  topics: [
    {
      type: String
    }
  ],
  enrolledStudents: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  category: {
    type: String,
    default: 'General'
  },
  prerequisites: [
    {
      type: String
    }
  ],
  isFree: {
    type: Boolean,
    default: true
  },
  price: {
    type: Number,
    default: 0
  },
  estimatedDuration: {
    type: Number,
    default: 0 // in hours
  },
  feedbacks: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      feedbackText: {
        type: String
      }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
