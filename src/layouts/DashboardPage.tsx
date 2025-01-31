import { cn } from "@/lib/utils"

export default function DashboardPage({ children, className }: { children: React.ReactNode; className?: string }) {
  return <main className={cn(`mx-6 mt-10`, className)}>{children}</main>
}
