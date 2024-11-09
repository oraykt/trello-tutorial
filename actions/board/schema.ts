import { z } from "zod";

// Board Schema
// Define the schema for the input data of the createBoard action
// Define the validation rules for each field
// "required_error" specifies the error message to display if the field is missing
// "invalid_type_error" specifies the error message to display if the field is not a string
// "message" specifies the error message to display if the field is less than 3 characters
export const CreateBoard = z.object({
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title must be a string",
  }).min(3, {
    message: "Title must be at least 3 characters",
  }),
});