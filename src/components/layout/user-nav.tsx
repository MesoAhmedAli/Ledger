"use client";

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
import { ChevronDown, LogOut, User, Building, Settings as SettingsIcon } from "lucide-react"; // Renamed Settings to SettingsIcon

export function UserNav() {
  // Placeholder user data
  const user = { name: "Acme Inc.", email: "contact@acme.inc" }; // Example company name
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .filter(char => /[a-zA-Z]/.test(char)) // Ensure only letters are used for initials
    .slice(0, 2) // Max 2 initials
    .join("")
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-auto w-full justify-start space-x-2 p-2 text-left hover:bg-sidebar-accent group-data-[collapsible=icon]:size-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0">
          <Avatar className="h-8 w-8 group-data-[collapsible=icon]:h-7 group-data-[collapsible=icon]:w-7">
            {/* Placeholder image, replace with actual user/company avatar if available */}
            <AvatarImage src={`https://placehold.co/40x40.png`} alt={user.name} data-ai-hint="logo company" />
            <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground">{initials || 'AI'}</AvatarFallback>
          </Avatar>
          <div className="truncate group-data-[collapsible=icon]:hidden">
            <p className="text-sm font-medium leading-none text-sidebar-foreground">{user.name}</p>
            <p className="text-xs leading-none text-sidebar-foreground/70">
              {user.email}
            </p>
          </div>
          <ChevronDown className="ml-auto h-4 w-4 shrink-0 text-sidebar-foreground/70 group-data-[collapsible=icon]:hidden" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-tight text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Building className="mr-2 h-4 w-4" />
            <span>Switch Company</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SettingsIcon className="mr-2 h-4 w-4" />
            <span>Account Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
