import type { HTMLAttributes } from 'react';
import { BriefcaseBusiness } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps extends HTMLAttributes<HTMLDivElement> {
  iconOnly?: boolean;
}

export function Logo({ className, iconOnly = false, ...props }: LogoProps) {
  return (
    <div 
      className={cn(
        "flex items-center gap-2 text-lg font-bold tracking-tight", // Increased font weight
        iconOnly ? "justify-center" : "",
        className
      )} 
      {...props}
    >
      <BriefcaseBusiness className="h-6 w-6 text-primary group-data-[collapsible=icon]:text-sidebar-foreground" /> {/* Use primary or sidebar-foreground based on context */}
      {!iconOnly && <span className="text-primary group-data-[collapsible=icon]:hidden">Ledger Lite</span>}
    </div>
  );
}
