import { Schema } from "mongoose";
import { TMealProvider } from "./mealProvider.interface";

export const providerSchema = new Schema<TMealProvider>({
  shopName: { type: String, required: true },
  authorShopId: { type: String, required: true, unique: true, ref: 'User' },
  shopAddress: { type: String, required: true },
  shopLogo: { type: String },
  phoneNumber: { type: String, required: true },
  website: { type: String },
  ownerName: { type: String, required: true },
  customerServiceContact: { type: String },
  establishedYear: { type: Number, required: true },
  socialMediaLinks: {
    facebook: { type: String },
    instagram: { type: String },
    twitter: { type: String },
    linkedin: { type: String },
  },
  operatingHours: {
    open: { type: String, required: true },
    close: { type: String, required: true },
    daysOpen: { type: [String], required: true },
  },
  paymentMethods: { type: [String], required: true },
  productCategories: { type: [String], required: true },
  isActive: { type: Boolean, default: true },
});