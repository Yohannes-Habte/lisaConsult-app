import mongoose from 'mongoose';

const { Schema } = mongoose;

const courseRegistrationSchema = new Schema(
  {
    course: {
      name: { type: String, required: true },
      start: { type: String, required: true },
    },
    studentAddress: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      profession: { type: String, required: true },
      language: { type: String, required: true },
      gender: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      houseNo: { type: String, required: true },
      zipCode: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    taxPrice: { type: Number},
    totalPrice: { type: Number },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const CourseRegistration = mongoose.model(
  'CourseRegistration',
  courseRegistrationSchema
);
export default CourseRegistration;
