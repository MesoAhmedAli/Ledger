import { PlaceholderPage } from '@/components/common/placeholder-page';
import { Archive } from 'lucide-react';

export default function InventoryPage() {
  return (
    <PlaceholderPage
      title="Inventory Management"
      description="Manage your product inventory levels, track item movements, and get insights into stock valuation and reorder points."
      icon={Archive}
      actionButton={{ href: "/inventory/add", text: "Add New Item" }}
    />
  );
}
