import { AssignablePerson } from "../models/assignable.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getMyAssignablePerson = asyncHandler(async (req, res) => {
  const person = await AssignablePerson.findOne({ email: req.user.email });

  return res.status(200).json(
    new ApiResponse(200, person || null, "Current assignable profile fetched successfully")
  );
});

const getAssignablePeople = asyncHandler(async (req, res) => {
  const people = await AssignablePerson.find({}).sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(200, people, "Assignable people fetched successfully")
  );
});

const createAssignablePerson = asyncHandler(async (req, res) => {
  const { name, email, position } = req.body;

  if (!name || !email || !position) {
    throw new ApiError(400, "Name, email, and position are required");
  }

  const existing = await AssignablePerson.findOne({ email });
  if (existing) {
    throw new ApiError(409, "This person is already registered as assignable");
  }

  const person = await AssignablePerson.create({ name, email, position });

  return res.status(201).json(
    new ApiResponse(201, person, "Assignable person added successfully")
  );
});

const deleteAssignablePerson = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const person = await AssignablePerson.findByIdAndDelete(id);

  if (!person) {
    throw new ApiError(404, "Assignable person not found");
  }

  return res.status(200).json(
    new ApiResponse(200, {}, "Assignable person deleted successfully")
  );
});

export { getMyAssignablePerson, getAssignablePeople, createAssignablePerson, deleteAssignablePerson };
