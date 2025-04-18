import { JwtPayload } from 'jsonwebtoken';
import { TUser } from './user.interface';
import User from './user.model';

const createUserIntoDB = async (userData: TUser) => {
  console.log(userData);
  const newUser = await User.create(userData);
  return newUser;
};
const updateUserIntoDB = async (userData: Partial<TUser>, user: JwtPayload) => {
  console.log(userData);
  const updatedUser = await User.findByIdAndUpdate(user.id, userData, {
    new: true,
    runValidators: true,
  });
  return updatedUser;
};

export const UserServices = {
  createUserIntoDB,
  updateUserIntoDB,
};
