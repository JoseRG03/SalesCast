import CalendarListDateCard from "@/components/calendar-list-view/calendar-list-date-card";

export default function CalendarListItem() {
  return (
    <section className="flex flex-col gap-4 py-8 md:py-10">
      <section className="w-full border-b-1">
        <h2 className="text-2xl mb-3">2 de Febrero del 2025</h2>
      </section>
      <section className="flex flex-wrap gap-4 mx-auto">
        <CalendarListDateCard />
        <CalendarListDateCard />
        <CalendarListDateCard />
        <CalendarListDateCard />
        <CalendarListDateCard />
        <CalendarListDateCard />
        <CalendarListDateCard />
        <CalendarListDateCard />
        <CalendarListDateCard />
        <CalendarListDateCard />
      </section>
    </section>
  );
}
