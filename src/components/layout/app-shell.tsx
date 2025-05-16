import type { ReactNode } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { MainNav } from '@/components/layout/main-nav';
import { UserNav } from '@/components/layout/user-nav';
import { Logo } from '@/components/common/logo';
import { PageHeaderTitle } from '@/components/layout/page-header';
import { Toaster } from '@/components/ui/toaster';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar collapsible="icon" variant="sidebar" side="left" className="border-r bg-sidebar text-sidebar-foreground">
        <SidebarHeader className="p-3 h-16 flex items-center">
          {/* The group-data-[collapsible=icon] will be on the parent .group.peer by Sidebar component itself */}
          <div className="flex items-center justify-between w-full">
             <Logo className="text-sidebar-foreground group-[[data-collapsible=icon]]/sidebar-wrapper:hidden" />
             <Logo iconOnly={true} className="text-sidebar-foreground hidden group-[[data-collapsible=icon]]/sidebar-wrapper:flex justify-center w-full" />
          </div>
        </SidebarHeader>
        <SidebarContent className="p-2 flex-1">
          <MainNav />
        </SidebarContent>
        <SidebarFooter className="p-2 border-t border-sidebar-border">
          <UserNav />
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6 shadow-sm">
          <div className="md:hidden">
            <SidebarTrigger />
          </div>
          <div className="flex-1">
            <PageHeaderTitle />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            {/* Optional: UserNav can also be placed here for larger screens */}
            {/* <div className="hidden sm:block"> <UserNav /> </div> */}
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-background">
          {children}
        </main>
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  );
}
