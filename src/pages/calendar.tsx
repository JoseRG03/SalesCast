import CalendarListItem from "@/components/calendar-list-view/calendar-list-item";
import AppLayout from "@/layouts/app";
import { formatISOToCustomDate } from "@/utils/functions";

export default function CalendarPage() {
  const listItems = [
    {
      date: new Date().toISOString(),
    },
    {
      date: new Date(2025, 4, 26).toISOString(),
    },
  ];

  return (
    <AppLayout titleText="Posibles Compras Futuras">
      {listItems.map(({ date }, key) => (
        <CalendarListItem key={key} date={formatISOToCustomDate(date)} />
      ))}
    </AppLayout>
  );
}
