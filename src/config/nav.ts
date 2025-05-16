import type { LucideIcon } from 'lucide-react';
import {
  LayoutDashboard,
  TrendingUp,
  CreditCard,
  BookOpen,
  FileText,
  Repeat,
  Archive,
  BarChart3,
  Settings,
  Package,
} from 'lucide-react';

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  label?: string;
  disabled?: boolean;
  external?: boolean;
  items?: NavItem[]; // For sub-menus if needed
}

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'Daily Sales',
    href: '/sales',
    icon: TrendingUp,
  },
  {
    title: 'Expenses',
    href: '/expenses',
    icon: CreditCard,
  },
  {
    title: 'Ledger',
    href: '/ledger',
    icon: BookOpen,
  },
  {
    title: 'Client Invoices',
    href: '/invoices/clients',
    icon: FileText,
  },
  {
    title: 'Vendor Invoices',
    href: '/invoices/vendors',
    icon: Package,
  },
  {
    title: 'Cash Flow',
    href: '/cash-flow',
    icon: Repeat,
  },
  {
    title: 'Inventory',
    href: '/inventory',
    icon: Archive,
  },
  {
    title: 'Financial Reports',
    href: '/reports',
    icon: BarChart3,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];
