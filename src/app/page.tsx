import { AppSidebar } from "@/components/app-sidebar"
import { SalesChart } from "@/components/organisms/SalesChart"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"

export default function Home() {
  return (
    <TooltipProvider>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <div className="px-4 lg:px-6">
                  {/* <div className="mb-4 rounded-xl border bg-card p-6 text-card-foreground shadow-xs">
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                      Yearly Sales Performance
                    </h2>
                    <p className="mt-2 max-w-full text-sm leading-6 text-muted-foreground">
                      Compare mocked retail sales for 2024, 2023, and 2022 with
                      a custom threshold filter and switchable Recharts
                      visualizations.
                    </p>
                  </div> */}
                  <SalesChart />
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
