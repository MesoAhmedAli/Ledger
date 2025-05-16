"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { navItems } from '@/config/nav';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import type { TooltipContentProps } from "@radix-ui/react-tooltip"; // Import for type safety

export function MainNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} legacyBehavior passHref>
            <SidebarMenuButton
              asChild={false} 
              className="w-full justify-start text-base font-normal group-data-[collapsible=icon]:text-sm" // Adjusted text size
              isActive={pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))}
              tooltip={{ children: item.title, className: "capitalize" } as React.ComponentProps<typeof TooltipContentProps>}
              aria-label={item.title}
            >
              <item.icon className="h-5 w-5" />
              <span className="truncate">{item.title}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
