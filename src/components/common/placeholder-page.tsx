import type { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  actionButton?: {
    href: string;
    text: string;
  };
}

export function PlaceholderPage({ title, description, icon: Icon, actionButton }: PlaceholderPageProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center rounded-lg border border-dashed shadow-sm p-8 min-h-[calc(100vh-10rem)] bg-card">
      <div className="flex flex-col items-center gap-3 text-center">
        {Icon && <Icon className="h-16 w-16 text-primary mb-4" />}
        <h2 className="text-3xl font-bold tracking-tight text-card-foreground">{title}</h2>
        <p className="text-muted-foreground max-w-md text-lg">
          {description}
        </p>
        <p className="text-sm text-muted-foreground max-w-md">
          This section is currently under construction. Please check back soon for exciting updates!
        </p>
        {actionButton && (
          <Button asChild className="mt-6">
            <Link href={actionButton.href}>{actionButton.text}</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
