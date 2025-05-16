
"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, LogOut, User, Building, Settings as SettingsIcon, LogIn, UserPlus, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

export function UserNav() {
  const { user, loading, logout } = useAuth();
  
  const handleLogout = async () => {
    await logout();
    // Router redirection is handled within the logout function in AuthContext
  };

  if (loading) {
    return (
      <div className="flex items-center space-x-2 p-2 group-data-[collapsible=icon]:justify-center">
        <Skeleton className="h-8 w-8 rounded-full group-data-[collapsible=icon]:h-7 group-data-[collapsible=icon]:w-7" />
        <div className="space-y-1 group-data-[collapsible=icon]:hidden">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col gap-1 p-2 group-data-[collapsible=icon]:items-center">
        <Button variant="ghost" asChild className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent group-data-[collapsible=icon]:size-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0">
          <Link href="/login">
            <LogIn className="mr-2 h-4 w-4 group-data-[collapsible=icon]:mr-0" />
            <span className="group-data-[collapsible=icon]:hidden">Login</span>
          </Link>
        </Button>
        <Button variant="default" asChild className="w-full justify-start bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 group-data-[collapsible=icon]:size-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0">
          <Link href="/signup">
            <UserPlus className="mr-2 h-4 w-4 group-data-[collapsible=icon]:mr-0" />
            <span className="group-data-[collapsible=icon]:hidden">Sign Up</span>
          </Link>
        </Button>
      </div>
    );
  }

  const userDisplayName = user.displayName || user.email?.split('@')[0] || "User";
  const userEmail = user.email || "No email provided";
  const initials = userDisplayName
    .split(" ")
    .map((n) => n[0])
    .filter(char => /[a-zA-Z]/.test(char))
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-auto w-full justify-start space-x-2 p-2 text-left hover:bg-sidebar-accent group-data-[collapsible=icon]:size-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0">
          <Avatar className="h-8 w-8 group-data-[collapsible=icon]:h-7 group-data-[collapsible=icon]:w-7">
            <AvatarImage src={user.photoURL || `https://placehold.co/40x40.png`} alt={userDisplayName} data-ai-hint="avatar person"/>
            <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground">{initials || 'U'}</AvatarFallback>
          </Avatar>
          <div className="truncate group-data-[collapsible=icon]:hidden">
            <p className="text-sm font-medium leading-none text-sidebar-foreground">{userDisplayName}</p>
            <p className="text-xs leading-none text-sidebar-foreground/70">
              {userEmail}
            </p>
          </div>
          <ChevronDown className="ml-auto h-4 w-4 shrink-0 text-sidebar-foreground/70 group-data-[collapsible=icon]:hidden" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userDisplayName}</p>
            <p className="text-xs leading-tight text-muted-foreground">
              {userEmail}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/settings/account"> {/* Changed from /profile to /settings/account */}
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem disabled> {/* Placeholder, actual switching logic is complex */}
            <Building className="mr-2 h-4 w-4" />
            <span>Switch Company</span>
          </DropdownMenuItem>
           <DropdownMenuItem asChild>
             <Link href="/settings">
                <SettingsIcon className="mr-2 h-4 w-4" />
                <span>Application Settings</span>
             </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
