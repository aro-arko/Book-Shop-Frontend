"use client";

import * as React from "react";
import {
  LayoutDashboard,
  User,
  Package,
  PlusCircle,
  ShoppingCart,
  Settings,
  Key,
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "../ui/sidebar";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Profile",
      url: "/admin/profile",
      icon: User,
      isActive: true,
    },
    {
      title: "Products",
      url: "#",
      icon: Package,
      items: [
        {
          title: "All Products",
          url: "/admin/products",
          icon: Package,
        },
        {
          title: "Add Product",
          url: "/admin/products/create-product",
          icon: PlusCircle,
        },
      ],
    },
    {
      title: "Orders",
      url: "/admin/orders",
      icon: ShoppingCart,
      isActive: true,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
      items: [
        {
          title: "Change Password",
          url: "/admin/change-password",
          icon: Key,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const currentUser = useAppSelector(selectCurrentUser);
  return (
    <Sidebar className="text-gray-300" collapsible="icon" {...props}>
      <SidebarHeader></SidebarHeader>
      <SidebarContent className="text-gray-900">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="text-gray-900">
        <NavUser user={currentUser || { email: "" }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
