"use client";

import * as React from "react";
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
} from "lucide-react";
import { ModeToggle } from "@/components/navbar/ModeToggle";
import { NavMain } from "@/components/sidebar/nav-main";
import Logo from "@/components/Logo";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarGroup,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "گیتار الکتریک",
      url: "#",
      icon: "/electric-guitar.png",
      isActive: false,
      items: [
        {
          title: "Jackson",
          url: "#",
        },
        {
          title: "PRS",
          url: "#",
        },
        {
          title: "Gibson",
          url: "#",
        },
      ],
    },
    {
      title: "آمپلیفایر",
      url: "#",
      icon: "/amplifier.png",
      items: [
        {
          title: "BOSS",
          url: "#",
        },
        {
          title: "Marshal",
          url: "#",
        },
      ],
    },
    {
      title: "سیم گیتار",
      url: "#",
      icon: "/string.png",
      items: [
        {
          title: "10 / 51",
          url: "#",
        },
        {
          title: "11 / 52",
          url: "#",
        },
        {
          title: " 13 / 60",
          url: "#",
        },
      ],
    },
    {
      title: "کابل",
      url: "#",
      icon: "/aux.png",
      items: [
        {
          title: "Brand-1",
          url: "#",
        },
        {
          title: "Brand-2",
          url: "#",
        },
        {
          title: "Brand-3",
          url: "#",
        },
        {
          title: "Brand-4",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar
      className="md:hidden"
      side="right"
      collapsible="offcanvas"
      {...props}
    >
      {/* <SidebarHeader>
        <SidebarGroup>
          <div className="flex items-center justify-between">
            <Logo />
            <ModeToggle />
          </div>
        </SidebarGroup>
      </SidebarHeader> */}
      <SidebarContent>
        <NavMain items={data.navMain} />
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
