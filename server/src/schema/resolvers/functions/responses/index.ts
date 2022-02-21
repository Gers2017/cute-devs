import { OperationError } from "../../responses";

export function createOperationError(
  type: string,
  details: string,
): OperationError {
  return {
    type,
    details,
  };
}
