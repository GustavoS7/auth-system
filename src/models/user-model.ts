import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Pleas provide your name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: [true, 'Email already exists'],
    },
    photo: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minLength: [6, 'Password must have at least 6 characters'],
      maxLength: [16, 'Password must not be larger than 16 characters'],
    },
  },
  {
    collection: 'users',
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  try {
    if (this.isNew) {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    }
    next();
  } catch (error: any) {
    next(error);
  }
});

const UserModel = model('UserModel', userSchema);

export { UserModel };
