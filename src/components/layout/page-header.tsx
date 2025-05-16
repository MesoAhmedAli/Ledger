"use client";

import { usePathname } from 'next/navigation';
import { navItems } from '@/config/nav'; 

export function PageHeaderTitle() {
  const pathname = usePathname();
  
  const findCurrentNavItem = (items: typeof navItems, currentPath: string): (typeof navItems[0] | undefined) => {
    for (const item of items) {
      if (item.href === '/' && currentPath === '/') {
        return item;
      }
      if (item.href !== '/' && currentPath.startsWith(item.href)) {
        return item;
      }
      if (item.items) {
        const subItem = findCurrentNavItem(item.items, currentPath);
        if (subItem) return subItem;
      }
    }
    return undefined;
  };

  const currentNavItem = findCurrentNavItem(navItems, pathname);
  const title = currentNavItem ? currentNavItem.title : "Ledger Lite";

  return <h1 className="text-xl font-semibold text-foreground">{title}</h1>;
}
