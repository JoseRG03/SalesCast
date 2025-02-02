import CalendarListItem from "@/components/calendar-list-view/calendar-list-item";
import AppLayout from "@/layouts/app";

export default function CalendarPage() {
  return (
    <AppLayout titleText="Posibles Compras Futuras">
      <CalendarListItem />
      <CalendarListItem />
      <CalendarListItem />
      <CalendarListItem />
    </AppLayout>
  );
}
