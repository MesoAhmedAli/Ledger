import { PlaceholderPage } from '@/components/common/placeholder-page';
import { BookOpen } from 'lucide-react';

export default function LedgerPage() {
  return (
    <PlaceholderPage
      title="General Ledger"
      description="View a comprehensive list of all financial transactions, grouped by day and sorted chronologically. Your complete financial history at a glance."
      icon={BookOpen}
    />
  );
}
