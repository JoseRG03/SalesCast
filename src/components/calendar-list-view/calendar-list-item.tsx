import { FutureOrder } from "@/api/orders";
import CalendarListDateCard from "@/components/calendar-list-view/calendar-list-date-card";

type CalendarListItemProps = {
  date: string;
  items: FutureOrder[];
};

export default function CalendarListItem(props: CalendarListItemProps) {
  const { date, items } = props;

  const mappedItems = items.map((item) => item.proposal);

  return (
    <section className="flex flex-col gap-4 py-8 md:py-10">
      <section className="w-full border-b-1">
        <h2 className="text-2xl mb-3">{date}</h2>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 w-full">
        {mappedItems.map(({ bundle_offer }, key) => (
          <CalendarListDateCard
            key={key}
            client={bundle_offer.name}
            cost={bundle_offer.total_bundle_price}
            orderId={key}
          />
        ))}
      </section>
    </section>
  );
}
