"use client";

import * as React from "react";
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
} from "lucide-react";
import { ModeToggle } from "@/components/navbar/ModeToggle";
import { NavMain } from "@/components/sidebar/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
  SidebarGroup,
} from "@/components/ui/sidebar";


export function AppSidebar({ ...props }) {
  return (
    <Sidebar
      className="md:hidden"
      side="right"
      collapsible="offcanvas"
      {...props}
    >
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <ModeToggle />
        </SidebarGroup>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
