
import { PlaceholderPage } from '@/components/common/placeholder-page';
import { ReceiptText } from 'lucide-react';

export default function NewVendorBillPage() {
  return (
    <PlaceholderPage
      title="Add New Vendor Bill"
      description="Record a new bill or invoice received from a vendor."
      icon={ReceiptText}
    />
  );
}
