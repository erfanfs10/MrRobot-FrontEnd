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
import productTypes from "@/utils/ProductTypes";

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel dir="rtl" className="text-md lg:text-lg">
        محصولات
      </SidebarGroupLabel>
      <SidebarMenu className="data-[state=open]/collapsible:item-center">
        {productTypes.map((pt) => (
          <Collapsible
            key={pt.name}
            asChild
            defaultOpen={false}
            className="group/collapsible"
          >
            <SidebarMenuItem dir="rtl" className="my-2 mr-2">
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  variant="inline"
                  size="lg"
                  tooltip={pt.name}
                >
                  <span className="text-lg lg:text-xl">{pt.name}</span>
                  <ChevronDown className="mr-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {pt.types.map((item) => (
                    <SidebarMenuSubItem key={item.url} className="mt-1">
                      <SidebarMenuSubButton asChild>
                        <a href={`/productTypes/${item.url}`}>
                          <span className="text-base">
                            {item.name}
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
