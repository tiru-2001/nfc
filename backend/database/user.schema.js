import mongoose from 'mongoose';
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    phone: {
      type: Number,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    link: {
      type: String,
    },
    faceBookLink: {
      type: String,
      trim: true,
      required: true,
    },
    instagramLink: {
      type: String,
      trim: true,
      required: true,
    },
    twitterLink: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

const user = mongoose.model('user', userSchema);
export default user;
