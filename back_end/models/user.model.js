
import mongoose,{Schema} from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["user", "admin", "assignee"],
    default: "user",
  },

  profileImage: {
    type: String,
    default: "",
  },
 accessToken: {
    type: String,
    default: "",
  },    
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);