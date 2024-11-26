'use client'

import { Home, Search, PlusCircle, LogOut } from "lucide-react";
import { useRouter } from 'next/navigation';  // Correct import for navigation in Next.js
import Link from 'next/link'; // Use Link from next/link for navigation
import { signOut } from 'next-auth/react'; // Import signOut from next-auth/react

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Add blog",
    url: "/aadblog",
    icon: PlusCircle,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Logout",
    url: "#",
    icon: LogOut,
  },
];

export function AppSidebar() {
  const router = useRouter();  // Hook to handle navigation

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    {item.title === "Logout" ? (
                      <button 
                        onClick={handleLogout} 
                        className="w-full flex items-center p-2 text-gray-700 hover:bg-gray-200"
                      >
                        <item.icon size={20} className="mr-2" />
                        <span>{item.title}</span>
                      </button>
                    ) : (
                      <Link href={item.url} className="w-full flex items-center p-2 text-gray-700 hover:bg-gray-200">
                        <item.icon size={20} className="mr-2" />
                        <span>{item.title}</span>
                      </Link>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
