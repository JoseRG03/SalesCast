import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@heroui/spinner";

import CalendarListItem from "@/components/calendar-list-view/calendar-list-item";
import AppLayout from "@/layouts/app";
import { getFuturePurchaseCalendar } from "@/api/orders";

export default function CalendarPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["get-future-purchases"],
    queryFn: getFuturePurchaseCalendar,
  });

  return (
    <AppLayout titleText="Posibles Compras Futuras">
      {isLoading ? (
        <section className="w-full h-full flex">
          <Spinner className="m-auto" size="lg" />
        </section>
      ) : (
        (data ?? []).map(({ date, dateList }, key) => (
          <CalendarListItem key={key} date={date} items={dateList} />
        ))
      )}
    </AppLayout>
  );
}
