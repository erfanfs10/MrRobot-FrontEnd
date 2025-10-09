import Image from "next/image";
import { ChevronDown } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function NavMain({ items }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel dir="rtl" className="text-md lg:text-lg">
        محصولات
      </SidebarGroupLabel>
      <SidebarMenu className="data-[state=open]/collapsible:item-center">
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem dir="rtl" className="my-2 mr-2">
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  variant="inline"
                  size="lg"
                  tooltip={item.title}
                >
                  {/* <Image
                    src={item.icon}
                    alt="sdf"
                    width={32}
                    height={32}
                    className="size-8"
                  /> */}
                  <span className="text-lg lg:text-xl">{item.title}</span>
                  <ChevronDown className="mr-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <a href={subItem.url}>
                          <span className="text-sm lg:text-md">
                            {subItem.title}
                          </span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
