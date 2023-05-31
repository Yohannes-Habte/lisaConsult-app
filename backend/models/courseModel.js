import mongoose from 'mongoose';

const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const courseSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    language: { type: String, require: true },
    description: { type: String, required: true },
    //reviews: [reviewSchema],
  },

  {
    timestamps: true,
  }
);

const Course = mongoose.model('Course', courseSchema);
export default Course;
