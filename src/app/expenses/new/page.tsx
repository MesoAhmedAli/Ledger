
import { ExpenseForm } from '@/components/expenses/expense-form';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function NewExpensePage() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-0.5 sm:p-4 md:p-8 pt-6">
        <ExpenseForm />
      </div>
    </ScrollArea>
  );
}
