"use client";

import * as React from "react";
import { Bot, SquareTerminal } from "lucide-react";

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
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Profile",
      url: "/admin/profile",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Products",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "All Products",
          url: "/admin/products",
        },
        {
          title: "Add Product",
          url: "/admin/products/create-product",
        },
      ],
    },
    {
      title: "Orders",
      url: "/admin/orders",
      icon: Bot,
      isActive: true,
    },
    {
      title: "Settings",
      url: "/admin/settings",
      icon: Bot,
      isActive: true,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const currentUser = useAppSelector(selectCurrentUser);
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={currentUser || { email: "" }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
