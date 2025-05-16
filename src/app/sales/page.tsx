import { PlaceholderPage } from '@/components/common/placeholder-page';
import { TrendingUp } from 'lucide-react';

export default function SalesPage() {
  return (
    <PlaceholderPage
      title="Daily Sales"
      description="Manage and input your daily sales records. Track revenue from different clients and services, and generate sales reports."
      icon={TrendingUp}
      actionButton={{ href: "/sales/new", text: "Add New Sale" }}
    />
  );
}
