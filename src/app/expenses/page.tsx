import { PlaceholderPage } from '@/components/common/placeholder-page';
import { CreditCard } from 'lucide-react';

export default function ExpensesPage() {
  return (
    <PlaceholderPage
      title="Expenses Tracking"
      description="Log and categorize all your business expenses. Keep track of spending to manage your budget effectively. Use Smart Categorization for quick entries."
      icon={CreditCard}
      actionButton={{ href: "/expenses/new", text: "Add New Expense" }}
    />
  );
}
