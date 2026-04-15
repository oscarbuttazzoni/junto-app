import { BottomNav } from "@/components/ui/BottomNav";

/**
 * Layout for authenticated app routes.
 * Includes the bottom navigation bar (mobile-first design).
 */
export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen pb-20">
      <main className="flex-1">{children}</main>
      <BottomNav />
    </div>
  );
}
