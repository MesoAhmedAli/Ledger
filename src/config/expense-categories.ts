
export const PREDEFINED_EXPENSE_CATEGORIES = [
  { value: "office_supplies", label: "Office Supplies" },
  { value: "travel", label: "Travel" },
  { value: "software_subscriptions", label: "Software & Subscriptions" },
  { value: "utilities", label: "Utilities (Gas, Electric, Water)" },
  { value: "internet_phone", label: "Internet & Phone" },
  { value: "marketing_advertising", label: "Marketing & Advertising" },
  { value: "meals_entertainment", label: "Meals & Entertainment" },
  { value: "rent_lease", label: "Rent or Lease Payments" },
  { value: "repairs_maintenance", label: "Repairs & Maintenance" },
  { value: "professional_fees", label: "Professional Fees (Legal, Accounting)" },
  { value: "insurance", label: "Insurance" },
  { value: "bank_charges", label: "Bank Charges" },
  { value: "other", label: "Other" },
] as const;

export type ExpenseCategoryValue = typeof PREDEFINED_EXPENSE_CATEGORIES[number]['value'];
