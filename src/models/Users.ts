import bcrypt from "bcryptjs";
import mongoose, { Schema, models, model } from "mongoose";

export interface IUser {
  id: string;
  email: string;
  password?: string;
  _id?: string;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true },
    password: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (this: mongoose.Document<IUser>, next: (err?: Error) => void) {
  if (!this.isModified("password") || !this.get("password")) {
    return next();
  }

  try {
    const hashedPassword = await bcrypt.hash(this.get("password"), 10);
    this.set("password", hashedPassword);
    next();
  } catch (err) {
    next(err as Error);
  }
});

const User = models?.User || model<IUser>("User", userSchema);

export default User;
