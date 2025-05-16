import { PlaceholderPage } from '@/components/common/placeholder-page';
import { Settings } from 'lucide-react';

export default function SettingsPage() {
  return (
    <PlaceholderPage
      title="Application Settings"
      description="Configure company details, manage user accounts, set up payment gateways, customize invoice templates, and manage integrations."
      icon={Settings}
    />
  );
}
