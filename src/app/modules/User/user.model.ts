import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { TAddress, TUser, UserModel } from './user.interface';
import config from '../../config';

const addressSchema = new Schema<TAddress>({
  village: { type: String, required: true },
  district: { type: String, required: true },
  subDistrict: { type: String, required: true },
  post: { type: String, required: true },
  postCode: { type: String, required: true },
});

const userSchema = new Schema<TUser>(
  {
    id: { type: String, required: true },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      trim: true,
      select: false,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'mealProvider', 'customer'],
      default: 'customer',
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true,
    },

    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: addressSchema,
      required: true,
    },
    secondaryPhone: {
      type: String,
      required: true,
    },
    isShop: {
      type: Boolean,
      default: false,
    },
    isBlock: {
      type: Boolean,
      default: false,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
    profileImage: {
      type: String,
      default:
        'https://i.ibb.co.com/h19Zpb4W/male-avatar-profile-picture-vector-10211761.jpg',
    },
  },
  { timestamps: true },
);

// Hash password before saving
// userSchema.pre('save', async function (next) {
//   // hashing password and save into DB
//   this.password = await bcrypt.hash(
//     this.password,
//     Number(config.bcrypt_salt_rounds),
//   );
//   next();
// });

userSchema.pre('save', async function (next) {
  // Only hash if password exists and has been modified
  if (this.isModified('password') && this.password) {
    this.password = await bcrypt.hash(
      this.password,
      Number(config.bcrypt_salt_rounds),
    );
  }
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isUserExistByCustomId = async function (id: string) {
  return await User.findOne({ id }).select('+password');
};

const User = model<TUser, UserModel>('User', userSchema);

export default User;
