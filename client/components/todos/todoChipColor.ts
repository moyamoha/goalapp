import { TodoStatus } from "@state/types";

export const getTodoStatusChipColor = (
  status: TodoStatus
): { color: string } => {
  const style = {
    color: "",
  };
  switch (status) {
    case TodoStatus.COMPLETED:
      style.color = "#198754";
      break;
    case TodoStatus.CANCELLED:
      style.color = "#dc3545";
      break;
    case TodoStatus.DRAFT:
      style.color = "#6c757d";
      break;
    case TodoStatus.ONGOING:
      style.color = "#0d6efd";
      break;
    default:
      style.color = "#0dcaf0";
      break;
  }

  return style;
};
