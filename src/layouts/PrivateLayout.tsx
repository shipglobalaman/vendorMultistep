import { useEffect, useState } from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/navigation/app-sidebar";
import { Outlet } from "react-router-dom";

export default function PrivateLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<string | null>("true");
  useEffect(() => {
    document.addEventListener("storage", () => {
      setIsSidebarOpen(localStorage.getItem("sidebar"));
    });
    console.log("change", isSidebarOpen);
  }, [isSidebarOpen]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-gray-100">
        <header className="flex border-b fixed w-full top-0 bg-background h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 z-20">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="ml-4" />
            <Separator orientation="vertical" className="h-4 mr-2" />
          </div>
          <div
            className={`absolute top-4 right-4 transition-all duration-300 ease-in-out ${
              isSidebarOpen === "false"
                ? "scale-90 -translate-x-4 -translate-y-2"
                : ""
            }`}></div>
        </header>
        <div className={"h-full w-full my-10"}>
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
