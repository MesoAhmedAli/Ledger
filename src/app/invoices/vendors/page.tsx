import { PlaceholderPage } from '@/components/common/placeholder-page';
import { Package } from 'lucide-react';

export default function VendorInvoicesPage() {
  return (
    <PlaceholderPage
      title="Vendor Invoices"
      description="Keep track of invoices from your vendors. Manage payments, due dates, and vendor fee details."
      icon={Package}
      actionButton={{ href: "/invoices/vendors/new", text: "Add Vendor Bill" }}
    />
  );
}
