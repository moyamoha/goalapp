import { TodoStatus } from "@state/types";

export const getTodoStatusColor = (status: TodoStatus): string => {
  switch (status) {
    case TodoStatus.COMPLETED:
      return "#198754";
    case TodoStatus.CANCELLED:
      return "#dc3545";
    case TodoStatus.DRAFT:
      return "#6c757d";
    case TodoStatus.ONGOING:
      return "#0d6efd";
    default:
      return "#0dcaf0";
  }
};
