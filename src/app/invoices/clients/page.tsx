import { PlaceholderPage } from '@/components/common/placeholder-page';
import { FileText } from 'lucide-react';

export default function ClientInvoicesPage() {
  return (
    <PlaceholderPage
      title="Client Invoices"
      description="Manage all your client invoices. Create new invoices, track payment statuses, send reminders, and manage deferred payments."
      icon={FileText}
      actionButton={{ href: "/invoices/clients/new", text: "Create New Invoice" }}
    />
  );
}
