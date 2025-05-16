
import { PlaceholderPage } from '@/components/common/placeholder-page';
import { DollarSign } from 'lucide-react'; // Or a more specific icon like ShoppingCart or TrendingUp if preferred

export default function NewSalePage() {
  return (
    <PlaceholderPage
      title="Add New Sale"
      description="Record the details of a new sale transaction."
      icon={DollarSign}
    />
  );
}
