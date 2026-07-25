export type Role = "admin" | "sales_rep" | "finance";
export type Profile = { id: string; full_name: string; role: Role; employee_id: string | null; status: "active" | "disabled" };
export type ExpenseType = "food" | "hotel" | "bus" | "train" | "bike_fuel" | "car_fuel" | "other";
