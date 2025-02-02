import CalendarListDateCard, {
  CalendarListDateCardProps,
} from "@/components/calendar-list-view/calendar-list-date-card";

type CalendarListItemProps = {
  date: string;
};

export default function CalendarListItem(props: CalendarListItemProps) {
  const { date } = props;

  const salesPerDay: CalendarListDateCardProps[] = [
    {
      client: "Cliente X",
      cost: 56000,
    },
    {
      client: "Cliente Y",
      cost: 56000,
    },
    {
      client: "Cliente Z",
      cost: 56000,
    },
  ];

  return (
    <section className="flex flex-col gap-4 py-8 md:py-10">
      <section className="w-full border-b-1">
        <h2 className="text-2xl mb-3">{date}</h2>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 w-full">
        {salesPerDay.map(({ client, cost }, key) => (
          <CalendarListDateCard key={key} client={client} cost={cost} />
        ))}
      </section>
    </section>
  );
}
