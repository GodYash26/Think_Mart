import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { Outlet } from "react-router-dom"

export function DashboardLayout() {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                <AppSidebar />
                <SidebarInset className="[--header-height:3.5rem]">
                    <SiteHeader />
                    <main className="flex flex-1 flex-col">
                        <Outlet />
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    )
}