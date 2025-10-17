import Header from "@/components/Header";
import DashboardClient from "@/components/DashboardClient";
import { BusLine } from "@/types/BusLine";

export default async function Page() {
  const res = await fetch("https://www.amanabootcamp.org/api/fs-classwork-data/amana-transportation", { cache: "no-store" });
  const data = await res.json();
  const lines: BusLine[] = Array.isArray(data?.bus_lines) ? data.bus_lines : [];

  const getBusStatus = (bus: any): string => (bus.status ?? "").toLowerCase();
  const activeRoutes = lines.length;
  const busesOnline = lines.filter((l: any) => getBusStatus(l) === "active").length;
  const status = lines.some((l: any) => Array.isArray(l.incidents) && l.incidents.length > 0) ? "Service issues" : "Service normal";
  const today = new Date().toLocaleDateString("en-US", { weekday: "short" });

  return (
    <main className="space-y-6">
      <section id="dashboard" className="scroll-mt-24">
        <Header today={today} activeRoutes={activeRoutes} busesOnline={busesOnline} status={status} />
      </section>
      <DashboardClient lines={lines} />
    </main>
  );
}