import { z } from "zod";


export type FieldErrors<T> = {
  [P in keyof T]?: string[];
};

// Action State
// This is the type of the state object that is returned by the action function
// It contains the following properties:
// - fieldErrors: An object containing the errors for each field in the form
// - error: An error message if there was an error during the form submission
// - data: The data returned by the action function
export type ActionState<TInput, TOutput> = {
  fieldErrors?: FieldErrors<TInput>;
  error?: string | null;
  data?: TOutput;
};

// createSafeAction
// This function takes a Zod schema and an action function as arguments.
// It returns a function that can be used as an action in a form.
// The function validates the form data against the Zod schema and calls the action function with the validated data.
// If the validation fails, it returns an object with the fieldErrors and error properties.
// If the validation succeeds, it calls the action function and returns the result.
export const createSafeAction = <TInput, TOutput>(
  schema: z.Schema<TInput>,
  handler: (validatedData: TInput) => Promise<ActionState<TInput, TOutput>>

) => {
  return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
    const validatedFields = schema.safeParse(data);
    if (!validatedFields.success) {
      return {
        fieldErrors: validatedFields.error.flatten().fieldErrors as FieldErrors<TInput>,
        error: "Missing required fields",
      };
    }
    return handler(validatedFields.data);
  }
}