import mongoose, { Schema } from "mongoose";

const assignablePersonSchema = new Schema(
  {
    name: {
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
    position: {
      type: String,
      required: true,
      trim: true,
    },
    showAssignedTickets: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const AssignablePerson = mongoose.model("AssignablePerson", assignablePersonSchema);
