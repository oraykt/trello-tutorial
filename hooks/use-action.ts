import { useState, useCallback, useEffect } from "react"

import { ActionState, FieldErrors } from "@/lib/create-save-actions"

type Action<TInput, TOutput> = (formData: FormData) => Promise<ActionState<TInput, TOutput>>

interface UseActionOptions<TOutput> {
  onSuccess?: (data: TOutput) => void;
  onError?: (error: string) => void;
  onComplete?: () => void;
}

export const useAction = <TInput, TOutput>(
  actions: Action<TInput, TOutput>,
  options: UseActionOptions<TOutput>
) => {

  const [fieldErrors, setFieldErrors] = useState<FieldErrors<TInput> |
    undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [data, setData] = useState<TOutput | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const executeAction = useCallback(
    async (input: any) => {
      setIsLoading(true);
      try {
        const result = await actions(input);

        if (!result) return

        setFieldErrors(result.fieldErrors)

        if (result.error) {
          setError(result.error)
          options.onError?.(result.error)
        }

        if (result.data) {
          setData(result.data)
          options.onSuccess?.(result.data)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
        options.onComplete?.()
      }
    }, [actions, options]
  );

  return {
    executeAction,
    fieldErrors,
    error,
    data,
    isLoading,
  }
}